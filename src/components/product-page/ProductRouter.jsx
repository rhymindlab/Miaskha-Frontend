"use client";

import { useEffect, useMemo, useState } from "react";

import useAuth from "../../hooks/useAuth";

import { getMetalRates } from "../../lib/api";
import { pricedetails } from "../../utils/functions";
import { handleAddToCart } from "../../utils/cart-functions";

import Jewellery from "./productTempletes/Jewellery";
import Stone from "./productTempletes/Stone";
import Bullion from "./productTempletes/Bullion";
import Other from "./productTempletes/Other";

const JEWELLERY_TYPES = [
  "Ring",
  "Pendant",
  "Chain",
  "Necklace",
  "Bracelet",
  "Bangle",
  "Earrings",
  "Mangalsutra",
  "Nose Pin",
  "Anklet",
];

const STONE_TYPES = [
  "Loose Diamond",
  "Gemstone",
];

const BULLION_TYPES = [
  "Coin",
  "Gold Coin",
  "Silver Coin",
  "Platinum Coin",
];

const OTHER_TYPES = [
  "Other",
];


export default function ProductRouter({ initialProduct }) {
  const product = initialProduct;

  const { loggedIn, user } = useAuth();

  const [formData, setFormData] = useState({});
  const [metalData, setMetalData] = useState([]);

  /*
  ==========================
  Default customization
  ==========================
  */

  useEffect(() => {
    if (!product) return;

    const defaults = {};

    product.customizationFields?.forEach((field) => {
      if (
        field.type === "select" &&
        field.options?.length &&
        !field.dependsOn?.field
      ) {
        defaults[field.name] = field.options[0];
      }
    });

    setFormData((prev) => ({
      ...defaults,
      ...prev,
    }));
  }, [product]);

  /*
  ==========================
  Load metal rates
  ==========================
  */

  useEffect(() => {
    async function loadRates() {
      try {
        const rates = await getMetalRates();
        setMetalData(rates);
      } catch (error) {
        console.error(error);
      }
    }

    loadRates();
  }, []);

  /*
  ==========================
  Pricing
  ==========================
  */

  const pricing = useMemo(() => {
    return pricedetails(
      formData,
      metalData,
      product
    );
  }, [formData, metalData, product]);

  /*
  ==========================
  Missing Product
  ==========================
  */

  if (!product) {
    return (
      <div className="py-32 text-center text-gray-500">
        Product not found.
      </div>
    );
  }

  /*
  ==========================
  Common Props
  ==========================
  */

  const commonProps = {
    product,
    pricing,
    formData,
    setFormData,
    loggedIn,
    user,
    onAddToCart: handleAddToCart,
  };

  /*
  ==========================
  Render Template
  ==========================
  */

  if (JEWELLERY_TYPES.includes(product.productType)) {
    return <Jewellery {...commonProps} />;
  }

  if (STONE_TYPES.includes(product.productType)) {
    return <Stone {...commonProps} />;
  }

  if (BULLION_TYPES.includes(product.productType)) {
    return <Bullion {...commonProps} />;
  }
  if (OTHER_TYPES.includes(product.productType)) {
    return <Other {...commonProps} />;
  }

  // Default Template
  return <Jewellery {...commonProps} />;
}