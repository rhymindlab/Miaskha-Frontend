"use client";

import { useState } from "react";

import FilterPanel from "./filterpanel";

export default function Filters({

    onApply,

    products = [],

    collections = [],

    categories = [],

    searchParams,

    setSearchParams

}) {
    console.log("Filters Render");


    

    const [open, setOpen] = useState(false);

    /*
    Build filter data dynamically
    */

    const filterData = {

        collections:

            collections.map(item => item.slug),

        category:

            categories.map(item => item.slug)

    };

    return (

        <>

            {/* MOBILE BAR */}

            <div
                className="
                    flex
                    border
                    border-black
                    lg:hidden
                    w-full
                "
            >

                <button
                    className="
                        flex-1
                        py-2
                        hover:bg-black
                        hover:text-white
                    "
                >
                    Sort
                </button>

                <button

                    className="
                        flex-1
                        py-2
                        hover:bg-black
                        hover:text-white
                    "

                    onClick={() => setOpen(true)}

                >

                    Filter

                </button>

            </div>

            {/* DESKTOP */}

            <div className="hidden lg:block">

                <FilterPanel

                    sidebar={true}

                    onApply={onApply}

                    products={products}

                    forFilterData={filterData}

                    searchParams={searchParams}

                    setSearchParams={setSearchParams}

                />

            </div>

            {/* MOBILE */}

            <div className="lg:hidden">

                <FilterPanel

                    open={open}

                    setOpen={setOpen}

                    sidebar={false}

                    onApply={onApply}

                    products={products}

                    forFilterData={filterData}

                    searchParams={searchParams}

                    setSearchParams={setSearchParams}

                />

            </div>

        </>

    );

}