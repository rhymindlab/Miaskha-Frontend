"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../components/breadcrumbs";
import ProductClient from "../../../components/product-page/product-client";
import { getProductById } from "../../../lib/api";
// import { getProductById, getMetalRates } from "@/lib/api";


export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  // if (!id) return notFound();
  // // const product = await getProductById(id)
  // // const metalRates = await getMetalRates();
  useEffect(() => {
    async function fetchProduct(id) {
      try{
      const data = await getProductById(id);
      setProduct(data);
      }catch(error){

        console.log(error);

      }
      
    }
    fetchProduct(id);
  }, []);

  return (
    <>
      <div className="lg:pl-10 pl-[22px] py-2">
        <BreadCrumbs forBreadCrumbs={product} />
      </div>
      <ProductClient initialProduct={product} />
    </>
  );
}