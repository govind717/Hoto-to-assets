import React from 'react';

import Box from '@mui/material/Box';
import HotoHeader from 'app/Components/HotoHeader';
import DepartmentList from './DepartmentList/DepartmentList';

const Department = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader/>
        <DepartmentList />
      </Box>
    );
}

export default Department;