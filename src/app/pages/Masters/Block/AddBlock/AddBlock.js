import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MasterApis from "app/Apis/master";
import HotoHeader from "app/Components/HotoHeader";
import { addBlock, updateBlock } from "app/services/apis/master";
import { BLOCK_MASTER, BLOCK_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function AddBlock() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [packageOptions, setPackageOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    packageName: null,
    district: null,
    blockName: state?.blockName || "",
    blockCode: state?.blockCode || "",
  };
  const validationSchema = yup.object({
    packageName: yup.object().nullable().required("Package Name is required"),
    district: yup.object().nullable().required("District Name is required"),
    blockName: yup.string().required("Block Name is required"),
    blockCode: yup.string().required("Block Code is required"),
  });

  const fetchDistrictDropdown = (packageId) => {
    Axios.get(`${MasterApis?.district?.districtDropdown}?_id=${packageId}`)
      .then((res) => setDistrictOptions(res?.data?.result || []))
      .catch((err) => console.error("District Fetch Error: ", err));
  };

  const onUserSave = async (values) => {
    const body = {
      packageId: values?.packageName?._id,
      districtId: values?.district?._id,
      blockName: values?.blockName,
      blockCode: values?.blockCode,
    };

    setSubmitting(true);
    try {
      const res = pathname === BLOCK_MASTER_EDIT
        ? await updateBlock(body, state?._id)
        : await addBlock(body);

      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        Swal.fire({
          icon: "success",
          text: pathname === BLOCK_MASTER_EDIT ? "Block Updated Successfully" : "Block Added Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate(BLOCK_MASTER);
      } else {
        throw new Error(res?.data?.message || "Unknown Error");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err?.response?.data?.message || err.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    Axios.get(MasterApis?.package?.packageDropdown)
      .then((res) => {
        const packages = res?.data?.result || [];
        setPackageOptions(packages);

        if (state?.packageId) {
          const selectedPackage = packages.find((opt) => opt?._id === state.packageId);
          if (selectedPackage) {
            fetchDistrictDropdown(selectedPackage._id);
          }
        }
      })
      .catch((err) => console.error("Package Fetch Error: ", err));
  }, []);

  useEffect(() => {
    if (
      packageOptions.length &&
      (!state?.packageId || districtOptions.length || !state?.districtId)
    ) {
      setFormInitialValues({
        packageName: state?.packageId
          ? packageOptions.find((opt) => opt?._id === state.packageId)
          : null,
        district: state?.districtId
          ? districtOptions.find((opt) => opt?._id === state.districtId)
          : null,
        blockName: state?.blockName || "",
        blockCode: state?.blockCode || "",
      });
    }
  }, [packageOptions, districtOptions]);

  return (
    <>
      <HotoHeader/>
      <Div sx={{ mt: 4 }}>
        <Typography variant="h3" fontWeight={600} mb={3}>
          {pathname === BLOCK_MASTER_EDIT ? "Edit Block" : "Add Block"}
        </Typography>

        <Formik
          initialValues={formInitialValues || initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values, touched, errors, setFieldValue, setFieldTouched }) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={3}>
                {/* Package Name */}
                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px">Package Name</Typography>
                  <Autocomplete
                    size="small"
                    options={packageOptions}
                    getOptionLabel={(option) => option.packageName || ""}
                    isOptionEqualToValue={(opt, val) => opt?._id === val._id}
                    value={values.packageName}
                    onChange={(_, value) => {
                      setFieldValue("packageName", value);
                      setFieldValue("district", null);
                      if (value?._id) fetchDistrictDropdown(value._id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Package"
                        error={touched.packageName && Boolean(errors.packageName)}
                        helperText={touched.packageName && errors.packageName}
                      />
                    )}
                  />
                </Grid>

                {/* District */}
                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px">District</Typography>
                  <Autocomplete
                    size="small"
                    options={districtOptions}
                    getOptionLabel={(option) => option.district || ""}
                    isOptionEqualToValue={(opt, val) => opt?._id === val._id}
                    value={values.district}
                    onChange={(_, value) => setFieldValue("district", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select District"
                        error={touched.district && Boolean(errors.district)}
                        helperText={touched.district && errors.district}
                      />
                    )}
                  />
                </Grid>

                {/* Block Name */}
                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px">Block Name</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter Block Name"
                    name="blockName"
                    value={values.blockName}
                    onChange={(e) => setFieldValue("blockName", e.target.value)}
                    onBlur={() => setFieldTouched("blockName", true)}
                    error={touched.blockName && Boolean(errors.blockName)}
                    helperText={touched.blockName && errors.blockName}
                  />
                </Grid>

                {/* Block Code */}
                <Grid item xs={12} md={3}>
                  <Typography variant="h6" fontSize="14px">Block Code</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter Block Code"
                    name="blockCode"
                    value={values.blockCode}
                    onChange={(e) => setFieldValue("blockCode", e.target.value)}
                    onBlur={() => setFieldTouched("blockCode", true)}
                    error={touched.blockCode && Boolean(errors.blockCode)}
                    helperText={touched.blockCode && errors.blockCode}
                  />
                </Grid>
              </Grid>

              {/* Actions */}
              <Box
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
                        navigate(BLOCK_MASTER);
                      }
                    });
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  size="small"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ width: 100, "&:hover": { backgroundColor: "#53B8CA" } }}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Form>
          )}
        </Formik>

      </Div>
    </>
  );
}

export default AddBlock;
