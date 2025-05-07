import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import MasterApis from "app/Apis/master";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import { addMaterial, updateMaterial } from "app/services/apis/master";
import { MATERIAL_MASTER, MATERIAL_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function AddMaterial() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [UOMOptions, setUOMOptions] = useState([]);
  const [HSNCodeOptions, setHSNCodeOptions] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  console.log(state)
  const initialValues = {
    materialName: state?.materialName || "",
    materialCode: state?.materialCode || "",
    materialType: state?.materialType || "",
    description: state?.description || "",
    category: state?.category_details || null,
    subCategory: state?.sub_category_details || null,
    uom: state?.uom_details || null,
    HSNCode: state?.hsn_code_details || null,
  };

  const validationSchema = yup.object({
    materialName: yup.string().trim().required("Material Name is required"),
    materialCode: yup.string().trim().required("Material Code is required"),
    materialType: yup.string().oneOf(["SOR", "NONSOR"]).required("Material Type is required"),
    description: yup.string().trim().required("Description is required"),
    category: yup.object().nullable().required("Category is required"),
    subCategory: yup.object().nullable().required("Sub Category is required"),
    uom: yup.object().nullable().required("UOM is required"),
    HSNCode: yup.object().nullable().required("HSN Code is required"),
  });

  useEffect(() => {
    Axios.get(MasterApis?.category?.categoryDropdown)
      .then((res) => setCategoryOptions(res?.data?.result || []))
      .catch((err) => console.error("Category Fetch Error:", err));
    // Axios.get(MasterApis?.subCategory?.subCategoryDropdown)
    //   .then((res) => setSubCategoryOptions(res?.data?.result || []))
    //   .catch((err) => console.error("SubCategory Fetch Error:", err));
    Axios.get(MasterApis?.uom?.uomDropdown)
      .then((res) => setUOMOptions(res?.data?.result || []))
      .catch((err) => console.error("UOM Fetch Error:", err));
    Axios.get(MasterApis?.hsnCode?.hsnCodeDropdown)
      .then((res) => setHSNCodeOptions(res?.data?.result || []))
      .catch((err) => console.error("HSN Code Fetch Error:", err));
  }, []);

  useEffect(() => {
    if (state?.category_details && state?.category_details?._id) {
      fetchSubCategoryDropdown(state.category_details._id);
    }
  }, [state]);



  const fetchSubCategoryDropdown = (categoryId) => {
    Axios.get(`${MasterApis?.subCategory?.subCategoryDropdown}?id=${categoryId}`)
      .then((res) => setSubCategoryOptions(res?.data?.result || []))
      .catch((err) => console.error("Sub Category Fetch Error:", err));
  };

  const onUserSave = async (values) => {
    const body = {
      materialName: values?.materialName,
      materialCode: values?.materialCode,
      materialType: values?.materialType,
      description: values?.description,
      categoryId: values?.category?._id,
      subCategoryId: values?.subCategory?._id,
      uomId: values?.uom?._id,
      hsnCodeId: values?.HSNCode?._id,
    };
    console.log("Body : ", body);
    setSubmitting(true);
    try {
      if (pathname === MATERIAL_MASTER_EDIT) {
        const data = await updateMaterial(body, state?._id);
        if (data?.data?.statusCode === 200) {
          Swal.fire({ icon: "success", text: "Material Updated Successfully", timer: 1000, showConfirmButton: false });
          navigate(MATERIAL_MASTER);
        } else {
          Swal.fire({ icon: "error", text: data?.data?.message || "Error while updating Material" });
        }
      } else {
        const data = await addMaterial(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({ icon: "success", text: "Material Added Successfully", timer: 1000, showConfirmButton: false });
          navigate(MATERIAL_MASTER);
        } else {
          Swal.fire({ icon: "error", text: data?.data?.message || "Error while adding Material" });
        }
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: error?.response?.data?.message || "Submission Failed" });
    }
    setSubmitting(false);
  };

  return (
    <>
      <HotoHeader />
      <Div sx={{ mt: 0 }}>
        <Div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onUserSave}
          >
            {({ setFieldValue, values, touched, errors, setFieldTouched }) => (
              <Form noValidate autoComplete="off">
                <Div sx={{ mt: 4 }}>
                  <Typography variant="h3" fontWeight={600} mb={2}>{pathname === MATERIAL_MASTER_EDIT ? "Edit Material" : "Add Material"}</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">Material Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter Material Name"
                        name="materialName"
                        value={values.materialName}
                        onChange={(e) => setFieldValue("materialName", e.target.value)}
                        onBlur={() => setFieldTouched("materialName", true)}
                        error={touched.materialName && Boolean(errors.materialName)}
                        helperText={touched.materialName && errors.materialName}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">Material Code</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter Material Code"
                        name="materialCode"
                        value={values.materialCode}
                        onChange={(e) => setFieldValue("materialCode", e.target.value)}
                        onBlur={() => setFieldTouched("materialCode", true)}
                        error={touched.materialCode && Boolean(errors.materialCode)}
                        helperText={touched.materialCode && errors.materialCode}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">Material Type</Typography>
                      <Autocomplete
                        size="small"
                        options={["SOR", "NONSOR"]}
                        value={values.materialType}
                        onChange={(_, value) => setFieldValue("materialType", value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Material Type"
                            error={touched.materialType && Boolean(errors.materialType)}
                            helperText={touched.materialType && errors.materialType}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">Description</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter Description"
                        name="description"
                        value={values.description}
                        onChange={(e) => setFieldValue("description", e.target.value)}
                        onBlur={() => setFieldTouched("description", true)}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">Category</Typography>
                      <Autocomplete
                        size="small"
                        options={categoryOptions}
                        getOptionLabel={(option) => option.category || ""}
                        value={values.category}
                        onChange={(_, value) => {
                          setFieldValue("category", value);
                          setFieldValue("subCategory", null);
                          if (value?._id) fetchSubCategoryDropdown(value._id);
                        }}
                        onBlur={() => setFieldTouched("category", true)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Category"
                            error={touched.category && Boolean(errors.category)}
                            helperText={touched.category && errors.category}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">Sub Category</Typography>
                      <Autocomplete
                        size="small"
                        options={subCategoryOptions}
                        getOptionLabel={(option) => option.subcategory || ""}
                        value={values.subCategory}
                        onChange={(_, value) => setFieldValue("subCategory", value)}
                        onBlur={() => setFieldTouched("subCategory", true)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Sub Category"
                            error={touched.subCategory && Boolean(errors.subCategory)}
                            helperText={touched.subCategory && errors.subCategory}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">UOM</Typography>
                      <Autocomplete
                        size="small"
                        options={UOMOptions}
                        getOptionLabel={(option) => option.uom || ""}
                        value={values.uom}
                        onChange={(_, value) => setFieldValue("uom", value)}
                        onBlur={() => setFieldTouched("uom", true)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select UOM"
                            error={touched.uom && Boolean(errors.uom)}
                            helperText={touched.uom && errors.uom}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontSize="14px">HSN Code</Typography>
                      <Autocomplete
                        size="small"
                        options={HSNCodeOptions}
                        getOptionLabel={(option) => option.hsn_code || ""}
                        value={values.HSNCode}
                        onChange={(_, value) => setFieldValue("HSNCode", value)}
                        onBlur={() => setFieldTouched("HSNCode", true)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select HSN Code"
                            error={touched.HSNCode && Boolean(errors.HSNCode)}
                            helperText={touched.HSNCode && errors.HSNCode}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Div sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}>
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
                          if (result.isConfirmed) navigate(MATERIAL_MASTER);
                        });
                      }}
                    >
                      Cancel
                    </Button>

                    <LoadingButton
                      size="small"
                      variant="contained"
                      type="submit"
                      loading={isSubmitting}
                      sx={{ width: 100, "&:hover": { backgroundColor: "#53B8CA" } }}
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
