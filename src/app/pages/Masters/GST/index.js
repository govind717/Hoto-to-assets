import React from 'react';

import Box from '@mui/material/Box';

import HotoHeader2 from 'app/pages/Hoto_to_Assets/HotoHeader/HotoHeader2';
import GSTList from './GSTList/GSTList';

const GST = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader2 />
        <GSTList />
      </Box>
    );
}

export default GST;