"use client";

import { ReactElement } from "react";
import {
  Accordion as AccordionPR,
  AccordionTab as AccordionTabPR,
} from "primereact/accordion";

interface IAccordion {
  header?: string | ReactElement | ReactElement[];
  headerClassName?: string;
  children: ReactElement | ReactElement[];
}

export default function Accordion({
  header,
  headerClassName,
  children,
}: IAccordion): ReactElement {
  return (
    <AccordionPR>
      <AccordionTabPR className={headerClassName} header={header}>
        <div className="hw-full pt-2">{children}</div>
      </AccordionTabPR>
    </AccordionPR>
  );
}
