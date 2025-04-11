import { Grid, Typography } from '@mui/material'
import React from 'react'

const TypographyLabel = function ({ label, value }) {
    return <>
        <Typography>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>{label} :- </span>
            {value}
        </Typography>
    </>
}

const Gp_details = ({ gp_details }) => {
    const gp = gp_details?.gp
    return (
        <Grid container>
            <Grid item xl={6} md={6} sm={12}>
                <TypographyLabel label={"GP"} value={gp?.name || "-"} />
                <TypographyLabel label={"Block"} value={gp?.block?.name || "-"} />
                <TypographyLabel label={"District"} value={gp?.district?.name || "-"} />
                <TypographyLabel label={"Coordinates"} value={`${gp?.latitude}, ${gp?.longitude}`} />
            </Grid>
            <Grid item xl={6} md={6} sm={12}>
                <TypographyLabel label={"GP Code"} value={gp?.code || "-"} />
                <TypographyLabel label={"Block Code"} value={gp?.block?.code || "-"} />
                <TypographyLabel label={"District Code"} value={gp?.district?.code || "-"} />
            </Grid>
        </Grid>
    )
}

export default Gp_details