import { Grid, Typography, Button, Box, Autocomplete, TextField } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Div from "@jumbo/shared/Div";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "formik";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { useState } from "react";
import * as yup from "yup";
import { addSupplier, updateSupplier } from "app/services/apis/master";
import {
  SUPPLIER_MASTER,
  SUPPLIER_MASTER_EDIT,
  WAREHOUSE_MASTER,
} from "app/utils/constants/routeConstants";
import { LoadingButton } from "@mui/lab";

function KYC() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    antiCorruptionPolicy: state?.antiCorruptionPolicy || "",
    sanctionsScreeningResult:state?.sanctionsScreeningResult || "",
    politicalExposure:state?.politicalExposure || "",
    AMLVarification:state?.AMLVarification || "",
    
  };

  const validationSchema = yup.object({
    supplierName: yup.string().required("Supplier Name is required"),
    warehouse_type: yup.string().required("Warehouse Type is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    district: yup.string().required("District is required"),
    city: yup.string().required("City is required"),
    pincode: yup
      .string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    capacity: yup.string().required("Capacity is required"),
    latitude: yup.string().required("Latitude is required"),
    logitude: yup.string().required("Longitude is required"),
    corporateStructureDoc: yup
      .mixed()
      .required("Corporate Structure Document is required"),
    gstRegistrationCertificate: yup
      .mixed()
      .required("GST Registration Certificate is required"),
  });

  const onUserSave = async (values) => {
    const body = new FormData();
    body.append("supplierName", values.supplierName);
    body.append("warehouse_type", values.warehouse_type);
    body.append("address", values.address);
    body.append("state", values.state);
    body.append("district", values.district);
    body.append("city", values.city);
    body.append("country", values.country);
    body.append("pincode", values.pincode);
    body.append("capacity", values.capacity);
    body.append("latitude", values.latitude);
    body.append("logitude", values.logitude);
    body.append("corporateStructureDoc", values.corporateStructureDoc);
    body.append(
      "gstRegistrationCertificate",
      values.gstRegistrationCertificate
    );
    body.append("contact_persons", JSON.stringify(values.contact_persons));

    if (values?.contact_persons?.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "At least one contact person is required",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (pathname === SUPPLIER_MASTER_EDIT) {
        const data = await updateSupplier(body, state?.id);
        if (data?.data?.statusCode === 200) {
          navigate(SUPPLIER_MASTER);
          Swal.fire({
            icon: "success",
            text: "Supplier Updated Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message || "Error while updating Supplier",
          });
        }
      } else {
        const data = await addSupplier(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Warehouse Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(WAREHOUSE_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message || "Error while adding Warehouse",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
    setSubmitting(false);
  };

  return (
    <Div sx={{ mt: 0 }}>
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onUserSave}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched }) => (
          <Form noValidate autoComplete="off">
            <Div sx={{ mt: 4 }}>
              <Grid container rowSpacing={2} columnSpacing={3}>
                {/* Corporate Structure Doc */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Corporate Structure Doc
                  </Typography>
                  <input
                    type="file"
                    id="corporate-structure-doc"
                    hidden
                    onChange={(event) => {
                      setFieldValue(
                        "corporateStructureDoc",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  <label htmlFor="corporate-structure-doc">
                    <Button
                      variant="outlined"
                      fullWidth
                      component="span"
                      endIcon={<FileUploadOutlinedIcon />}
                      sx={{
                        justifyContent: "space-between",
                        paddingY: "5px",
                        borderColor:"rgba(0, 0, 0, 0.23)",
                        lineHeight: "1.9",
                        color: "text.secondary",
                        textTransform: "none",
                        "&:hover": {  borderColor: "#475259", },
                      }}
                    >
                      Upload Doc
                    </Button>
                  </label>
                </Grid>

                {/* GST Registration Certificate */}
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    GST Registration Certificate
                  </Typography>
                  <input
                    type="file"
                    id="gst-registration-certificate"
                    hidden
                    onChange={(event) => {
                      setFieldValue(
                        "gstRegistrationCertificate",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  <label htmlFor="gst-registration-certificate">
                    <Button
                      variant="outlined"
                      fullWidth
                      component="span"
                      endIcon={<FileUploadOutlinedIcon />}
                      sx={{
                        justifyContent: "space-between",
                        paddingY: "5px",
                        borderColor:"rgba(0, 0, 0, 0.23)",
                        lineHeight: "1.9",
                        color: "text.secondary",
                        textTransform: "none",
                        "&:hover": {  borderColor: "#475259", },
                      }}
                    >
                      Upload Doc
                    </Button>
                  </label>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Address Proof
                  </Typography>
                  <input
                    type="file"
                    id="address-proof"
                    hidden
                    onChange={(event) => {
                      setFieldValue(
                        "addressProof",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  <label htmlFor="address-proof">
                    <Button
                      variant="outlined"
                      fullWidth
                      component="span"
                      endIcon={<FileUploadOutlinedIcon />}
                      sx={{
                        justifyContent: "space-between",
                        paddingY: "5px",
                        borderColor:"rgba(0, 0, 0, 0.23)",
                        lineHeight: "1.9",
                        color: "text.secondary",
                        textTransform: "none",
                        "&:hover": {  borderColor: "#475259", },
                      }}
                    >
                      Upload Doc
                    </Button>
                  </label>
                </Grid>


                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                      Anti-corruption Policy
                  </Typography>
                  <Autocomplete
                    options={["zonal", "district"]}
                    value={values?.antiCorruptionPolicy || ""}
                    onChange={(e, newValue) =>
                      setFieldValue("antiCorruptionPolicy", newValue)
                    }
                    onBlur={() => setFieldTouched("antiCorruptionPolicy", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Anti-corruption Policy"
                        error={
                          touched?.antiCorruptionPolicy &&
                          Boolean(errors?.antiCorruptionPolicy)
                        }
                        helperText={
                          touched?.antiCorruptionPolicy && errors?.antiCorruptionPolicy
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Sanctions Screening Result
                  </Typography>
                  <Autocomplete
                    options={["zonal", "district"]}
                    value={values?.sanctionsScreeningResult || ""}
                    onChange={(e, newValue) =>
                      setFieldValue("sanctionsScreeningResult", newValue)
                    }
                    onBlur={() => setFieldTouched("sanctionsScreeningResult", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Sanctions Screening Result"
                        error={
                          touched?.sanctionsScreeningResult &&
                          Boolean(errors?.sanctionsScreeningResult)
                        }
                        helperText={
                          touched?.sanctionsScreeningResult && errors?.sanctionsScreeningResult
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    AML Varification
                  </Typography>
                  <Autocomplete
                    options={["zonal", "district"]}
                    value={values?.AMLVarification || ""}
                    onChange={(e, newValue) =>
                      setFieldValue("AMLVarification", newValue)
                    }
                    onBlur={() => setFieldTouched("AMLVarification", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select AML Varification"
                        error={
                          touched?.AMLVarification &&
                          Boolean(errors?.AMLVarification)
                        }
                        helperText={
                          touched?.AMLVarification && errors?.AMLVarification
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Political Exposure
                  </Typography>
                  <Autocomplete
                    options={["zonal", "district"]}
                    value={values?.politicalExposure || ""}
                    onChange={(e, newValue) =>
                      setFieldValue("politicalExposure", newValue)
                    }
                    onBlur={() => setFieldTouched("politicalExposure", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Political Exposure"
                        error={
                          touched?.politicalExposure &&
                          Boolean(errors?.politicalExposure)
                        }
                        helperText={
                          touched?.politicalExposure && errors?.politicalExposure
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" fontSize="14px">
                    Ethical Business Attestation
                  </Typography>
                  <Autocomplete
                    options={["zonal", "district"]}
                    value={values?.ethicalBusinessAttestation || ""}
                    onChange={(e, newValue) =>
                      setFieldValue("ethicalBusinessAttestation", newValue)
                    }
                    onBlur={() => setFieldTouched("ethicalBusinessAttestation", true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Ethical Business Attestation"
                        error={
                          touched?.ethicalBusinessAttestation &&
                          Boolean(errors?.ethicalBusinessAttestation)
                        }
                        helperText={
                          touched?.ethicalBusinessAttestation && errors?.ethicalBusinessAttestation
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>

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
                        navigate(SUPPLIER_MASTER);
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
  );
}

export default KYC;
