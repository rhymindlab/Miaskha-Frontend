"use client";

import ProductGallery from "../gallery/ProductGallery";
import ProductInfo from "../info/ProductInfo";
import ProductDetails from "../details/ProductDetails";

export default function Other({
  product,
  pricing,
  formData,
  setFormData,
  loggedIn,
  user,
  onAddToCart,
}) {
    
  return (
    <main className="bg-white">

      {/* Hero */}

      <section className="max-w-10xl mx-auto px-5 lg:px-8 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.7fr] gap-12 items-start">

          <ProductGallery
            images={product.images}
          />

          <ProductInfo
            product={product}
            pricing={pricing}
            formData={formData}
            setFormData={setFormData}
            loggedIn={loggedIn}
            user={user}
            onAddToCart={onAddToCart}
            productTemplate="stone"
          />

        </div>

      </section>

      {/* Details */}

      <section className="border-t mx-10">

        <ProductDetails
          product={product}
          pricing={pricing}
          productTemplate="stone"
        />

      </section>

    </main>
  );
}