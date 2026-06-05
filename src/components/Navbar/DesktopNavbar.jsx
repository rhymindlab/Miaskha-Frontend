import React, { useState } from "react";
import CartIcon from "../cart/cartIcon";
// import WishlistIcon from "../wishlistIcon/WislistIcon";
import Login from "../login";
import LoggedInIcon from "../loggedInIcon";
import Signup from "../signUp";


export default function DesktopNavbar(loggedIn, setLoggedIn) { 
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  
  return (
    <div className="hidden lg:flex mx-auto max-w-6xl px-4 items-center justify-between h-16">

      <a href="/" className="text-lg font-semibold text-gray-900">
        Miashka Diamonds
      </a>

      <nav className="flex items-center gap-4">

        <a href="/jewellery">
          Jewellery
        </a>

        {/* <WishlistIcon /> */}
        <CartIcon />
        
        <LoggedInIcon loggedIn={loggedIn} setShowLogin={setShowLogin}/>
        
        
        <Login showLogin={showLogin} setShowLogin={setShowLogin} setLoggedIn={setLoggedIn} setShowSignup={setShowSignup}  />
        <Signup showSignup={showSignup} setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
        
        

      </nav>
    </div>
  );
}