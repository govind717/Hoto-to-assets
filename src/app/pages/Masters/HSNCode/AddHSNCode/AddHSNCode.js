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
import { addHSNCode, updateHSNCode } from "app/services/apis/master";
import {
  HSN_CODE_MASTER,
  HSN_CODE_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { Form, Formik } from "formik";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function AddHSNCode() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [gstOptions, setGstOptions] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const initialValues = {
    gst: state?.gst ? state.gst : "",
    hsn_code: state?.hsn_code ? state?.hsn_code : "",
  };

  const validationSchema = yup.object({
    gst: yup.object().nullable()
      .required("GST Percentage is required"),
    hsn_code: yup
      .string("Enter HSN Code")
      .trim()
      .required("HSN Code is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      gstId: values?.gst._id,
      hsn_code: values?.hsn_code,
    };
    setSubmitting(true);
    try {
      if (pathname === HSN_CODE_MASTER_EDIT) {
        const data = await updateHSNCode(body, state?._id);
        if (data?.data?.statusCode === 200) {
          navigate(HSN_CODE_MASTER);
          Swal.fire({
            icon: "success",
            text: "HSN Code Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating HSN Code",
            // text: "",
          });
        }
      } else {
        const data = await addHSNCode(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "HSN Code Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(HSN_CODE_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding HSN Code",
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
    Axios.get(MasterApis?.gst?.gstDropdown)
      .then((res) => {
        const gsts = res?.data?.result || [];
        setGstOptions(gsts);
      })
      .catch((err) => console.error("Package Fetch Error: ", err));
  }, []);

  useEffect(() => {
    if (gstOptions.length) {
      setFormInitialValues({
        gst: state?.gstId
          ? gstOptions.find((opt) => opt?._id === state.gstId)
          : null,
        hsn_code: state?.hsn_code || "",
      });
    }
  }, [gstOptions]);
  return (
    <>
      <HotoHeader />
      <Div sx={{ mt: 0 }}>
        <Div>
          <Formik
            validateOnChange={true}
            initialValues={formInitialValues || initialValues}
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
                      {pathname === HSN_CODE_MASTER_EDIT ? "Edit HSN Code" : "Add HSN Code"}
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          HSN Code
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter HSN Code"
                          name="hsn_code"
                          onChange={(e) =>
                            setFieldValue("hsn_code", e.target.value)
                          }
                          onBlur={() => setFieldTouched("hsn_code", true)}
                          value={values?.hsn_code}
                          error={touched?.hsn_code && Boolean(errors?.hsn_code)}
                          helperText={touched?.hsn_code && errors?.hsn_code}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          GST%
                        </Typography>
                        <Autocomplete
                          size="small"
                          options={gstOptions}
                          getOptionLabel={(option) => option.gst || ""}
                          isOptionEqualToValue={(opt, val) => opt?._id === val.id}
                          value={values.gst}
                          onChange={(_, value) =>
                            setFieldValue("gst", value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select GST"
                              error={
                                touched.gst && Boolean(errors.gst)
                              }
                              helperText={touched.gst && errors.gst}
                            />
                          )}
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
                            navigate(HSN_CODE_MASTER);
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
export default AddHSNCode;
