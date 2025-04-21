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
import { MATERIAL_MASTER, MATERIAL_MASTER_EDIT } from "app/utils/constants/routeConstants";

function AddMaterial() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    materialName: state?.materialName || "",
      materialCode: state?.materialCode || "",
      description: state?.description || "",
      category: state?.category || "",
      subCategory: state?.subCategory || "",
      uom: state?.uom || "",
      hsnCode: state?.hsnCode || "",
  };

  const validationSchema = yup.object({
    materialName: yup
      .string("Enter Material Name")
      .trim()
      .required("Material Name is required"),
    materialCode: yup
      .string("Enter Material Code")
      .trim()
      .required("Material Code is required"),
    description: yup
      .string("Enter Description")
      .trim()
      .required("Description is required"),
    category: yup
      .string("Enter Category")
      .trim()
      .required("Category is required"),
    subCategory: yup
      .string("Enter Sub Category")
      .trim()
      .required("Sub Category is required"),
    uom: yup.string("Enter UOM").trim().required("UOM is required"),
    hsnCode: yup
      .string("Enter HSN Code")
      .trim()
      .required("HSN Code is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      materialName: values?.materialName,
      materialCode: values?.materialCode,
      description: values?.description,
      category: values?.category,
      subCategory: values?.subCategory,
      uom: values.uom,
      hsnCode: values?.hsnCode,
    };

    setSubmitting(true);
    try {
      if (pathname === MATERIAL_MASTER_EDIT) {
        //   const data = await updatePhoto(form, state?._id);
        const data = {};
        if (data?.data?.statusCode === 200) {
          navigate(MATERIAL_MASTER);
          Swal.fire({
            icon: "success",
            text: "Material Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Material",
            // text: "",
          });
        }
      } else {
        //   const data = await addPhoto(form);
        const data = {};
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Material Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(MATERIAL_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Material",
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
                      Add Material
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Material Name
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Material Name"
                            name="materialName"
                            onChange={(e) =>
                              setFieldValue("materialName", e.target.value)
                            }
                            onBlur={() => setFieldTouched("materialName", true)}
                            value={values?.materialName}
                            error={
                              touched?.materialName &&
                              Boolean(errors?.materialName)
                            }
                            helperText={
                              touched?.materialName && errors?.materialName
                            }
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Material Code
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Material Code"
                            name="materialCode"
                            onChange={(e) =>
                              setFieldValue("materialCode", e.target.value)
                            }
                            onBlur={() => setFieldTouched("materialCode", true)}
                            value={values?.materialCode}
                            error={
                              touched?.materialCode &&
                              Boolean(errors?.materialCode)
                            }
                            helperText={
                              touched?.materialCode && errors?.materialCode
                            }
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Description
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Description"
                            name="description"
                            onChange={(e) =>
                              setFieldValue("description", e.target.value)
                            }
                            onBlur={() => setFieldTouched("description", true)}
                            value={values?.description}
                            error={
                              touched?.description &&
                              Boolean(errors?.description)
                            }
                            helperText={
                              touched?.description && errors?.description
                            }
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Category
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Category"
                            name="category"
                            onChange={(e) =>
                              setFieldValue("category", e.target.value)
                            }
                            onBlur={() => setFieldTouched("category", true)}
                            value={values?.category}
                            error={
                              touched?.category && Boolean(errors?.category)
                            }
                            helperText={touched?.category && errors?.category}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Sub Category
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Sub Category"
                            name="subCategory"
                            onChange={(e) =>
                              setFieldValue("subCategory", e.target.value)
                            }
                            onBlur={() => setFieldTouched("subCategory", true)}
                            value={values?.subCategory}
                            error={
                              touched?.subCategory &&
                              Boolean(errors?.subCategory)
                            }
                            helperText={
                              touched?.subCategory && errors?.subCategory
                            }
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            UOM
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter UOM"
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

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            HSN Code
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter HSN Code"
                            name="hsnCode"
                            onChange={(e) =>
                              setFieldValue("hsnCode", e.target.value)
                            }
                            onBlur={() => setFieldTouched("hsnCode", true)}
                            value={values?.hsnCode}
                            error={touched?.hsnCode && Boolean(errors?.hsnCode)}
                            helperText={touched?.hsnCode && errors?.hsnCode}
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
export default AddMaterial;
