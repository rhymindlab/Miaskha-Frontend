"use client";

import AccordionItem from "./AccordionItem";

export default function Accordion({
  items = [],
  allowMultiple = false,
}) {
  return (
    <div className="divide-y divide-neutral-200 rounded-3xl border border-neutral-200 bg-white overflow-hidden">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          allowMultiple={allowMultiple}
        />
      ))}
    </div>
  );
}