import React from 'react';
import { Card, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import JumboContent from "@jumbo/components/JumboContent";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";

import renderSalesData from "./renderSalesData";
import {dataItems, data, menuItems } from "./data";
import StylishAssetHealthChart from './DistrictAssetHealthChart';
import ConditionStatusChart from './conditionDonaltChart';
import AssetConditionByTypeChart from './AssetConditionByTypeChart ';
import ConditionStatusPieChart from './pieChart';
import ChartOrderRevenue from './ChartOrderRevenue';
import ChartHotoSurveyStatus from './ChartOrderRevenue';
import AssetConditionByTypeChart2 from './AssetConditionByTypeChart2';
import AssetConditionByTypeChart3 from './AssetConditionByTypeChart3';
import AssetConditionByTypeChart4 from './AssetConditionByTypeChart4';
import ConditionStatusChart2 from './conditionDonaltChart2';

const hotosurveyData = [
    {
        "name": "Total Survey Status",
        "amount": 100,
        "fill": "#7352C7"
    },
    {
        "name": 'GP HOTO Survey Status',
        "amount": 56,
        "fill": '#2EB5C9',
    },
    {
        "name": 'Block HOTO Survey Status',
        "amount": 60,
        "fill": '#3BD2A2',
    },
    {
        "name": 'Rkm HOTO Survey Status',
        "amount": 34,
        "fill": '#F39711',
    },
];

const SalesStatistics = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (  
           
                <Grid container spacing={0}>
                   
                    {/* <Grid item xs={12} md={6}>
                        <Div sx={{ p: 2  ,pl:0 ,pt:0}}>
                            <StylishAssetHealthChart />
                        </Div>
                    </Grid> */}

                    
                    {/* <Grid item xs={12} md={6}>
                        <Div sx={{ p: 2, pr:0 ,pt:0}}>
                            <ConditionStatusChart />
                        </Div>
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <Div sx={{ p: 2, pl:0 ,pt:0}}>
                            <ConditionStatusChart2 />
                        </Div>
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                        <Div sx={{ p: 2, px:0 }}>
                            <AssetConditionByTypeChart />
                        </Div>
                    </Grid> */}
                    <Grid item xs={12} md={12}>
                        <Div sx={{ p: 2, px:0 }}>
                            <AssetConditionByTypeChart4 />
                        </Div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Div sx={{ p: 2, px:0 }}>
                            <AssetConditionByTypeChart2 />
                        </Div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Div sx={{ p: 2, px:0 }}>
                            <AssetConditionByTypeChart3 />
                        </Div>
                    </Grid>
                    {/* Right: Pie Chart */}
                    {/* <Grid item xs={12} md={6}>
                        <Div sx={{ p: 2, pr:0 }}>
                            <ChartOrderRevenue data={hotosurveyData}/>
                        </Div>
                    </Grid> */}
                </Grid>
    );
};

export default SalesStatistics;
