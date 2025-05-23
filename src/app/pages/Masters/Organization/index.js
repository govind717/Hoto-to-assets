import React from 'react';

import Box from '@mui/material/Box';

import OrganizationList from './OrganizationList/OrganizationList';
import HotoHeader from 'app/Components/HotoHeader';

const Organization = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader/>
        <OrganizationList />
      </Box>
    );
}

export default Organization;