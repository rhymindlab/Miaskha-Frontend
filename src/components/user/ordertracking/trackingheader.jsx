import {
    CalendarDays,
    PackageCheck,
    Truck,
    Hash,
    CreditCard,
} from "lucide-react";

import TrackingStatus from "./trackingstatus";

export default function TrackingHeader({ order }) {

    const formattedDate = order?.createdAt
        ? new Date(order.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    return (

        <div className="overflow-hidden rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

            {/* Gold Strip */}

            <div className="h-1 bg-[#B88A44]" />

            <div className="p-6 lg:p-8">

                <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

                    {/* Left */}

                    <div className="flex-1">

                        <p className="text-xs font-semibold uppercase tracking-[4px] text-[#B88A44]">
                            MIASHKA
                        </p>

                        <h1 className="mt-3 break-words font-serif text-3xl text-[#181818]">

                            Order #{order.orderNumber}

                        </h1>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">

                            <div className="flex items-center gap-3">

                                <CalendarDays
                                    size={18}
                                    className="text-[#B88A44]"
                                />

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">

                                        Ordered On

                                    </p>

                                    <p className="font-medium">

                                        {formattedDate}

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <Hash
                                    size={18}
                                    className="text-[#B88A44]"
                                />

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">

                                        Order Number

                                    </p>

                                    <p className="font-medium break-all">

                                        {order.orderNumber}

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <Truck
                                    size={18}
                                    className="text-[#B88A44]"
                                />

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">

                                        Courier

                                    </p>

                                    <p className="font-medium">

                                        {order.shiprocket?.courierName ||
                                            "Awaiting Assignment"}

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <PackageCheck
                                    size={18}
                                    className="text-[#B88A44]"
                                />

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-gray-500">

                                        AWB Number

                                    </p>

                                    <p className="font-medium break-all">

                                        {order.shiprocket?.awbCode ||
                                            "Not Generated"}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="flex flex-col gap-5 lg:items-end">

                        <TrackingStatus
                            status={order.orderStatus}
                        />

                        <div className="flex items-center gap-3 rounded-full border border-[#ECE6DE] bg-[#F8F5F2] px-5 py-3">

                            <CreditCard
                                size={18}
                                className="text-[#B88A44]"
                            />

                            <div>

                                <p className="text-xs uppercase tracking-wide text-gray-500">

                                    Payment

                                </p>

                                <p className="font-semibold text-[#181818]">

                                    {order.paymentStatus}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}