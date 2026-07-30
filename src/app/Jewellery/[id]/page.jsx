"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/breadcrumbs";
import ProductClient from "../../../components/product-page/product-client";
import { getProductById } from "../../../lib/api";
import SEO from "../../../components/SEO/SEO";

// import { getProductById, getMetalRates } from "@/lib/api";


export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
        console.log('Products',data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <SEO
      title={product.title}
      description={product.description}
      image={product.images?.[0]}
      url={`www.miashka.com/jewellery/${product._id}`}
      type="product"
    />
      <div className="lg:pl-10 pl-[22px] py-2">
        <BreadCrumbs forBreadCrumbs={product} />
      </div>
      <ProductClient initialProduct={product} />
    </>
  );
}