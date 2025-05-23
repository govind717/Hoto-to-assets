import React from 'react';

import Box from '@mui/material/Box';

import HotoHeader from 'app/Components/HotoHeader';
import MaterialList from './MaterialList/MaterialList';

const Material = () => {
  

    return (
        <Box>
            <HotoHeader/>
            <MaterialList/>
        </Box>
    );
}

export default Material;