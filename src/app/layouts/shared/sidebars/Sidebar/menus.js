import React from "react";
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import StoreIcon from '@mui/icons-material/Store';
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CellTowerOutlinedIcon from "@mui/icons-material/CellTowerOutlined";
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
const menus = [
  {
    uri: "/dashboards",
    label: "Overview",
    type: "nav-item",
    icon: <DashboardIcon sx={{ fontSize: 20 }} />,
  },
  // {
  //   uri: "/user-management",
  //   label: "User Management",
  //   type: "nav-item",
  //   icon: <PeopleIcon sx={{ fontSize: 20 }} />,
  // },
  // {
  //     label: 'Hoto Survey',
  //     type: "section",
  //     children: [
  //         {
  //             uri: "/dashboards/hoto-survey-data",
  //             label: 'Hoto Survey Data',
  //             type: "nav-item",
  //             icon: <PeopleIcon sx={{ fontSize: 20 }} />
  //         },
  //     ]
  // },

  // ----------------------------------
  // {
  //   label: "Masters",
  //   type: "collapsible",
  //   icon: <StarBorderPurple500Icon sx={{ fontSize: 20 }} />,
  //   children: [
  //     {
  //       uri: "/masters/package",
  //       isActiveUri: ["/masters/package/add", "/masters/package/edit"],
  //       label: "Package",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/district",
  //       isActiveUri: ["/masters/district/add", "/masters/district/edit"],
  //       label: "District",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/block",
  //       isActiveUri: ["/masters/block/add", "/masters/block/edit"],
  //       label: "Block",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/gp",
  //       isActiveUri: ["/masters/gp/add", "/masters/gp/edit"],
  //       label: "GP",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/organization",
  //       isActiveUri: [
  //         "/masters/organization/add",
  //         "/masters/organization/edit",
  //       ],
  //       label: "Organisation",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/department",
  //       isActiveUri: ["/masters/department/add", "/masters/department/edit"],
  //       label: "Department",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/team",
  //       isActiveUri: ["/masters/team/add", "/masters/team/edit"],
  //       label: "Team",
  //       type: "nav-item",
  //     },

  //     {
  //       uri: "/masters/category",
  //       isActiveUri: ["/masters/category/add", "/masters/category/edit"],
  //       label: "Category",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/sub-category",
  //       isActiveUri: [
  //         "/masters/sub-category/add",
  //         "/masters/sub-category/edit",
  //       ],
  //       label: "Sub Category",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/material",
  //       isActiveUri: ["/masters/material/add", "/masters/material/edit"],
  //       label: "Material",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/uom",
  //       isActiveUri: ["/masters/uom/add", "/masters/uom/edit"],
  //       label: "UOM",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/hsn-code",
  //       isActiveUri: ["/masters/hsn-code/add", "/masters/hsn-code/edit"],
  //       label: "HSN Code",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/gst",
  //       isActiveUri: ["/masters/gst/add", "/masters/gst/edit"],
  //       label: "GST",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/warehouse",
  //       isActiveUri: ["/masters/warehouse/add", "/masters/warehouse/edit"],
  //       label: "Warehouse",
  //       type: "nav-item",
  //     },
  //     {
  //       uri: "/masters/supplier",
  //       isActiveUri: ["/masters/supplier/add", "/masters/supplier/edit"],
  //       label: "Supplier",
  //       type: "nav-item",
  //     },
  //   ],
  // },
  {
    label: "Hoto - Assets",
    type: "collapsible",
    icon: <CellTowerOutlinedIcon sx={{ fontSize: 20 }} />,
    permission: ["hotoBlock", "hotoGp", "hotoRkm", "hotoWarehouse"],
    children: [
      {
        uri: "/dashboards/hoto-survey-block-data",
        isActiveUri: [
          "/dashboards/hoto-survey-block-data/asset-portflio-details",
          "/dashboards/hoto-survey-block-data/block-wise-details",
          "/dashboards/hoto-survey-block-data/block-wise-details/rack-details",
        ],
        permission: "hotoBlock",
        label: "Block",
        type: "nav-item",
      },
      {
        uri: "/dashboards/hoto-survey-gp-data",
        label: "GP",
        isActiveUri: [
          "/dashboards/hoto-survey-gp-data/assets-details",
          "/dashboards/hoto-survey-gp-data/gp-wise-details/rack-details",
          "/dashboards/hoto-survey-gp-data/gp-wise-details",
        ],
        permission: "hotoGp",
        type: "nav-item",
      },
      {
        uri: "/dashboards/hoto-survey-rkm-data",
        label: "RKM",
        type: "nav-item",
        permission: "hotoRkm",
      },
      {
        uri: "/dashboards/hoto-survey-warehouse-data",
        label: "Warehouse",
        isActiveUri: [
          "/dashboards/hoto-survey-warehouse-data/assets-details",
          "/dashboards/hoto-survey-warehouse-data/warehouse-wise-details/rack-details",
          "/dashboards/hoto-survey-warehouse-data/warehouse-wise-details",
        ],
        type: "nav-item",
        permission: "hotoWarehouse",
      },
    ],
  },
  {
    uri: "/warehouse",
    label: "HOTO Warehouse",
    type: "nav-item",
    icon: <WarehouseOutlinedIcon sx={{ fontSize: 20 }} />,
    permission: "hotoWarehouseModule",
  },
  {
    label: "O&M",
    type: "collapsible",
    icon: <EngineeringOutlinedIcon sx={{ fontSize: 20 }} />,
    permission: ["oandmBlock", "oandmGp", "oandmWarehouse"],
    children: [
      {
        uri: "/o&m/block",
        // isActiveUri :["/masters/package/add"],
        label: "Block",
        type: "nav-item",
        permission: "oandmBlock",
      },
      {
        uri: "/o&m/gp",
        // isActiveUri :["/masters/district/add"],
        label: "GP",
        type: "nav-item",
        permission: "oandmGp",
      },
      {
        uri: "/o&m/warehouse",
        // isActiveUri :["/masters/district/add"],
        label: "Warehouse",
        type: "nav-item",
        permission: "oandmWarehouse",
      },
    ],
  },
  {
    label: "O&M Warehouse",
    type: "collapsible",
    icon: <WarehouseOutlinedIcon sx={{ fontSize: 20 }} />,
    permission: [
      "oandmWarehouseWarehouse",
      "oandmWarehouseMaterialInward",
      "oandmWarehouseMaterialRequest",
    ],
    children: [
      {
        uri: "/o&mwarehouse/warehouse",
        // isActiveUri :["/masters/package/add"],
        label: "Warehouse",
        type: "nav-item",
        permission: "oandmWarehouseWarehouse",
      },
      {
        uri: "/o&mwarehouse/material-inward",
        // isActiveUri :["/masters/district/add"],
        label: "Material Inward",
        type: "nav-item",
        permission: "oandmWarehouseMaterialInward",
      },
      {
        uri: "/o&mwarehouse/material-request",
        // isActiveUri :["/masters/district/add"],
        label: "Material Request",
        type: "nav-item",
        permission: "oandmWarehouseMaterialRequest",
      },
    ],
  },
// ------------------------------------------
  // {
  //   uri: "/indent",
  //   label: "Indent",
  //   type: "nav-item",
  //   icon: <WarehouseOutlinedIcon sx={{ fontSize: 20 }} />,
  // },
  // {
  //     label: 'sidebar.menu.store',
  //     type: "section",
  //     children: [
  //         {
  //             uri: "/dashboards/myStore",
  //             label: 'sidebar.menuItem.myStore',
  //             type: "nav-item",
  //             icon: <StoreIcon sx={{ fontSize: 20 }} />
  //         },
  //     ]
  // },
  // {
  //     label: 'sidebar.menu.history',
  //     type: "section",
  //     children: [
  //         {
  //             uri: "/dashboards/transactionHistory",
  //             label: 'sidebar.menuItem.transactionHistory',
  //             type: "nav-item",
  //             icon: <PaidIcon sx={{ fontSize: 20 }} />
  //         },
  //     ]
  // },
];

export default menus;
