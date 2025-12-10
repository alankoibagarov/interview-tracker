import React from "react";

type TimelineItem = {
  id?: string | number;
  title?: string;
  content: React.ReactNode;
  date?: string;
  icon?: React.ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  reverse?: boolean;
  activeIndex?: number;
  onItemClick?: (item: TimelineItem, index: number) => void;
  showDates?: boolean;
  className?: string;
};

function Timeline({
  items,
  reverse = false,
  activeIndex,
  onItemClick,
  showDates = true,
  className = "",
}: Readonly<TimelineProps>) {
  const ordered = React.useMemo(
    () => (reverse ? [...items].reverse() : items),
    [items, reverse]
  );

  const mapDisplayedToOriginal = (displayedIndex: number) =>
    reverse ? items.length - 1 - displayedIndex : displayedIndex;



  return (
    <div className={`relative flex flex-col ${className}`}>
      {ordered.map((it, idx) => {
        const origIndex = mapDisplayedToOriginal(idx);
        const isActive =
          typeof activeIndex === "number" && activeIndex === origIndex;

        const dotBaseClasses =
          "w-3 h-3 rounded-full border-[3px] border-white ring-4 ring-[#f0f0f0] inline-block";

        const dotActiveClasses = "bg-[#2563EB] ring-[rgba(37,99,235,0.15)]";
        const dotInactiveClasses = "bg-[#bbb]";

        const clickable = typeof onItemClick === "function";

        return clickable ? (
          <button
            key={it.id ?? idx}
            type="button"
            className={`flex items-center gap-3 mb-5 relative ${
              clickable ? "cursor-pointer" : ""
            }`}
            onClick={() => onItemClick?.(it, origIndex)}
          >
            <div className="w-12 flex justify-center items-start pt-0.5">
              <div className="flex items-center gap-2">
                {it.icon ? (
                  <span className="inline-flex items-center">{it.icon}</span>
                ) : (
                  <span
                    aria-hidden
                    className={`${dotBaseClasses} ${
                      isActive ? dotActiveClasses : dotInactiveClasses
                    }`}
                  />
                )}
              </div>
            </div>

            <div className="bg-white py-2 px-3 rounded-md border border-[#eee] shadow-sm flex-1">
              <div className="flex items-center gap-2">
                {it.title ? (
                  <h4 className="text-sm font-semibold text-[#222] m-0">
                    {it.title}
                  </h4>
                ) : null}
                {showDates && it.date ? (
                  <time
                    className="text-xs text-gray-500 ml-2"
                    aria-label={it.date}
                  >
                    {it.date}
                  </time>
                ) : null}
              </div>

              <div className="mt-1.5 text-[13px] text-[#444] leading-[1.4]">
                {it.content}
              </div>
            </div>
          </button>
        ) : (
          <div
            key={it.id ?? idx}
            className={`flex items-start gap-3 relative min-h-[4rem] mb-2 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}
          >
            <div className="bg-white p-0 rounded-md flex-1">
              <div className={`text-[13px] text-[#444] leading-[1.4] ${idx % 2 === 0 ? "text-right" : "text-left"}`}>
                {it.content}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start pt-0.5 min-h-[4rem]">
              <div className="flex flex-col grow items-center gap-2">
                {it.icon ? (
                  <div>
                    <span className="inline-flex items-center">{it.icon}</span>
                  </div>
                ) : (
                  <div className="flex flex-col grow items-center gap-2">
                    <span
                      aria-hidden
                      className={`${dotBaseClasses} ${
                        isActive ? dotActiveClasses : dotInactiveClasses
                      }`}
                    />
                    <span className="border border-[#bbb]  w-[2px] flex flex-grow"></span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-0 rounded-md flex-1"/>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(Timeline);
