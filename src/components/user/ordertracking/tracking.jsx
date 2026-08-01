import { useEffect, useState } from "react";
import {
    ArrowLeft,
    PackageCheck,
} from "lucide-react";

import { getOrderTracking } from "../../../lib/order";

import TrackingHeader from "./trackingheader";
import TrackingTimeline from "./trackingtimeline";
import ShipmentInfo from "./shipmentinfo";

export default function Tracking({
    order,
    goBack,
}) {

    const [currentOrder, setCurrentOrder] = useState(order);

    const [tracking, setTracking] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    async function loadTracking() {

        try {

            setLoading(true);

            setError("");

            const data =
                await getOrderTracking(
                    order._id
                );

            /* ============================
               Update Timeline
            ============================ */

            setTracking(
                Array.isArray(
                    data?.tracking
                )
                    ? data.tracking
                    : []
            );

            /* ============================
               Update Live Order
            ============================ */

            setCurrentOrder({

                ...order,

                ...data,

                shiprocket: {

                    ...(order.shiprocket || {}),

                    ...(data.shiprocket || {}),

                },

            });

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Unable to load tracking."
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        if (!order?._id) return;

        loadTracking();

        const interval =
            setInterval(
                loadTracking,
                30000
            );

        return () =>
            clearInterval(interval);

    }, [order]);

    /* ============================
       LOADING
    ============================ */

    if (loading) {

        return (

            <div className="rounded-3xl border border-[#ECE6DE] bg-white p-14">

                <div className="flex flex-col items-center">

                    <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-[#F8F5F2]">

                        <PackageCheck
                            size={28}
                            className="text-[#B88A44]"
                        />

                    </div>

                    <h2 className="mt-5 font-serif text-2xl">

                        Loading Tracking...

                    </h2>

                    <p className="mt-3 text-gray-500">

                        Please wait while we fetch
                        the latest shipment updates.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Back Button */}

            <button

                onClick={goBack}

                className="inline-flex items-center gap-3 rounded-full border border-[#181818] px-6 py-3 transition hover:bg-[#181818] hover:text-white"

            >

                <ArrowLeft size={18} />

                Back to Order

            </button>

            {/* Hero */}

            <div className="overflow-hidden rounded-3xl border border-[#ECE6DE] bg-[#F8F5F2]">

                <div className="h-1 bg-[#B88A44]" />

                <div className="p-8">

                    <p className="text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">

                        MIASHKA

                    </p>

                    <h1 className="mt-3 font-serif text-4xl">

                        Order Tracking

                    </h1>

                    <p className="mt-4 max-w-3xl text-gray-600">

                        Follow every stage of your
                        jewellery's journey from our
                        workshop to your doorstep.

                    </p>

                </div>

            </div>

                        {/* ============================
                ERROR
            ============================ */}

            {error && (

                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                    <p className="text-sm text-red-700">

                        {error}

                    </p>

                </div>

            )}

            {/* ============================
                ORDER HEADER
            ============================ */}

            <TrackingHeader
                order={currentOrder}
            />

            {/* ============================
                SHIPMENT INFORMATION
            ============================ */}

            <ShipmentInfo
                order={currentOrder}
            />

            {/* ============================
                QUICK STATUS CARDS
            ============================ */}

            <div className="grid gap-5 md:grid-cols-3">

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6">

                    <p className="text-xs uppercase tracking-[3px] text-[#B88A44]">

                        Current Status

                    </p>

                    <h3 className="mt-4 text-xl font-semibold text-[#181818]">

                        {currentOrder.orderStatus?.replaceAll("_", " ")}

                    </h3>

                </div>

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6">

                    <p className="text-xs uppercase tracking-[3px] text-[#B88A44]">

                        Courier

                    </p>

                    <h3 className="mt-4 text-xl font-semibold text-[#181818]">

                        {currentOrder.shiprocket?.courierName ||
                            "Awaiting Assignment"}

                    </h3>

                </div>

                <div className="rounded-3xl border border-[#ECE6DE] bg-white p-6">

                    <p className="text-xs uppercase tracking-[3px] text-[#B88A44]">

                        AWB Number

                    </p>

                    <h3 className="mt-4 break-all text-lg font-semibold text-[#181818]">

                        {currentOrder.shiprocket?.awbCode ||
                            "Not Generated"}

                    </h3>

                </div>

            </div>

            {/* ============================
                TIMELINE
            ============================ */}

            <div className="overflow-hidden rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

                <div className="border-b border-[#ECE6DE] px-8 py-6">

                    <h2 className="font-serif text-2xl text-[#181818]">

                        Shipment Journey

                    </h2>

                    <p className="mt-2 text-gray-500">

                        Every update from MIASHKA
                        and the courier partner
                        appears here.

                    </p>

                </div>

                <div className="p-8">
                                        {tracking.length > 0 ? (

                        <TrackingTimeline
                            tracking={tracking}
                        />

                    ) : (

                        <div className="flex flex-col items-center py-14 text-center">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F8F5F2]">

                                <PackageCheck
                                    size={32}
                                    className="text-[#B88A44]"
                                />

                            </div>

                            <h3 className="mt-6 font-serif text-2xl text-[#181818]">

                                Tracking Not Available Yet

                            </h3>

                            <p className="mt-3 max-w-lg text-gray-500 leading-7">

                                Your jewellery is currently being prepared.
                                Tracking updates will automatically appear
                                here once Shiprocket starts processing
                                your shipment.

                            </p>

                        </div>

                    )}

                </div>

            </div>

            {/* ============================
                LAST UPDATED
            ============================ */}

            {currentOrder.shiprocket?.lastSyncedAt && (

                <div className="text-center">

                    <p className="text-sm text-gray-500">

                        Last Updated :

                        {" "}

                        {new Date(
                            currentOrder.shiprocket.lastSyncedAt
                        ).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}

                    </p>

                </div>

            )}

        </div>

    );

}