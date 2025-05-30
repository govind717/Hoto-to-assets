import {
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import ReplacementAssignRequest from "./ReplacementAssignRequest";
import ReplacementRequest from "./ReplacementRequest";

const ReplacementList = () => {
  const [tabIndex, setTabIndex] = useState(
    Number(sessionStorage.getItem("oandmBlockReplacementTab")) || 0
  );
  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
    sessionStorage.setItem("oandmBlockReplacementTab", newValue);
  };

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Replacement Request" />
        <Tab label="Assigned" />
      </Tabs>

      {tabIndex === 0 && <ReplacementRequest />}

      {tabIndex === 1 && <ReplacementAssignRequest />}
    </>
  );
};

export default ReplacementList;
