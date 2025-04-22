import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
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
import { SUB_CATEGORY_MASTER, SUB_CATEGORY_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { addSubCategory, updateSubCategory } from "app/services/apis/master";

function AddSubCategory() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    categoryName: state?.categoryName ? state.categoryName : "",
    subCategoryName:state?.subCategoryName ? state?.subCategoryName : ""
  };

  const validationSchema = yup.object({
    categoryName: yup
      .string("Enter Category Name")
      .trim()
      .required("Category Name is required"),
    subCategoryName: yup
      .string("Enter Sub Category Name")
      .trim()
      .required("Sub Category Name is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      categoryName: values?.categoryName,
      subCategoryName: values?.subCategoryName,
    };

    setSubmitting(true);
    try {
      if (pathname === SUB_CATEGORY_MASTER_EDIT) {
        const data = await updateSubCategory(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(SUB_CATEGORY_MASTER);
          Swal.fire({
            icon: "success",
            text: "Sub Category Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Sub Category",
            // text: "",
          });
        }
      } else {
        const data = await addSubCategory(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Sub Category Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(SUB_CATEGORY_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Sub Category",
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
                      Add Sub Category
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          Category
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Category Name"
                          name="categoryName"
                          onChange={(e) =>
                            setFieldValue("categoryName", e.target.value)
                          }
                          onBlur={() =>
                            setFieldTouched("categoryName", true)
                          }
                          value={values?.categoryName}
                          error={
                            touched?.categoryName &&
                            Boolean(errors?.categoryName)
                          }
                          helperText={
                            touched?.categoryName &&
                            errors?.categoryName
                          }
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          Sub Category
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Sub Category Name"
                          name="subCategoryName"
                          onChange={(e) =>
                            setFieldValue("subCategoryName", e.target.value)
                          }
                          onBlur={() =>
                            setFieldTouched("subCategoryName", true)
                          }
                          value={values?.subCategoryName}
                          error={
                            touched?.subCategoryName &&
                            Boolean(errors?.subCategoryName)
                          }
                          helperText={
                            touched?.subCategoryName &&
                            errors?.subCategoryName
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
export default AddSubCategory;
