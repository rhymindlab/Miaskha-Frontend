import { MapPinned } from "lucide-react";
import TrackingStep from "./trackingstep";

export default function TrackingTimeline({ tracking = [] }) {
    // Show latest update first
    const sortedTracking = [...tracking].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE6DE] bg-white shadow-sm">

            {/* Header */}

            <div className="border-b border-[#ECE6DE] bg-[#F8F5F2] px-4 py-5 sm:px-8 sm:py-6">

                <div className="flex items-start gap-3 sm:items-center">

                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm sm:h-12 sm:w-12">

                        <MapPinned
                            size={20}
                            className="text-[#B88A44]"
                        />

                    </div>

                    <div className="min-w-0">

                        <h2 className="break-words font-serif text-xl text-[#181818] sm:text-2xl">
                            Shipment Journey
                        </h2>

                        <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
                            Track every milestone of your jewellery order.
                        </p>

                    </div>

                </div>

            </div>

            {/* Timeline */}

            <div className="p-4 sm:p-8">

                {sortedTracking.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-10 sm:py-14">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5F2] sm:h-20 sm:w-20">

                            <MapPinned
                                size={30}
                                className="text-[#B88A44]"
                            />

                        </div>

                        <h3 className="mt-5 text-center font-serif text-xl text-[#181818] sm:text-2xl">
                            No Tracking Updates Yet
                        </h3>

                        <p className="mt-3 max-w-md px-2 text-center text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
                            Your jewellery hasn't entered the courier
                            network yet. Tracking updates will
                            automatically appear here once your shipment
                            begins its journey.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {sortedTracking.map((step, index) => (

                            <TrackingStep
                                key={`${step.code || step.status}-${step.date || index}`}
                                step={step}
                                isLast={index === sortedTracking.length - 1}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}