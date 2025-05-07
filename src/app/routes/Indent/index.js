import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Indent from "app/pages/Indent";
import Warehouse from "app/pages/Warehouse";

export const IndentRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/indent",
        element: <Page component={Indent} layout={"vertical-default"} />,
      },
     
    ],
  },
];

