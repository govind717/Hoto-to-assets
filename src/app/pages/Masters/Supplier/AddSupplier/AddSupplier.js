import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import { useState } from "react";
import SupplierDetails from "./SupplierDetails";
import { useLocation } from "react-router-dom";
import { SUPPLIER_MASTER_EDIT } from "app/utils/constants/routeConstants";
import BranchDetails from "./BranchDetails";
import Material from "./Material";
import KYC from "./KYC";
function AddSupplier() {
  const [value, setValue] = useState("1");
  const { state, pathname } = useLocation();
  const initialstate={
    supplier_details:{},
    branch_details:{},  
    kyc_details:{},
    material_details:{}
  }
  const [finalFormData,setFinalFormData]=useState(initialstate);
  console.log("finalFormData",finalFormData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goToNextTab = () => {
    if (value === "1") setValue("2");
    else if (value === "2") setValue("3");
    else if (value === "3") setValue("4");
    // If needed, you can control what happens after last tab
  };

  const goToBackTab = () => {
    if (value === "2") setValue("1");
    else if (value === "3") setValue("2");
    else if (value === "4") setValue("3");
    // If needed, you can control what happens after last tab
  };
  
  return (
    <>
      <HotoHeader />
      <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
        <Typography variant="h3" fontWeight={600} mt={2}>
          {pathname === SUPPLIER_MASTER_EDIT ? "Edit Supplier" : "Add Supplier"}
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList  aria-label="lab API tabs example">
              <Tab label="Supplier Details" value="1" />
              <Tab label="Branch Details" value="2" />
              <Tab label="KYC" value="3" />
              <Tab label="Material" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <SupplierDetails goToNextTab={goToNextTab} setFinalFormData={setFinalFormData} />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <BranchDetails goToNextTab={goToNextTab} setFinalFormData={setFinalFormData} goToBackTab={goToBackTab}/>
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0 }}>
            <KYC goToNextTab={goToNextTab} setFinalFormData={setFinalFormData} goToBackTab={goToBackTab}/>
          </TabPanel>
          <TabPanel value="4" sx={{ p: 0 }}>
            <Material  setFinalFormData={setFinalFormData} goToBackTab={goToBackTab}/>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default AddSupplier;
