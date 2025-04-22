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
import { BLOCK_MASTER, BLOCK_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { addBlock, updateBlock } from "app/services/apis/master";

function AddBlock() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    packageName: state?.packageName ? state.packageName : "",
    district: state?.district ? state.district : "",
    blockName: state?.blockName ? state.blockName : "",
    blockCode: state?.blockCode ? state.blockCode : "",
  };

  const validationSchema = yup.object({
    packageName: yup
      .string("Enter Package Name")
      .trim()
      .required("Package Name is required"),
    district: yup.string("Enter District").trim().required("District is required"),
    blockName: yup.string("Enter Block Name").trim().required("Block Name is required"),
    blockCode: yup.string("Enter Block Code").trim().required("Block Code is required"),
  });

  const onUserSave = async (values) => {
    const body = {
        packageName:values?.packageName,
        district:values?.district,
        blockName:values?.blockName,
        blockCode:values?.blockCode,
    };

    setSubmitting(true);
    try {
      if (pathname === BLOCK_MASTER_EDIT) {
        const data = await updateBlock(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(BLOCK_MASTER);
          Swal.fire({
            icon: "success",
            text: "Block Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Block",
            // text: "",
          });
        }
      } else {
        const data = await addBlock(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Block Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(BLOCK_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Block",
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
                      Add Block
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={3}>
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
                          onBlur={() =>
                            setFieldTouched("packageName", true)
                          }
                          value={values?.packageName}
                          error={
                            touched?.packageName &&
                            Boolean(errors?.packageName)
                          }
                          helperText={
                            touched?.packageName &&
                            errors?.packageName
                          }
                        />
                      </Grid>


                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                        District
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter District"
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
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                        Block
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Block Name"
                          name="blockName"
                          onChange={(e) =>
                            setFieldValue("blockName", e.target.value)
                          }
                          onBlur={() => setFieldTouched("blockName", true)}
                          value={values?.blockName}
                          error={touched?.blockName && Boolean(errors?.blockName)}
                          helperText={touched?.blockName && errors?.blockName}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="h6" fontSize="14px">
                        Block Code
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Block Code"
                          name="blockCode"
                          onChange={(e) =>
                            setFieldValue("blockCode", e.target.value)
                          }
                          onBlur={() => setFieldTouched("blockCode", true)}
                          value={values?.blockCode}
                          error={touched?.blockCode && Boolean(errors?.blockCode)}
                          helperText={touched?.blockCode && errors?.blockCode}
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
export default AddBlock;
