import Div from "@jumbo/shared/Div";
import TransferChart from "./TransferPieChart";
import MissingChart from "./MissingPieChart";
import DamagedChart from "./DamagePieChart";
import SemiDamagedChart from "./SemiDamagePieChart";

const { Grid } = require("@mui/material");

const Piecharts = () => {
    return (  
           
        <Grid container spacing={0}>
           
            <Grid item xs={12} md={6} sx={{marginBottom:"24px"}}>
                <Div sx={{ p: 2  ,pl:0 ,pt:0}}>
                    <TransferChart />
                </Div>
            </Grid>

            <Grid item xs={12} md={6} sx={{marginBottom:"24px"}}>
                <Div sx={{ p: 2  ,pr:0 ,pt:0}}>
                    <MissingChart />
                </Div>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginBottom:"24px"}}>
                <Div sx={{ p: 2  ,pl:0 ,pt:0}}>
                    <DamagedChart />
                </Div>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginBottom:"24px"}}>
                <Div sx={{ p: 2  ,pr:0 ,pt:0}}>
                    <SemiDamagedChart />
                </Div>
            </Grid>

           
        </Grid>
);
}

export default Piecharts;