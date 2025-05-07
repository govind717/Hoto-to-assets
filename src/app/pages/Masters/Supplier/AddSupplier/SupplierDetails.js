import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { SUPPLIER_MASTER } from "app/utils/constants/routeConstants";

import { Country, State, City } from "country-state-city";
import { Axios } from "index";
import MasterApis from "app/Apis/master";
const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "150px",
  verticalAlign: "middle",
};
function SupplierDetails({ goToNextTab, setFinalFormData }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const states = State.getStatesOfCountry("IN");
  const [cities, setCities] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [contactPersonInput, setContactPersonInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });

  const [contactPersons, setContactPersons] = useState(
    state?.contactPerson || []
  );

  const initialValues = {
    supplierName: state?.supplierName || "",
    onBoardingDate: state?.onBoardingDate || "",
    email: state?.email || "",
    phoneNumber: state?.phoneNumber || "",
    panNo: state?.panNo || "",
    gstNo: state?.gstNo || "",
    address: state?.address || "",
    country: state?.country || "",
    state: state?.state || "",
    city: state?.city || "",
    materials: state?.materials || [],
    contactPerson: state?.contactPerson || [],
  };

  const validationSchema = yup.object({
    supplierName: yup.string().required("Supplier Name is required"),
    onBoardingDate: yup.string().required("on Boarding Date is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"), // Optional but should be email if given
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone No. must be 10 digits")
      .required("Phone Number is required"), // Optional, but format if filled
    panNo: yup.string().required("Pan Number is required"),
    gstNo: yup.string().required("GST Number is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("State is required"),
    materials: yup
      .array()
      .min(1, "At least one material is required")
      .required("Material is required"),

    contactPerson: yup
      .array()
      .min(1, "At least one contact person is required")
      .required("Contact person is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      ...values,
      country: "India",
      materials: values?.materials.map((material) => material._id),
      contactPerson: contactPersons,
    };
    setFinalFormData((prev) => ({
      ...prev,
      supplier_details: body,
    }));
    goToNextTab();
  };

  useEffect(() => {
    Axios.get("/master/material/dropdown")
      .then((result) => {
        setMaterialOptions(result?.data?.result);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  const handleStateChange = (newValue, setFieldValue) => {
    if (newValue) {
      setFieldValue("state", newValue.name);
      const stateCities = City.getCitiesOfState("IN", newValue.isoCode);
      setCities(stateCities);
      setFieldValue("city", "");
    } else {
      setFieldValue("state", "");
      setCities([]);
      setFieldValue("city", "");
    }
  };

  const handleAddContactPerson = (setFieldValue) => {
    const { firstName, lastName, email, mobileNumber } = contactPersonInput;
    if (!firstName || !lastName || !email || !mobileNumber) {
      Swal.fire("Error", "All contact fields are required", "error");
      return;
    }
    setContactPersons([...contactPersons, contactPersonInput]);
    setFieldValue("contactPerson", [...contactPersons, contactPersonInput]);
    setContactPersonInput({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
    });
  };

  const handleRemoveContactPerson = (index, setFieldValue) => {
    const updated = contactPersons.filter((_, i) => i !== index);
    setFieldValue("contactPerson", updated);
    setContactPersons(updated);
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
                    On Boarding Date
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    type="date"
                    name="onBoardingDate"
                    onChange={(e) => setFieldValue("onBoardingDate", e.target.value)}
                    onBlur={() => setFieldTouched("onBoardingDate", true)}
                    value={values?.onBoardingDate}
                    error={touched?.onBoardingDate && Boolean(errors?.onBoardingDate)}
                    helperText={touched?.onBoardingDate && errors?.onBoardingDate}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Phone Number
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={values.phoneNumber}
                    onChange={(e) =>
                      setFieldValue("phoneNumber", e.target.value)
                    }
                    onBlur={() => setFieldTouched("phoneNumber")}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
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
                    Pan Number
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="panNo"
                    placeholder="Enter Pan Number"
                    value={values.panNo}
                    onChange={(e) => setFieldValue("panNo", e.target.value)}
                    onBlur={() => setFieldTouched("panNo")}
                    error={touched.panNo && Boolean(errors.panNo)}
                    helperText={touched.panNo && errors.panNo}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    GST Number
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="gstNo"
                    placeholder="Enter GST Number"
                    value={values.gstNo}
                    onChange={(e) => setFieldValue("gstNo", e.target.value)}
                    onBlur={() => setFieldTouched("gstNo")}
                    error={touched.gstNo && Boolean(errors.gstNo)}
                    helperText={touched.gstNo && errors.gstNo}
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
                    value={states.find((s) => s.name === values.state) || null}
                    onBlur={() => setFieldTouched("state")}
                    onChange={(e, newValue) => {
                      handleStateChange(newValue, setFieldValue);
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
                  <Typography variant="h6" fontSize="14px" mb={0.5}>
                    City
                  </Typography>
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name || ""}
                    value={cities.find((c) => c.name === values.city) || null}
                    onBlur={() => setFieldTouched("city")}
                    onChange={(e, newValue) => {
                      if (newValue) {
                        setFieldValue("city", newValue.name);
                      } else {
                        setFieldValue("city", "");
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        placeholder="Select City"
                        name="city"
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px" mb={0.5}>
                    Material
                  </Typography>
                  <Autocomplete
                    multiple
                    options={materialOptions}
                    getOptionLabel={(option) => option?.materialName || ""}
                    value={values.materials || []}
                    onChange={(e, newValue) => {
                      setFieldValue("materials", newValue);
                    }}
                    onBlur={() => setFieldTouched("materials")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        placeholder="Select materials"
                        name="materials"
                        error={touched.materials && Boolean(errors.materials)}
                        helperText={touched.materials && errors.materials}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} mt={3}>
                <Typography variant="h6" fontSize="16px" mb={1}>
                  Contact Person
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={2.4}>
                    <TextField
                      label="First Name"
                      size="small"
                      fullWidth
                      value={contactPersonInput.firstName}
                      onChange={(e) =>
                        setContactPersonInput({
                          ...contactPersonInput,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <TextField
                      label="Last Name"
                      size="small"
                      fullWidth
                      value={contactPersonInput.lastName}
                      onChange={(e) =>
                        setContactPersonInput({
                          ...contactPersonInput,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <TextField
                      label="Email"
                      size="small"
                      fullWidth
                      value={contactPersonInput.email}
                      onChange={(e) =>
                        setContactPersonInput({
                          ...contactPersonInput,
                          email: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <TextField
                      label="Mobile Number"
                      size="small"
                      fullWidth
                      value={contactPersonInput.mobileNumber}
                      onChange={(e) =>
                        setContactPersonInput({
                          ...contactPersonInput,
                          mobileNumber: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={2.4}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAddContactPerson(setFieldValue)}
                      sx={{ my: "2%", minWidth: "100%" }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: "20px" }}>
                  <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#53B8CA" }}>
                        <TableCell
                          align={"left"}
                          sx={{ ...tableCellSx, minWidth: "20%" }}
                        >
                          Firstname
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{ ...tableCellSx, minWidth: "20%" }}
                        >
                          Lastname
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{ ...tableCellSx, minWidth: "20%" }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{ ...tableCellSx, minWidth: "20px" }}
                        >
                          Contact
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{ ...tableCellSx, minWidth: "20px" }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contactPersons?.length > 0 ? (
                        contactPersons.map((person, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell
                                align="left"
                                sx={{
                                  textAlign: "left",
                                  verticalAlign: "middle",
                                  textTransform: "capitalize",
                                }}
                              >
                                {person.firstName || ""}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  textAlign: "left",
                                  verticalAlign: "middle",
                                  textTransform: "capitalize",
                                }}
                              >
                                {person.lastName || ""}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  textAlign: "left",
                                  verticalAlign: "middle",
                                  textTransform: "capitalize",
                                }}
                              >
                                {person.email || ""}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  textAlign: "left",
                                  verticalAlign: "middle",
                                  textTransform: "capitalize",
                                }}
                              >
                                {person.mobileNumber || ""}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  textAlign: "left",
                                  verticalAlign: "middle",
                                  textTransform: "capitalize",
                                }}
                              >
                                <Button
                                  color="error"
                                  variant="outlined"
                                  size="small"
                                  onClick={() =>
                                    handleRemoveContactPerson(
                                      index,
                                      setFieldValue
                                    )
                                  }
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableCell
                          align="left"
                          colSpan={10}
                          sx={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            textTransform: "capitalize",
                          }}
                        >
                          No Contact
                        </TableCell>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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
