"use client";

import PriceBreakup from "../price-breakup";
import StoneDetails from "../stone-details";

export default function ProductDetails({
  product,
  pricing,
}) {
  const {
    selectedMaterial,
    selectedPurity,
  } = pricing;

  return (
    <div className="bg-gray-50">

      {/* HEADER */}

      <div className="px-6 py-4">

        <h1 className="text-2xl font-bold">
          Product Details
        </h1>

        <div className="py-6 mb-5 border-b border-gray-500">

          <span>
            {product.description}
          </span>

        </div>

      </div>

      {/* DETAILS */}

      <div className="px-6 flex">

        <div className="flex mr-20 flex-col py-4">

          <span className="font-bold text-xl">

            Metal

          </span>

          <span className="text-gray-500">

            {selectedMaterial}

          </span>

        </div>

        <div className="flex mr-20 flex-col py-4">

          <span className="font-bold text-xl">

            Purity

          </span>

          <span className="text-gray-500">

            {selectedPurity}

          </span>

        </div>

        <div className="flex mr-20 flex-col py-4">

          <span className="font-bold text-xl">

            Weight

          </span>

          <div>

            <span className="mr-2">

              Gross(Product):

            </span>

            <span className="text-gray-500">

              {product.productWeight || 0} g

            </span>

          </div>

          <div>

            <span className="mr-2">

              Net(Metal):

            </span>

            <span className="text-gray-500">

              {product.metalWeight || 0} g

            </span>

          </div>

        </div>

      </div>

      <StoneDetails product={product} />

      <PriceBreakup
        pricing={pricing}
        product={product}
      />

    </div>
  );
}