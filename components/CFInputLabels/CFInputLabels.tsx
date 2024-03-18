"use client";

import { ReactElement } from "react";
import { Chips, ChipsAddEvent, ChipsRemoveEvent } from "primereact/chips";

interface ICFInputLabels {
  label: string;
  values: string[];
  onAdd?: (e: ChipsAddEvent) => void;
  onRemove?: (e: ChipsRemoveEvent) => void;
  allowDuplicate?: boolean;
  tooltip?: string;
}

export default function CFInputLabels({
  label,
  values,
  onAdd,
  onRemove,
  allowDuplicate,
  tooltip,
}: ICFInputLabels): ReactElement {
  return (
    <span className="p-float-label relative w-full text-sm">
      <Chips
        value={values}
        className="w-full "
        onAdd={onAdd}
        onRemove={onRemove}
        allowDuplicate={allowDuplicate}
        tooltip={tooltip}
      />
      <label>{label}</label>
    </span>
  );
}
