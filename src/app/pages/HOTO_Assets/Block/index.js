import React, { useEffect } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import HotoHeader from 'app/Components/HotoHeader';
import AssetsPortfolioList from './AssetsPortfolioList';
import BlockWiseAssetList from './BlockWiseAssetList';
import MaintainanceList from './Maintenance';
import ReplacementList from './Replacement';
import Transferlist from './Transfer';
import WarehouseList from './Warehouse';
import { useLocation } from 'react-router-dom';


const HotoBlock = () => {
    const {state}=useLocation();
    const [value, setValue] = React.useState(state?.robustper !== "" ? '2' : sessionStorage.getItem('blockTabNo') || '1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        sessionStorage.setItem("blockTabNo", newValue);
    };
    useEffect(() => {
      if (state?.robustper !== "") {
        sessionStorage.setItem("blockTabNo", 2);
      }
    }, []);
    // useEffect(()=>{
    //   return ()=>{
    //     // sessionStorage.removeItem("blockTabNo");
    //   }
    // },[]);
    return (
      <Box>
        <HotoHeader/>
        <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginBottom: "10px",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
               
                <Tab label="Asset Portfolio" value="1" />
                <Tab label="Block-Wise Assets" value="2" />
                {/* <Tab label="Warehouse" value="3" /> */}

                {/* Push next tab to the right using margin-left: auto */}
                
                <Tab
                  label="Maintenance"
                  value="4"
                  sx={{ marginLeft: "auto" }}
                />
                <Tab label="Replacement" value="5" />
                <Tab label="Transfer" value="6" />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{ p: 0 }}>
              <AssetsPortfolioList />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <BlockWiseAssetList />
            </TabPanel>
            <TabPanel value="3" sx={{ p: 0 }}>
              <WarehouseList />
            </TabPanel>
            <TabPanel value="4" sx={{ p: 0 }}>
              <MaintainanceList />
            </TabPanel>
            <TabPanel value="5" sx={{ p: 0 }}>
              <ReplacementList />
            </TabPanel>
            <TabPanel value="6" sx={{ p: 0 }}>
              <Transferlist />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    );
};

export default HotoBlock;
