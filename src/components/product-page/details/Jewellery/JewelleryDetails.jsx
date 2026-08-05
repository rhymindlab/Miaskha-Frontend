"use client";

import Description from "./Description";
import SpecificationTable from "./SpecificationTable";
import PriceBreakup from "../../PriceBreakup/PriceBreakup";
import ShippingReturns from "./ShippingReturns";

export default function JewelleryDetails({
  product,
  pricing,
}) {
  return (
    <section className="mt-20">

      {/* Header */}
      <div className="mb-12">

        <p className="uppercase tracking-[5px] text-xl md:text-2xl lg:text-3xl text-neutral-500 mb-2">
          Product Information
        </p>

      </div>

      {/* Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left */}

        <div className="lg:col-span-2 space-y-6">

          <Description
            description={product?.description}
          />

          <SpecificationTable
            product={product}
            pricing={pricing}
          />

          <PriceBreakup
            pricing={pricing}
            product={product}
          />

        </div>

        {/* Right */}

        <div className="lg:col-span-1 lg:sticky lg:top-24">

          <ShippingReturns />

        </div>

      </div>

    </section>
  );
}