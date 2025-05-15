import React from 'react';
import Box from '@mui/material/Box';

import BlockList from './BlockList/BlockList';
import HotoHeader2 from 'app/pages/Hoto_to_Assets/HotoHeader/HotoHeader2';

const Block = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <Box>
        <HotoHeader2 />
        <BlockList />
      </Box>
    );
}

export default Block;