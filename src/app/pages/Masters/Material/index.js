import React from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import HotoHeader from 'app/pages/Hoto_to_Assets/HotoHeader';
import MaterialList from './MaterialList/MaterialList';

const Material = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <HotoHeader />
            <MaterialList/>
        </Box>
    );
}

export default Material;