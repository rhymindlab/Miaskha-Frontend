"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Description({
    description = "",
    maxCharacters = 500,
}) {

    const [expanded, setExpanded] = useState(false);

    const plainDescription = useMemo(() => {
        if (!description) return "";
        return String(description).trim();
    }, [description]);

    const shouldCollapse =
        plainDescription.length > maxCharacters;

    const content =
        expanded || !shouldCollapse
            ? plainDescription
            : `${plainDescription.slice(0, maxCharacters)}...`;

    return (
        <section className="bg-white border border-neutral-200 shadow-sm p-6 lg:p-8">

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-semibold text-neutral-900">
                    Description
                </h2>

            </div>

            {plainDescription ? (

                <>
                    <div
                        className="
                            whitespace-pre-line
                            leading-8
                            text-neutral-600
                            text-[15px]
                        "
                    >
                        {content}
                    </div>

                    {shouldCollapse && (

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                font-medium
                                text-neutral-900
                                hover:text-black
                                transition-colors
                            "
                        >
                            {expanded ? "Read Less" : "Read More"}

                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                    expanded ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                    )}
                </>

            ) : (

                <p className="text-neutral-400">
                    No description available.
                </p>

            )}

        </section>
    );
}