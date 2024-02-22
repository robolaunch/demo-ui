import { ReactElement } from "react";
import Card from "../card/card.comp";
import useMain from "@/hooks/useMain";
import Image from "next/image";

interface ITemplates {
  categoryFilter: string;
}

export default function Templates({
  categoryFilter,
}: ITemplates): ReactElement {
  const { templates } = useMain();

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-2">
      {templates
        .filter(
          (template) => template.category === categoryFilter.toLowerCase(),
        )
        .map((template, index) => {
          return (
            <Card key={index} className="p-4">
              <div className="flex gap-1">
                <Image
                  width={64}
                  height={64}
                  src={template.app.icon}
                  alt={template.app.name}
                />
                <div className="flex h-full flex-col justify-between">
                  <p>{template.app.alias}</p>
                  <p>2</p>
                  <p>3</p>
                  <p>4</p>
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
}
