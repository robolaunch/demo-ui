import { ReactElement } from "react";
import Button, { IButton } from "../Button/Button";

interface IGroupButtons {
  buttons: IButton[];
}

export default function GroupButtons({ buttons }: IGroupButtons): ReactElement {
  return (
    <span className="p-buttonset">
      {buttons.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </span>
  );
}
