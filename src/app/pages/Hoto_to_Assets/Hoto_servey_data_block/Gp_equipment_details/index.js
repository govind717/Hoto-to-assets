import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Gp_details from './Gp_details';
import { Box, Typography } from '@mui/material';
import Gp_equipments from './Gp_equipments';
import HotoHeader from '../../HotoHeader';
import Div from '@jumbo/shared/Div';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Gp_equipment_details = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const gp_data = state?.gp_data;
    return (
        <Box>
            <HotoHeader />
            <Div sx={{ display: "flex", alignItems: "center", my: 2, gap: 1 }}>
                <Div>
                    <ArrowBackIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate('/dashboards/hoto-survey-data')
                        }} />
                </Div>
                <Typography variant='h3'>Assets</Typography>
            </Div>
            <Gp_details gp_details={gp_data} />
            <Gp_equipments gp_details={gp_data} />
        </Box>
    )
}

export default Gp_equipment_details