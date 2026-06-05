import React, {useEffect, useState } from "react";

import { getAllProducts, getMetalRates } from "../../lib/api";
import AllProducts from "../../components/allProducts";

export default function JewelleryPage() {

  const [products, setProducts] = useState([]);
  const [metalData, setMetalData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

  async function loadData() {

    try {

      const [productsData, metalRatesData] = await Promise.all([
        getAllProducts(),
      
        getMetalRates()
      ]);
      console.log(productsData)

      setProducts(productsData);
      setMetalData(metalRatesData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  loadData();

  }, []);

  
  

  if (loading) {

    return (
      <div className="py-6">
        Loading products...
      </div>
    );

  }

  return (
    <AllProducts initialProducts={products} metalData={metalData} />
  );

}