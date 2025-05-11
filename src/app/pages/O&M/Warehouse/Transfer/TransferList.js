import {
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import TransferAssignRequest from "./TransferAssignRequest";
import TransferRequest from "./TransferRequest";

const TransferList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Transfer Request" />
        <Tab label="Assigned" />
      </Tabs>

      {tabIndex === 0 && <TransferRequest/>}

      {tabIndex === 1 && <TransferAssignRequest />}
    </>
  );
};

export default TransferList;
