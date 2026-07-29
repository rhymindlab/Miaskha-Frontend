"use client";

export default function OptionCard({
  value,
  selected,
  onClick,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative
        w-full
        rounded-2xl
        border-2
        p-5
        text-left
        transition-all
        duration-300

        ${
          selected
            ? "border-black bg-black text-white shadow-xl"
            : "border-neutral-200 bg-white hover:border-black hover:shadow-lg"
        }
      `}
    >
      {selected && (
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
          ✓
        </div>
      )}

      <h4 className="font-medium text-base">
        {value}
      </h4>

      {description && (
        <p
          className={`mt-2 text-sm ${
            selected
              ? "text-neutral-300"
              : "text-neutral-500"
          }`}
        >
          {description}
        </p>
      )}
    </button>
  );
}