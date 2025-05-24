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
import { addDistrict, updateDistrict } from "app/services/apis/master";
import {
  DISTRICT_MASTER,
  DISTRICT_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function AddDistrict() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [packageList, setPackageList] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState({
    packageName: state?.packageName || "",
    district: state?.district || "",
    districtCode: state?.districtCode || "",
  });

  const validationSchema = yup.object({
    packageName: yup
      .object().nullable()
      .required("Package Name is required"),
    district: yup
      .string("Enter District")
      .trim()
      .required("District is required"),
    districtCode: yup
      .string("Enter District Code")
      .trim()
      .required("District Code is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      packageId: values?.packageName._id,
      district: values?.district,
      districtCode: values?.districtCode,
    };

    setSubmitting(true);
    try {
      if (pathname === DISTRICT_MASTER_EDIT) {
        const data = await updateDistrict(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(DISTRICT_MASTER);
          Swal.fire({
            icon: "success",
            text: "District Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating District",
          });
        }
      } else {
        const data = await addDistrict(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "District Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(DISTRICT_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding District",
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
    (async () => {
      Axios.get(MasterApis?.package?.packageDropdown)
        .then((success) => {
          setPackageList(success?.data?.result);
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    })();
    return () => { };
  }, []);

  useEffect(() => {
    if (packageList.length && state) {
      setFormInitialValues({
        packageName: state?.packageId
          ? packageList.find((opt) => opt._id === state.packageId)
          : "",
        district: state?.district || "",
        districtCode: state?.districtCode || "",
      });
    }
  }, [packageList, state]);

  return (
    <>
      <HotoHeader/>
      <Div sx={{ mt: 0 }}>
        <Div>
          <Formik
            validateOnChange={true}
            initialValues={formInitialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onUserSave}
          >
            {({ setFieldValue, values, touched, errors, setFieldTouched }) => (
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
                      {pathname === DISTRICT_MASTER_EDIT
                        ? "Edit District"
                        : "Add District"}
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontSize="14px">
                          Package Name
                        </Typography>
                        <Autocomplete
                          size="small"
                          options={packageList}
                          getOptionLabel={(option) => option.packageName || ""}
                          isOptionEqualToValue={(opt, val) => opt?._id === val.id}
                          value={values.packageName}
                          onChange={(_, value) => {
                            setFieldValue("packageName", value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Package"
                              error={
                                touched.packageName &&
                                Boolean(errors.packageName)
                              }
                              helperText={
                                touched.packageName && errors.packageName
                              }
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={6} md={4}>
                        <Typography variant="h6" fontSize="14px">
                          District
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter District Name"
                          name="district"
                          onChange={(e) =>
                            setFieldValue("district", e.target.value)
                          }
                          onBlur={() => setFieldTouched("district", true)}
                          value={values?.district}
                          error={touched?.district && Boolean(errors?.district)}
                          helperText={touched?.district && errors?.district}
                        />
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Typography variant="h6" fontSize="14px">
                          District Code
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter District Code"
                          name="districtCode"
                          onChange={(e) =>
                            setFieldValue("districtCode", e.target.value)
                          }
                          onBlur={() => setFieldTouched("districtCode", true)}
                          value={values?.districtCode}
                          error={
                            touched?.districtCode &&
                            Boolean(errors?.districtCode)
                          }
                          helperText={
                            touched?.districtCode && errors?.districtCode
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
                            navigate(DISTRICT_MASTER);
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

export default AddDistrict;
