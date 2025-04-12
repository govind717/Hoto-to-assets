import React from 'react';
import HotoHeader from '../HotoHeader';
import Gp_list from './Gp_list';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Assets_Portfolio_List from "./Assets_Portfolio/Assets_Portfolio"

const Hoto_servey_data = () => {
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
                            <Tab label="Assets" value="1" />
                            <Tab label="Assets Portfolio" value="2" />
                            <Tab label="Transfer" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <Gp_list />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}><Assets_Portfolio_List/></TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}>Item Three</TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}

export default Hoto_servey_data;