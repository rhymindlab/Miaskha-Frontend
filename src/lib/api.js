const BASE_URL =
    import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

async function doFetch(path) {

    const url = `${BASE_URL.replace(/\/$/, "")}${path}`;

    const res = await fetch(url);

    if (!res.ok) {

        throw new Error(`Failed to fetch: ${url}`);

    }

    return await res.json();

}

export async function fetchAllProductsCategoryCollectionsMetalRates() {

    const [

        products,

        collections,

        categories,

        metalRates

    ] = await Promise.all([

        doFetch("/product"),

        doFetch("/collection"),

        doFetch("/category"),

        doFetch("/metal")

    ]);

    return {

        products,

        collections,

        categories,

        metalRates

    };

}


export async function fetchFilterData() {

    const [

        collections,

        categories,

        metalRates

    ] = await Promise.all([

        doFetch("/collection"),

        doFetch("/category"),

        doFetch("/metal")

    ]);

    return {

        collections,

        categories,

        metalRates

    };

}

export async function getFilteredProducts(filters = {}) {

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {

        if (

            value === undefined ||

            value === null ||

            value === ""

        ) {

            return;

        }

        if (Array.isArray(value)) {

            value.forEach(item => {

                params.append(key, item);

            });

        }

        else {

            params.append(key, value);

        }

    });

    const query = params.toString();

    return doFetch(

        `/product${query ? `?${query}` : ""}`

    );

}

export async function getAllProducts() {
  const { products } = await fetchAllProductsCategoryCollectionsMetalRates();
  return products && products.length ? products : [];
}

export async function getAllCollections() {
  const { collections } = await fetchAllProductsCategoryCollectionsMetalRates();
  return collections && collections.length ? collections : [];
}

export async function getAllCategories() {
  const { categories } = await fetchAllProductsCategoryCollectionsMetalRates();
  return categories && categories.length ? categories : [];
}
export async function getCategoryById(id){
  const categories = await getAllCategories();
  const category = categories?.find(c => c._id === id);
  return category;
}
export async function getParentChildCategories() {
  const categories = await getAllCategories();
  const parentCategories = categories?.filter(c => c.parentCategory === null);
  const childCategories = categories?.filter(c => c.parentCategory !== null);
  return {parentCategories, childCategories}
}



export async function getProductById(id){
  const products = await getAllProducts();
  const product = products?.find(product => product._id === id);
  return product;

}

export async function getMetalRates() {
  const {metalRates} = await fetchAllProductsCategoryCollectionsMetalRates();
  return metalRates;
  
}

export async function  getProductsByCategory(category){
  const allProducts = await getAllProducts();
  const products = allProducts.filter(product => product.category === category);
  return products;
}


