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
    <AccordionPR activeIndex={0}>
      <AccordionTabPR
        contentClassName="pt-2"
        className={headerClassName}
        header={header}
      >
        {children}
      </AccordionTabPR>
    </AccordionPR>
  );
}
