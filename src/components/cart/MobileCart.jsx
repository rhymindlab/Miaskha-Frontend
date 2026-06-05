// components/cart/cart-item.jsx

"use client";

import {
  handleDelete,
  handleMinus,
  handlePlus,
} from "../../utils/cart-functions";

export default function MobileCartItem({
  product,
  index,
  cart,
  setCart,
  loggedIn,
  user
}) {

  return (
    <div className="lg:hidden flex flex-col text-sm sm:text-base md:text-lg transition-all">
      <div className="border border-gray-200 mb-2 ">

        <div className="mb-2 flex flex-row gap-2  ">

          <div className="w-1/3">
            <img
                className="w-full aspect-square overflow-hidden"
                src={product.images?.[0] || product.images}
                alt="Product"
            />
          </div>

          <div className="flex-1">

            <div className="w-full flex flex-col">

              <span className="text-xl sm:text-2xl md:text-3xl">{product.name}</span>

              <div>
                <span className="mr-2 ">Product Id:</span>
                <span>{product.id}</span>
              </div>

              <div className="flex-1 flex gap-2 text-xl sm:text-2xl md:text-3xl mt-3 md:mt-5 sm:mt-5">

                ₹{((Number(product.price) || 0) *(product.quantity ?? 1)).toLocaleString()}

              </div>

            </div>

          </div> 

        </div>

        <div className="flex border-t-0 pt-0">

          <div className="flex bg-gray-200 py-1 px-2 items-center">Base Metal</div>

          <div className="flex-1 flex items-center justify-center ">{product.baseMetal}</div>

          <div className="w-[140.7px] flex gap-2 ">

            <button onClick={() => handlePlus(cart, setCart, index, loggeIn, user)} className="p-2 px-5 flex-1 bg-gray-200 active:scale-80 duration-200 transition-all">+</button>

            <div className="flex items-center px-2">{product.quantity ?? 1}</div>

            <button onClick={() => handleMinus(cart, setCart, index, loggeIn, user)} className="p-2 px-5 flex-1 bg-gray-200 active:scale-80 duration-200 transition-all">-</button>

          </div>

        </div> 

      </div>

      <div className="flex my-2 border-y border-gray-200">

        <button onClick={() => handleDelete(cart, setCart, index, loggedIn, user)}
          className="w-[100px] border-r border-gray-200 py-2">Remove</button>

        <button className="pl-2 text-sm flex-1 sm:text-base md:text-lg flex items-center justify-center">
          Add to WishList
          <span className="text-[10px] sm:text-xs md:text-sm pl-1">(Need to Login)</span>
        </button>

      </div>

      <div className="flex bg-gray-200 p-4 border border-gray-400 my-2 justify-center items-center">

        <span className="flex-1 text-center  ">

          30-Day Returnable

        </span>

        <span className="flex-1 text-center">

          Free & Insured Delivery

        </span>

      </div>

    </div>
  );
}