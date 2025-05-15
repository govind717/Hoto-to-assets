import React from 'react';

import Box from '@mui/material/Box';

import HotoHeader2 from 'app/pages/Hoto_to_Assets/HotoHeader/HotoHeader2';
import PackageList from './PackageList/PackageList';

const Package = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader2 />
        <PackageList />
      </Box>
    );
}

export default Package;