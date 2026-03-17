import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import NewCase from "./components/NewCase";
import MyCases from "./components/MyCases";
import Settings from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: NewCase },
      { path: "my-cases", Component: MyCases },
      { path: "settings", Component: Settings },
    ],
  },
]);
