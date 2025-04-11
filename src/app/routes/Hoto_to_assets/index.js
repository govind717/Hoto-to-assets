import Hoto_servey_data from "app/pages/Hoto_to_Assets/Hoto_servey_data";
import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Gp_equipment_details from "app/pages/Hoto_to_Assets/Hoto_servey_data/Gp_equipment_details";


const routesName = "/dashboards/hoto-servey-data";

export const hotoToAssetsRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/",
      },
    ],
    routes: [
      {
        path: `${routesName}`,
        element: <Page component={Hoto_servey_data} />
      },
      {
        path: `${routesName}/equipment-details`,
        element: <Page component={Gp_equipment_details} />,
      },
    ],
  },]
