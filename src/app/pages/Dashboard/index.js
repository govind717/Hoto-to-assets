import Div from "@jumbo/shared/Div";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import CrmDashboard from "./crm/CrmDashboard";
import CryptoDashboard from "./crypto/CryptoDashboard";
import EcommerceDashboard from "./ecommerce/EcommerceDashboard";
import IntranetDashboard from "./intranet/IntranetDashboard";
import ListingDashboard from "./listing/ListingDashboard";
import MiscDashboard from "./misc/MiscDashboard";
import NewsDashboard from "./news/NewsDashboard";
import HotoHeader from "../Hoto_to_Assets/HotoHeader";
// import HeaderTitleHoc from "app/components/HeaderTitleHoc";

const Dashboard = () => {
  const [selectedValue, setSelectedValue] = useState("Package 1");
  return (
    <Div sx={{ mt: -2 }}>
      <HotoHeader
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
      />
      {/* <Div sx={{ mb: 5,mt:2 }}>
        <ListingDashboard />
      </Div> */}
      <Div sx={{ mb: 5, mt: 2 }}>
        <EcommerceDashboard selectedValue={selectedValue} />
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
