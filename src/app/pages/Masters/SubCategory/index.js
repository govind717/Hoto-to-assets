import React from 'react';

import Box from '@mui/material/Box';
import SubCategoryList from './SubCategoryList/SubCategoryList';
import HotoHeader from 'app/Components/HotoHeader';

const SubCategory = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader/>
        <SubCategoryList />
      </Box>
    );
}

export default SubCategory;