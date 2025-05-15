import React from 'react';
import Box from '@mui/material/Box';
import HotoHeader2 from 'app/pages/Hoto_to_Assets/HotoHeader/HotoHeader2';
import WarehouseList from './WarehouseList/WarehouseList';

const Warehouse = () => {
    return (
      <Box>
        <HotoHeader2 />
        <WarehouseList />
      </Box>
    );
}

export default Warehouse;