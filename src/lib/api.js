export async function fetchAllProductsCategoryCollectionsMetalRates() {
    const base = import.meta.env.BACKEND_API_URL || "http://localhost:8000";
    async function doFetch(path) {
        
        const url = `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
        
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${url}`);
        }
        return await res.json();
    }

    const [products, collections, categories, metalRates] = await Promise.all([doFetch(`/product`), doFetch(`/collection`), doFetch(`/category`), doFetch(`/metal`)]);

    return await {products, collections, categories, metalRates}

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