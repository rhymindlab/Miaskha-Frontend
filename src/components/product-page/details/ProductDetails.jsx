"use client";

import JewelleryDetails from "./jewellery/JewelleryDetails";
import StoneDetails from "./stone/StoneDetails";
import BullionDetails from "./bullion/BullionDetails";
import OtherDetails from "./other/OtherDetails";

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

export default function ProductDetails(props) {
  const type = props.product?.productType;
  console.log(type);

  if (JEWELLERY_TYPES.includes(type)) {
    return <JewelleryDetails {...props} />;
  }

  if (STONE_TYPES.includes(type)) {
    return <StoneDetails {...props} />;
  }

  if (BULLION_TYPES.includes(type)) {
    return <BullionDetails {...props} />;
  }

  if (OTHER_TYPES.includes(type)) {
      return <OtherDetails {...props} />;
  }

  return <JewelleryDetails {...props} />;
}