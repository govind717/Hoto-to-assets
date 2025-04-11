import Div from '@jumbo/shared/Div'
import { Box, Typography } from '@mui/material'
import React from 'react'

const HotoHeader = () => {
    return (
        <Div
            sx={{
                border: "2px solid #E78F5D",
                borderRadius: "10px",
                // my:1
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.5, px: 2.5, }}>
                <Div>
                    <Typography sx={{ border: "1px solid #b0bAC9", color: "#53B8CA", py: 1, px: 2, borderRadius: "10px", mb: 0 }} variant='h3'>Inventory & Assets Tracking Management</Typography>
                </Div>
                <Div>
                    <Typography sx={{ border: "1px solid #b0bAC9", color: "#53B8CA", py: 1, px: 2, borderRadius: "10px", mb: 0 }} variant='h3'>Package 3</Typography>
                </Div>
            </Box>
        </Div>
    )
}

export default HotoHeader