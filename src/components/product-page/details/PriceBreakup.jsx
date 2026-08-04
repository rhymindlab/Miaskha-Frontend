"use client";

export default function PriceBreakup({ pricing = {}, product = {} }) {
  const {
    selectedMaterial = "",
    selectedPurity = "",

    metalPrice = 0,

    stonePrice = 0,
    stoneDiscount = 0,
    afterDiscountStonePrice = 0,

    makingCharges = 0,
    makingDiscount = 0,
    afterDiscountMakingCharge = 0,

    subtotal = 0,
    productDiscount = 0,
    afterDiscountSubTotal = 0,

    gst = 0,
    total = 0,
  } = pricing;
  
  const p = pricing;
  console.log(p);
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
      original: stonePrice,
      final: afterDiscountStonePrice,
      discount: stoneDiscount,
    },

    makingCharges > 0 && {
      title: "Making Charges",
      subtitle: "Labour & Craftsmanship",
      original: makingCharges,
      final: afterDiscountMakingCharge,
      discount: makingDiscount,
    },

    {
      subtitle: "Sub Total",
      value: subtotal,
    },

    productDiscount > 0 && {
      subtitle: `${productDiscount}% OFF`,
      original: subtotal,
      final: afterDiscountSubTotal,
      discount: productDiscount,
      isProductDiscount: true,
    },
    productDiscount > 0 && {
      subtitle: "New Sub Total",
      value: afterDiscountSubTotal,
    },

    {
      title: "GST (3%)",
      subtitle: "Tax",
      value: gst,
    },
  ].filter(Boolean);

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">

      {/* Header */}
      <div className="border-b bg-neutral-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Price Breakdown
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Transparent pricing details
        </p>
      </div>

      {/* Body */}
      <div className="divide-y divide-neutral-200">

        {rows.map((row) => (
          <div
            key={row.title}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <p className="text-sm text-neutral-500">
                {row.title}
              </p>

              <p className="text-base font-medium text-neutral-900">
                {row.subtitle}
              </p>
            </div>

            {/* Discounted Price */}
            {row.discount > 0 ? (
              <div className="text-right">

                <div className="flex items-center justify-end gap-2">

                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(row.original)}
                  </span>

                  <span className="text-lg font-semibold text-neutral-900">
                    {formatPrice(row.final)}
                  </span>

                </div>

                <span className="text-sm font-medium text-green-600">
                  ({row.discount}% OFF)
                </span>

              </div>
            ) : (
              <span className="text-lg font-semibold text-neutral-900">
                {formatPrice(row.value)}
              </span>
            )}
          </div>
        ))}

        {/* Total */}

        <div className="flex items-center justify-between bg-neutral-50 px-6 py-5">

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