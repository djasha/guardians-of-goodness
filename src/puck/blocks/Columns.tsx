import type { Slot, SlotComponent } from "@puckeditor/core";

export type ColumnsProps = {
  layout: "two" | "three" | "sidebar-left" | "sidebar-right";
  gap: "small" | "medium" | "large";
  tone: "cream" | "dark";
  left: Slot;
  middle: Slot;
  right: Slot;
};

type ColumnsRenderProps = Omit<ColumnsProps, "left" | "middle" | "right"> & {
  left: SlotComponent;
  middle: SlotComponent;
  right: SlotComponent;
};

const gapClasses: Record<ColumnsProps["gap"], string> = {
  small: "gap-4",
  medium: "gap-8",
  large: "gap-12",
};

const toneClasses: Record<ColumnsProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
};

function gridClasses(layout: ColumnsProps["layout"]): string {
  switch (layout) {
    case "two":
      return "md:grid-cols-2";
    case "three":
      return "md:grid-cols-3";
    case "sidebar-left":
      return "md:grid-cols-[1fr_2fr]";
    case "sidebar-right":
      return "md:grid-cols-[2fr_1fr]";
  }
}

export function Columns({
  layout,
  gap,
  tone,
  left: Left,
  middle: Middle,
  right: Right,
}: ColumnsRenderProps) {
  return (
    <section className={`${toneClasses[tone]} px-6 py-12`}>
      <div className={`max-w-6xl mx-auto grid grid-cols-1 ${gridClasses(layout)} ${gapClasses[gap]}`}>
        <div>
          <Left />
        </div>
        {layout === "three" ? (
          <div>
            <Middle />
          </div>
        ) : null}
        <div>
          <Right />
        </div>
      </div>
    </section>
  );
}
