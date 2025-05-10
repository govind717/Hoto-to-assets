import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Axios } from "index";
// import ToastAlerts from '../Toast';
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  minWidth: "1100px",
};


function EditModal({ open, handleClose,row }) {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  console.log("Edit : ",row);
  const initialValues = {
    equipment_name: row?.equipment_name || "",
    make: row?.make || "",
    model: row?.model || "",
    serial_no: row?.serial_no || "",
    warranty_status: row?.warranty_status || "",
    warranty_date: row?.warranty_date ||  "",
    condition:row?.condition ||  "",
    condition_status: row?.condition_status || "",
    packageName: "",
  };

const validationSchema = Yup.object().shape({
  equipment_name: Yup.string().required("Equipment is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  serial_no: Yup.string().required("Serial No is required"),
  warranty_status: Yup.string()
    .required("Warranty Status is required"),
  warranty_date: Yup.date()
    .required("Warranty Due Date is required")
    .typeError("Enter a valid date"),
  condition: Yup.string().required("Condition is required"),
  condition_status: Yup.string()
    .required("Status is required"),
  remarks: Yup.string(),
});

   const handleSubmit = async (values) => {
        const body = {
          equipment_name: values?.equipment_name,
          make: values?.make,
          model: values?.model,
          serial_no: values?.serial_no,
          warranty_status: values?.warranty_status,
          condition: values?.condition,
          condition_status:values?.condition_status,
          warranty_date:values?.warranty_date,
          remarks:values?.remarks
        };
        console.log("body : ",body);
        setSubmitting(true);
        try {
          const res = await Axios.patch(
            `/hoto-to-assets/equipment/update-equipments/${row._id}`,
            body
          );
    
          const statusCode = res?.data?.statusCode;
    
          if (statusCode === 200 || statusCode === 201) {
            Swal.fire({
              icon: "success",
              text: "details updated successfully",
              timer: 1000,
              showConfirmButton: false,
            });
            navigate("/dashboards/hoto-survey-warehouse-data");
            handleClose();
          } else {
            throw new Error(res?.data?.message || "Unknown Error");
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: err?.response?.data?.message || err.message,
          });
          handleClose();
        } finally {
          setSubmitting(false);
          handleClose();
        }
      };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Div
          sx={{ mt: 0, backgroundColor: "#FFF", padding: "30px" }}
          style={style}
        >
          <Div>
            <Formik
              validateOnChange={true}
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
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
                  {console.log("Values => ", values)}
                  <Div sx={{ mt: 0 }}>
                    <Div
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                        columnGap: 5,
                      }}
                    >
                      <Typography variant="h3" fontWeight={600} mb={2}>
                        Edit equipment_name Details
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        <Grid item xs={6} md={2.4}>
                          <Typography variant="h6" fontSize="14px">
                            Equipment
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Equipment"
                            name="equipment_name"
                            onChange={(e) =>
                              setFieldValue("equipment_name", e.target.value)
                            }
                            onBlur={() => setFieldTouched("equipment_name", true)}
                            value={values?.equipment_name}
                            error={
                              touched?.equipment_name && Boolean(errors?.equipment_name)
                            }
                            helperText={touched?.equipment_name && errors?.equipment_name}
                          />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
                          <Typography variant="h6" fontSize="14px">
                            Make
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Make"
                            name="make"
                            onChange={(e) =>
                              setFieldValue("make", e.target.value)
                            }
                            onBlur={() => setFieldTouched("make", true)}
                            value={values?.make}
                            error={touched?.make && Boolean(errors?.make)}
                            helperText={touched?.make && errors?.make}
                          />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
                          <Typography variant="h6" fontSize="14px">
                            Model
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Model"
                            name="model"
                            onChange={(e) =>
                              setFieldValue("model", e.target.value)
                            }
                            onBlur={() => setFieldTouched("model", true)}
                            value={values?.model}
                            error={touched?.model && Boolean(errors?.model)}
                            helperText={touched?.model && errors?.model}
                          />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
                          <Typography variant="h6" fontSize="14px">
                            Serial No
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Serial No"
                            name="serial_no"
                            onChange={(e) =>
                              setFieldValue("serial_no", e.target.value)
                            }
                            onBlur={() => setFieldTouched("serial_no", true)}
                            value={values?.serial_no}
                            error={
                              touched?.serial_no && Boolean(errors?.serial_no)
                            }
                            helperText={touched?.serial_no && errors?.serial_no}
                          />
                        </Grid>
                        <Grid item xs={12} md={2.4}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Warranty Status
                          </Typography>
                          <Autocomplete
                            options={["Yes", "No"]}
                            getOptionLabel={(option) => option || ""}
                            value={values.warranty_status ? "Yes" : "No"}
                            onChange={(e, newValue) => {
                              let result = newValue === "Yes" ? true : false;
                              setFieldValue("warranty_status", result);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                placeholder="Select Warranty Status"
                                name="warranty_status"
                                error={
                                  touched.warranty_status &&
                                  Boolean(errors.warranty_status)
                                }
                                helperText={
                                  touched.warranty_status &&
                                  errors.warranty_status
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
                          <Typography variant="h6" fontSize="14px">
                            Warranty Due Date
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            type="date"
                            name="warranty_date"
                            onChange={(e) =>
                              setFieldValue("warranty_date", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("warranty_date", true)
                            }
                            value={
                              values?.warranty_date
                                .split("T")[0] 
                            }
                            error={
                              touched?.warranty_date &&
                              Boolean(errors?.warranty_date)
                            }
                            helperText={
                              touched?.warranty_date &&
                              errors?.warranty_date
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={2.4}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Condition
                          </Typography>
                          <Autocomplete
                            options={[
                              "Robust",
                              "Damaged",
                              "Semi-Damaged",
                              "Missing",
                            ]}
                            getOptionLabel={(option) => option || ""}
                            value={values?.condition}
                            onChange={(e, newValue) => {
                              setFieldValue(
                                "condition",
                                newValue ? newValue : ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                placeholder="Select Condition"
                                name="condition"
                                error={
                                  touched.condition && Boolean(errors.condition)
                                }
                                helperText={
                                  touched.condition && errors.condition
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={2.4}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Status
                          </Typography>
                          <Autocomplete
                            options={["in Use", "Not in Use"]}
                            getOptionLabel={(option) => option || ""}
                            value={values?.condition_status}
                            onChange={(e, newValue) => {
                              setFieldValue("condition_status", newValue ? newValue : "");
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                placeholder="Select Status"
                                name="condition_status"
                                error={touched.condition_status && Boolean(errors.condition_status)}
                                helperText={touched.condition_status && errors.condition_status}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6} md={2.4}>
                          <Typography variant="h6" fontSize="14px">
                            Remark
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Remark"
                            name="remarks"
                            onChange={(e) =>
                              setFieldValue("remarks", e.target.value)
                            }
                            onBlur={() => setFieldTouched("remarks", true)}
                            value={values?.remarks}
                            error={touched?.remarks && Boolean(errors?.remarks)}
                            helperText={touched?.remarks && errors?.remarks}
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
                        onClick={handleClose}
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
                        Update
                      </LoadingButton>
                    </Div>
                  </Div>
                </Form>
              )}
            </Formik>
          </Div>
        </Div>
      </Modal>
    </div>
  );
}

export default EditModal;
