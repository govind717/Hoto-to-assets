import Box from '@mui/material/Box';
import React from 'react';
import HotoHeader from 'app/Components/HotoHeader/index';

const Rkm_survey_data = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <HotoHeader />
            {/* <Box sx={{ width: '100%', typography: 'body1', mt: 1 }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="GP-Wide Assets" value="1" />
                            <Tab label="Asset Portfolio" value="2" />
                            <Tab label="Rectification" value="3" />
                            <Tab label="Transfer" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ p: 0 }}></TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}></TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}></TabPanel>
                    <TabPanel value="4" sx={{ p: 0 }}></TabPanel>
                </TabContext>
            </Box> */}
        </Box>
    );
}

export default Rkm_survey_data;