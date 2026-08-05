"use client";

import { useNavigate } from "react-router-dom";
import { Heart, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function BullionInfo({
  product,
  pricing,
  formData,
  setFormData,
  loggedIn,
  user,
  onAddToCart,
}) {
  const navigate = useNavigate();

  const {
    subtotal,
    gst,
    selectedMaterialNotNormalize,
    selectedPurity,
    total
  } = pricing;

  const formatPrice = (price) =>
    `₹ ${Math.round(Number(price || 0)).toLocaleString("en-IN")}`;

  const discount =
    Number(product?.mrp) > subtotal
      ? Math.round(
          ((Number(product.mrp) - subtotal) / Number(product.mrp)) * 100
        )
      : 0;

  const handleAddToCart = async () => {
    await onAddToCart(
      product,
      selectedMaterialNotNormalize,
      selectedPurity,
      subtotal,
      gst,
      loggedIn,
      user
    );
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="w-full">
      <div className="lg:sticky lg:top-24 space-y-8">

        {/* SKU */}
        <span className="uppercase tracking-[4px] text-xs text-neutral-500">
          SKU: {product.sku}
        </span>

        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-light leading-tight tracking-wide">
            {product.title}
          </h1>

          <p className="mt-4 text-neutral-600 leading-7">
            {product.shortDescription}
          </p>
        </div>

        {/* Price Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          {Number(product.mrp) > subtotal && (
            <div className="flex items-center gap-4 mb-4">
              <span className="line-through text-neutral-400 text-xl">
                ₹ {Number(product.mrp).toLocaleString("en-IN")}
              </span>

              <span className="rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm font-semibold">
                {discount}% OFF
              </span>
            </div>
          )}

          <h2 className="text-5xl font-semibold text-neutral-900">
            {formatPrice(total)}
          </h2>

          <p className="text-neutral-500 mt-2">
            Inclusive of GST
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">

          <button
            onClick={handleAddToCart}
            className="
              w-full
              rounded-full
              bg-black
              text-white
              py-4
              text-lg
              font-medium
              hover:bg-neutral-800
              transition
            "
          >
            Add To Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="
              w-full
              rounded-full
              border
              border-black
              py-4
              text-lg
              hover:bg-black
              hover:text-white
              transition
            "
          >
            Buy Now
          </button>

          {/* <button
            className="
              w-full
              rounded-full
              border
              border-neutral-300
              py-4
              flex
              items-center
              justify-center
              gap-3
              hover:border-black
              transition
            "
          >
            <Heart size={18} />
            Add to Wishlist
          </button> */}

        </div>

        {/* Trust */}
        <div className="rounded-3xl bg-neutral-50 p-6 space-y-5">

          <div className="flex gap-4">
            <ShieldCheck className="text-emerald-600" />

            <div>
              <h4 className="font-medium">
                Certified Jewellery
              </h4>

              <p className="text-sm text-neutral-500">
                Hallmarked & quality checked.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Truck className="text-neutral-700" />

            <div>
              <h4 className="font-medium">
                Free Shipping
              </h4>

              <p className="text-sm text-neutral-500">
                Secure delivery across India.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <RotateCcw className="text-neutral-700" />

            <div>
              <h4 className="font-medium">
                Easy Returns
              </h4>

              <p className="text-sm text-neutral-500">
                Hassle-free return policy.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}