import React, { useState } from 'react'
import { handleAddToCart } from '../../utils/cart-functions';
import wishlist from '../../assets/wishlist.png';
import { pricedetails } from '../../utils/functions';
import useAuth from '../../hooks/useAuth';

function ProductCard({ product , metalData}) {
  const [formData, setFormData] = useState();

  const {loggedIn, user} = useAuth();

    const {selectedMaterialNotNormalize, selectedPurity, metalPrice, stonePrice, makingCharges, gst, total} = pricedetails(formData, metalData, product);
  

  const img = product?.images[0] || "";
  const name = product?.title || "";
  const price = total != null ? `${product.currency === "INR"? '₹':'₹'}${Number(total).toLocaleString()}` : ''

  return (
    <div className="relative w-full bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
    <a href={`/jewellery/${product?._id}`} className="block">

      <img src={img} alt={name} className="w-full aspect-square object-cover" />
      

      <div className="px-5 p-2 ">
        <span className="text-black block min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap  ">{name}</span>

        <div className="flex items-center gap-3 mt-5">
          <span className="text-xl font-bold text-black">{price}</span>
        </div>
      </div>
    </a>

    <button className="absolute top-2 left-2 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 active:scale-85 transition-all">
      <img className='w-4 aspect-square' src={wishlist} alt='wishlist' />
    </button>
    
      <div className=" px-5 py-2">
        <button className=" w-full py-3 rounded-2xl tracking-wide bg-gray-400 hover:bg-gray-300 active:scale-80 duration-200 transition-all" onClick={()=>handleAddToCart(product, selectedMaterialNotNormalize, selectedPurity, metalPrice, stonePrice, makingCharges, gst, total, loggedIn, user)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;