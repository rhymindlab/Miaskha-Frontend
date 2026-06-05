// components/Filter/filters.jsx

"use client";

import { useState } from "react";

import FilterPanel from "./filterpanel";
// import CategoryFilterPanel from "./categroyfilter";
import { useParams } from "react-router-dom";

export default function Filters({onApply, products = [], forFilter= [], searchParams, setSearchParams}) {

  const [open, setOpen] = useState(false);
  const { slug } = useParams();

  return (

    <>

      {/* MOBILE BAR */}

      <div className="
        flex
        border
        border-black
        lg:hidden
        w-full
      ">

        <button
          className="
            flex-1
            py-2
            hover:bg-black
            hover:text-white
            transition-all
          "
        >
          Sort
        </button>

        <button className=" flex-1 py-2 hover:bg-black hover:text-white transition-all"

          onClick={() => setOpen(true)}
        >
          Filter
        </button>

      </div>

      {/* DESKTOP */}

      <div className=" hidden lg:block w-full ">

        <FilterPanel sidebar={true} onApply={onApply} intialproducts={products} forFilterData={forFilter} searchParams={searchParams} setSearchParams={setSearchParams}/>
        {/* <CategoryFilterPanel filter={forFilter} /> */}

      </div>

      {/* MOBILE */}

      <div className="lg:hidden">

        {/* <FilterPanel open={open} setOpen={setOpen} onApply={onApply} intialproducts={products} forFilterData={forFilter} /> */}

      </div>

    </>

  );
}