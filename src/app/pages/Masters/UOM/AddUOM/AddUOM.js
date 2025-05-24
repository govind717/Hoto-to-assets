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
import { UOM_MASTER, UOM_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { addUOM, updateUOM } from "app/services/apis/master";
import HotoHeader from "app/Components/HotoHeader";

function AddUOM() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    uom: state?.uom ? state.uom : "",
  };

  const validationSchema = yup.object({
    uom: yup
      .string("Enter UOM Name")
      .trim()
      .required("UOM Name is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      uom: values?.uom,
    };
    setSubmitting(true);
    try {
      if (pathname === UOM_MASTER_EDIT) {
        const data = await updateUOM(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(UOM_MASTER);
          Swal.fire({
            icon: "success",
            text: "UOM Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating UOM",
            // text: "",
          });
        }
      } else {
        const data = await addUOM(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "UOM Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(UOM_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding UOM",
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
                      {pathname === UOM_MASTER_EDIT ? "Edit UOM" : "Add UOM"}
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          UOM Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter UOM Name"
                          name="uom"
                          onChange={(e) =>
                            setFieldValue("uom", e.target.value)
                          }
                          onBlur={() => setFieldTouched("uom", true)}
                          value={values?.uom}
                          error={touched?.uom && Boolean(errors?.uom)}
                          helperText={touched?.uom && errors?.uom}
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
                            navigate(UOM_MASTER);
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
                      sx={{ width: "100px", "&:hover": { backgroundColor: "#53B8CA" } }}
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
export default AddUOM;
