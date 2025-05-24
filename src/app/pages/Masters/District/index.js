import React from 'react';

import Box from '@mui/material/Box';


import HotoHeader from 'app/Components/HotoHeader';
import DistrictList from './DistrictList/DistrictList';


const District = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader />
        <DistrictList />
      </Box>
    );
}

export default District;