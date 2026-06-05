"use client";

import { useEffect, useState } from "react";
import ImageSection from "./ProductImageLeft";
import ProductDetails from "./product-detail";
import { handleAddToCart } from "../../utils/cart-functions";
import CustomizationFields from "../customization-fields";
import { getMetalRates } from "../../lib/api";
import  PriceBreakup  from "../price-breakup";
import { pricedetails } from "../../utils/functions";
import useAuth from "../../hooks/useAuth";


export default function ProductClient({ initialProduct }) {

  const {loggedIn,user} = useAuth();
  
  const product = initialProduct;
  const [formData, setFormData] = useState({});
  
  useEffect(() => {

    if (!product) return;

  const defaults = {};

  product.customizationFields?.forEach(field => {

    // only top-level fields
    if (
      !field.dependsOn?.field &&
      field.type === "select" &&
      field.options?.length
    ) {

      defaults[field.name] =
        field.options[0];
    }

  });

  setFormData(prev => ({
    ...defaults,
    ...prev
  }));

  }, [product]);

  const [metalData, setMetalData] = useState([]);
  useEffect(() => {
  
      async function fetchMetalRates() {
  
        try {
  
          const data = await getMetalRates();
  
          setMetalData(data);
  
  
        } catch (error) {
  
          console.log(error);
  
        }
  
      }
  
      fetchMetalRates();
  
  }, []);

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  const {selectedMaterialNotNormalize, selectedPurity, metalPrice, stonePrice, makingCharges, gst, total} = pricedetails(formData, metalData, product);
  



  // PRICE DISPLAY
  const priceDisplay = product?.price != null ? `${"₹ "}${Number(product.price).toFixed(2)}`
      : "";


  return (
    <div className=" pt-0 pb-5">
      <div className="w-full lg:flex lg:items-start">

        {/* LEFT SIDE (IMAGES) */}
        <ImageSection img={product.images} />

        {/* RIGHT SIDE */}
        <div className="lg:w-1/2 w-full px-4 sm:px-6 lg:pr-16 mt-10 lg:mt-0 lg:py-12">
          <span>Sku: {product.sku}</span>

          <h1 className="text-4xl mb-2">
            {product.title }
          </h1>

          <p className="text-2xl text-stone-700 mb-6">
            {priceDisplay}
          </p>
          <p className="text-gray-600 mb-2 border-b-1 p-2">
            {product.shortDescription}
          </p>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">
              Customization Options
            </h3>

            {/* SPLIT COMPONENT */}
            <CustomizationFields product={product} formData={formData} setFormData={setFormData}/>

          
               
            <button
              onClick={()=>(handleAddToCart(product, selectedMaterialNotNormalize, selectedPurity, metalPrice, stonePrice, makingCharges, gst, total, loggedIn, user))}

              className="w-full hover:opacity-70 transition-all duration-300
              active:scale-95 active:bg-gray-800 bg-black text-white py-3 mt-4"
            >
              Add to Cart
            </button>
            </div>
          

        </div>
      </div>
      <div className="p-10 w-2/3">
        
        <ProductDetails formData={formData} metalData={metalData} product={product}/>
        
        
      </div>
    </div>
  );
}

