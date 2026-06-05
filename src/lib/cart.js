export async function handlefetchCart(user) {
    const base = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";
    async function doFetch(path,) {
        
        const url = `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
        
        const id = user?._id;

        const res = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },  
                credentials: "include",
                body: JSON.stringify({
                    id,    
                })
            }
         );

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${url}`);
        }
        return await res.json();
    }

    const carts = await doFetch(`/cart/id`);

    return carts

}

export async function handleMergeCart(user ,carts) {
    const base = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";
    async function doFetch(path,) {
        
        const url = `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
        const id = user?._id;
        const res = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },  
                credentials: "include",
                body: JSON.stringify({
                    id,
                    carts

                })
            }
         );

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${url}`);
        }
        return res.json();
    }

    const cart = await doFetch(`/cart/merge`);

    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("cartUpdated"));


}