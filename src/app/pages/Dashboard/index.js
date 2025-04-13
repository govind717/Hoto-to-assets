import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import React from "react";
import CrmDashboard from "./crm/CrmDashboard";
import CryptoDashboard from "./crypto/CryptoDashboard";
import EcommerceDashboard from "./ecommerce/EcommerceDashboard";
import IntranetDashboard from "./intranet/IntranetDashboard";
import ListingDashboard from "./listing/ListingDashboard";
import MiscDashboard from "./misc/MiscDashboard";
import NewsDashboard from "./news/NewsDashboard";
// import HeaderTitleHoc from "app/components/HeaderTitleHoc";

const Dashboard = () => {
  return (
    <Div sx={{ mt: -2 }}>
      <Div sx={{ mb: 5 }}>
        <ListingDashboard />
      </Div>
      <Div sx={{ mb: 5 }}>
        <EcommerceDashboard />
      </Div>
      {/* <Div sx={{ mb: 5 }}>
        <IntranetDashboard/>
      </Div> */}
      {/* <Div sx={{ mb: 5 }}>
        <ListingDashboard />
      </Div> */}
      {/* <Div sx={{ mb: 5 }}>
        <CryptoDashboard />
      </Div> */}
      {/* <Div sx={{ mb: 5 }}>
        <MiscDashboard />
      </Div> */}
      {/* <Div sx={{ mb: 5 }}>
        <NewsDashboard />
      </Div> */}
      {/* <Div>
        <CrmDashboard />
      </Div> */}
    </Div>
  );
};

// export default HeaderTitleHoc(Dashboard,"Dashboard");
export default Dashboard;
