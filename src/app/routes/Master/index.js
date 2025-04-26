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
import Package from "app/pages/Masters/Package";
import AddPackage from "app/pages/Masters/Package/AddPackage/AddPackage";
import District from "app/pages/Masters/District";
import AddDistrict from "app/pages/Masters/District/AddDistrict/AddDistrict";
import BlockList from "app/pages/Masters/Block/BlockList/BlockList";
import AddBlock from "app/pages/Masters/Block/AddBlock/AddBlock";
import GP from "app/pages/Masters/GP";
import AddGP from "app/pages/Masters/GP/AddGP/AddGP";
import AddGST from "app/pages/Masters/GST/AddGST/AddGST";
import GST from "app/pages/Masters/GST";
import HSNCode from "app/pages/Masters/HSNCode";
import AddHSNCode from "app/pages/Masters/HSNCode/AddHSNCode/AddHSNCode";
import Warehouse from "app/pages/Masters/Warehouse";
import AddWarehouse from "app/pages/Masters/Warehouse/AddWarehouse/AddWarehouse";

const routesName = "/dashboards/hoto-survey-data";

export const MasterRoute = [
  {
    middleware: [
      {
        element: AuthenticateAndRolesMiddleware,
        fallbackPath: "/login",
      },
    ],
    routes: [
      {
        path: "/masters/package",
        element: <Page component={Package} layout={"vertical-default"} />,
      },
      {
        path: "/masters/package/add",
        element: <Page component={AddPackage} layout={"vertical-default"} />,
      },
      {
        path: "/masters/package/edit",
        element: <Page component={AddPackage} layout={"vertical-default"} />,
      },
      {
        path: `/masters/district`,
        element: <Page component={District} />,
      },
      {
        path: `/masters/district/add`,
        element: <Page component={AddDistrict} />,
      },
      {
        path: `/masters/district/edit`,
        element: <Page component={AddDistrict} />,
      },
      {
        path: "/masters/block",
        element: <Page component={BlockList} layout={"vertical-default"} />,
      },
      {
        path: "/masters/block/add",
        element: <Page component={AddBlock} layout={"vertical-default"} />,
      },
      {
        path: "/masters/block/edit",
        element: <Page component={AddBlock} layout={"vertical-default"} />,
      },
      {
        path: `/masters/gp`,
        element: <Page component={GP} />,
      },
      {
        path: `/masters/gp/add`,
        element: <Page component={AddGP} />,
      },
      {
        path: `/masters/gp/edit`,
        element: <Page component={AddGP} />,
      },
      {
        path: "/masters/organization",
        element: <Page component={Organization} layout={"vertical-default"} />,
      },
      {
        path: "/masters/organization/add",
        element: <Page component={AddOrganization} layout={"vertical-default"} />,
      },
      {
        path: "/masters/organization/edit",
        element: <Page component={AddOrganization} layout={"vertical-default"} />,
      },
      {
        path: `/masters/department`,
        element: <Page component={DepartmentList} />,
      },
      {
        path: `/masters/department/add`,
        element: <Page component={AddDepartment} />,
      },
      {
        path: `/masters/department/edit`,
        element: <Page component={AddDepartment} />,
      },
      {
        path: `/masters/team`,
        element: <Page component={Team} />,
      },
      
      {
        path: `/masters/team/add`,
        element: <Page component={AddTeam} />,
      },
      {
        path: `/masters/team/edit`,
        element: <Page component={AddTeam} />,
      },
      {
        path: `/masters/category`,
        element: <Page component={Category} />,
      },
      
      {
        path: `/masters/category/add`,
        element: <Page component={AddCategory} />,
      },
      {
        path: `/masters/category/edit`,
        element: <Page component={AddCategory} />,
      },
      {
        path: `/masters/sub-category`,
        element: <Page component={SubCategory} />,
      },
      
      {
        path: `/masters/sub-category/add`,
        element: <Page component={AddSubCategory} />,
      },
      {
        path: `/masters/sub-category/edit`,
        element: <Page component={AddSubCategory} />,
      },
      {
        path: `/masters/material`,
        element: <Page component={Material} />,
      },
      
      {
        path: `/masters/material/add`,
        element: <Page component={AddMaterial} />,
      },
      {
        path: `/masters/material/edit`,
        element: <Page component={AddMaterial} />,
      },
      {
        path: `/masters/uom`,
        element: <Page component={UOMList} />,
      },
      
      {
        path: `/masters/uom/add`,
        element: <Page component={AddUOM} />,
      },
      {
        path: `/masters/uom/edit`,
        element: <Page component={AddUOM} />,
      },
      {
        path: `/masters/gst`,
        element: <Page component={GST} />,
      },
      
      {
        path: `/masters/gst/add`,
        element: <Page component={AddGST} />,
      },
      {
        path: `/masters/gst/edit`,
        element: <Page component={AddGST} />,
      },
      {
        path: `/masters/hsn-code`,
        element: <Page component={HSNCode} />,
      },
      
      {
        path: `/masters/hsn-code/add`,
        element: <Page component={AddHSNCode} />,
      },
      {
        path: `/masters/hsn-code/edit`,
        element: <Page component={AddHSNCode} />,
      },
      {
        path: `/masters/warehouse`,
        element: <Page component={Warehouse} />,
      },
      
      {
        path: `/masters/warehouse/add`,
        element: <Page component={AddWarehouse} />,
      },
      {
        path: `/masters/warehouse/edit`,
        element: <Page component={AddWarehouse} />,
      },
     
    ],
  },
];

