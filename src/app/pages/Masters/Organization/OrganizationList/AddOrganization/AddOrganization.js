import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

import HotoHeader from "app/Components/HotoHeader";
import { addOrganization, updateOrganization } from "app/services/apis/master";
import {
  ORGANIZATION_MASTER,
  ORGANIZATION_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { City, State } from "country-state-city";

function AddOrganization() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation(); // ✅ Corrected (only 1 useLocation)
  const states = State.getStatesOfCountry("IN");
  const [cities, setCities] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    organisationName: state?.organisationName || "",
    address: state?.address || "",
    landmark: state?.landmark || "",
    city: state?.city || "",
    state: state?.state || "",
    pincode: state?.pincode || "",
    industryType: state?.industryType || "",
  };

  const validationSchema = yup.object({
    organisationName: yup
      .string("Enter Organisation Name")
      .trim()
      .required("Organisation Name is required"),
    address: yup
      .string("Enter Address")
      .trim()
      .required("Address is required"),
    landmark: yup
      .string("Enter Landmark")
      .trim()
      .required("Landmark is required"),
    city: yup
      .string("Enter City") // ✅ Fixed typo ("Ciry" -> "City")
      .trim()
      .required("City is required"),
    state: yup
      .string("Enter State Name")
      .trim()
      .required("State Name is required"),
    pincode: yup
      .number()
      .typeError("Pincode must be a number")
      .min(0, "Pincode cannot be negative")
      .required("Pincode is required"),
    industryType: yup
      .string("Enter Industry Type")
      .trim()
      .required("Industry Type is required"),
  });

  const onUserSave = async (values) => {
    const body = { ...values };

    setSubmitting(true);
    try {
      if (pathname === ORGANIZATION_MASTER_EDIT) {
        const data = await updateOrganization(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(ORGANIZATION_MASTER);
          Swal.fire({
            icon: "success",
            text: "Organization Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message || "Error while updating Organization",
          });
        }
      } else {
        const data = await addOrganization(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Organization Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(ORGANIZATION_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message || "Error while adding Organization",
          });
        }
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    if (state?.state && cities.length === 0 && Array.isArray(states)) {
      const selectedState = states.find((s) => s.name === state.state);
      if (selectedState) {
        const stateCities = City.getCitiesOfState("IN", selectedState.isoCode);
        setCities(stateCities || []);
      }
    }
  }, [state?.state, states]);


  return (
    <>
      <HotoHeader/>
      <Div sx={{ mt: 0 }}>
        <Div>
          <Formik
            validateOnChange
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={onUserSave}
          >
            {({
              setFieldValue,
              values,
              touched,
              errors,
              setFieldTouched,
            }) => (
              <Form noValidate autoComplete="off">
                <Div sx={{ mt: 4 }}>
                  <Div
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                      columnGap: 5,
                    }}
                  >
                    <Typography variant="h3" fontWeight={600} mb={2}>
                      {pathname === ORGANIZATION_MASTER_EDIT
                        ? "Edit Organisation"
                        : "Add Organisation"}
                    </Typography>

                    <Grid container rowSpacing={2} columnSpacing={3}>
                      {/* Organisation Name */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Organisation Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Organisation Name"
                          name="organisationName"
                          onChange={(e) =>
                            setFieldValue("organisationName", e.target.value)
                          }
                          onBlur={() =>
                            setFieldTouched("organisationName", true)
                          }
                          value={values.organisationName}
                          error={
                            touched.organisationName &&
                            Boolean(errors.organisationName)
                          }
                          helperText={
                            touched.organisationName && errors.organisationName
                          }
                        />
                      </Grid>

                      {/* Address */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Address
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Address"
                          name="address"
                          onChange={(e) => setFieldValue("address", e.target.value)}
                          onBlur={() => setFieldTouched("address", true)}
                          value={values.address}
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>

                      {/* Landmark */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Landmark
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Landmark"
                          name="landmark"
                          onChange={(e) =>
                            setFieldValue("landmark", e.target.value)
                          }
                          onBlur={() => setFieldTouched("landmark", true)}
                          value={values.landmark}
                          error={touched.landmark && Boolean(errors.landmark)}
                          helperText={touched.landmark && errors.landmark}
                        />
                      </Grid>

                      {/* State */}
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6" fontSize="14px" mb={0.5}>
                          State
                        </Typography>
                        <Autocomplete
                          options={states}
                          getOptionLabel={(option) => option.name || ""}
                          value={
                            states.find((s) => s.name === values.state) || null
                          }
                          onChange={(e, newValue) => {
                            if (newValue) {
                              setFieldValue("state", newValue.name);
                              setFieldValue("city", ""); // reset city
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

                      {/* City */}
                      <Grid item xs={12} md={3}>
                        <Typography variant="h6" fontSize="14px" mb={0.5}>
                          City
                        </Typography>
                        <Autocomplete
                          options={cities}
                          getOptionLabel={(option) => option.name || ""}
                          value={
                            cities.find((c) => c.name === values.city) || null
                          }
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

                      {/* Pincode */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Pincode
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Pincode"
                          name="pincode"
                          type="number"
                          onChange={(e) =>
                            setFieldValue("pincode", e.target.value)
                          }
                          onBlur={() => setFieldTouched("pincode", true)}
                          value={values.pincode}
                          error={touched.pincode && Boolean(errors.pincode)}
                          helperText={touched.pincode && errors.pincode}
                        />
                      </Grid>

                      {/* Industry Type */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Industry Type
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Industry Type"
                          name="industryType"
                          onChange={(e) =>
                            setFieldValue("industryType", e.target.value)
                          }
                          onBlur={() => setFieldTouched("industryType", true)}
                          value={values.industryType}
                          error={
                            touched.industryType &&
                            Boolean(errors.industryType)
                          }
                          helperText={
                            touched.industryType && errors.industryType
                          }
                        />
                      </Grid>
                    </Grid>

                    {/* Buttons */}
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
                              navigate(ORGANIZATION_MASTER);
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
                        Submit
                      </LoadingButton>
                    </Div>
                  </Div>
                </Div>
              </Form>
            )}
          </Formik>
        </Div>
      </Div>
    </>
  );
}

export default AddOrganization;
