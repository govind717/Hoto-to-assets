import React from 'react';
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import { ASSET_IMAGES } from "../../utils/constants/paths";
import { Typography } from '@mui/material';


const Logo = ({ mini, mode, sx }) => {
    return (
        <Div sx={{ display: "inline-flex", ...sx }}>
            <Link href={'/dashboards/users'}>
                {
                    // !mini ?
                    //     <img src={ mode === "light" ? `${ASSET_IMAGES}/logo.png` : `${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
                    //     :
                    //     <img src={mode === "light" ? `${ASSET_IMAGES}/logo-short.png` : `${ASSET_IMAGES}/logo-short-white.png`} alt="Jumbo React" />
                }
            </Link>
            <Typography variant='h4' sx={{fontWeight:"500",m:0}}>Hoto To Assets</Typography>
        </Div>
    );
};

Logo.defaultProps = {
    mode: "light"
};

export default Logo;
