import Box from '@mui/material/Box';
import React from 'react';

import HotoHeader from 'app/Components/HotoHeader';
import BlockList from './BlockList/BlockList';

const Block = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader/>
        <BlockList />
      </Box>
    );
}

export default Block;