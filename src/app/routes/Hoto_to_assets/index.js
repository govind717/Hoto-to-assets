import Hoto_servey_data from "app/pages/Hoto_to_Assets/Hoto_servey_data";
import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Gp_equipment_details from "app/pages/Hoto_to_Assets/Hoto_servey_data/Gp_equipment_details";
// import { Dashboard } from "@mui/icons-material";
import Dashboard from "app/pages/Dashboard";
// import Hoto_servey_data_block from "app/pages/Hoto_to_Assets/Hoto_servey_data_block";
import Rkm_survey_data from "app/pages/Hoto_to_Assets/Rkm_servey_data";
import HotoBlock from "app/pages/HOTO_Assets/Block";
import AssetsPortFolioItemDetail from "app/pages/HOTO_Assets/Block/AssetsPortfolioList/ItemDetails/AssetsPortFolioItemDetail";
import BlockWiseItemDetail from "app/pages/HOTO_Assets/Block/BlockWiseAssetList/ItemDetails/BlockWiseItemDetail";
import WarehouseItemDetail from "app/pages/HOTO_Assets/Block/AssetsPortfolioList/ItemDetails/AssetsPortFolioItemDetail";
import HotoGP from "app/pages/HOTO_Assets/GP";
import GpWiseItemDetail from "app/pages/HOTO_Assets/GP/BlockWiseAssetList/ItemDetails/BlockWiseItemDetail";
import GpAssetsDetail from "app/pages/HOTO_Assets/GP/AssetsPortfolioList/ItemDetails/AssetsPortFolioItemDetail";
import BlockRackDetails from "app/pages/HOTO_Assets/Block/BlockWiseAssetList/ItemDetails/AssetDetailTable/RackDetails/RackDetails";
import GpRackDetails from "app/pages/HOTO_Assets/GP/BlockWiseAssetList/ItemDetails/AssetDetailTable/RackDetails/RackDetails";
import { element } from "prop-types";
import HotoWarehouse from "app/pages/HOTO_Assets/Warehouse";
import WarehouseWiseItemDetail from "app/pages/HOTO_Assets/Warehouse/WarehouseWiseAssetList/ItemDetails/WarehouseWiseItemDetail";

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
      // {
      //   path: "/dashboards/hoto-survey-block-data",
      //   element: <Page component={Hoto_servey_data_block}/>,
      // },
      {
        path: "/dashboards/hoto-survey-block-data",
        element: <Page component={HotoBlock} />,
      },
      {
        path: "/dashboards/hoto-survey-block-data/asset-portflio-details",
        element: <Page component={AssetsPortFolioItemDetail} />,
      },
      {
        path: "/dashboards/hoto-survey-block-data/block-wise-details",
        element: <Page component={BlockWiseItemDetail} />,
      },

      {
        path: "/dashboards/hoto-survey-block-data/block-wise-details/rack-details",
        element: <Page component={BlockRackDetails} />,
      },
      // {
      //   path: "/dashboards/hoto-survey-block-data/warehouse-details",
      //   element: <Page component={WarehouseItemDetail} />,
      // },
      {
        path: "/dashboards/hoto-survey-gp-data",
        element: <Page component={HotoGP} />,
      },
      {
        path: "/dashboards/hoto-survey-gp-data/asset-portflio-details",
        element: <Page component={AssetsPortFolioItemDetail} />,
      },
      {
        path: "/dashboards/hoto-survey-gp-data/gp-wise-details",
        element: <Page component={GpWiseItemDetail} />,
      },
      {
        path: "/dashboards/hoto-survey-gp-data/gp-wise-details/rack-details",
        element: <Page component={GpRackDetails} />,
      },

      {
        path: "/dashboards/hoto-survey-gp-data/assets-details",
        element: <Page component={GpAssetsDetail} />,
      },

      //hoto warehouse
      {
        path: "/dashboards/hoto-survey-warehouse-data",
        element: <Page component={HotoWarehouse} />,
      },
      {
        path: "/dashboards/hoto-survey-warehouse-data/warehouse-wise-details",
        element: <Page component={WarehouseWiseItemDetail} />,
      },
      {
        path: "/dashboards/hoto-survey-warehouse-data/warehouse-wise-details/rack-details",
        element: <Page component={BlockRackDetails} />,
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
