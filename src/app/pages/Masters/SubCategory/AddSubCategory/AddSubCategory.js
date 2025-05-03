import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
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
import { Axios } from "index";
import MasterApis from "app/Apis/master";

function AddSubCategory() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const validationSchema = yup.object({
    category: yup.object().nullable().required("Category Name is required"),
    subCategory: yup
      .string("Enter Sub Category Name")
      .trim()
      .required("Sub Category Name is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      categoryId: values?.category.id,
      subcategory: values?.subCategory,
    };
    setSubmitting(true);
    try {
      if (pathname === SUB_CATEGORY_MASTER_EDIT) {
        const data = await updateSubCategory(body, state?.id);
        if (data?.data?.statusCode === 200) {
          navigate(SUB_CATEGORY_MASTER);
          Swal.fire({
            icon: "success",
            text: "Sub Category Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message || "Error while updating Sub Category",
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
            text: data?.data?.message || "Error while adding Sub Category",
          });
        }
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    Axios.get(MasterApis?.category?.categoryDropdown)
      .then((res) => {
        const categoryList = res?.data?.result || [];
        setCategoryOptions(categoryList);
      })
      .catch((err) => console.error("Category Fetch Error: ", err));
  }, []);

  useEffect(() => {
    if (state?.categoryId && categoryOptions.length) {
      const selectedCategory = categoryOptions.find(
        (opt) => opt.id === state.categoryId
      );
      setFormInitialValues({
        category: selectedCategory || null,
        subCategory: state?.subcategory || "",
      });
    } else if (!state?.categoryId) {
      setFormInitialValues({
        category: null,
        subCategory: "",
      });
    }
  }, [categoryOptions, state]);

  return (
    <>
      <HotoHeader />
      <Div sx={{ mt: 0 }}>
        <Div>
          {formInitialValues && (
            <Formik
              validateOnChange={true}
              initialValues={formInitialValues}
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
                        {pathname === SUB_CATEGORY_MASTER_EDIT
                          ? "Edit Sub Category"
                          : "Add Sub Category"}
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" fontSize="14px">
                            Category
                          </Typography>
                          <Autocomplete
                            size="small"
                            options={categoryOptions}
                            getOptionLabel={(option) => option.category || ""}
                            isOptionEqualToValue={(opt, val) =>
                              opt.id === val.id
                            }
                            value={values.category}
                            onChange={(_, value) =>
                              setFieldValue("category", value)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Category"
                                error={
                                  touched.category && Boolean(errors.category)
                                }
                                helperText={
                                  touched.category && errors.category
                                }
                              />
                            )}
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
                            name="subCategory"
                            onChange={(e) =>
                              setFieldValue(
                                "subCategory",
                                e.target.value
                              )
                            }
                            onBlur={() =>
                              setFieldTouched("subCategory", true)
                            }
                            value={values?.subCategory}
                            error={
                              touched?.subCategory &&
                              Boolean(errors?.subCategory)
                            }
                            helperText={
                              touched?.subCategory &&
                              errors?.subCategory
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
                              navigate(SUB_CATEGORY_MASTER);
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
          )}
        </Div>
      </Div>
    </>
  );
}

export default AddSubCategory;
