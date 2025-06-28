import React from "react";

type PropertyOverviewItemProps = {
  label: string;
  value: string | number;
  children: React.ReactNode; // receive icon as JSX
};

const PropertyOverviewItem: React.FC<PropertyOverviewItemProps> = ({
  label,
  value,
  children,
}) => {
  return (
    <div className="flex items-center gap-3 p-3">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-8 h-8 rounded border border-slate-600 text-white">
        {children}
      </div>

      {/* Label and Value */}
      <div className="flex flex-col">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm text-slate-200 font-medium">{value}</span>
      </div>
    </div>
  );
};

export default PropertyOverviewItem;
