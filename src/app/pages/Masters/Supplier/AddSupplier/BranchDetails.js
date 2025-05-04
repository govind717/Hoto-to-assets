import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import {
  SUPPLIER_MASTER,
  SUPPLIER_MASTER_EDIT,
  WAREHOUSE_MASTER,
  WAREHOUSE_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import {
  addSupplier,
  addWarehouse,
  updateSupplier,
  updateWarehouse,
} from "app/services/apis/master";
import { Country, State, City } from "country-state-city";
function BranchDetails({goToNextTab,goToBackTab,setFinalFormData}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [branches, setBranches] = useState([]);

  const states = State.getStatesOfCountry("IN"); // Replace "IN" if needed
  const [cities, setCities] = useState([]);
  const initialValues = {
    branchName: state?.branchName || "",
    branchLocationName: state?.branchLocationName || "",
    contactPersonName: state?.contactPersonName || "",
    email: state?.email || "",
    phoneNo: state?.phoneNo || "",
    address: state?.address || "",
    state: state?.state || "",
    district: state?.district || "",
    gp: state?.gp || "",
    pincode: state?.pincode || "",
    enterpriseSize: state?.enterpriseSize || "",
  };

  const validationSchema = yup.object({
    branchName: yup
      .string()
      .required("Branch Name is required"),
    
    branchLocationName: yup
      .string()
      .required("Branch Location Name is required"),
    
    contactPersonName: yup
      .string()
      .required("Primary Contact Name is required"),
    
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    
    phoneNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    
    address: yup
      .string()
      .required("Address is required"),
    
    state: yup
      .string()
      .required("State is required"),
    
    district: yup
      .string()
      .required("District is required"),
    
    gp: yup
      .string()
      .required("GP is required"),
    
    pincode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
    
    enterpriseSize: yup
      .string()
      .required("Enterprise Size is required"),
  });
  

  const onUserSave = async (values) => {
    const body = {
      branchName: values?.branchName || "",
    branchLocationName: values?.branchLocationName || "",
    contactPersonName: values?.contactPersonName || "",
    email: values?.email || "",
    phoneNo: values?.phoneNo || "",
    address: values?.address || "",
    state: values?.state || "",
    district: values?.district || "",
    gp: values?.gp || "",
    pincode: values?.pincode || "",
    enterpriseSize: values?.enterpriseSize || "",
    };
    setFinalFormData((prev) => ({
      ...prev,
      branch_details: body
    }));

    goToNextTab();
    
  };

  const handleAddBranch = (values) => {
    const branch = {
      branchName: values.branchName,
      branchLocationName: values.branchLocationName,
      contactPersonName: values.contactPersonName,
      email: values.email,
      phoneNo: values.phoneNo,
      state: values.state,
      district: values.district,
      address: values.address,
      pincode: values.pincode,
      gp: values.gp,
      enterpriseSize: values.enterpriseSize,
    };

    setBranches([...branches, branch]);
  };

  return (
    <Div sx={{ mt: 0 }}>
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onUserSave}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched }) => (
          <Form noValidate autoComplete="off">
            <Div sx={{ mt: 4 }}>
              <Grid container rowSpacing={2} columnSpacing={3}>
                {/* Warehouse Info */}

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Branch Name
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="branchName"
                    placeholder="Enter Branch Name"
                    value={values.branchName}
                    onChange={(e) =>
                      setFieldValue("branchName", e.target.value)
                    }
                    onBlur={() => setFieldTouched("branchName")}
                    error={touched.branchName && Boolean(errors.branchName)}
                    helperText={touched.branchName && errors.branchName}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Branch Location Name
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="branchLocationName"
                    placeholder="Enter Branch Location Name"
                    value={values.branchLocationName}
                    onChange={(e) =>
                      setFieldValue("branchLocationName", e.target.value)
                    }
                    onBlur={() => setFieldTouched("branchLocationName")}
                    error={
                      touched.branchLocationName &&
                      Boolean(errors.branchLocationName)
                    }
                    helperText={
                      touched.branchLocationName && errors.branchLocationName
                    }
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Contact Person Name
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="contactPersonName"
                    placeholder="Enter Primary Contact Name"
                    value={values.contactPersonName}
                    onChange={(e) =>
                      setFieldValue("contactPersonName", e.target.value)
                    }
                    onBlur={() => setFieldTouched("contactPersonName")}
                    error={
                      touched.contactPersonName &&
                      Boolean(errors.contactPersonName)
                    }
                    helperText={
                      touched.contactPersonName && errors.contactPersonName
                    }
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Email
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    onBlur={() => setFieldTouched("email")}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Phone No.
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="phoneNo"
                    placeholder="Enter Phone N0."
                    value={values.phoneNo}
                    onChange={(e) => setFieldValue("phoneNo", e.target.value)}
                    onBlur={() => setFieldTouched("phoneNo")}
                    error={touched.phoneNo && Boolean(errors.phoneNo)}
                    helperText={touched.phoneNo && errors.phoneNo}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Address
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="address"
                    placeholder="Enter Address"
                    value={values.address}
                    onChange={(e) => setFieldValue("address", e.target.value)}
                    onBlur={() => setFieldTouched("address")}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px" mb={0.5}>
                    State
                  </Typography>
                  <Autocomplete
                    options={states}
                    getOptionLabel={(option) => option.name || ""}
                    value={
                      states.find((state) => state.name === values.state) ||
                      null
                    }
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setFieldValue("state", newValue.name);
                        setFieldValue("city", ""); // Clear city when state changes
                        const stateCities = City.getCitiesOfState(
                          "IN",
                          newValue.isoCode
                        );
                        setCities(stateCities || []);
                      } else {
                        setFieldValue("state", "");
                        setFieldValue("city", "");
                        setCities([]);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        placeholder="Select State"
                        name="state"
                        error={touched.state && Boolean(errors.state)}
                        helperText={touched.state && errors.state}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    District
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="district"
                    placeholder="Enter District"
                    value={values.district}
                    onChange={(e) => setFieldValue("district", e.target.value)}
                    onBlur={() => setFieldTouched("district")}
                    error={touched.district && Boolean(errors.district)}
                    helperText={touched.district && errors.district}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    GP
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="gp"
                    placeholder="Enter GP"
                    value={values.gp}
                    onChange={(e) => setFieldValue("gp", e.target.value)}
                    onBlur={() => setFieldTouched("gp")}
                    error={touched.gp && Boolean(errors.gp)}
                    helperText={touched.gp && errors.gp}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Pincode
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="pincode"
                    placeholder="Enter Pincode"
                    value={values.pincode}
                    onChange={(e) => setFieldValue("pincode", e.target.value)}
                    onBlur={() => setFieldTouched("pincode")}
                    error={touched.pincode && Boolean(errors.pincode)}
                    helperText={touched.pincode && errors.pincode}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Enterprise Size
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="enterpriseSize"
                    placeholder="Enter Enterprise Size"
                    value={values.enterpriseSize}
                    onChange={(e) =>
                      setFieldValue("enterpriseSize", e.target.value)
                    }
                    onBlur={() => setFieldTouched("enterpriseSize")}
                    error={
                      touched.enterpriseSize && Boolean(errors.enterpriseSize)
                    }
                    helperText={touched.enterpriseSize && errors.enterpriseSize}
                  />
                </Grid>
                <Grid container>
                  <Grid
                    item
                    xs={6}
                    md={3}
                    sx={{
                      marginLeft: "auto",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddBranch(values)}
                      sx={{
                        mt: 2,
                        padding: "5px 8px",
                        fontSize:"12px",
                        "&:hover": { backgroundColor: "#53B8CA" },
                      }}
                    >
                      Add Branch
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#53B8CA" }}>
                    <TableRow>
                      <TableCell sx={{ padding: "8px" }}>Sr No</TableCell>
                      <TableCell sx={{ padding: "8px" }}>Branch Name</TableCell>
                      <TableCell sx={{ padding: "8px" }}>Location</TableCell>
                      <TableCell sx={{ padding: "8px" }}>
                        Contact Person
                      </TableCell>
                      <TableCell sx={{ padding: "8px" }}>Email</TableCell>
                      <TableCell sx={{ padding: "8px" }}>Phone No.</TableCell>
                      <TableCell sx={{ padding: "8px" }}>State</TableCell>
                      <TableCell sx={{ padding: "8px" }}>Address</TableCell>
                      <TableCell sx={{ padding: "8px" }}>Pincode</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {branches.map((branch, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ padding: "8px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.branchName || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.branchLocationName || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.contactPersonName || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.email || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.phoneNo || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.state || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.address || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.pincode || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Div
                sx={{
                  width: "93.5%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  mt: 3,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={goToBackTab}
                >
                  Back
                </Button>

                <LoadingButton
                  size="small"
                  variant="contained"
                  type="submit"
                  sx={{
                    width: "100px",
                    "&:hover": { backgroundColor: "#53B8CA" },
                  }}
                  loading={isSubmitting}
                >
                  Next
                </LoadingButton>
              </Div>
            </Div>
          </Form>
        )}
      </Formik>
    </Div>
  );
}

export default BranchDetails;
