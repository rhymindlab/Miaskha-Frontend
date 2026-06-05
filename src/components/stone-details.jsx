"use client";

export default function StoneDetails({ product }) {

  const rows =
    product?.stoneShape?.map((_, index) => ({
      shape: product.stoneShape?.[index] || "-",
      noOfDiamonds: product.noOfDiamonds?.[index] || "-",
      weight: product.stoneWeight?.[index] || "-",
      color: product.stoneColor?.[index] || "-",
      clarity: product.stoneClarity?.[index] || "-",
      sizeRange: product.stoneSizeRange?.[index] || "-"
    })) || [];

  return (

    <div className="mt-6 border  overflow-hidden">

      {/* HEADER */}

      <div className="px-6 py-4 border-b bg-gray-50">

        <h2 className="text-lg font-semibold">
          {product?.stoneType || "Stone"} Details
        </h2>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="bg-gray-100">

              <th className="px-4 py-3 text-left">
                Shape
              </th>

              <th className="px-4 py-3 text-left">
                No. of Diamonds
              </th>

              <th className="px-4 py-3 text-left">
                Weight
              </th>

              <th className="px-4 py-3 text-left">
                Color
              </th>

              <th className="px-4 py-3 text-left">
                Clarity
              </th>

              <th className="px-4 py-3 text-left">
                Size Range
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-4 py-3">
                  {row.shape}
                </td>

                <td className="px-4 py-3">
                  {row.noOfDiamonds}
                </td>

                <td className="px-4 py-3">
                  {row.weight}
                </td>

                <td className="px-4 py-3">
                  {row.color}
                </td>

                <td className="px-4 py-3">
                  {row.clarity}
                </td>

                <td className="px-4 py-3">
                  {row.sizeRange}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}