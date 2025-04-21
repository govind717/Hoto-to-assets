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
import { ORGANIZATION_MASTER, ORGANIZATION_MASTER_EDIT } from "app/utils/constants/routeConstants";

function AddOrganization() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    organisationName: state?.organisationName ? state.organisationName : "",
    address: state?.address ? state.address : "",
    landmark: state?.landmark ? state.landmark : "",
    city: state?.city ? state.city : "",
    state: state?.state ? state.state : "",
    pincode: state?.pincode ? state.pincode : "",
    industryType: state?.industryType ? state.industryType : "",
  };

  const validationSchema = yup.object({
    organisationName: yup
      .string("Enter Organisation Name")
      .trim()
      .required("Organisation Name is required"),
    address: yup.string("Enter Address").trim().required("Address is required"),
    landmark: yup
      .string("Enter Landmark")
      .trim()
      .required("Landmark is required"),
    city: yup.string("Enter Ciry").trim().required("City is required"),
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
      if (pathname === ORGANIZATION_MASTER_EDIT) {
        //   const data = await updatePhoto(form, state?._id);
        const data = {};
        if (data?.data?.statusCode === 200) {
          navigate(ORGANIZATION_MASTER);
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
              : "Error while updating Organization",
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
          navigate(ORGANIZATION_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Organization",
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
                      Add Organisation
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
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
                          value={values?.organisationName}
                          error={
                            touched?.organisationName &&
                            Boolean(errors?.organisationName)
                          }
                          helperText={
                            touched?.organisationName &&
                            errors?.organisationName
                          }
                        />
                      </Grid>

                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Address
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Address"
                          name="address"
                          onChange={(e) =>
                            setFieldValue("address", e.target.value)
                          }
                          onBlur={() => setFieldTouched("address", true)}
                          value={values?.address}
                          error={touched?.address && Boolean(errors?.address)}
                          helperText={touched?.address && errors?.address}
                        />
                      </Grid>

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
                          value={values?.landmark}
                          error={touched?.landmark && Boolean(errors?.landmark)}
                          helperText={touched?.landmark && errors?.landmark}
                        />
                      </Grid>

                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          City
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter City"
                          name="city"
                          onChange={(e) =>
                            setFieldValue("city", e.target.value)
                          }
                          onBlur={() => setFieldTouched("city", true)}
                          value={values?.city}
                          error={touched?.city && Boolean(errors?.city)}
                          helperText={touched?.city && errors?.city}
                        />
                      </Grid>

                      <Grid item xs={6} md={3}>
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
                      </Grid>

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
                          value={values?.pincode}
                          error={touched?.pincode && Boolean(errors?.pincode)}
                          helperText={touched?.pincode && errors?.pincode}
                        />
                      </Grid>

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
                          value={values?.industryType}
                          error={
                            touched?.industryType &&
                            Boolean(errors?.industryType)
                          }
                          helperText={
                            touched?.industryType && errors?.industryType
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
                      sx={{ width: "100px" ,"&:hover":{backgroundColor:"#53B8CA"} }}
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
export default AddOrganization;
