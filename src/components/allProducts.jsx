// components/Jewellery/jewellery-client.jsx

"use client";

import {useState} from "react";

import ProductGrid from "./ProductGrid/product-grid";

import BreadCrumbs from "./breadcrumbs";


export default function AllProducts({ initialProducts = [], metalData= [], forBreadCrumbs=[]}) {

  const [products, setProducts] = useState(initialProducts);

  return (

    <div className="w-full">

      {/* DESKTOP */}

      <div className=" hidden lg:block h-screen overflow-hidden">

        {/* PRODUCTS */}

        <div className=" w-full h-full overflow-y-auto p-2 ">

          <div className="p-2"> <BreadCrumbs forBreadCrumbs={forBreadCrumbs} /> </div>

          <ProductGrid products={products} metalData={metalData}/>

        </div>

      </div>

      {/* MOBILE */}

      <div className=" lg:hidden p-5 ">

        <div className="p-2"> <BreadCrumbs forBreadCrumbs={forBreadCrumbs}/> </div>

        <ProductGrid products={products} metalData={metalData}/>

      </div>

    </div>

  );
}