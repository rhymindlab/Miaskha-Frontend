import React, { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileMenu from "./MobileMenu";

import ProductBar from "./ProductBar";

import useAuth from "../../hooks/useAuth";
import { checkLogin } from "../../lib/User";
import { getAllCategories, getAllCollections, getParentChildCategories } from "../../lib/api";

export default function Navbar() {
  const {loggedIn, setLoggedIn, user, setUser} = useAuth();
  const [parentCategory, setParentCategory] = useState();
  const [childCategory, setChildCategory] = useState();
  const [collection, setCollection] = useState();

  useEffect(() => {
    checkLogin(setLoggedIn, setUser);

    async function fetchData() {
        const [
            { parentCategories, childCategories },
            allCollections
        ] = await Promise.all([
            getParentChildCategories(),
            getAllCollections()
        ]);

        setParentCategory(parentCategories);
        setChildCategory(childCategories);
        setCollection(allCollections);
    }

    fetchData();
}, []);


  const [open, setOpen] = useState(false);

  return (

    <header className="bg-white border-b sticky top-0 z-50">

      <DesktopNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}/>

      <MobileNavbar setOpen={setOpen} />

      <MobileMenu
        open={open}
        setOpen={setOpen}
        categories={parentCategory}
        collections={collection}
      />

      <ProductBar
        parentCategories={parentCategory}
        childCategories={childCategory}
        collections={collection}
      />

    </header>

  );
}