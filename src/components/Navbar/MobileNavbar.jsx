import React from "react";
import CartIcon from "../cart/cartIcon";
// import WishlistIcon from "../wishlistIcon/WislistIcon";


export default function MobileNavbar({ setOpen }) {
  return (

    <div className="lg:hidden">

      <div className="flex items-center justify-between p-4 border-b">

        <a
          href="/"
          className="text-xl font-bold flex-1"
        >
          Zivaara
        </a>
        <div className="w-22 flex justify-center gap-4">
          {/* <WishlistIcon /> */}
          <CartIcon />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1"
        >

          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>

        </button>

      </div>

    </div>

  );
}