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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import {
  SUPPLIER_MASTER,
} from "app/utils/constants/routeConstants";

import { Country, State, City } from "country-state-city";
import { Axios } from "index";
import MasterApis from "app/Apis/master";
function SupplierDetails({goToNextTab,setFinalFormData}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [gpOptions, setGpOptions] = useState([]);
  const states = State.getStatesOfCountry("IN"); // Replace "IN" if needed
  const initialValues = {
    supplierName: state?.supplierName || "",
    registrationNo: state?.registrationNo || "",
    taxIdentificationNo: state?.taxIdentificationNo || "",
    supplierType: state?.supplierType || "",
    primaryContactName: state?.primaryContactName || "",
    email: state?.email || "",
    phoneNo: state?.phoneNo || "",
    address: state?.address || "",
    state: state?.state || "",
    district: state?.district || null,
    gp: state?.gp || null,
    pincode: state?.pincode || "",
    yearEstablished: state?.yearEstablished || "",
    ownershipStructure: state?.ownershipStructure || "",
    enterpriseSize: state?.enterpriseSize || "",
  };

  const validationSchema = yup.object({
    supplierName: yup.string().required("Supplier Name is required"),
    registrationNo: yup.string().required("Registration No. is required"), // Optional, no validation written in form
    taxIdentificationNo: yup.string().required('Tax Identification No. is required'), // Optional
    supplierType: yup.string().required("Supplier Type is required"),
    primaryContactName: yup.string().required("Primary Contact No. is required"), // Optional
    email: yup.string().email("Invalid email format").required("Email is required"), // Optional but should be email if given
    phoneNo: yup.string().matches(/^[0-9]{10}$/, "Phone No. must be 10 digits").required("Phone Number is required"), // Optional, but format if filled
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    district: yup.object().nullable().required("District is required"),
    gp: yup.object().nullable().required("Gp is required"), // GP field exists, but no validation shown
    pincode: yup
      .string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    yearEstablished: yup.string().required("Year Established is required"), // Optional
    ownershipStructure: yup.string().required("Ownership Structure is required"), // Optional
    enterpriseSize: yup.string().required("Enterprise Size is required"), // Optional
  });

  const onUserSave = async (values) => {
    const body = {
    supplierName: values?.supplierName || "",
    registrationNo: values?.registrationNo || "",
    taxIdentificationNo: values?.taxIdentificationNo || "",
    supplierType: values?.supplierType || "",
    primaryContactName: values?.primaryContactName || "",
    email: values?.email || "",
    phoneNo: values?.phoneNo || "",
    address: values?.address || "",
    state: values?.state || "",
    district: values?.district || null,
    gp: values?.gp || null,
    pincode: values?.pincode || "",
    yearEstablished: values?.yearEstablished || "",
    ownershipStructure: values?.ownershipStructure || "",
    enterpriseSize: values?.enterpriseSize || "",
    };
    setFinalFormData((prev) => ({
      ...prev,
      supplier_details: body
    }));
    
    goToNextTab()
   
  };

  useEffect(() => {
    Axios.get(MasterApis?.district?.districtDropdown)
      .then((res) => {
        setDistrictOptions(res?.data?.result);
      })
      .catch((err) => {
        console.log("Error occur while fetching district dropdown", err);
      });
    Axios.get(MasterApis?.gp?.gpDropdown)
      .then((res) => {
        setGpOptions(res?.data?.result);
      })
      .catch((err) => {
        console.log("Error occur while fetching district dropdown", err);
      });
  }, []);
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
                    Supplier Name
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="supplierName"
                    placeholder="Enter Supplier Name"
                    value={values.supplierName}
                    onChange={(e) =>
                      setFieldValue("supplierName", e.target.value)
                    }
                    onBlur={() => setFieldTouched("supplierName")}
                    error={touched.supplierName && Boolean(errors.supplierName)}
                    helperText={touched.supplierName && errors.supplierName}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Registration No.
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="registrationNo"
                    placeholder="Enter Registration No"
                    value={values.registrationNo}
                    onChange={(e) =>
                      setFieldValue("registrationNo", e.target.value)
                    }
                    onBlur={() => setFieldTouched("registrationNo")}
                    error={
                      touched.registrationNo && Boolean(errors.registrationNo)
                    }
                    helperText={touched.registrationNo && errors.registrationNo}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Tax Identification No.
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="taxIdentificationNo"
                    placeholder="Enter Tax Identification No."
                    value={values.taxIdentificationNo}
                    onChange={(e) =>
                      setFieldValue("taxIdentificationNo", e.target.value)
                    }
                    onBlur={() => setFieldTouched("taxIdentificationNo")}
                    error={
                      touched.taxIdentificationNo &&
                      Boolean(errors.taxIdentificationNo)
                    }
                    helperText={
                      touched.taxIdentificationNo && errors.taxIdentificationNo
                    }
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Supplier Type
                  </Typography>
                  <Autocomplete
                    options={["zonal", "district"]}
                    value={values?.supplierType || ""}
                    onChange={(e, newValue) =>
                      setFieldValue("supplierType", newValue)
                    }
                    onBlur={() => setFieldTouched("supplierType", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Sypplier Type"
                        error={
                          touched?.supplierType && Boolean(errors?.supplierType)
                        }
                        helperText={
                          touched?.supplierType && errors?.supplierType
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Primary Contact Name
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="primaryContactName"
                    placeholder="Enter Primary Contact Name"
                    value={values.primaryContactName}
                    onChange={(e) =>
                      setFieldValue("primaryContactName", e.target.value)
                    }
                    onBlur={() => setFieldTouched("primaryContactName")}
                    error={
                      touched.primaryContactName &&
                      Boolean(errors.primaryContactName)
                    }
                    helperText={
                      touched.primaryContactName && errors.primaryContactName
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
                    placeholder="Enter Phone Number"
                    value={values.phoneNo}
                    onChange={(e) => setFieldValue("phoneNo", e.target.value)}
                    onBlur={() => setFieldTouched("phoneNo")}
                    error={touched.phoneNo && Boolean(errors.phoneNo)}
                    helperText={touched.phoneNo && errors.phoneNo}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Main Address
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
                    onBlur={() => setFieldTouched("state")}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setFieldValue("state", newValue.name);
                        const stateCities = City.getCitiesOfState(
                          "IN",
                          newValue.isoCode
                        );
                      } else {
                        setFieldValue("state", "");
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
                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    District
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={districtOptions}
                    getOptionLabel={(option) => option.district || ""}
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    value={values.district}
                    onChange={(_, value) => setFieldValue("district", value)}
                    onBlur={() => setFieldTouched("district")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select District"
                        error={touched.district && Boolean(errors.district)}
                        helperText={touched.district && errors.district}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    GP
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={gpOptions}
                    getOptionLabel={(option) => option.gpName || ""}
                    value={values.gp}
                    onChange={(_, value) => setFieldValue("gp", value)}
                    onBlur={() => setFieldTouched("gp")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select GP"
                        error={touched.gp && Boolean(errors.gp)}
                        helperText={touched.gp && errors.gp}
                      />
                    )}
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
                    Year Established
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="yearEstablished"
                    placeholder="Enter Year Established"
                    value={values.yearEstablished}
                    onChange={(e) =>
                      setFieldValue("yearEstablished", e.target.value)
                    }
                    onBlur={() => setFieldTouched("yearEstablished")}
                    error={
                      touched.yearEstablished && Boolean(errors.yearEstablished)
                    }
                    helperText={
                      touched.yearEstablished && errors.yearEstablished
                    }
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Ownership Structure
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="ownershipStructure"
                    placeholder="Enter Ownership Structure"
                    value={values.ownershipStructure}
                    onChange={(e) =>
                      setFieldValue("ownershipStructure", e.target.value)
                    }
                    onBlur={() => setFieldTouched("ownershipStructure")}
                    error={
                      touched.ownershipStructure &&
                      Boolean(errors.ownershipStructure)
                    }
                    helperText={
                      touched.ownershipStructure && errors.ownershipStructure
                    }
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
              </Grid>

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
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure you want to cancel?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      cancelButtonText: "No",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(SUPPLIER_MASTER);
                      }
                    });
                  }}
                >
                  Cancel
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

export default SupplierDetails;
