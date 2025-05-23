import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

import HotoHeader from "app/Components/HotoHeader";
import { addCategory, updateCategory } from "app/services/apis/master";
import { CATEGORY_MASTER, CATEGORY_MASTER_EDIT } from "app/utils/constants/routeConstants";

function AddCategory() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();

  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    category: state?.category ? state.category : "",
  };

  const validationSchema = yup.object({
    category: yup
      .string("Enter Category Name")
      .trim()
      .required("Category Name is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      category: values?.category,
    };

    setSubmitting(true);
    try {
      if (pathname === CATEGORY_MASTER_EDIT) {
        const data = await updateCategory(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(CATEGORY_MASTER);
          Swal.fire({
            icon: "success",
            text: "Category Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Category",
            // text: "",
          });
        }
      } else {
        const data = await addCategory(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Category Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(CATEGORY_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Category",
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
                      {pathname === CATEGORY_MASTER_EDIT ? "Edit Category" : "Add Category"}
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          Category Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Category Name"
                          name="category"
                          onChange={(e) =>
                            setFieldValue("category", e.target.value)
                          }
                          onBlur={() =>
                            setFieldTouched("category", true)
                          }
                          value={values?.category}
                          error={
                            touched?.category &&
                            Boolean(errors?.category)
                          }
                          helperText={
                            touched?.category &&
                            errors?.category
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
                            navigate(CATEGORY_MASTER);
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
export default AddCategory;
