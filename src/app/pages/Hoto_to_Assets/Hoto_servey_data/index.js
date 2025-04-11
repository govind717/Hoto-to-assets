import { hoto_servey_data_disptach } from 'app/redux/actions/Hoto_to_servey';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Gp_list from './Gp_list';
import { Box, Typography } from '@mui/material';
import Div from '@jumbo/shared/Div';
import HotoHeader from '../HotoHeader';

const Hoto_servey_data = () => {
    const { hotoServeyDataReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    console.log(hotoServeyDataReducer)

    useEffect(() => {
        dispatch(hoto_servey_data_disptach());
    }, [dispatch])
    return (
        <Box >
            <HotoHeader />
            <Gp_list />
        </Box>
    )
}

export default Hoto_servey_data