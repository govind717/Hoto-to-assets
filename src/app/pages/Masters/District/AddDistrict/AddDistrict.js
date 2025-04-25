import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
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
import {
  DISTRICT_MASTER,
  DISTRICT_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { addDistrict, updateDistrict } from "app/services/apis/master";
import { Axios } from "index";
import MasterApis from "app/Apis/master";

function AddDistrict() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [packageList, setPackageList] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    packageName: state?.packageName ? state.packageName : "",
    district: state?.district ? state.district : "",
    districtCode: state?.districtCode ? state.districtCode : "",
  };

  const validationSchema = yup.object({
    packageName: yup
      .string("Enter Package Name")
      .trim()
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
      packageName: values?.packageName,
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
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating District",
            // text: "",
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
    (async () => {
      Axios.get(MasterApis?.package?.packageDropdown)
        .then((success) => {
          setPackageList(success?.data?.result);
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    })();
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
                      Add District
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={4}>
                        <Typography variant="h6" fontSize="14px">
                          Package Name
                        </Typography>
                        <Autocomplete
                          size="small"
                          fullWidth
                          options={packageList}
                          getOptionLabel={(option) => option.packageName || ""}
                          onChange={(event, newValue) => {
                            setFieldValue("packageName", newValue?.id || ""); 
                          }}
                          onBlur={() => setFieldTouched("packageName", true)}
                          value={
                            packageList.find(
                              (pkg) => pkg.id === values?.packageName
                            ) || null
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Package"
                              error={
                                touched?.packageName &&
                                Boolean(errors?.packageName)
                              }
                              helperText={
                                touched?.packageName && errors?.packageName
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
