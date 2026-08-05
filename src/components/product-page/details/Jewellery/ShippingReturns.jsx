"use client";

import {
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

const shippingItems = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping across India on eligible orders.",
  },
  {
    id: 2,
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free returns and exchanges where applicable.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Every product is carefully inspected before dispatch.",
  },
  {
    id: 4,
    icon: CreditCard,
    title: "Secure Payments",
    description: "100% secure payments with trusted payment gateways.",
  },
];

export default function ShippingReturns() {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">

      {/* Header */}
      <div className="border-b bg-neutral-50 px-6 py-4">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Shipping & Returns
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Everything you need to know before placing your order.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-5 p-6 md:grid-cols-2">

        {shippingItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                <Icon className="h-5 w-5 text-neutral-700" />
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}

      </div>

    </section>
  );
}