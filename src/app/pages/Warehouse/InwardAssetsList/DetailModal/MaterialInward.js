import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Autocomplete,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
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
const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "150px",
  verticalAlign: "middle",
};
function MaterialInward({ open, closeModal, row }) {
  const [isSubmitting, setSubmitting] = useState(false);
  console.log("Row5 : ", row);
  const initialValues = {
    received_date: "",
    delivery_challan_no: "",
    qc_status: "",
    lr_no: "",
    vehicle_no:""
  };
  const validationSchema = Yup.object().shape({
    received_date: Yup.date()
      .required("Recieved Date is required")
      .typeError("Invalid date"),
    delivery_challan_no: Yup.string().required(
      "Delivery Challan No is required"
    ),
    qc_status: Yup.string().required("QC Status is required"),
    lr_no: Yup.string().required("LR No. is required"),
    vehicle_no: Yup.string().required("Vehicle is required"),
   
  });

  const handleSubmit = async (values) => {
   const body = {
     transfer_status: "received",
     inward_data: {
       received_date: values?.received_date,
       delivery_challan_no: values?.delivery_challan_no,
       lr_no: values?.lr_no,
       vehicle_no: values?.vehicle_no,
       qc_status: values?.qc_status,
     },
   };
   console.log("body : ",body );
    setSubmitting(true);
    try {
    let res;
      if (row?.is_block) {
        res = await Axios.patch(
          `/block-transfer-received/inward-transfer-received/${row._id}`,
          body
        );
      } else {
        res = await Axios.patch(
          `/gp-transfer-received/inward-transfer-received/${row._id}`,
          body
        );
      }

      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        Swal.fire({
          icon: "success",
          text: "Item Inwarded successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        closeModal();
      } else {
        throw new Error(res?.data?.message || "Unknown Error");
      }
    } catch (err) {
      closeModal();
      Swal.fire({
        icon: "error",
        text: err?.response?.data?.message || err.message,
      });
     
    } finally {
      setSubmitting(false);
      closeModal();
    }
  };
 

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
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
                          Material Inward
                        </Typography>

                        <Grid container spacing={2}>
                          {/* Row 1 */}
                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Received Date
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              type="date"
                              name="received_date"
                              onChange={(e) =>
                                setFieldValue("received_date", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("received_date", true)
                              }
                              value={values?.received_date || ""}
                              error={
                                touched?.received_date &&
                                Boolean(errors?.received_date)
                              }
                              helperText={
                                touched?.received_date && errors?.received_date
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Delivery Challan No.
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter  Delivery Challan No."
                              name="delivery_challan_no"
                              onChange={(e) =>
                                setFieldValue(
                                  "delivery_challan_no",
                                  e.target.value
                                )
                              }
                              onBlur={() =>
                                setFieldTouched("delivery_challan_no", true)
                              }
                              value={values.delivery_challan_no || ""}
                              error={
                                touched?.delivery_challan_no &&
                                Boolean(errors?.delivery_challan_no)
                              }
                              helperText={
                                touched?.delivery_challan_no &&
                                errors?.delivery_challan_no
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              LR No.
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter  LR No."
                              name="lr_no"
                              onChange={(e) =>
                                setFieldValue("lr_no", e.target.value)
                              }
                              onBlur={() => setFieldTouched("lr_no", true)}
                              value={values.lr_no || ""}
                              error={touched?.lr_no && Boolean(errors?.lr_no)}
                              helperText={touched?.lr_no && errors?.lr_no}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Vehicle No.
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Vehicle No."
                              name="vehicle_no"
                              onChange={(e) =>
                                setFieldValue("vehicle_no", e.target.value)
                              }
                              onBlur={() => setFieldTouched("vehicle_no", true)}
                              value={values.vehicle_no || ""}
                              error={touched?.vehicle_no && Boolean(errors?.vehicle_no)}
                              helperText={touched?.vehicle_no && errors?.vehicle_no}
                            />
                          </Grid>
                          {/* <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Rack No.
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Rack No."
                              name="rack_no"
                              onChange={(e) =>
                                setFieldValue("rack_no", e.target.value)
                              }
                              onBlur={() => setFieldTouched("rack_no", true)}
                              value={values.rack_no || ""}
                              error={touched?.rack_no && Boolean(errors?.rack_no)}
                              helperText={touched?.rack_no && errors?.rack_no}
                            />
                          </Grid> */}

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              QC Status
                            </Typography>
                            <Autocomplete
                              options={["pass", "fail"]}
                              onChange={(e, val) =>
                                setFieldValue("qc_status", val || "")
                              }
                              onBlur={() => setFieldTouched("qc_status", true)}
                              value={values.qc_status || ""}
                              error={touched?.qc_status && Boolean(errors?.qc_status)}
                              helperText={touched?.qc_status && errors?.qc_status}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select"
                                  name="qc_status"
                                  error={
                                    touched.qc_status &&
                                    Boolean(errors.qc_status)
                                  }
                                  helperText={
                                    touched.qc_status && errors.qc_status
                                  }
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
                          onClick={closeModal}
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
      </Modal>
    </div>
  );
}

export default MaterialInward;
