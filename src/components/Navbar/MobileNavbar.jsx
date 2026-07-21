import React from "react";
import logo from "../../assets/logo.png";
import CartIcon from "../cart/cartIcon";
// import WishListIcon from "../wishlistIcon/WishlistIcon";

export default function MobileNavbar({ setOpen }) {
  return (
    <div className="lg:hidden border-b">
      <div className="flex items-center justify-between px-4 h-16">

        {/* Logo */}
        <a href="/" className="flex items-center flex-1 overflow-visible">
          <img
            src={logo}
            alt="MIASHKA Logo"
            className="h-20 w-auto object-contain scale-125 origin-left"
          />
        </a>

        {/* Cart */}
        <div className="flex items-center gap-4">
          <CartIcon />
          {/* <WishListIcon /> */}

          <button
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1"
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>
        </div>
        </div>

    </div>
  );
}
