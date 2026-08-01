import {
    Clock3,
    BadgeCheck,
    Package,
    Truck,
    Bike,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const statusConfig = {
    PLACED: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock3,
        label: "Order Placed",
    },

    PENDING: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock3,
        label: "Pending",
    },

    CONFIRMED: {
        color: "bg-sky-50 text-sky-700 border-sky-200",
        icon: BadgeCheck,
        label: "Confirmed",
    },

    PACKED: {
        color: "bg-indigo-50 text-indigo-700 border-indigo-200",
        icon: Package,
        label: "Packed",
    },

    SHIPPED: {
        color: "bg-violet-50 text-violet-700 border-violet-200",
        icon: Truck,
        label: "Shipped",
    },

    IN_TRANSIT: {
        color: "bg-violet-50 text-violet-700 border-violet-200",
        icon: Truck,
        label: "In Transit",
    },

    OUT_FOR_DELIVERY: {
        color: "bg-orange-50 text-orange-700 border-orange-200",
        icon: Bike,
        label: "Out for Delivery",
    },

    DELIVERED: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
        label: "Delivered",
    },

    CANCELLED: {
        color: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
        label: "Cancelled",
    },

    RETURNED: {
        color: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
        label: "Returned",
    },

    FAILED: {
        color: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
        label: "Failed",
    },
};

export default function TrackingStatus({ status = "" }) {

    const key = status
        .toUpperCase()
        .replace(/\s+/g, "_");

    const current =
        statusConfig[key] || {
            color:
                "bg-gray-50 text-gray-700 border-gray-200",
            icon: Clock3,
            label: status || "Unknown",
        };

    const Icon = current.icon;

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold ${current.color}`}
        >
            <Icon size={16} />

            {current.label}
        </span>
    );
}