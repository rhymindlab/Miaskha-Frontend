export async function handleCollectionFilterData(slug) {
  const base = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

  const url = `${base}/collection/${slug}`;

  const response = await fetch(url);

  return await response.json();
}