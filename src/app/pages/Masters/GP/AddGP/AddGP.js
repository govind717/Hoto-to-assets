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
import { GP_MASTER, GP_MASTER_EDIT } from "app/utils/constants/routeConstants";

function AddGP() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    packageName: state?.packageName || "",
    district: state?.district || "",
    block: state?.block || "",
    gp: state?.gp || "",
    lgdCode: state?.lgdCode || "",
    phase: state?.phase || "",
    latLong: state?.latLong || "",
    gpStatus: state?.gpStatus || "",
    covered: state?.covered || "",
    srStatus: state?.srStatus || "",
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
    block: yup
      .string("Enter Block Name")
      .trim()
      .required("Block Name is required"),
    gp: yup
      .string("Enter GP Name")
      .trim()
      .required("GP Name is required"),
    lgdCode: yup
      .string("Enter LGD Code")
      .trim()
      .required("LGD Code is required"),
    phase: yup
      .string("Enter Phase")
      .trim()
      .required("Phase is required"),
    latLong: yup
      .string("Enter Lat & Long")
      .trim()
      .required("Lat & Long is required"),
    gpStatus: yup
      .string("Enter GP Status")
      .trim()
      .required("GP Status is required"),
    covered: yup
      .string("Enter Covered")
      .trim()
      .required("Covered field is required"),
    srStatus: yup
      .string("Enter SR Status")
      .trim()
      .required("SR Status is required"),
  });
  
  const onUserSave = async (values) => {
    const body = {
      packageName: values?.packageName,
      district: values?.district,
      blockName: values?.blockName,
      blockCode: values?.blockCode,
    };

    setSubmitting(true);
    try {
      if (pathname === GP_MASTER_EDIT) {
        //   const data = await updatePhoto(form, state?._id);
        const data = {};
        if (data?.data?.statusCode === 200) {
          navigate(GP_MASTER);
          Swal.fire({
            icon: "success",
            text: "GP Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating GP",
            // text: "",
          });
        }
      } else {
        //   const data = await addPhoto(form);
        const data = {};
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "GP Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(GP_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding GP",
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
                      Add GP
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Package Name
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Package Name"
                            name="packageName"
                            onChange={(e) =>
                              setFieldValue("packageName", e.target.value)
                            }
                            onBlur={() => setFieldTouched("packageName", true)}
                            value={values?.packageName}
                            error={
                              touched?.packageName &&
                              Boolean(errors?.packageName)
                            }
                            helperText={
                              touched?.packageName && errors?.packageName
                            }
                          />
                        </Grid>

                      
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            District
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter District"
                            name="district"
                            onChange={(e) =>
                              setFieldValue("district", e.target.value)
                            }
                            onBlur={() => setFieldTouched("district", true)}
                            value={values?.district}
                            error={
                              touched?.district && Boolean(errors?.district)
                            }
                            helperText={touched?.district && errors?.district}
                          />
                        </Grid>

                       
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Block
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Block"
                            name="block"
                            onChange={(e) =>
                              setFieldValue("block", e.target.value)
                            }
                            onBlur={() => setFieldTouched("block", true)}
                            value={values?.block}
                            error={touched?.block && Boolean(errors?.block)}
                            helperText={touched?.block && errors?.block}
                          />
                        </Grid>

                       
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            GP
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter GP Name"
                            name="gp"
                            onChange={(e) =>
                              setFieldValue("gp", e.target.value)
                            }
                            onBlur={() => setFieldTouched("gp", true)}
                            value={values?.gp}
                            error={touched?.gp && Boolean(errors?.gp)}
                            helperText={touched?.gp && errors?.gp}
                          />
                        </Grid>

                       
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            LGD Code
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter LGD Code"
                            name="lgdCode"
                            onChange={(e) =>
                              setFieldValue("lgdCode", e.target.value)
                            }
                            onBlur={() => setFieldTouched("lgdCode", true)}
                            value={values?.lgdCode}
                            error={touched?.lgdCode && Boolean(errors?.lgdCode)}
                            helperText={touched?.lgdCode && errors?.lgdCode}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Phase
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Phase"
                            name="phase"
                            onChange={(e) =>
                              setFieldValue("phase", e.target.value)
                            }
                            onBlur={() => setFieldTouched("phase", true)}
                            value={values?.phase}
                            error={touched?.phase && Boolean(errors?.phase)}
                            helperText={touched?.phase && errors?.phase}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Lat & Long
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Lat & Long"
                            name="latLong"
                            onChange={(e) =>
                              setFieldValue("latLong", e.target.value)
                            }
                            onBlur={() => setFieldTouched("latLong", true)}
                            value={values?.latLong}
                            error={touched?.latLong && Boolean(errors?.latLong)}
                            helperText={touched?.latLong && errors?.latLong}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            GP Status
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter GP Status"
                            name="gpStatus"
                            onChange={(e) =>
                              setFieldValue("gpStatus", e.target.value)
                            }
                            onBlur={() => setFieldTouched("gpStatus", true)}
                            value={values?.gpStatus}
                            error={
                              touched?.gpStatus && Boolean(errors?.gpStatus)
                            }
                            helperText={touched?.gpStatus && errors?.gpStatus}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Covered
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Covered"
                            name="covered"
                            onChange={(e) =>
                              setFieldValue("covered", e.target.value)
                            }
                            onBlur={() => setFieldTouched("covered", true)}
                            value={values?.covered}
                            error={touched?.covered && Boolean(errors?.covered)}
                            helperText={touched?.covered && errors?.covered}
                          />
                        </Grid>

                       
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            SR Status
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter SR Status"
                            name="srStatus"
                            onChange={(e) =>
                              setFieldValue("srStatus", e.target.value)
                            }
                            onBlur={() => setFieldTouched("srStatus", true)}
                            value={values?.srStatus}
                            error={
                              touched?.srStatus && Boolean(errors?.srStatus)
                            }
                            helperText={touched?.srStatus && errors?.srStatus}
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
export default AddGP;
