import Hoto_servey_data from "app/pages/Hoto_to_Assets/Hoto_servey_data";
import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Gp_equipment_details from "app/pages/Hoto_to_Assets/Hoto_servey_data/Gp_equipment_details";
// import { Dashboard } from "@mui/icons-material";

import BlockOandM from "app/pages/O&M/Block";
import GPOandM from "app/pages/O&M/GP";

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
    ],
  },
];

