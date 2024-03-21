import useMain from "@/hooks/useMain";
import { ITemplate } from "@/interfaces/template.interface";
import { Tooltip } from "primereact/tooltip";
import { Fragment, ReactElement } from "react";
import { MdVerified } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbWorld } from "react-icons/tb";

interface ICFAppCardTitle {
  template: ITemplate;
}

export default function CFAppCardTitle({
  template,
}: ICFAppCardTitle): ReactElement {
  const { selectedState } = useMain();

  return (
    <p className="flex items-center gap-2 font-medium">
      {template.app.alias}{" "}
      {template.env?.sharing?.alias && `- (${template.env.sharing.alias})`}
      {!template.env ? (
        <Fragment>
          <Tooltip
            target=".verified-robolaunch"
            position="top"
            content="This Image created by robolaunch"
          />
          <MdVerified
            size={16}
            className="verified-robolaunch text-secondary-600"
          />
        </Fragment>
      ) : template.env.sharing.public ? (
        <Fragment>
          <Tooltip
            target=".verified-public"
            position="top"
            content="This Image created by robolaunch users."
          />
          <TbWorld size={16} className="verified-public text-primary-600" />
        </Fragment>
      ) : template.env.sharing.organization ? (
        <Fragment>
          <Tooltip
            target=".verified-org"
            position="top"
            content={`This Image created by your ${selectedState?.organization?.name?.split("_")?.[1]} organization`}
          />
          <PiUsersThreeBold
            size={16}
            className="verified-org text-primary-600"
          />
        </Fragment>
      ) : (
        template.env.sharing.private && (
          <Fragment>
            <Tooltip
              target=".verified-user"
              position="top"
              content="This Image created by you."
            />
            <MdVerified size={16} className="verified-user text-primary-600" />
          </Fragment>
        )
      )}
    </p>
  );
}
