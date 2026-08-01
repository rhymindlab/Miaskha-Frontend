import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Package,
    CreditCard,
    MapPin,
    CalendarDays,
    Receipt,
    Truck,
} from "lucide-react";

import { getOrder } from "../../lib/order";
import useAuth from "../../hooks/useAuth";

export default function OrderDetails({
    selectedOrder,
    goBack,
    track,
    refreshOrders,
}) {
    const {user} = useAuth();
    console.log(user);

    const [order, setOrder] = useState(selectedOrder);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!selectedOrder?._id) return;

        async function loadOrder() {

            try {

                const res = await getOrder(
                    selectedOrder._id
                );
                setOrder(res.order);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        }

        loadOrder();

    }, [selectedOrder]);

    if (loading) {

        return (

            <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#ECE6DE] border-t-[#B88A44]" />

                    <p className="mt-4 text-gray-500">

                        Loading order...

                    </p>

                </div>

            </div>

        );

    }

    const paymentColor = {

        SUCCESS:
            "bg-green-100 text-green-700",

        PENDING:
            "bg-yellow-100 text-yellow-700",

        FAILED:
            "bg-red-100 text-red-700",

        REFUNDED:
            "bg-gray-100 text-gray-700",

    };

    const statusColor = {

        PLACED:
            "bg-orange-100 text-orange-700",

        CONFIRMED:
            "bg-blue-100 text-blue-700",

        PACKED:
            "bg-indigo-100 text-indigo-700",

        SHIPPED:
            "bg-sky-100 text-sky-700",

        OUT_FOR_DELIVERY:
            "bg-purple-100 text-purple-700",

        DELIVERED:
            "bg-green-100 text-green-700",

        CANCELLED:
            "bg-red-100 text-red-700",

        RETURNED:
            "bg-gray-200 text-gray-700",

    };

    return (

        <div className="space-y-8">

            {/* BACK */}

            <button

                onClick={goBack}

                className="inline-flex items-center gap-3 rounded-full border border-[#181818] px-6 py-3 transition hover:bg-[#181818] hover:text-white"

            >

                <ArrowLeft size={18} />

                Back

            </button>

            {/* HERO */}

            <div className="overflow-hidden rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2]">

                <div className="h-1 bg-[#B88A44]" />

                <div className="p-8">

                    <p className="text-xs uppercase tracking-[4px] text-[#B88A44] font-semibold">

                        MIASHKA

                    </p>

                    <h1 className="mt-3 font-serif text-4xl">

                        Order Details

                    </h1>

                    <p className="mt-4 text-gray-600">

                        Complete information about your jewellery purchase.

                    </p>

                </div>

            </div>

            {/* SUMMARY */}

            <div className="grid gap-5 lg:grid-cols-4">

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6">

                    <div className="flex items-center gap-3">

                        <Receipt
                            className="text-[#B88A44]"
                            size={20}
                        />

                        <span className="text-gray-500">

                            Order

                        </span>

                    </div>

                    <p className="mt-4 font-semibold text-lg">

                        {order.orderNumber}

                    </p>

                </div>

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6">

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            className="text-[#B88A44]"
                            size={20}
                        />

                        <span className="text-gray-500">

                            Date

                        </span>

                    </div>

                    <p className="mt-4 font-semibold">

                        {new Date(
                            order.createdAt
                        ).toLocaleDateString(
                            "en-IN"
                        )}

                    </p>

                </div>

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6">

                    <div className="flex items-center gap-3">

                        <CreditCard
                            className="text-[#B88A44]"
                            size={20}
                        />

                        <span className="text-gray-500">

                            Payment

                        </span>

                    </div>

                    <div
                        className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                            paymentColor[
                                order.paymentStatus
                            ]
                        }`}
                    >

                        {order.paymentStatus}

                    </div>

                </div>

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6">

                    <div className="flex items-center gap-3">

                        <Truck
                            className="text-[#B88A44]"
                            size={20}
                        />

                        <span className="text-gray-500">

                            Status

                        </span>

                    </div>

                    <div
                        className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                            statusColor[
                                order.orderStatus
                            ]
                        }`}
                    >

                        {order.orderStatus.replaceAll(
                            "_",
                            " "
                        )}

                    </div>

                </div>

            </div>
                        {/* ==============================
                PRODUCTS
            ============================== */}

            <div className="rounded-3xl border border-[#ECE6DE] bg-white overflow-hidden">

                <div className="border-b border-[#ECE6DE] px-8 py-6">

                    <h2 className="font-serif text-2xl text-[#181818]">

                        Ordered Products

                    </h2>

                </div>

                <div className="divide-y divide-[#ECE6DE]">

                    {order.items?.map((item) => (

                        <div
                            key={item.product?._id || item.product}
                            className="flex flex-col gap-6 p-6 lg:flex-row"
                        >

                            <img
                                src={item.image || "/placeholder.png"}
                                alt={item.title}
                                className="h-28 w-28 rounded-2xl object-cover border border-[#ECE6DE]"
                            />

                            <div className="flex-1">

                                <h3 className="text-lg font-semibold">

                                    {item.title}

                                </h3>

                                <p className="mt-2 text-gray-500">

                                    SKU : {item.sku}

                                </p>

                                <div className="mt-4 flex flex-wrap gap-6">

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            Quantity

                                        </p>

                                        <p className="font-semibold">

                                            {item.quantity}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            Price

                                        </p>

                                        <p className="font-semibold">

                                            ₹{Number(item.price).toLocaleString("en-IN")}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            GST

                                        </p>

                                        <p className="font-semibold">

                                            ₹{Number(item.gst).toLocaleString("en-IN")}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            Total

                                        </p>

                                        <p className="font-bold">

                                            ₹{Number(item.total).toLocaleString("en-IN")}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* ==============================
                ADDRESSES
            ============================== */}

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-8">

                    <div className="flex items-center gap-3">

                        <MapPin
                            size={20}
                            className="text-[#B88A44]"
                        />

                        <h2 className="font-serif text-2xl">

                            Shipping Address

                        </h2>

                    </div>

                    <div className="mt-6 space-y-2">

                        <p>

                            <strong>

                                {order.shippingAddress.firstName}{" "}
                                {order.shippingAddress.lastName}

                            </strong>

                        </p>

                        <p>

                            {order.shippingAddress.address}

                        </p>

                        <p>

                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}

                        </p>

                        <p>

                            {order.shippingAddress.country} -{" "}
                            {order.shippingAddress.pinCode}

                        </p>

                        <p>

                            {order.shippingAddress.mobile}

                        </p>

                    </div>

                </div>

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-8">

                    <div className="flex items-center gap-3">

                        <CreditCard
                            size={20}
                            className="text-[#B88A44]"
                        />

                        <h2 className="font-serif text-2xl">

                            Payment Summary

                        </h2>

                    </div>

                    <div className="mt-6 space-y-4">

                        <div className="flex justify-between">

                            <span>

                                Subtotal

                            </span>

                            <strong>

                                ₹{Number(order.subtotal).toLocaleString("en-IN")}

                            </strong>

                        </div>

                        <div className="flex justify-between">

                            <span>

                                GST

                            </span>

                            <strong>

                                ₹{Number(order.gstTotal).toLocaleString("en-IN")}

                            </strong>

                        </div>

                        <div className="flex justify-between">

                            <span>

                                Shipping

                            </span>

                            <strong>

                                ₹{Number(order.shippingCharge).toLocaleString("en-IN")}

                            </strong>

                        </div>

                        <div className="flex justify-between">

                            <span>

                                Discount

                            </span>

                            <strong>

                                ₹{Number(order.discount).toLocaleString("en-IN")}

                            </strong>

                        </div>

                        <div className="border-t pt-4 flex justify-between text-lg font-bold">

                            <span>

                                Grand Total

                            </span>

                            <span>

                                ₹{Number(order.amount).toLocaleString("en-IN")}

                            </span>

                        </div>

                    </div>

                </div>

            </div>
                        {/* ==================================
                CUSTOMER INFORMATION
            ================================== */}

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-8">

                    <h2 className="font-serif text-2xl text-[#181818]">

                        Customer

                    </h2>

                    <div className="mt-6 space-y-3">

                        <div className="flex justify-between">

                            <span className="text-gray-500">

                                Name

                            </span>

                            <strong>

                                {order.customerName ||
                                    `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}

                            </strong>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">

                                Email

                            </span>

                            <strong>

                                {order.customerEmail || user.email}

                            </strong>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">

                                Phone

                            </span>

                            <strong>

                                {order.customerPhone ||
                                    order.shippingAddress.mobile}

                            </strong>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-gray-500">

                                Payment Method

                            </span>

                            <strong>

                                {order.paymentMethod}

                            </strong>

                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-8">

                    <h2 className="font-serif text-2xl text-[#181818]">

                        Notes

                    </h2>

                    <p className="mt-6 leading-7 text-gray-600">

                        {order.notes
                            ? order.notes
                            : "No additional notes for this order."}

                    </p>

                </div>

            </div>

            {/* ==================================
                ACTION BUTTONS
            ================================== */}

            <div className="flex flex-wrap justify-end gap-4">

                {order.paymentStatus === "SUCCESS" && (

                    <button

                        onClick={track}

                        className="flex items-center gap-3 rounded-full bg-[#181818] px-8 py-4 font-medium text-white transition hover:bg-[#B88A44]"

                    >

                        <Truck size={18} />

                        Track Order

                    </button>

                )}

                <button

                    onClick={goBack}

                    className="rounded-full border border-[#181818] px-8 py-4 transition hover:bg-[#181818] hover:text-white"

                >

                    Back

                </button>

            </div>

        </div>

    );

}