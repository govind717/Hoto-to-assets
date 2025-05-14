import React from 'react';

import Box from '@mui/material/Box';

import HotoHeader2 from 'app/pages/Hoto_to_Assets/HotoHeader/HotoHeader2';
import WarehouseList from './SupplierList/SupplierList';

const Supplier = () => {
    return (
      <Box>
        <HotoHeader2 />
        <WarehouseList />
      </Box>
    );
}

export default Supplier;