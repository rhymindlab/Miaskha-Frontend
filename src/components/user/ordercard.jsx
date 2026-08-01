import {
    Eye,
    Truck,
    CalendarDays,
    Receipt,
    CreditCard,
} from "lucide-react";

export default function OrderCard({
    order,
    setView,
    setSelectedOrder,
}) {

    const statusColor = {
        PLACED: "bg-orange-100 text-orange-700",
        CONFIRMED: "bg-blue-100 text-blue-700",
        PACKED: "bg-indigo-100 text-indigo-700",
        SHIPPED: "bg-sky-100 text-sky-700",
        OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700",
        DELIVERED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
        RETURNED: "bg-gray-100 text-gray-700",
    };

    const paymentColor = {
        SUCCESS: "bg-green-100 text-green-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        FAILED: "bg-red-100 text-red-700",
        REFUNDED: "bg-gray-200 text-gray-700",
    };

    return (

        <div className="group overflow-hidden rounded-3xl border border-[#ECE6DE] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="h-1 w-full bg-[#B88A44]" />

            <div className="p-6 lg:p-8">

                <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

                    {/* LEFT */}

                    <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-xl font-semibold text-[#181818]">

                                Order #{order.orderNumber}

                            </h2>

                            <span
                                className={`rounded-full px-4 py-1 text-xs font-semibold ${
                                    statusColor[order.orderStatus] ||
                                    "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {order.orderStatus.replaceAll("_", " ")}
                            </span>

                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">

                            <div className="flex items-center gap-3">

                                <div className="rounded-full bg-[#F8F5F2] p-3">

                                    <CalendarDays
                                        size={18}
                                        className="text-[#B88A44]"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">
                                        Order Date
                                    </p>

                                    <p className="font-medium">

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="rounded-full bg-[#F8F5F2] p-3">

                                    <Receipt
                                        size={18}
                                        className="text-[#B88A44]"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">

                                        Amount

                                    </p>

                                    <p className="text-lg font-bold text-[#181818]">

                                        ₹{Number(order.amount).toLocaleString("en-IN")}

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="rounded-full bg-[#F8F5F2] p-3">

                                    <CreditCard
                                        size={18}
                                        className="text-[#B88A44]"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">

                                        Payment

                                    </p>

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                            paymentColor[
                                                order.paymentStatus
                                            ] ||
                                            "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {order.paymentStatus}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                        <button
                            onClick={() => {
                                setSelectedOrder(order);
                                setView("details");
                            }}
                            className="flex items-center justify-center gap-2 rounded-full border border-[#181818] px-6 py-3 font-medium transition hover:bg-[#181818] hover:text-white"
                        >

                            <Eye size={18} />

                            View Details

                        </button>

                        {order.paymentStatus === "SUCCESS" && (

                            <button
                                onClick={() => {
                                    setSelectedOrder(order);
                                    setView("tracking");
                                }}
                                className="flex items-center justify-center gap-2 rounded-full bg-[#181818] px-6 py-3 font-medium text-white transition hover:bg-[#B88A44]"
                            >

                                <Truck size={18} />

                                Track Order

                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}