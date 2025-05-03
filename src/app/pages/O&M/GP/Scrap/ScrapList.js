import {
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";

import ScrapRequest from "./ScrapRequest";
import ScrapAssignRequest from "./ScrapAssignRequest";

const ScrapList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Scrap Request" />
        <Tab label="Assigned Request" />
      </Tabs>

      {tabIndex === 0 && <ScrapRequest />}

      {tabIndex === 1 && <ScrapAssignRequest />}
    </>
  );
};

export default ScrapList;
