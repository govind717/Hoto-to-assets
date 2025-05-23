import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MasterApis from "app/Apis/master";
import HotoHeader from "app/Components/HotoHeader";
import { addTeam, updateTeam } from "app/services/apis/master";
import {
  TEAM_MASTER,
  TEAM_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function AddTeam() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const validationSchema = yup.object({
    teamName: yup
      .string("Enter Team Name")
      .trim()
      .required("Team Name is required"),
    departmentName: yup
      .object()
      .nullable()
      .required("Department Name is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      departmentId: values?.departmentName._id,
      teamName: values?.teamName,
    };

    setSubmitting(true);
    try {
      if (pathname === TEAM_MASTER_EDIT) {
        const data = await updateTeam(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(TEAM_MASTER);
          Swal.fire({
            icon: "success",
            text: "Team Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Team",
          });
        }
      } else {
        const data = await addTeam(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Team Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(TEAM_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Team",
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
    Axios.get(MasterApis?.department?.departmentDropdown)
      .then((res) => {
        const departments = res?.data?.result || [];
        setDepartmentOptions(departments);
      })
      .catch((err) => console.error("Package Fetch Error: ", err));
  }, []);

  useEffect(() => {
    if (departmentOptions.length) {
      setFormInitialValues({
        departmentName: state?.departmentId
          ? departmentOptions.find((opt) => opt?._id === state.departmentId)
          : null,
        teamName: state?.teamName || "",
      });
    }
  }, [departmentOptions]);

  return (
    <>
      <HotoHeader/>
      <Div sx={{ mt: 0 }}>
        <Div>
          {formInitialValues && (
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
                        {pathname === TEAM_MASTER_EDIT ? "Edit Team" : "Add Team"}
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" fontSize="14px">
                            Department
                          </Typography>
                          <Autocomplete
                            size="small"
                            options={departmentOptions}
                            getOptionLabel={(option) =>
                              option?.departmentName || ""
                            }
                            isOptionEqualToValue={(opt, val) =>
                              opt?._id === val.id
                            }
                            value={values.departmentName}
                            onChange={(_, value) =>
                              setFieldValue("departmentName", value)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Department"
                                error={
                                  touched.departmentName &&
                                  Boolean(errors.departmentName)
                                }
                                helperText={
                                  touched.departmentName &&
                                  errors.departmentName
                                }
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={6} md={6}>
                          <Typography variant="h6" fontSize="14px">
                            Team Name
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Team Name"
                            name="teamName"
                            onChange={(e) =>
                              setFieldValue("teamName", e.target.value)
                            }
                            onBlur={() => setFieldTouched("teamName", true)}
                            value={values?.teamName}
                            error={
                              touched?.teamName && Boolean(errors?.teamName)
                            }
                            helperText={
                              touched?.teamName && errors?.teamName
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
                              navigate(TEAM_MASTER);
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
          )}
        </Div>
      </Div>
    </>
  );
}
export default AddTeam;
