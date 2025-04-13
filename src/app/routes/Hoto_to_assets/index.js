import Hoto_servey_data from "app/pages/Hoto_to_Assets/Hoto_servey_data";
import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Gp_equipment_details from "app/pages/Hoto_to_Assets/Hoto_servey_data/Gp_equipment_details";
// import { Dashboard } from "@mui/icons-material";
import Dashboard from "app/pages/Dashboard";
import Hoto_servey_data_block from "app/pages/Hoto_to_Assets/Hoto_servey_data_block";
import Rkm_survey_data from "app/pages/Hoto_to_Assets/Rkm_servey_data";

const routesName = "/dashboards/hoto-survey-data";

export const hotoToAssetsRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/dashboards",
        element: <Page component={Dashboard} layout={"vertical-default"} />,
      },
      {
        path: `${routesName}`,
        element: <Page component={Hoto_servey_data} />,
      },
      {
        path: `${routesName}/equipment-details`,
        element: <Page component={Gp_equipment_details} />,
      },
      
    ],
  },
];
export const blockRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/dashboards/hoto-survey-block-data",
        element: <Page component={Hoto_servey_data_block}/>,
      },
    ],
  },
];
export const rkmRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/dashboards/hoto-survey-rkm-data",
        element: <Page component={Rkm_survey_data}/>,
      },
    ],
  },
];
