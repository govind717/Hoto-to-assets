import React from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import AssetsPortfolioList from './AssetsPortfolioList';
import HotoHeader from 'app/pages/Hoto_to_Assets/HotoHeader';
import BlockWiseAssetList from './BlockWiseAssetList';
import MaintainanceList from './Maintenance';
import WarehouseList from './Warehouse';
import ReplacementList from './Replacement';
import Transferlist from './Transfer';


const HotoGP = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader />
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
                {/* Left side tabs */}
                <Tab label="Asset Portfolio" value="1" />
                <Tab label="GP-Wise Assets" value="2" />
                <Tab label="Warehouse" value="3" />

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

export default HotoGP;
