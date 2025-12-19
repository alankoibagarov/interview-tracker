import React from "react";
import { formatDate } from "../helpers/date";
import type { TimelineItem } from "../services/interviewsApi";

type TimelineProps = {
  items: TimelineItem[];
  reverse?: boolean;
  activeIndex?: number;
  className?: string;
};

function Timeline({
  items,
  reverse = false,
  activeIndex,
  className = "",
}: Readonly<TimelineProps>) {
  const ordered = React.useMemo(
    () => (reverse ? [...items].reverse() : items),
    [items, reverse]
  );

  const mapDisplayedToOriginal = (displayedIndex: number) =>
    reverse ? items.length - 1 - displayedIndex : displayedIndex;

  return (
    <div className={`relative flex flex-col gap-4 ${className}`}>
      <div className="self-center text-sm text-[#444]">Start</div>
      {ordered.map((it, idx) => {
        const origIndex = mapDisplayedToOriginal(idx);
        const isActive =
          typeof activeIndex === "number" && activeIndex === origIndex;

        const dotBaseClasses =
          "w-3 h-3 rounded-full border-[3px] border-white ring-4 ring-[#f0f0f0] inline-block";

        const dotActiveClasses = "bg-[#2563EB] ring-[rgba(37,99,235,0.15)]";
        const dotInactiveClasses = "bg-[#bbb]";

        return (
          <div
            key={it.id ?? idx}
            className={`flex items-start gap-4 relative ${
              idx % 2 === 0 ? "" : "flex-row-reverse"
            } ${idx + 1 !== ordered.length && "min-h-[4rem]"}`}
          >
            <div className="bg-white p-0 rounded-md flex-1">
              <div
                className={`flex justify-between text-[11px] text-[#444] leading-[1.4] ${
                  idx % 2 === 0 ? "text-right" : "text-left"
                }  ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}
              >
                <div>{formatDate(it.date)}</div>
                <div>{it.content}</div>
              </div>
            </div>

            <div
              className={`flex flex-col justify-center items-start pt-0.5 ${
                idx + 1 !== ordered.length && "min-h-[4rem]"
              }`}
            >
              <div className="flex flex-col grow items-center gap-4">
                {it.icon ? (
                  <div>
                    <span className="inline-flex items-center">{it.icon}</span>
                  </div>
                ) : (
                  <div className="flex flex-col grow items-center gap-4">
                    <span
                      aria-hidden
                      className={`${dotBaseClasses} ${
                        isActive ? dotActiveClasses : dotInactiveClasses
                      }`}
                    />
                    {idx + 1 !== ordered.length && (
                      <span className="border border-[#bbb]  w-[2px] flex flex-grow"></span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-0 rounded-md flex-1" />
          </div>
        );
      })}
      <div className="self-center text-sm text-[#444]">End</div>
    </div>
  );
}

export default React.memo(Timeline);
