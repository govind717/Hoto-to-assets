import React from 'react';

import Box from '@mui/material/Box';

import WarehouseList from './SupplierList/SupplierList';
import HotoHeader from 'app/Components/HotoHeader';

const Supplier = () => {
    return (
      <Box>
        <HotoHeader/>
        <WarehouseList />
      </Box>
    );
}

export default Supplier;