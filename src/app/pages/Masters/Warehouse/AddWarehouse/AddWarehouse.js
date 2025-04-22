import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Grid,
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
import { WAREHOUSE_MASTER, WAREHOUSE_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { addWarehouse, updateWarehouse } from "app/services/apis/master";

function AddWarehouse() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    warehouseName: state?.warehouseName ? state.warehouseName : "",
    state: state?.state ? state.state : "",
    location: state?.location ? state.location : "",
    pincode: state?.pincode ? state.pincode : "",
    warehouseIncharge: state?.warehouseIncharge ? state.warehouseIncharge : "",
    contactNo: state?.contactNo ? state.contactNo : "",
    email: state?.email ? state.email : "",
  };

  const validationSchema = yup.object({
    warehouseName: yup
      .string("Enter Warehouse Name")
      .trim()
      .required("Warehouse Name is required"),

    state: yup.string("Enter State").trim().required("State is required"),

    location: yup
      .string("Enter Location")
      .trim()
      .required("Location is required"),

    pincode: yup
      .string("Enter Pincode")
      .trim()
      .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
      .required("Pincode is required"),

    warehouseIncharge: yup
      .string("Enter Warehouse Incharge")
      .trim()
      .required("Warehouse Incharge is required"),

    contactNo: yup
      .string("Enter Contact Number")
      .trim()
      .matches(/^\d{10}$/, "Contact Number must be a 10-digit number")
      .required("Contact Number is required"),

    email: yup
      .string("Enter Email")
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      warehouseName: values?.warehouseName,
      state: values?.state,
      location: values?.location,
      pincode: values?.pincode,
      warehouseIncharge: values?.warehouseIncharge,
      contactNo: values?.contactNo,
      email: values?.email,
    };

    setSubmitting(true);
    try {
      if (pathname === WAREHOUSE_MASTER_EDIT) {
        const data = await updateWarehouse(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(WAREHOUSE_MASTER);
          Swal.fire({
            icon: "success",
            text: "Warehouse Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Warehouse",
            // text: "",
          });
        }
      } else {
        const data = await addWarehouse(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Warehouse Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(WAREHOUSE_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Warehouse",
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
                      Add Warehouse
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Warehouse Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Warehouse Name"
                          name="warehouseName"
                          onChange={(e) =>
                            setFieldValue("warehouseName", e.target.value)
                          }
                          onBlur={() => setFieldTouched("warehouseName", true)}
                          value={values?.warehouseName}
                          error={
                            touched?.warehouseName &&
                            Boolean(errors?.warehouseName)
                          }
                          helperText={
                            touched?.warehouseName && errors?.warehouseName
                          }
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
                          Location
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Location"
                          name="location"
                          onChange={(e) =>
                            setFieldValue("location", e.target.value)
                          }
                          onBlur={() => setFieldTouched("location", true)}
                          value={values?.location}
                          error={touched?.location && Boolean(errors?.location)}
                          helperText={touched?.location && errors?.location}
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
                          Warehouse Incharge
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Warehouse Incharge"
                          name="warehouseIncharge"
                          onChange={(e) =>
                            setFieldValue("warehouseIncharge", e.target.value)
                          }
                          onBlur={() =>
                            setFieldTouched("warehouseIncharge", true)
                          }
                          value={values?.warehouseIncharge}
                          error={
                            touched?.warehouseIncharge &&
                            Boolean(errors?.warehouseIncharge)
                          }
                          helperText={
                            touched?.warehouseIncharge &&
                            errors?.warehouseIncharge
                          }
                        />
                      </Grid>

                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Contact Number
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Contact Number"
                          name="contactNo"
                          onChange={(e) =>
                            setFieldValue("contactNo", e.target.value)
                          }
                          onBlur={() => setFieldTouched("contactNo", true)}
                          value={values?.contactNo}
                          error={
                            touched?.contactNo && Boolean(errors?.contactNo)
                          }
                          helperText={touched?.contactNo && errors?.contactNo}
                        />
                      </Grid>

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
export default AddWarehouse;
