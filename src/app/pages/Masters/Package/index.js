import React from 'react';

import Box from '@mui/material/Box';


import PackageList from './PackageList/PackageList';
import HotoHeader from 'app/Components/HotoHeader';

const Package = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader />
        <PackageList />
      </Box>
    );
}

export default Package;