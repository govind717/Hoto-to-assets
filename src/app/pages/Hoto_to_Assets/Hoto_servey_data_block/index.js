import React from 'react';
import HotoHeader from '../HotoHeader';
import Gp_list from './Gp_list';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Assets_Portfolio_List from "./Assets_Portfolio/Assets_Portfolio"
import Transfer_list from './Transfer';
import Rectification_list from './Rectification';

const Hoto_servey_data_block = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <HotoHeader />
            <Box sx={{ width: '100%', typography: 'body1', mt: 1 }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Block-Wise Assets" value="1" />
                            <Tab label="Asset Portfolio" value="2" />
                            <Tab label="Rectification" value="3" />
                            <Tab label="Transfer" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <Gp_list />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}><Assets_Portfolio_List /></TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}><Rectification_list /></TabPanel>
                    <TabPanel value="4" sx={{ p: 0 }}><Transfer_list /></TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}

export default Hoto_servey_data_block;