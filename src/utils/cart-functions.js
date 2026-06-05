import { handlefetchCart, handleMergeCart } from "../lib/cart";

export async function updateCart(updatedCart, setCart ,user, loggedIn) {

  setCart([...updatedCart]);

  if(!loggedIn){
    console.log(loggedIn)

    localStorage.setItem("cart", JSON.stringify(updatedCart)  );

    window.dispatchEvent(new Event("cartUpdated"));
  } else{

    await handleMergeCart(user,updatedCart);

    window.dispatchEvent(new Event("cartUpdated"));
  }
  
}

export function handleDelete(cart, setCart, indexToDelete, loggedIn, user) {

  const updatedCart = cart.filter((_, index) => index !== indexToDelete);

  updateCart(updatedCart, setCart, user, loggedIn);

}

export function handlePlus(cart, setCart, indexToPlus, loggedIn, user) {

  const updatedCart = cart.map((item, index) => {

    if (index === indexToPlus) {

      return {
        ...item,
        quantity: (item.quantity || 1) + 1,
      };

    }

    return item;

  });

  updateCart(updatedCart, setCart, user, loggedIn);

}

export function handleMinus(cart, setCart, indexToMinus, loggedIn, user) {
  

  const updatedCart = cart.map((item, index) => {

    if (index === indexToMinus) {

      return {
        ...item,
        quantity: Math.max(
          1,
          (item.quantity || 1) - 1
        ),
      };

    }

    return item;

  });

  updateCart(updatedCart, setCart, user, loggedIn);

}


function mergeCarts(backendCart, guestCart, user) {
  const merged = [...backendCart];
  const id = user._id
  guestCart?.forEach((guestItem) => {
    const existing = merged.find(
      
      (item) =>(
        
        item?.product_id === guestItem?.product_id &&
      item.customizations?.Material ===
      guestItem.customizations?.Material &&
      item.customizations?.Purity ===
      guestItem.customizations?.Purity
      )
    );
    
    if (existing) {
      existing.quantity += guestItem.quantity;
    } else {
      merged.push({...guestItem, user_id: id});
    }
  });

  return merged;
}

export async function handleAddToCart(product, selectedMaterialNotNormalize, selectedPurity, metalPrice, stonePrice, makingCharges, gst, finalPrice, loggedIn, user) {

  if(!loggedIn){
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
        (item) => item.product_id === product._id &&
        item.customizations?.Material === selectedMaterialNotNormalize &&
        item.customizations?.Purity === selectedPurity
      );

    

    let updatedCart;

    if (existingProduct) {

      updatedCart = existingCart.map((item) => {

      if (item.product_id === product._id &&
          item.customizations?.Material === selectedMaterialNotNormalize &&
          item.customizations?.Purity === selectedPurity) {

        return {
          ...item,
          quantity: (item.quantity || 1) + 1
        };

      }

      return item;

      });

    } else {

      updatedCart = [
        ...existingCart,
        {
          product_id: product._id,
          name: product.name,
          image: product.images[0],
          quantity: 1, 
          customizations: {
            Material: selectedMaterialNotNormalize,
            Purity: selectedPurity, 
          },
          salePrice:metalPrice+stonePrice+makingCharges,
          gst:gst,
        }
      ];

    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  }
  else{
    const backendCart = await handlefetchCart(user);
    console.log(backendCart);

    const existingProduct = backendCart.find((item) => item.product_id === product._id &&
        item.customizations?.Material === selectedMaterialNotNormalize &&
        item.customizations?.Purity === selectedPurity
      );
    
    let updatedCart;

    if (existingProduct) {

      updatedCart = backendCart.map((item) => {

      if (item.product_id === product._id &&
          item.customizations?.Material === selectedMaterialNotNormalize &&
          item.customizations?.Purity === selectedPurity) {

        return {
          ...item,
          quantity: (item.quantity || 1) + 1
        };

      }

      return item;

      });

    } else {

      updatedCart = [
        ...backendCart,
        {
          product_id: product._id,
          name: product.name,
          image: product.images[0],
          quantity: 1, 
          customizations: {
            Material: selectedMaterialNotNormalize,
            Purity: selectedPurity, 
          },
          salePrice:metalPrice+stonePrice+makingCharges,
          gst:gst,
        }
      ];

    }
    await handleMergeCart(user,updatedCart);

    window.dispatchEvent(new Event("cartUpdated"));
    
    
  }
}

export async function afterLoginSync(user){
  const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

  const backendCart = await handlefetchCart(user);

  
  const updatedCart = mergeCarts(backendCart, guestCart,user);
  
  await handleMergeCart(user,updatedCart);
}






