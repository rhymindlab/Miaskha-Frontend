"use client";

export default function SpecificationTable({
  product,
  pricing,
}) {
  const specifications = [];

  // Convert Map/Object to array
  if (product?.specifications) {
    Object.entries(product.specifications).forEach(([label, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== ""
      ) {
        specifications.push({
          label,
          value,
        });
      }
    });
  }

  // Dynamic values from customization
  if (pricing?.selectedMaterial) {
    specifications.push({
      label: "Material",
      value: pricing.selectedMaterial,
    });
  }

  if (pricing?.selectedPurity) {
    specifications.push({
      label: "Purity",
      value: pricing.selectedPurity,
    });
  }

  if (!specifications.length) {
    return (
      <p className="text-neutral-500">
        No specifications available.
      </p>
    );
  }

  return (
    <div className="overflow-hidden border border-neutral-200">

      {specifications.map((spec, index) => (

        <div
          key={`${spec.label}-${index}`}
          className={`flex justify-between gap-6 px-6 py-4 ${
            index !== specifications.length - 1
              ? "border-b border-neutral-200"
              : ""
          }`}
        >
          <span className="text-neutral-500">
            {spec.label}
          </span>

          <span className="font-medium text-right">
            {String(spec.value)}
          </span>
        </div>

      ))}

    </div>
  );
}