import React from "react";

interface PairLabelValueColsProps {
  left: React.ReactNode;
  right: React.ReactNode;
  smallScreenCenterItems?: boolean;
}

// TODO: This only works well when the container has a specific set of CSS classes
//       (e.g. grid, etc)
//
//       Find a way to solve this. For example, force the user (somehow) to use the correct
//       container, etc.
//
//      One way would be to use a pattern similar to:
//      <Tab.Panels>
//        <Tab.Panel>Tab one</Tab.Panel>
//        <Tab.Panel>Tab two</Tab.Panel>
//        ...
//     </Tab.Panels>
//
// In other words, provide one component for the container, and another component for a child,
// and put them in the same namespace, if possible (in the example above the namespace is "Tab").
// This doesn't force the user to use both, but at least it's a lot easier.
export const PairLabelValueCols = ({
  left,
  right,
  smallScreenCenterItems: center = false
}: PairLabelValueColsProps) => (
  <>
    <div className={ `text-slate-300 flex ${center ? "justify-center" : ""} items-center md:justify-end` }>
      { left }
    </div>
    <div className={ `text-slate-200 font-semibold flex ${center ? "justify-center" : ""} md:justify-start` }>
      { right }
    </div>
  </>
);
