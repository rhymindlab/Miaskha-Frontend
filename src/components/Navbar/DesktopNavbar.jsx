import React, { useState } from "react";
import logo from "../../assets/logo.png";
import CartIcon from "../cart/cartIcon";
// import WishlistIcon from "../wishlistIcon/WislistIcon";
import Login from "../login";
import LoggedInIcon from "../loggedInIcon";
import Signup from "../signUp";


export default function DesktopNavbar(loggedIn, setLoggedIn) { 
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  
  return (
    <div className="hidden lg:flex mx-auto max-w-6xl px-4 items-center justify-between h-19">
      <nav className="flex items-center justify-between w-full gap-4">

      <a href="/" className="flex items-center overflow-visible">
          <img
            src={logo}
            alt="MIASHKA Logo"
            className="h-30 w-auto object-contain scale-125"
          />
      </a>

        <div className="flex-1 flex items-center justify-center gap-8">

        <a href="/collections">
          COLLECTIONS
        </a>
        <a href="/jewellery">
          GIFTING
        </a>
        <a href="/journal">
          JOURNAL
        </a>
        <a href="/about">
          ABOUT
        </a>
        <a href="/contact">
          CONTACT
        </a>
        <a href="/jewellery">
          JEWELLERY
        </a>
        </div>

        {/* <WishlistIcon /> */}
        <CartIcon />
        
        <LoggedInIcon loggedIn={loggedIn} setShowLogin={setShowLogin}/>
        
        
        <Login showLogin={showLogin} setShowLogin={setShowLogin} setLoggedIn={setLoggedIn} setShowSignup={setShowSignup}  />
        <Signup showSignup={showSignup} setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
        
        

      </nav>
    </div>
  );
}