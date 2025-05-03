import Hoto_servey_data from "app/pages/Hoto_to_Assets/Hoto_servey_data";
import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Gp_equipment_details from "app/pages/Hoto_to_Assets/Hoto_servey_data/Gp_equipment_details";
// import { Dashboard } from "@mui/icons-material";

import BlockOandM from "app/pages/O&M/Block";
import GPOandM from "app/pages/O&M/GP";
import OandMWarehouse from "app/pages/O&MWarehouse/Warehouse";
import OandMMaterialInward from "app/pages/O&MWarehouse/MaterialInward";
import OandMMaterialRequest from "app/pages/O&MWarehouse/MaterialRequest";

export const OandMRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/o&m/block",
        element: <Page component={BlockOandM} layout={"vertical-default"} />,
      },
      {
        path: "/o&m/gp",
        element: <Page component={GPOandM} layout={"vertical-default"} />,
      },
      {
        path: "/o&mwarehouse/warehouse",
        element: (
          <Page component={OandMWarehouse} layout={"vertical-default"} />
        ),
      },
      {
        path: "/o&mwarehouse/material-inward",
        element: (
          <Page component={OandMMaterialInward} layout={"vertical-default"} />
        ),
      },
      {
        path: "/o&mwarehouse/material-request",
        element: (
          <Page component={OandMMaterialRequest} layout={"vertical-default"} />
        ),
      },
    ],
  },
];

