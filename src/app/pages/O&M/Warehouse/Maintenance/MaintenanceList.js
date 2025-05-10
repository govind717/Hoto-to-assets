import {
  Tab,
  Tabs,
} from "@mui/material";
import MaintenanceRequest from "./MaintenanceRequest";
import MaintenanceAssignRequest from "./MaintenanceAssignRequest";
import { useState } from "react";


const MaintenanceList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Maintenance Request" />
        <Tab label="Assigned" />
      </Tabs>

      {tabIndex === 0 && <MaintenanceRequest />}

      {tabIndex === 1 && <MaintenanceAssignRequest/>}
    </>
  );
};

export default MaintenanceList;
