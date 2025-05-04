import Hoto_servey_data from "app/pages/Hoto_to_Assets/Hoto_servey_data";
import AuthenticateAndRolesMiddleware from "../Middleware";
import Page from "@jumbo/shared/Page";
import Gp_equipment_details from "app/pages/Hoto_to_Assets/Hoto_servey_data/Gp_equipment_details";
// import { Dashboard } from "@mui/icons-material";
import Dashboard from "app/pages/Dashboard";
import Hoto_servey_data_block from "app/pages/Hoto_to_Assets/Hoto_servey_data_block";
import Rkm_survey_data from "app/pages/Hoto_to_Assets/Rkm_servey_data";
import Organization from "app/pages/Masters/Organization";
import AddOrganization from "app/pages/Masters/Organization/OrganizationList/AddOrganization/AddOrganization";
import DepartmentList from "app/pages/Masters/Department/DepartmentList/DepartmentList";
import AddDepartment from "app/pages/Masters/Department/AddDepartment.js/AddDepartment";
import Team from "app/pages/Masters/Team";
import AddTeam from "app/pages/Masters/Team/AddTeam/AddTeam";
import Category from "app/pages/Masters/Category";
import AddCategory from "app/pages/Masters/Category/AddCategory/AddCategory";
import SubCategory from "app/pages/Masters/SubCategory";
import AddSubCategory from "app/pages/Masters/SubCategory/AddSubCategory/AddSubCategory";
import Material from "app/pages/Masters/Material";
import AddMaterial from "app/pages/Masters/Material/AddMaterial/AddMaterial";
import UOMList from "app/pages/Masters/UOM/UOMList/UOMList";
import AddUOM from "app/pages/Masters/UOM/AddUOM/AddUOM";
import UserManagement from "app/pages/UserManagement";
import AdduserManagement from "app/pages/UserManagement/AddUserManagement/AddUserManagement";

const routesName = "/dashboards/hoto-survey-data";

export const UserManagementRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/user-management",
        element: <Page component={UserManagement} layout={"vertical-default"} />,
      },
      {
        path: "/user-management/add",
        element: <Page component={AdduserManagement} layout={"vertical-default"} />,
      },
      {
        path: "/user-management/edit",
        element: <Page component={AdduserManagement} layout={"vertical-default"} />,
      }
     
    ],
  },
];

