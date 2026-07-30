import { useParams } from "react-router-dom";
import { getProductsByCollection } from "../../../utils/filter";
import JewelleryClient from "../../../components/Jewellery/jewellery-client";
import { handleCollectionFilterData } from "../../../lib/collection";
import { useEffect, useState } from "react";
import AllProducts from "../../../components/allProducts";

export default function CollectionSlug(){
    const [products, setProducts] = useState();
    const { slug } = useParams();
    console.log(slug);
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await handleCollectionFilterData(slug);

            console.log(data);
            setProducts(data.products);
        };

        if (slug) {
            fetchProducts();
        }
    }, [slug]);
    return (
        <>
        <AllProducts initialProducts={products} />
        </>
    )
}