import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import HotoHeader from "app/Components/HotoHeader";

import { addPackage, updatePackage } from "app/services/apis/master";
import {
  PACKAGE_MASTER,
  PACKAGE_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { State } from "country-state-city";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
function AddPackage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const states = State.getStatesOfCountry("IN");
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    packageName: state?.packageName ? state.packageName : "",
    code: state?.code ? state.code : "",
    state: state?.state ? state.state : "",
  };

  const validationSchema = yup.object({
    packageName: yup
      .string("Enter Package Name")
      .trim()
      .required("Package Name is required"),
    code: yup.string("Enter Code").trim().required("Code is required"),
    state: yup.string("Enter State").trim().required("State is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      packageName: values?.packageName,
      code: values?.code,
      state: values?.state,
    };

    setSubmitting(true);
    try {
      if (pathname === PACKAGE_MASTER_EDIT) {
        const data = await updatePackage(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(PACKAGE_MASTER);
          Swal.fire({
            icon: "success",
            text: "Organization Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Photo",
            // text: "",
          });
        }
      } else {
        const data = await addPackage(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Package Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(PACKAGE_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Package",
            // text: "",
          });
        }
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message,
      });
    }
  };

  return (
    <>
      <HotoHeader/>
      <Div sx={{ mt: 0 }}>
        <Div>
          <Formik
            validateOnChange={true}
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onUserSave}
          >
            {({
              setFieldValue,
              values,
              touched,
              errors,
              setFieldTouched,
              setValues,
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
                      {pathname === PACKAGE_MASTER_EDIT
                        ? "Edit Package"
                        : "Add Package"}
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          Package Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Package Name"
                          name="packageName"
                          onChange={(e) =>
                            setFieldValue("packageName", e.target.value)
                          }
                          onBlur={() => setFieldTouched("packageName", true)}
                          value={values?.packageName}
                          error={
                            touched?.packageName && Boolean(errors?.packageName)
                          }
                          helperText={
                            touched?.packageName && errors?.packageName
                          }
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          Package Code
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Code"
                          name="code"
                          onChange={(e) =>
                            setFieldValue("code", e.target.value)
                          }
                          onBlur={() => setFieldTouched("code", true)}
                          value={values?.code}
                          error={
                            touched?.code && Boolean(errors?.code)
                          }
                          helperText={
                            touched?.code && errors?.code
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontSize="14px" mb={0.5}>
                          State
                        </Typography>
                        <Autocomplete
                          options={states}
                          getOptionLabel={(option) => option.name || ""}
                          value={
                            states.find(
                              (state) => state.name === values.state
                            ) || null
                          }
                          onChange={(e, newValue) => {
                            setFieldValue(
                              "state",
                              newValue ? newValue.name : ""
                            );
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
                      {/* 
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          State
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter State"
                          name="state"
                          onChange={(e) =>
                            setFieldValue("state", e.target.value)
                          }
                          onBlur={() => setFieldTouched("state", true)}
                          value={values?.state}
                          error={touched?.state && Boolean(errors?.state)}
                          helperText={touched?.state && errors?.state}
                        />
                      </Grid> */}
                    </Grid>
                  </Div>
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
                            navigate(PACKAGE_MASTER);
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
              </Form>
            )}
          </Formik>
        </Div>
      </Div>
    </>
  );
}
export default AddPackage;
