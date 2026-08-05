import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BreadCrumbs from "../../../components/breadcrumbs";
import ProductRouter from "../../../components/product-page/ProductRouter";
import SEO from "../../../components/SEO/SEO";

import { getProductById } from "../../../lib/api";

export default function TestProductPage() {
  const [product, setProduct] = useState(null);
  console.log("test Page");

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const data = await getProductById(id);

        setProduct(data);

        console.log("Products on /test/id", data);
        console.log("Product:", data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const productUrl =
    `https://www.miashka.com/test/${product._id}`;

  return (
    <>
      <SEO
        title={product.title}
        description={product.description}
        image={product.images?.[0]}
        url={productUrl}
        canonical={productUrl}
        type="product"
      />

      <div className="lg:pl-10 pl-[22px] py-2">
        <BreadCrumbs forBreadCrumbs={product} />
      </div>

      <ProductRouter initialProduct={product} />
    </>
  );
}