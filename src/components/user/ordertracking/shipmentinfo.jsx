import {
    Truck,
    Package,
    ExternalLink,
    ShieldCheck,
    Clock,
} from "lucide-react";

export default function ShipmentInfo({ order }) {

    const shiprocket = order?.shiprocket;

    // Shipment/AWB has not been created yet
    if (!shiprocket?.awbCode) {
        return (
            <div className="overflow-hidden rounded-2xl border border-[#ECE6DE] bg-white shadow-sm sm:rounded-3xl">

                <div className="h-1 bg-[#B88A44]" />

                <div className="p-5 text-center sm:p-8">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F8F5F2] sm:h-16 sm:w-16">
                        <Package
                            size={26}
                            className="text-[#B88A44]"
                        />
                    </div>

                    <h2 className="mt-5 font-serif text-xl text-[#181818] sm:text-2xl">
                        Shipment Not Created
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
                        Your jewellery is currently being prepared by our team.
                        Tracking information will appear here once your shipment
                        has been assigned to our delivery partner.
                    </p>

                    {shiprocket?.currentStatus && (
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#F8F5F2] px-4 py-2 text-sm text-gray-600">
                            <Clock
                                size={16}
                                className="text-[#B88A44]"
                            />

                            {shiprocket.currentStatus}
                        </div>
                    )}

                </div>

            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ECE6DE] bg-white shadow-sm sm:rounded-3xl">

            {/* Gold Accent */}
            <div className="h-1 bg-[#B88A44]" />

            <div className="p-5 sm:p-8">

                {/* Header */}

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0 flex-1">

                        <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#B88A44] sm:text-xs sm:tracking-[4px]">
                            Shipment
                        </p>

                        <h2 className="mt-3 break-words font-serif text-2xl text-[#181818] sm:text-3xl">
                            Shipment Information
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
                            Your jewellery has been assigned to our trusted
                            delivery partner.
                        </p>

                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">

                        <ShieldCheck
                            size={18}
                            className="shrink-0"
                        />

                        <span>
                            Secure Delivery
                        </span>

                    </div>

                </div>

                {/* Shipment Info */}

                <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">

                    {/* Courier */}

                    <div className="min-w-0 rounded-2xl bg-[#F8F5F2] p-4 sm:p-6">

                        <div className="mb-3 flex items-center gap-2 text-[#B88A44]">

                            <Truck
                                size={18}
                                className="shrink-0"
                            />

                            <span className="font-semibold">
                                Courier Partner
                            </span>

                        </div>

                        <p className="break-words text-base font-medium text-[#181818] sm:text-lg">
                            {shiprocket.courierName || "Assigned Courier"}
                        </p>

                    </div>

                    {/* AWB */}

                    <div className="min-w-0 rounded-2xl bg-[#F8F5F2] p-4 sm:p-6">

                        <div className="mb-3 flex items-center gap-2 text-[#B88A44]">

                            <Package
                                size={18}
                                className="shrink-0"
                            />

                            <span className="font-semibold">
                                AWB Number
                            </span>

                        </div>

                        <p className="break-all text-sm font-medium text-[#181818] sm:text-lg">
                            {shiprocket.awbCode}
                        </p>

                    </div>

                </div>

                {/* Current Status */}

                {shiprocket.currentStatus && (
                    <div className="mt-4 rounded-2xl border border-[#ECE6DE] p-4 sm:mt-5 sm:p-6">

                        <div className="flex items-start gap-3">

                            <Clock
                                size={19}
                                className="mt-0.5 shrink-0 text-[#B88A44]"
                            />

                            <div className="min-w-0">

                                <p className="text-sm text-gray-500">
                                    Current Shipment Status
                                </p>

                                <p className="mt-1 break-words font-semibold text-[#181818]">
                                    {shiprocket.currentStatus}
                                </p>

                            </div>

                        </div>

                    </div>
                )}

                {/* Courier Tracking Link */}

                {shiprocket.trackingUrl && (
                    <div className="mt-6 sm:mt-8">

                        <a
                            href={shiprocket.trackingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#181818] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#B88A44] hover:shadow-lg sm:w-auto sm:text-base"
                        >
                            <ExternalLink
                                size={18}
                                className="shrink-0"
                            />

                            <span>
                                Track on Courier Website
                            </span>

                        </a>

                    </div>
                )}

            </div>

        </div>
    );
}