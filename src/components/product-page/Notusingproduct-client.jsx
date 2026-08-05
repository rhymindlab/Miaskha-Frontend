// "use client";

// import { useEffect, useMemo, useState } from "react";

// import useAuth from "../../hooks/useAuth";

// import { getMetalRates } from "../../lib/api";
// import { pricedetails } from "../../utils/functions";
// import { handleAddToCart } from "../../utils/cart-functions";

// import ProductGallery from "./gallery/ProductGallery";
// import ProductInfo from "./info/ProductInfo";
// import ProductDetails from "./details/ProductDetails";

// export default function ProductClient({ initialProduct }) {
//   const product = initialProduct;

//   const { loggedIn, user } = useAuth();

//   const [formData, setFormData] = useState({});
//   const [metalData, setMetalData] = useState([]);

//   /*
//   ==========================
//   Default customization
//   ==========================
//   */

//   useEffect(() => {
//     if (!product) return;

//     const defaults = {};

//     product.customizationFields?.forEach((field) => {
//       if (
//         field.type === "select" &&
//         field.options?.length &&
//         !field.dependsOn?.field
//       ) {
//         defaults[field.name] = field.options[0];
//       }
//     });

//     setFormData((prev) => ({
//       ...defaults,
//       ...prev,
//     }));
//   }, [product]);

//   /*
//   ==========================
//   Load metal rates
//   ==========================
//   */

//   useEffect(() => {
//     async function loadRates() {
//       try {
//         const rates = await getMetalRates();
//         setMetalData(rates);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     loadRates();
//   }, []);

//   /*
//   ==========================
//   Pricing
//   ==========================
//   */

//   const pricing = useMemo(() => {
//     return pricedetails(
//       formData,
//       metalData,
//       product
//     );
//   }, [formData, metalData, product]);

//   /*
//   ==========================
//   Missing Product
//   ==========================
//   */

//   if (!product) {
//     return (
//       <div className="py-32 text-center text-gray-500">
//         Product not found.
//       </div>
//     );
//   }

//   /*
//   ==========================
//   Layout
//   ==========================
//   */

//   return (
//     <main className="bg-white">

//       {/* Hero */}

//       <section className="max-w-10xl mx-auto px-5 lg:px-8 py-12">

//         <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-12 items-start">

//           <ProductGallery
//             images={product.images}
//           />

//           <ProductInfo
//             product={product}
//             pricing={pricing}
//             formData={formData}
//             setFormData={setFormData}
//             loggedIn={loggedIn}
//             user={user}
//             onAddToCart={handleAddToCart}
//           />

//         </div>

//       </section>

//       {/* Details */}

//       <section className="border-t mx-10">

//         <ProductDetails
//           product={product}
//           pricing={pricing}
//         />

//       </section>

//     </main>
//   );
// }