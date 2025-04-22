import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { hoto_servey_data_disptach } from "app/redux/actions/Hoto_to_servey";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import MapLocation from "app/pages/Hoto_to_Assets/MapLocation";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";

function AdduserManagement() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    firstName: state?.firstName || "",
    lastName: state?.lastName || "",
    type: state?.type || "",
    email: state?.email || "",
    password: state?.password || "",
    designation: state?.designation || "",
    role: state?.role || "",
    package: state?.package || "",
  };

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter First Name")
      .trim()
      .required("First Name is required"),
    lastName: yup
      .string("Enter Last Name")
      .trim()
      .required("Last Name is required"),
    type: yup.string("Select a Type").required("Type is required"),
    email: yup
      .string("Enter Email")
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter Password")
      .trim()
      //   .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
    designation: yup
      .string("Enter Designation")
      .trim()
      .required("Designation is required"),
    role: yup.string("Select a Role").required("Role is required"),
    package: yup.string("Select a Package").required("Package is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      organisationName: values?.organisationName,
      address: values?.address,
      landmark: values?.landmark,
      city: values?.city,
      state: values?.state,
      pincode: values?.pincode,
      industryType: values?.industryType,
    };

    setSubmitting(true);
    try {
      if (pathname === "PHOTO_MASTER_EDIT") {
        //   const data = await updatePhoto(form, state?._id);
        const data = {};
        if (data?.data?.statusCode === 200) {
          navigate("PHOTO_MASTER");
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
        //   const data = await addPhoto(form);
        const data = {};
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Organization Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate("PHOTO_MASTER");
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Photo",
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
    (async () => {})();
    return () => {};
  }, []);

  return (
    <>
      <HotoHeader />
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
                      Create User
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      {/* First Name */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          First Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter First Name"
                          name="firstName"
                          onChange={(e) =>
                            setFieldValue("firstName", e.target.value)
                          }
                          onBlur={() => setFieldTouched("firstName", true)}
                          value={values?.firstName}
                          error={
                            touched?.firstName && Boolean(errors?.firstName)
                          }
                          helperText={touched?.firstName && errors?.firstName}
                        />
                      </Grid>

                      {/* Last Name */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Last Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Last Name"
                          name="lastName"
                          onChange={(e) =>
                            setFieldValue("lastName", e.target.value)
                          }
                          onBlur={() => setFieldTouched("lastName", true)}
                          value={values?.lastName}
                          error={touched?.lastName && Boolean(errors?.lastName)}
                          helperText={touched?.lastName && errors?.lastName}
                        />
                      </Grid>

                      {/* Type */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Type
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Type"
                          name="type"
                          onChange={(e) =>
                            setFieldValue("type", e.target.value)
                          }
                          onBlur={() => setFieldTouched("type", true)}
                          value={values?.type}
                          error={touched?.type && Boolean(errors?.type)}
                          helperText={touched?.type && errors?.type}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Email
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Email"
                          name="email"
                          onChange={(e) =>
                            setFieldValue("email", e.target.value)
                          }
                          onBlur={() => setFieldTouched("email", true)}
                          value={values?.email}
                          error={touched?.email && Boolean(errors?.email)}
                          helperText={touched?.email && errors?.email}
                        />
                      </Grid>

                      {/* Password */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Password
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          type="password"
                          placeholder="Enter Password"
                          name="password"
                          onChange={(e) =>
                            setFieldValue("password", e.target.value)
                          }
                          onBlur={() => setFieldTouched("password", true)}
                          value={values?.password}
                          error={touched?.password && Boolean(errors?.password)}
                          helperText={touched?.password && errors?.password}
                        />
                      </Grid>

                      {/* Designation */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Designation
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Designation"
                          name="designation"
                          onChange={(e) =>
                            setFieldValue("designation", e.target.value)
                          }
                          onBlur={() => setFieldTouched("designation", true)}
                          value={values?.designation}
                          error={
                            touched?.designation && Boolean(errors?.designation)
                          }
                          helperText={
                            touched?.designation && errors?.designation
                          }
                        />
                      </Grid>

                      {/* Role */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Role
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Role"
                          name="role"
                          onChange={(e) =>
                            setFieldValue("role", e.target.value)
                          }
                          onBlur={() => setFieldTouched("role", true)}
                          value={values?.role}
                          error={touched?.role && Boolean(errors?.role)}
                          helperText={touched?.role && errors?.role}
                        />
                      </Grid>

                      {/* Package */}
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Package
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Package"
                          name="package"
                          onChange={(e) =>
                            setFieldValue("package", e.target.value)
                          }
                          onBlur={() => setFieldTouched("package", true)}
                          value={values?.package}
                          error={touched?.package && Boolean(errors?.package)}
                          helperText={touched?.package && errors?.package}
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
                            navigate();
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
export default AdduserManagement;
