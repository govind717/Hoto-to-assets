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
  SUPPLIER_MASTER_ADD,
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
import { Axios } from "index";
const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "150px",
  verticalAlign: "middle",
};
function BranchDetails({
  goToNextTab,
  goToBackTab,
  finalFormData,
  setFinalFormData,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [branches, setBranches] = useState([]);
  const states = State.getStatesOfCountry("IN"); // Replace "IN" if needed
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
    branchName: "",
    email: "",
    phoneNumber: "",
    panNo: "",
    gstNo: "",
    address: "",
    state: "",
    city: "",
    contactPerson: [],
  };

  const validationSchema = yup.object({
    branchName: yup.string().required("Branch Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    panNo: yup.string().required("Address is required"),
    gstNo: yup.string().required("Address is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
  });

  const onUserSave = async () => {
    if (finalFormData?.branch_details?.length > 0) {
      setSubmitting(true);
      try {
        if (pathname === SUPPLIER_MASTER_ADD) {
          const data = await Axios.post("/master/supplier/add", finalFormData);
          if (data?.data?.statusCode === 201) {
            navigate(SUPPLIER_MASTER);
            Swal.fire({
              icon: "success",
              text: "Supplier Added Successfully",
              timer: 1000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: data?.data?.message || "Error while updating Supplier",
            });
          }
        } else {
          const data = await Axios.post(
            "/master/supplier/update",
            finalFormData
          );
          if (data?.data?.statusCode === 200) {
            Swal.fire({
              icon: "success",
              text: "Supplier Updated Successfully",
              timer: 1000,
              showConfirmButton: false,
            });
            navigate(WAREHOUSE_MASTER);
          } else {
            Swal.fire({
              icon: "error",
              text: data?.data?.message || "Error while adding Supplier",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message || "Something went wrong",
        });
      }
      setSubmitting(false);
    } else {
      Swal.fire({
        icon: "error",
        text: "Add atleast one branch",
      });
    }
  };
 console.log("finalFormData :", finalFormData);
  const handleAddBranch = (values) => {
    const branch = {
      ...values,
      isPrimary: true,
      country: "India",
    };
   
    setBranches([...branches, branch]);
    setFinalFormData((prev) => ({
      ...prev,
      branch_details: [...branches, branch],
    }));
  };
 
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
  const handleRemoveBranch = (index, setFieldValue) => {
    const updated = branches.filter((_, i) => i !== index);
    // setFieldValue("setBranches", updated);
    setBranches(updated);
  };

  return (
    <Div sx={{ mt: 0 }}>
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleAddBranch}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched }) => (
          <Form noValidate autoComplete="off">
            {console.log("values : ", values)}
            <Div sx={{ mt: 4 }}>
              <Grid container rowSpacing={2} columnSpacing={3}>
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
                    Phone No.
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    name="phoneNumber"
                    placeholder="Enter Phone N0."
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
                      sx={{
                        my: "2%",
                        minWidth: "100%",
                        "&:hover": { backgroundColor: "#53B8CA" },
                      }}
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
                    type="submit"
                    sx={{
                      mt: 2,
                      padding: "5px 8px",
                      fontSize: "12px",
                      "&:hover": { backgroundColor: "#53B8CA" },
                    }}
                  >
                    Add Branch
                  </Button>
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
                          {branch.phoneNumber || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.state || "-"}
                        </TableCell>
                        <TableCell sx={{ padding: "8px" }}>
                          {branch.address || "-"}
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
                              handleRemoveBranch(index, setFieldValue)
                            }
                          >
                            Delete
                          </Button>
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
                <Button variant="outlined" size="small" onClick={goToBackTab}>
                  Back
                </Button>

                <LoadingButton
                  size="small"
                  variant="contained"
                  onClick={onUserSave}
                  sx={{
                    width: "100px",
                    "&:hover": { backgroundColor: "#53B8CA" },
                  }}
                  loading={isSubmitting}
                >
                  Submit
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
