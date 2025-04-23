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
        label: 'Hoto Survey',
        type: "section",
        children: [
            {
                uri: "/dashboards/hoto-survey-data",
                label: 'Hoto Survey Data',
                type: "nav-item",
                icon: <PeopleIcon sx={{ fontSize: 20 }} />
            },
        ]
    },
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
