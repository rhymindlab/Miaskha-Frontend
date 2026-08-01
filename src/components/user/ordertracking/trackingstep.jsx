import {
    MapPin,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Truck,
    Package,
    XCircle,
} from "lucide-react";

export default function TrackingStep({ step, isLast }) {

    const formattedDate = step?.date
        ? new Date(step.date).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    const status = (step.status || "").toLowerCase();

    let Icon = Package;
    let circleClass =
        "bg-[#B88A44] border-[#F8F5F2]";
    let badgeClass =
        "bg-[#F8F5F2] text-[#B88A44]";

    if (
        status.includes("delivered")
    ) {
        Icon = CheckCircle2;

        circleClass =
            "bg-green-600 border-green-100";

        badgeClass =
            "bg-green-100 text-green-700";
    }

    else if (
        status.includes("shipped") ||
        status.includes("dispatch") ||
        status.includes("out for delivery")
    ) {
        Icon = Truck;

        circleClass =
            "bg-blue-600 border-blue-100";

        badgeClass =
            "bg-blue-100 text-blue-700";
    }

    else if (
        status.includes("cancel")
    ) {
        Icon = XCircle;

        circleClass =
            "bg-red-600 border-red-100";

        badgeClass =
            "bg-red-100 text-red-700";
    }

    else if (
        status.includes("pending") ||
        status.includes("processing") ||
        status.includes("confirmed")
    ) {
        Icon = Clock3;

        circleClass =
            "bg-orange-500 border-orange-100";

        badgeClass =
            "bg-orange-100 text-orange-700";
    }

    return (

        <div className="flex gap-5">

            {/* Timeline */}

            <div className="flex flex-col items-center flex-shrink-0">

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-4 shadow-md ${circleClass}`}
                >

                    <Icon
                        size={22}
                        className="text-white"
                    />

                </div>

                {!isLast && (

                    <div className="mt-2 w-[2px] flex-1 min-h-16 bg-[#E7D6B8]" />

                )}

            </div>

            {/* Card */}

            <div className="flex-1 rounded-3xl border border-[#ECE6DE] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

                    <div className="flex-1">

                        <span
                            className={`inline-flex rounded-full px-4 py-1 text-xs font-semibold ${badgeClass}`}
                        >
                            {step.status}
                        </span>

                        {step.location && (

                            <div className="mt-4 flex items-center gap-2 text-gray-600">

                                <MapPin
                                    size={16}
                                    className="text-[#B88A44]"
                                />

                                <span>

                                    {step.location}

                                </span>

                            </div>

                        )}

                    </div>

                    {formattedDate && (

                        <div className="inline-flex h-fit items-center gap-2 rounded-full bg-[#F8F5F2] px-4 py-2 text-sm text-gray-600">

                            <CalendarDays
                                size={16}
                                className="text-[#B88A44]"
                            />

                            {formattedDate}

                        </div>

                    )}

                </div>

                {step.message && (

                    <div className="mt-5 rounded-2xl bg-[#F8F5F2] p-4">

                        <p className="leading-7 text-gray-700">

                            {step.message}

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}