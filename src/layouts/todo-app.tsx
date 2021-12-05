import { Box, Divider, makeStyles } from "@material-ui/core";
import { Routes, Route, Outlet } from "react-router-dom";
import { TodoDialogProvider } from "../providers/todo-dialog-provider/todo-dialog-provider";
import { AllToDos, ImportantToDos, MyDay } from "../components/todo-list";
import { TodoMenu } from "../components/todo-menu";
import { TopBar } from "../components/top-bar";
import { ActionProvider } from "../providers/action-provider";
import { TodoIDbStoreProvider } from "../providers/todo-idb-store";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles({
  layout: {
    height: "100vh",
    overflow: "hidden",
  },
  main: {
    display: "flex",
    height: "100%",
  },
  menu: {
    flex: 1,
  },
  content: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    flex: 5,
    overflow: "scroll",
  },
});

export const TodoApp = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Box className={classes.layout}>
        <TopBar />
        <Box className={classes.main}>
          <Box className={classes.menu}>
            <TodoMenu />
          </Box>
          <Divider orientation="vertical" flexItem />
          <TodoIDbStoreProvider>
            <ActionProvider>
              <TodoDialogProvider>
                <Box className={classes.content}>
                  <Routes>
                    <Route path="/my-day" element={<MyDay />} />
                    <Route path="/important" element={<ImportantToDos />} />
                    <Route path="/" element={<AllToDos />} />
                  </Routes>
                  <Outlet />
                </Box>
              </TodoDialogProvider>
            </ActionProvider>
          </TodoIDbStoreProvider>
        </Box>
      </Box>
    </BrowserRouter>
  );
};
