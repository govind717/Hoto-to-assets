import React from 'react';

import Box from '@mui/material/Box';

import HotoHeader from 'app/Components/HotoHeader';
import GSTList from './GSTList/GSTList';

const GST = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader />
        <GSTList />
      </Box>
    );
}

export default GST;