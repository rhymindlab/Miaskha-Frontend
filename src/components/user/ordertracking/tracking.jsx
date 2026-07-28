import { useEffect, useState } from "react";
import {
    ArrowLeft,
    PackageCheck,
} from "lucide-react";

import { getOrderTracking } from "../../../lib/order";

import TrackingHeader from "./trackingheader";
import TrackingTimeline from "./trackingtimeline";
import ShipmentInfo from "./shipmentinfo";

export default function Tracking({ order, goBack }) {

    const [currentOrder, setCurrentOrder] = useState(order);
    const [tracking, setTracking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!order?._id) return;

        let cancelled = false;

        async function fetchTracking() {

            try {

                setLoading(true);
                setError("");

                const data = await getOrderTracking(
                    order._id
                );

                if (cancelled) return;

                /* ==========================================
                   TRACKING TIMELINE
                ========================================== */

                setTracking(
                    Array.isArray(data?.tracking)
                        ? data.tracking
                        : []
                );

                /* ==========================================
                   UPDATE ORDER WITH LIVE DATA

                   Backend returns:
                   orderStatus
                   shiprocket
                ========================================== */

                setCurrentOrder((previousOrder) => ({
                    ...previousOrder,

                    orderStatus:
                        data?.orderStatus ||
                        previousOrder?.orderStatus,

                    shiprocket: {
                        ...(previousOrder?.shiprocket || {}),
                        ...(data?.shiprocket || {}),
                    },
                }));

            } catch (err) {

                console.error(
                    "Tracking fetch error:",
                    err
                );

                if (!cancelled) {
                    setError(
                        err?.message ||
                        "Unable to load tracking information."
                    );
                }

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }

        }

        fetchTracking();

        return () => {
            cancelled = true;
        };

    }, [order?._id]);

    /* ==========================================
       LOADING
    ========================================== */

    if (loading) {

        return (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 shadow-sm sm:rounded-3xl sm:p-14">

                <div className="flex flex-col items-center justify-center text-center">

                    <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-[#F8F5F2] sm:h-16 sm:w-16">

                        <PackageCheck
                            className="text-[#B88A44]"
                            size={26}
                        />

                    </div>

                    <h2 className="mt-5 font-serif text-xl text-[#181818] sm:text-2xl">
                        Tracking Your Jewellery
                    </h2>

                    <p className="mt-3 text-sm text-gray-500 sm:text-base">
                        Fetching the latest shipment updates...
                    </p>

                </div>

            </div>
        );
    }

    /* ==========================================
       PAGE
    ========================================== */

    return (
        <div className="space-y-5 sm:space-y-8">

            {/* ======================================
                BACK
            ====================================== */}

            <button
                type="button"
                onClick={goBack}
                className="
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#181818]
                    px-4
                    py-2.5
                    text-sm
                    transition-all
                    duration-300
                    hover:bg-[#181818]
                    hover:text-white
                    sm:gap-3
                    sm:px-6
                    sm:py-3
                    sm:text-base
                "
            >
                <ArrowLeft
                    size={18}
                    className="shrink-0"
                />

                Back to Order
            </button>

            {/* ======================================
                HERO
            ====================================== */}

            <div className="overflow-hidden rounded-2xl border border-[#ECE6DE] bg-[#F8F5F2] sm:rounded-3xl">

                <div className="h-1 bg-[#B88A44]" />

                <div className="p-5 sm:p-10">

                    <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#B88A44] sm:text-xs sm:tracking-[4px]">
                        MIASHKA
                    </p>

                    <h1 className="mt-3 font-serif text-3xl text-[#181818] sm:text-4xl">
                        Order Tracking
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                        Follow every stage of your jewellery's journey
                        from our workshop to your doorstep. We keep you
                        informed at every milestone.
                    </p>

                </div>

            </div>

            {/* ======================================
                ERROR
            ====================================== */}

            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:p-5">
                    {error}
                </div>
            )}

            {/* ======================================
                ORDER HEADER

                IMPORTANT:
                Use currentOrder, not original order.
            ====================================== */}

            <TrackingHeader
                order={currentOrder}
            />

            {/* ======================================
                SHIPMENT INFORMATION

                currentOrder now contains:
                currentOrder.shiprocket.courierName
                currentOrder.shiprocket.awbCode
                currentOrder.shiprocket.trackingUrl
                currentOrder.shiprocket.currentStatus
            ====================================== */}

            <ShipmentInfo
                order={currentOrder}
            />

            {/* ======================================
                TIMELINE
            ====================================== */}

            <div className="overflow-hidden rounded-2xl border border-[#ECE6DE] bg-white shadow-sm sm:rounded-3xl">

                <div className="border-b border-[#ECE6DE] px-5 py-5 sm:px-8 sm:py-6">

                    <h2 className="font-serif text-xl text-[#181818] sm:text-2xl">
                        Shipment Journey
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Latest updates from our delivery partner.
                    </p>

                </div>

                <div className="p-4 sm:p-8">

                    {tracking.length > 0 ? (

                        <TrackingTimeline
                            tracking={tracking}
                        />

                    ) : (

                        <div className="flex flex-col items-center py-10 text-center sm:py-14">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5F2] sm:h-20 sm:w-20">

                                <PackageCheck
                                    className="text-[#B88A44]"
                                    size={30}
                                />

                            </div>

                            <h3 className="mt-5 font-serif text-xl text-[#181818] sm:text-2xl">
                                Tracking Not Available
                            </h3>

                            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
                                Tracking updates will appear here once
                                the courier begins processing your shipment.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}