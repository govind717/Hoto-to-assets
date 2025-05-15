import React from 'react';

import Box from '@mui/material/Box';
import HotoHeader2 from 'app/pages/Hoto_to_Assets/HotoHeader/HotoHeader2';
import OrganizationList from './OrganizationList/OrganizationList';

const Organization = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader2 />
        <OrganizationList />
      </Box>
    );
}

export default Organization;