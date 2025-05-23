import React from 'react';
import Box from '@mui/material/Box';
import WarehouseList from './WarehouseList/WarehouseList';
import HotoHeader from 'app/Components/HotoHeader';

const Warehouse = () => {
    return (
      <Box>
        <HotoHeader/>
        <WarehouseList />
      </Box>
    );
}

export default Warehouse;