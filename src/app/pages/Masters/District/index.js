import React from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import HotoHeader from 'app/pages/Hoto_to_Assets/HotoHeader';
import DistrictList from './DistrictList/DistrictList';
import HotoHeader2 from 'app/pages/Hoto_to_Assets/HotoHeader/HotoHeader2';

const District = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader2 />
        <DistrictList />
      </Box>
    );
}

export default District;