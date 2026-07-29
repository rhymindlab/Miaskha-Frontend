"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

export default function ProductGallery({ images = [] }) {
  const gallery = Array.isArray(images) ? images : [images];

  const [selected, setSelected] = useState(0);

  if (!gallery.length) {
    return (
      <div className="w-full aspect-square rounded-3xl bg-neutral-100 flex items-center justify-center text-neutral-400">
        No Image
      </div>
    );
  }

  const next = () =>
    setSelected((prev) => (prev + 1) % gallery.length);

  const previous = () =>
    setSelected((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );

  return (
    <div className="w-full">

      <div className="flex gap-5">

        {/* Thumbnails */}

        <div className="hidden lg:flex flex-col gap-4">

          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`w-20 h-20 rounded-2xl overflow-hidden border transition-all duration-300
                ${
                  selected === index
                    ? "border-black shadow-lg"
                    : "border-gray-200 hover:border-gray-400"
                }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}

        <div className="relative flex-1">

          <div className="overflow-hidden bg-[#f8f8f8] h-[420px] md:h-[520px] lg:h-full lg:aspect-square">

            <img
                src={gallery[selected]}
                alt=""
                className="
                    w-full
                    h-full
                    lg:h-full
                    object-contain
                    transition-all
                    duration-500
                "
            />

          </div>

          {/* Expand */}

          <button
            className="absolute top-5 right-5 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
          >
            <Expand size={18} />
          </button>

          {/* Prev */}

          {gallery.length > 1 && (
            <button
              onClick={previous}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
            >
              <ChevronLeft />
            </button>
          )}

          {/* Next */}

          {gallery.length > 1 && (
            <button
              onClick={next}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition"
            >
              <ChevronRight />
            </button>
          )}

        </div>

      </div>

      {/* Mobile thumbnails */}

      <div className="lg:hidden flex gap-3 mt-4 overflow-x-auto">

        {gallery.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border ${
              selected === index
                ? "border-black"
                : "border-gray-200"
            }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}