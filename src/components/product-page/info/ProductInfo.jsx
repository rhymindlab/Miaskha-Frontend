"use client";

import JewelleryInfo from "./Jewellery/JewelleryInfo";
import StoneInfo from "./stone/StoneInfo";
import BullionInfo from "./bullion/BullionInfo";
import OtherInfo from "./other/OtherInfo";

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

export default function ProductInfo(props) {
  const type = props.product?.productType;
  console.log(type);

  if (JEWELLERY_TYPES.includes(type)) {
    return <JewelleryInfo {...props} />;
  }

  if (STONE_TYPES.includes(type)) {
    return <StoneInfo {...props} />;
  }

  if (BULLION_TYPES.includes(type)) {
    return <BullionInfo {...props} />;
  }

  if (OTHER_TYPES.includes(type)) {
    return <OtherInfo {...props} />;
  }

  return <JewelleryInfo {...props} />;
}