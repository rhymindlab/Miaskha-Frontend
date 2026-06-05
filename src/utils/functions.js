export const normalizeMetal = (material) => {

  if (!material) return "";

  const lower = material.toLowerCase();

  if (lower.includes("gold")) {
    return "Gold";
  }

  if (lower.includes("silver")) {
    return "Silver";
  }

  if (lower.includes("platinum")) {
    return "Platinum";
  }

  return material;

};




export function pricedetails(formData, metalData, product){
  const selectedMaterialNotNormalize = formData?.Material || product?.metalType;

  const selectedMaterial = normalizeMetal(formData?.Material || product?.metalType);

  const selectedPurity = formData?.["Gold Purity"] || product?.purity;

  const metalRate = metalData?.find(item =>

    item.metalType === selectedMaterial &&
    item.purity === selectedPurity

  );
  const metalPrice = product?.metalWeight*metalRate?.amount || 0;
  const stonePrice = Number(product?.stonePrice?.[0]) || 0;
  const makingCharges = product.makingCharges || 0;
  
  const gst = Math.round(0.03*(metalPrice+stonePrice) + 0.5*makingCharges) || 0;

  const total = metalPrice+ stonePrice + makingCharges + gst || 0;
  return {selectedMaterialNotNormalize, selectedMaterial, selectedPurity, metalPrice, stonePrice, makingCharges, gst, total}
}