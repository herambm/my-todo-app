import { DoneAll, Flare, LabelImportant } from "@material-ui/icons";
import * as React from "react";
import { IMenuProps, TodoMenuRenderer } from "../renderer/todo-menu-renderer";

export const TodoMenu: React.FunctionComponent = () => {
  const menu: IMenuProps[] = React.useMemo(
    () => [
      {
        id: "page-menu-all",
        linkTo: "/",
        text: "All",
        icon: <DoneAll />,
      },
      {
        id: "page-menu-my-day",
        linkTo: "/my-day",
        text: "My day",
        icon: <Flare />,
      },
      {
        id: "page-menu-important",
        linkTo: "/important",
        text: "Important",
        icon: <LabelImportant />,
      },
    ],
    []
  );

  return <TodoMenuRenderer menuProps={menu} />;
};
