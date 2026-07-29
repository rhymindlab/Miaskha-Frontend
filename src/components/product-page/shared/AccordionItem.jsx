"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordionItem({
  item,
}) {
  const [open, setOpen] = useState(item.defaultOpen || false);

  return (
    <div>

      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          items-center
          justify-between
          px-6
          py-5
          text-left
          hover:bg-neutral-50
          transition
        "
      >
        <span className="font-medium text-lg">
          {item.title}
        </span>

        <ChevronDown
          className={`
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
          size={22}
        />
      </button>

      <div
        className={`
          grid
          transition-all
          duration-300
          ${
            open
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-neutral-600 leading-8">
            {item.content}
          </div>
        </div>
      </div>

    </div>
  );
}