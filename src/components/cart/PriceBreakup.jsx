import { useEffect, useState } from "react";

export default function PriceBreakup({ cart = [], user }) {
  const [subtotal, setSubtotal] = useState(0);
  const [gstTotal, setGstTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const st = cart.reduce((acc, item) => {
      const quantity = item.quantity ?? 1;
      const price = Number(item.salePrice) || 0;
      return acc + price * quantity;
    }, 0);

    const gst = cart.reduce((acc, item) => {
      const quantity = item.quantity ?? 1;
      return acc + (Number(item.gst) || 0) * quantity;
    }, 0);

    setSubtotal(st);
    setGstTotal(gst);
    setTotal(st + gst);
  }, [cart]);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!cart.length) {
      alert("Your cart is empty");
      return;
    }

    const shippingAddress = {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      company: user?.company || "",
      country: user?.country || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      pinCode: user?.pinCode || "",
      mobile: user?.mobile || "",
    };

    if (!shippingAddress.firstName || !shippingAddress.mobile) {
      alert("Please save your shipping address and mobile number first.");
      return;
    }

    setPaying(true);

    try {
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error("Razorpay Checkout could not be loaded");
      }

      const base =
        import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

      // Assumes: app.use("/api/payment", paymentRoutes)
      const createOrderResponse = await fetch(
        `${base}/payment/create-order`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shippingAddress }),
        }
      );

      const paymentOrder = await createOrderResponse.json();

      if (!createOrderResponse.ok || !paymentOrder.success) {
        throw new Error(paymentOrder.message || "Unable to create order");
      }

      const razorpay = new window.Razorpay({
        key: paymentOrder.key,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        order_id: paymentOrder.orderId,

        name: "Your Store",
        description: "Order payment",

        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`.trim(),
          contact: shippingAddress.mobile,
          email: user?.email || "",
        },

        theme: {
          color: "#000000",
        },

        handler: async (response) => {
          const verifyResponse = await fetch(`${base}/payment/verify`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              dbOrderId: paymentOrder.dbOrderId,
            }),
          });

          const verifiedPayment = await verifyResponse.json();

          if (!verifyResponse.ok || !verifiedPayment.success) {
            alert(
              verifiedPayment.message ||
                "Payment was received but verification failed."
            );
            return;
          }

          alert("Payment successful");
          window.location.href = "/";
        },

        modal: {
          ondismiss: async () => {
            await fetch(`${base}/payment/failed`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                dbOrderId: paymentOrder.dbOrderId,
              }),
            });
          },
        },
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Unable to start payment");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold mb-2">Order Summary</div>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span>GST</span>
        <span>₹{gstTotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-between font-bold mt-2">
        <span>Total</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      <button
        disabled={!cart.length || paying}
        onClick={handlePayment}
        className="m-2 p-4 bg-gray-400 hover:bg-gray-200 disabled:opacity-50"
      >
        {paying ? "Opening payment..." : "Place Order"}
      </button>
    </div>
  );
}