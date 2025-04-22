import React from "react";
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import StoreIcon from '@mui/icons-material/Store';
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import DashboardIcon from '@mui/icons-material/Dashboard';

const menus = [
    {
        uri: "/dashboards",
        label: 'Overview',
        type: "nav-item",
        icon: <DashboardIcon sx={{ fontSize: 20 }} />
    },
    {
        uri: "/user-management",
        label: 'User Management',
        type: "nav-item",
        icon: <PeopleIcon sx={{ fontSize: 20 }} />,
    },
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
    {
        label: "Hoto - Assets",
        type: "collapsible",
        // icon: <StarBorderPurple500Icon sx={{ fontSize: 20 }} />,
        children: [
            {
                uri: "/dashboards/hoto-survey-block-data",
                label: 'Block',
                type: "nav-item",
            },
            {
                uri: "/dashboards/hoto-survey-data",
                label: "GP",
                type: "nav-item",
            },
            {
                uri: "/dashboards/hoto-survey-rkm-data",
                label: 'RKM',
                type: "nav-item",
            },
        ]
    },
    {
        label: "Masters",
        type: "collapsible",
        // icon: <StarBorderPurple500Icon sx={{ fontSize: 20 }} />,
        children: [
            {
                uri: "/masters/package",
                isActiveUri :["/masters/package/add"],
                label: 'Package',
                type: "nav-item",
            },
            {
                uri: "/masters/district",
                isActiveUri :["/masters/district/add"],
                label: "District",
                type: "nav-item",
            },
            {
                uri: "/masters/block",
                isActiveUri :["/masters/block/add"],
                label: 'Block',
                type: "nav-item",
            },
            {
                uri: "/masters/gp",
                isActiveUri :["/masters/gp/add"],
                label: 'GP',
                type: "nav-item",
            },
            {
                uri: "/masters/organization",
                isActiveUri :["/masters/organization/add"],
                label: 'Organisation',
                type: "nav-item",
            },
            {
                uri: "/masters/department",
                isActiveUri :["/masters/department/add"],
                label: "Department",
                type: "nav-item",
            },
            {
                uri: "/masters/team",
                isActiveUri :["/masters/team/add"],
                label: 'Team',
                type: "nav-item",
            },
            // {
            //     uri: "/masters/Users",
            //     label: 'users',
            //     type: "nav-item",
            // },
            
            // {
            //     uri: "/masters/district-master",
            //     label: 'District Master',
            //     type: "nav-item",
            // },
            // {
            //     uri: "/masters/block-master",
            //     label: 'Block Master',
            //     type: "nav-item",
            // },
            // {
            //     uri: "/masters/gp-master",
            //     label: "GP Master",
            //     type: "nav-item",
            // },
            {
                uri: "/masters/category",
                isActiveUri :["/masters/category/add"],
                label: 'Category',
                type: "nav-item",
            },
            {
                uri: "/masters/sub-category",
                isActiveUri :["/masters/sub-category/add"],
                label: 'Sub Category',
                type: "nav-item",
            },
            {
                uri: "/masters/material",
                isActiveUri :["/masters/material/add"],
                label: 'Material',
                type: "nav-item",
            },
            {
                uri: "/masters/uom",
                isActiveUri :["/masters/uom/add"],
                label: "UOM",
                type: "nav-item",
            },
            {
                uri: "/masters/hsn-code",
                isActiveUri :["/masters/hsn-code/add"],
                label: 'HSN Code',
                type: "nav-item",
            },
            {
                uri: "/masters/gst",
                isActiveUri :["/masters/gst/add"],
                label: 'GST',
                type: "nav-item",
            },
            {
                uri: "/masters/warehouse",
                isActiveUri :["/masters/warehouse/add"],
                label: 'Warehouse',
                type: "nav-item",
            },
            
        ]
    },
    // {
    //     label: "O&M",
    //     type: "collapsible",
    //     // icon: <StarBorderPurple500Icon sx={{ fontSize: 20 }} />,
    //     children: [
    //         {
    //             uri: "/o&m/block",
    //             // isActiveUri :["/masters/package/add"],
    //             label: 'Block',
    //             type: "nav-item",
    //         },
    //         {
    //             uri: "/o&m/gp",
    //             // isActiveUri :["/masters/district/add"],
    //             label: "GP",
    //             type: "nav-item",
    //         },
           
    //     ]
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
