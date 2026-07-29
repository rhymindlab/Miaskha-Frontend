"use client";

import { useEffect, useMemo } from "react";

export default function CustomizationSection({
  product,
  formData,
  setFormData,
}) {
  /*
  ==========================================
  Visible Fields
  ==========================================
  */

  const visibleFields = useMemo(() => {
    if (!product?.customizationFields) return [];

    return product.customizationFields.filter((field) => {
      if (!field.dependsOn?.field) {
        return true;
      }

      return (
        formData[field.dependsOn.field] ===
        field.dependsOn.value
      );
    });
  }, [product, formData]);

  /*
  ==========================================
  Auto Select Defaults
  ==========================================
  */

  useEffect(() => {
    if (!visibleFields.length) return;

    setFormData((prev) => {
      let changed = false;

      const updated = { ...prev };

      visibleFields.forEach((field) => {
        if (field.type !== "select") return;

        if (!field.options?.length) return;

        if (updated[field.name]) return;

        const purityIndex = field.options.indexOf(
          product?.purity
        );

        updated[field.name] =
          purityIndex !== -1
            ? field.options[purityIndex]
            : field.options[0];

        changed = true;
      });

      return changed ? updated : prev;
    });
  }, [visibleFields, product, setFormData]);

  /*
  ==========================================
  Handle Change
  ==========================================
  */

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [field.name]: value,
      };

      product.customizationFields.forEach((child) => {
        if (!child.dependsOn?.field) return;

        if (child.dependsOn.field !== field.name) return;

        const visible =
          child.dependsOn.value === value;

        if (!visible) {
          delete updated[child.name];
          return;
        }

        if (
          child.type === "select" &&
          child.options?.length &&
          !updated[child.name]
        ) {
          const purityIndex =
            child.options.indexOf(product?.purity);

          updated[child.name] =
            purityIndex !== -1
              ? child.options[purityIndex]
              : child.options[0];
        }
      });

      return updated;
    });
  };

  /*
  ==========================================
  Option Card
  ==========================================
  */

  const OptionCard = ({
    option,
    selected,
    onClick,
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative
        rounded-2xl
        border-2
        px-5
        py-4
        text-left
        transition-all
        duration-300

        ${
          selected
            ? "border-black bg-black text-white shadow-xl"
            : "border-neutral-200 bg-white hover:border-black hover:shadow-md"
        }
      `}
    >
      {selected && (
        <span
          className="
            absolute
            right-4
            top-4
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-white
            text-xs
            font-bold
            text-black
          "
        >
          ✓
        </span>
      )}

      <span className="font-medium">
        {option}
      </span>
    </button>
  );

  /*
  ==========================================
  Input
  ==========================================
  */

  const TextInput = ({ field }) => (
    <input
      type={field.type}
      value={formData[field.name] ?? ""}
      placeholder={field.placeholder || ""}
      onChange={(e) =>
        handleChange(
          field,
          field.type === "number"
            ? Number(e.target.value)
            : e.target.value
        )
      }
      className="
        w-full
        rounded-2xl
        border
        border-neutral-300
        px-5
        py-4
        outline-none
        transition
        focus:border-black
        focus:ring-4
        focus:ring-black/5
      "
    />
  );

    /*
  ==========================================
  Empty State
  ==========================================
  */

  if (!product?.customizationFields?.length) {
    return null;
  }

  /*
  ==========================================
  Render
  ==========================================
  */

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 lg:p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Customize Your Product
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Select your preferred options before adding this item to your cart.
        </p>

      </div>

      {/* Fields */}

      <div className="space-y-10">

        {visibleFields.map((field) => (

          <div key={field.name}>

            {/* Label */}

            <div className="mb-4">

              <h3 className="text-base font-semibold text-neutral-900">
                {field.label || field.name}
              </h3>

              {field.description && (
                <p className="mt-1 text-sm text-neutral-500">
                  {field.description}
                </p>
              )}

            </div>

            {/* Select */}

            {field.type === "select" ? (

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">

                {field.options?.map((option) => (

                  <OptionCard
                    key={option}
                    option={option}
                    selected={
                      formData[field.name] === option
                    }
                    onClick={() =>
                      handleChange(field, option)
                    }
                  />

                ))}

              </div>

            ) : (

              <TextInput field={field} />

            )}

          </div>

        ))}

      </div>

    </section>
  );
}