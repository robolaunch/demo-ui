"use client";

import { Fragment, ReactElement } from "react";
import { MdErrorOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Tooltip } from "primereact/tooltip";

interface IAccordionValidLabel {
  type: "valid" | "error" | null;
}

export default function CFAccordionValidLabel({
  type,
}: IAccordionValidLabel): ReactElement {
  return (
    <Fragment>
      {(() => {
        switch (type) {
          case "valid":
            return (
              <Fragment>
                <Tooltip
                  target=".valid-icon"
                  content="Fields is valid."
                  position="left"
                />
                <MdOutlineCheckCircle
                  className="valid-icon text-green-500"
                  size={22}
                />
              </Fragment>
            );
          case "error":
            return (
              <Fragment>
                <Tooltip
                  target=".error-icon"
                  content="Fields is not valid. Please check the fields and try again."
                  position="left"
                />
                <MdErrorOutline className="error-icon text-red-500" size={22} />
              </Fragment>
            );

          default:
            return null;
        }
      })()}
    </Fragment>
  );
}
