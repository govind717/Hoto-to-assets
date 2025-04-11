import React from 'react'
import { useLocation } from 'react-router-dom'
import Gp_details from './Gp_details';
import { Box, Typography } from '@mui/material';
import Gp_equipments from './Gp_equipments';
import HotoHeader from '../../HotoHeader';

const Gp_equipment_details = () => {
    const { state } = useLocation();
    const gp_data = state?.gp_data;
    console.log(gp_data)
    return (
        <Box>
            <HotoHeader/>
            <Typography variant='h3' sx={{my:2}}>Assets</Typography>
            <Gp_details gp_details={gp_data} />
            <Gp_equipments gp_details={gp_data} />
        </Box>
    )
}

export default Gp_equipment_details