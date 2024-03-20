import { Fragment, ReactElement } from "react";
import Categories from "../CreateCategories/CreateCategories";
import Templates from "../CreateTemplates/CreateTemplates";

export default function CreateTemplatesMapper(): ReactElement {
  return (
    <Fragment>
      <Categories />
      <Templates />
    </Fragment>
  );
}
