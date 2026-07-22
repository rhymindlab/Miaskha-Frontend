import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import BreadCrumbs from "./breadcrumbs";
import Filters from "./Filter/filters";
import ProductGrid from "./ProductGrid/product-grid";

export default function AllProducts({
    initialProducts = [],
    collections = [],
    categories = [],
    metalData = [],
    forBreadCrumbs = []
}) {

    const [products, setProducts] = useState(initialProducts);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    return (
        <div className="w-full">

            {/* ---------------- MOBILE ---------------- */}

            <div className="block lg:hidden">

                <BreadCrumbs
                    forBreadCrumbs={forBreadCrumbs}
                />

                <Filters
                    onApply={setProducts}
                    products={products}
                    collections={collections}
                    categories={categories}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />

                <ProductGrid
                    products={products}
                    metalData={metalData}
                />

            </div>

            {/* ---------------- DESKTOP ---------------- */}

            <div className="hidden lg:flex h-screen overflow-hidden">

                <div className="w-72 border-r overflow-y-auto">

                    <Filters
                        onApply={setProducts}
                        products={products}
                        collections={collections}
                        categories={categories}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />

                </div>

                <div className="flex-1 overflow-y-auto">

                    <BreadCrumbs
                        forBreadCrumbs={forBreadCrumbs}
                    />

                    <ProductGrid
                        products={products}
                        metalData={metalData}
                    />

                </div>

            </div>

        </div>
    );
}