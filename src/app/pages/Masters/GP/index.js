import React from 'react';

import Box from '@mui/material/Box';

import HotoHeader from 'app/Components/HotoHeader';
import GPList from './GPList/GPList';

const GP = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader />
        <GPList />
      </Box>
    );
}

export default GP;