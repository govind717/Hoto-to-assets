import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import MasterApis from "app/Apis/master";
import HotoHeader from "app/Components/HotoHeader";

import { addDepartment, updateDepartment } from "app/services/apis/master";
import {
  DEPARTMENT_MASTER,
  DEPARTMENT_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function AddDepartment() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [organisationNameOptions, setOrganisationNameOptions] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    organisationName: state?.organisationName ? state.organisationName : "",
    departmentName: state?.departmentName ? state.departmentName : "",
  };

  const validationSchema = yup.object({
    organisationName: yup.object().nullable()
      .required("Organisation Name is required"),
    departmentName: yup
      .string("Enter Department Name")
      .trim()
      .required("Department Name is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      organisationId: values?.organisationName?._id,
      departmentName: values?.departmentName,
    };

    setSubmitting(true);
    try {
      if (pathname === DEPARTMENT_MASTER_EDIT) {
        const data = await updateDepartment(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(DEPARTMENT_MASTER);
          Swal.fire({
            icon: "success",
            text: "Department Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Department",
            // text: "",
          });
        }
      } else {
        const data = await addDepartment(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Department Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(DEPARTMENT_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Department",
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

  useEffect(() => {
    Axios.get(MasterApis?.organisation?.organisationDropdown)
      .then((res) => {
        const organisations = res?.data?.result || [];
        setOrganisationNameOptions(organisations);
      })
      .catch((err) => console.error("Package Fetch Error: ", err));
  }, []);

  useEffect(() => {
    if (
      organisationNameOptions.length &&
      (!state?.packageId || organisationNameOptions.length || !state?.districtId)
    ) {


      setFormInitialValues({
        organisationName: state?.organisationId
          ? organisationNameOptions.find((opt) => opt?._id === state.organisationId)
          : null,
        departmentName: state?.departmentName || "",
      });
    }
  }, [organisationNameOptions]);
  return (
    <>
      <HotoHeader/>
      <Div sx={{ mt: 0 }}>
        <Div>
          {
            formInitialValues &&
            <Formik
              validateOnChange={true}
              initialValues={formInitialValues}
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
                        {pathname === DEPARTMENT_MASTER_EDIT ? "Edit Department" : "Add Department"}
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" fontSize="14px">
                            Organization Name
                          </Typography>
                          <Autocomplete
                            size="small"
                            options={organisationNameOptions}
                            getOptionLabel={(option) => option.organisationName || ""}
                            isOptionEqualToValue={(opt, val) => opt?._id === val.id}
                            value={values.organisationName}
                            onChange={(_, value) => {
                              setFieldValue("organisationName", value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Organisation Name"
                                error={
                                  touched.organisationName && Boolean(errors.organisationName)
                                }
                                helperText={touched.organisationName && errors.organisationName}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={6} md={6}>
                          <Typography variant="h6" fontSize="14px">
                            Department Name
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Department Name"
                            name="departmentName"
                            onChange={(e) =>
                              setFieldValue("departmentName", e.target.value)
                            }
                            onBlur={() => setFieldTouched("departmentName", true)}
                            value={values?.departmentName}
                            error={
                              touched?.departmentName &&
                              Boolean(errors?.departmentName)
                            }
                            helperText={
                              touched?.departmentName && errors?.departmentName
                            }
                          />
                        </Grid>
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
                              navigate(DEPARTMENT_MASTER);
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
          }
        </Div>
      </Div>
    </>
  );
}
export default AddDepartment;
