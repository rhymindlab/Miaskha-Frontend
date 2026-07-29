"use client";

export default function TextInput({
  field,
  value,
  onChange,
}) {
  return (
    <input
      type={field.type}
      value={value || ""}
      placeholder={field.placeholder || ""}
      onChange={(e) =>
        onChange(
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
        bg-white
        px-5
        py-4
        outline-none
        transition
        focus:border-black
        focus:ring-2
        focus:ring-black/10
      "
    />
  );
}