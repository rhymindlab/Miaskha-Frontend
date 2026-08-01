import {
    Truck,
    Package,
    ExternalLink,
    ShieldCheck,
    Clock,
    Hash,
    ClipboardCheck,
    RefreshCcw,
} from "lucide-react";

export default function ShipmentInfo({ order }) {

    const shiprocket = order?.shiprocket || {};

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    };

    /* ===========================================
       Shipment not created yet
    =========================================== */

    if (!shiprocket.awbCode) {

        return (

            <div className="overflow-hidden rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

                <div className="h-1 bg-[#B88A44]" />

                <div className="p-8 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5F2]">

                        <Package
                            size={28}
                            className="text-[#B88A44]"
                        />

                    </div>

                    <h2 className="mt-6 font-serif text-2xl text-[#181818]">

                        Shipment Not Created

                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-500">

                        Your order has been received successfully.
                        Our jewellery experts are currently preparing
                        your order. Shipment details will appear here
                        automatically after dispatch.

                    </p>

                    {shiprocket.currentStatus && (

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F8F5F2] px-5 py-3 text-sm text-gray-700">

                            <Clock
                                size={17}
                                className="text-[#B88A44]"
                            />

                            {shiprocket.currentStatus}

                        </div>

                    )}

                    {shiprocket.lastSyncedAt && (

                        <div className="mt-5 flex justify-center">

                            <div className="inline-flex items-center gap-2 text-sm text-gray-500">

                                <RefreshCcw size={15} />

                                Last synced :

                                {formatDate(
                                    shiprocket.lastSyncedAt
                                )}

                            </div>

                        </div>

                    )}

                </div>

            </div>

        );

    }

    /* ===========================================
       Shipment Created
    =========================================== */

    return (

        <div className="overflow-hidden rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

            <div className="h-1 bg-[#B88A44]" />

            <div className="p-8">

                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                    <div>

                        <p className="text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">

                            Shipment

                        </p>

                        <h2 className="mt-3 font-serif text-3xl text-[#181818]">

                            Shipment Information

                        </h2>

                        <p className="mt-3 max-w-2xl leading-7 text-gray-500">

                            Your jewellery has been assigned to our
                            delivery partner. Below are the shipment
                            details and tracking information.

                        </p>

                    </div>

                    <div className="inline-flex h-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-3 text-sm font-medium text-green-700">

                        <ShieldCheck size={18} />

                        Secure Delivery

                    </div>

                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                                    {/* Courier */}

                <div className="rounded-3xl bg-[#F8F5F2] p-6">

                    <div className="mb-4 flex items-center gap-2 text-[#B88A44]">

                        <Truck size={18} />

                        <span className="font-semibold">
                            Courier Partner
                        </span>

                    </div>

                    <p className="text-lg font-semibold text-[#181818]">

                        {shiprocket.courierName || "Awaiting Courier"}

                    </p>

                </div>

                {/* AWB */}

                <div className="rounded-3xl bg-[#F8F5F2] p-6">

                    <div className="mb-4 flex items-center gap-2 text-[#B88A44]">

                        <Package size={18} />

                        <span className="font-semibold">
                            AWB Number
                        </span>

                    </div>

                    <p className="break-all text-lg font-semibold text-[#181818]">

                        {shiprocket.awbCode}

                    </p>

                </div>

                {/* Shipment ID */}

                <div className="rounded-3xl bg-[#F8F5F2] p-6">

                    <div className="mb-4 flex items-center gap-2 text-[#B88A44]">

                        <Hash size={18} />

                        <span className="font-semibold">

                            Shipment ID

                        </span>

                    </div>

                    <p className="break-all text-lg font-semibold text-[#181818]">

                        {shiprocket.shipmentId || "-"}

                    </p>

                </div>

                {/* Shiprocket Order */}

                <div className="rounded-3xl bg-[#F8F5F2] p-6">

                    <div className="mb-4 flex items-center gap-2 text-[#B88A44]">

                        <ClipboardCheck size={18} />

                        <span className="font-semibold">

                            Shiprocket Order

                        </span>

                    </div>

                    <p className="break-all text-lg font-semibold text-[#181818]">

                        {shiprocket.orderId || "-"}

                    </p>

                </div>

            </div>

            {/* Pickup Status */}

            <div className="mt-8 rounded-3xl border border-[#ECE6DE] p-6">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm text-gray-500">

                            Pickup Status

                        </p>

                        <p className="mt-2 font-semibold text-[#181818]">

                            {shiprocket.pickupRequested
                                ? "Pickup Requested"
                                : "Pickup Pending"}

                        </p>

                    </div>

                    <div
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            shiprocket.pickupRequested
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >

                        {shiprocket.pickupRequested
                            ? "Requested"
                            : "Pending"}

                    </div>

                </div>

            </div>
                        {/* Current Status */}

            {shiprocket.currentStatus && (

                <div className="mt-8 rounded-3xl border border-[#ECE6DE] p-6">

                    <div className="flex items-start gap-3">

                        <Clock
                            size={20}
                            className="mt-1 text-[#B88A44]"
                        />

                        <div className="flex-1">

                            <p className="text-sm text-gray-500">

                                Current Shipment Status

                            </p>

                            <h3 className="mt-2 text-xl font-semibold text-[#181818]">

                                {shiprocket.currentStatus}

                            </h3>

                        </div>

                    </div>

                </div>

            )}

            {/* Tracking Button */}

            {shiprocket.trackingUrl && (

                <div className="mt-8 flex flex-wrap gap-4">

                    <a
                        href={shiprocket.trackingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 rounded-full bg-[#181818] px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-[#B88A44] hover:shadow-lg"
                    >

                        <ExternalLink size={18} />

                        Track on Courier Website

                    </a>

                </div>

            )}

            {/* Last Sync */}

            {shiprocket.lastSyncedAt && (

                <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">

                    <RefreshCcw
                        size={16}
                        className="text-[#B88A44]"
                    />

                    Last synced:

                    <span className="font-medium">

                        {formatDate(
                            shiprocket.lastSyncedAt
                        )}

                    </span>

                </div>

            )}

        </div>

    </div>

);

}