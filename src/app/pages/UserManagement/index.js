import React from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import UserManagementList from './UserManagementList/UserManagementList';
import HotoHeader2 from '../Hoto_to_Assets/HotoHeader/HotoHeader2';

const UserManagement = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader2/>
        {/* <Box sx={{ width: '100%', typography: 'body1', mt: 1 }}>
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
            </Box> */}
        <UserManagementList />
      </Box>
    );
}

export default UserManagement;