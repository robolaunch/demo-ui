import { ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
}

export default function Card({ children }: ICard): ReactElement {
  return (
    <div className="hw-full border border-slate-200 bg-white">{children}</div>
  );
}
