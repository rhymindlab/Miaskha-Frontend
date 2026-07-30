import React, { useEffect, useState } from "react";

import {
  fetchAllProductsCategoryCollectionsMetalRates,
} from "../../lib/api";

import AllProducts from "../../components/allProducts";
import SEO from "../../components/SEO/SEO";

export default function JewelleryPage() {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [metalData, setMetalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const {
          products,
          collections,
          categories,
          metalRates,
        } = await fetchAllProductsCategoryCollectionsMetalRates();

        setProducts(products.products);
        setCollections(collections);
        setCategories(categories);
        setMetalData(metalRates);
      } catch (err) {
        console.error("Failed to load jewellery:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <SEO
        title="Diamond & Gold Jewellery"
        description="Explore Miashka's collection of diamond and gold jewellery, including rings, earrings, necklaces, bracelets and more."
        url="https://www.miashka.com/jewellery"
        type="website"
      />

      <main>
        <h1 className="sr-only">
          Diamond & Gold Jewellery
        </h1>

        {loading ? (
          <div className="py-10 text-center">
            Loading Products...
          </div>
        ) : (
          <AllProducts
            initialProducts={products}
            collections={collections}
            categories={categories}
            metalData={metalData}
          />
        )}
      </main>
    </>
  );
}