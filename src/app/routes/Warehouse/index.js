import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Warehouse from "app/pages/Warehouse";

export const WarehouseRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/warehouse",
        element: <Page component={Warehouse} layout={"vertical-default"} />,
      },
     
    ],
  },
];

