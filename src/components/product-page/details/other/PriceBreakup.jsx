"use client";

export default function PriceBreakup({ pricing = {}, product = {} }) {
  const {
    selectedMaterial,
    selectedPurity,
    metalPrice = 0,
    stonePrice = 0,
    makingCharges = 0,
    subtotal = 0,
    gst = 0,
    total = 0,
  } = pricing;

  const formatPrice = (value = 0) =>
    `₹ ${Math.round(Number(value)).toLocaleString("en-IN")}`;

  const rows = [
    metalPrice > 0 && {
      title: "Metal Price",
      subtitle: `${selectedMaterial} (${selectedPurity})`,
      value: metalPrice,
    },

    stonePrice > 0 && {
      title: "Stone Charges",
      subtitle: product?.stoneType || "Stone",
      value: stonePrice,
    },

    makingCharges > 0 && {
      title: "Making Charges",
      subtitle: "Labour & Craftsmanship",
      value: makingCharges,
    },

    {
      title: metalPrice > 0 ? "Subtotal" : "Product Price",
      subtitle:
        [
          metalPrice > 0 && "Metal",
          stonePrice > 0 && "Stone",
          makingCharges > 0 && "Making",
        ]
          .filter(Boolean)
          .join(" + ") || "Base Price",
      value: subtotal,
    },

    {
      title: "GST",
      subtitle: "Tax Included",
      value: gst,
    },
  ].filter(Boolean);

  return (
    <div className="mt-6 overflow-hidden border border-neutral-200 bg-white">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-neutral-50">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Price Breakdown
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Detailed pricing information
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">

        {rows.map((row, index) => (
          <div
            key={row.title}
            className={`flex items-center justify-between ${
              index !== rows.length - 1 ? "border-b pb-3" : ""
            }`}
          >
            <div>
              <p className="text-sm text-neutral-500">
                {row.title}
              </p>

              <h3 className="font-medium text-neutral-900">
                {row.subtitle}
              </h3>
            </div>

            <span className="text-lg font-semibold text-neutral-900">
              {formatPrice(row.value)}
            </span>
          </div>
        ))}

        {/* Total */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">

          <div>
            <p className="text-sm text-neutral-500">
              Final Payable Amount
            </p>

            <h2 className="text-2xl font-bold text-neutral-900">
              Total
            </h2>
          </div>

          <span className="text-3xl font-bold text-neutral-900">
            {formatPrice(total)}
          </span>

        </div>

      </div>
    </div>
  );
}