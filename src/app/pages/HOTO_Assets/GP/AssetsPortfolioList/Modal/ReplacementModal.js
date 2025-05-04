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
  minWidth: "1000px",
};

function ReplacementModal({ open, handleClose, row }) {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const initialValues = {
    issueDate: "",
    serialNumber: 3,
    replacementReason: "",
    dueDate: "",
    initiatedBy: "",
    remark: "",
  };
  const validationSchema = Yup.object().shape({
    issueDate: Yup.string().required("Issue Date is Required"),
    serialNumber: Yup.string().required("Serial No. is Required"),
    replacementReason: Yup.string().required("Replacement Reason is required"),
    dueDate: Yup.string().required("Due Date is Required"),
    initiatedBy: Yup.string().required("Initiated By is Required"),
    remark: Yup.string(),
  });

  const handleSubmit = async (values ) => {
    const body = {
      gp_asset_id: row?._id,
      gp_asset_details:{
        ...row
      },
      issueDate: values?.issueDate,
      serialNumber: values?.serialNumber,
      replacementReason: values?.replacementReason,
      dueDate: values?.dueDate,
      initiatedBy: values?.initiatedBy,
      remark: values?.remark,
    };
    console.log("body :",body);
    setSubmitting(true);
    try {
      const res = await Axios.post(
        "/hoto-to-assets/gp/replacement/add",
        body
      );

      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        Swal.fire({
          icon: "success",
          text:"Replacement request send successfully",
          timer: 1000,
          showConfirmButton: false,
        });
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
                        Request Replacement
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Requested Date
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            type="date"
                            name="issueDate"
                            onChange={(e) =>
                              setFieldValue("issueDate", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("issueDate", true)
                            }
                            value={
                              values?.issueDate ||
                              new Date().toISOString().split("T")[0]
                            }
                            error={
                              touched?.issueDate &&
                              Boolean(errors?.issueDate)
                            }
                            helperText={
                              touched?.issueDate && errors?.issueDate
                            }
                          />
                        </Grid>

                        {/* <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Replacement ID
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Maintenance ID"
                            name="maintenanceId"
                            onChange={(e) =>
                              setFieldValue("maintenanceId", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("maintenanceId", true)
                            }
                            value={values?.maintenanceId}
                            error={
                              touched?.maintenanceId &&
                              Boolean(errors?.maintenanceId)
                            }
                            helperText={
                              touched?.maintenanceId && errors?.maintenanceId
                            }
                          />
                        </Grid> */}

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Replacement Reason
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Replacement reason"
                            name="replacementReason"
                            onChange={(e) =>
                              setFieldValue("replacementReason", e.target.value)
                            }
                            onBlur={() => setFieldTouched("replacementReason", true)}
                            value={values?.replacementReason}
                            error={
                              touched?.replacementReason &&
                              Boolean(errors?.replacementReason)
                            }
                            helperText={
                              touched?.replacementReason && errors?.replacementReason
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Due Date
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            type="date"
                            name="dueDate"
                            onChange={(e) =>
                              setFieldValue("dueDate", e.target.value)
                            }
                            onBlur={() => setFieldTouched("dueDate", true)}
                            value={
                              values?.dueDate ||
                              new Date().toISOString().split("T")[0]
                            }
                            error={touched?.dueDate && Boolean(errors?.dueDate)}
                            helperText={touched?.dueDate && errors?.dueDate}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Initiated By
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Initiated By"
                            name="initiatedBy"
                            onChange={(e) =>
                              setFieldValue("initiatedBy", e.target.value)
                            }
                            onBlur={() => setFieldTouched("initiatedBy", true)}
                            value={values?.initiatedBy}
                            error={
                              touched?.initiatedBy &&
                              Boolean(errors?.initiatedBy)
                            }
                            helperText={
                              touched?.initiatedBy && errors?.initiatedBy
                            }
                          />
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Remark
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Remark"
                            name="remark"
                            onChange={(e) =>
                              setFieldValue("remark", e.target.value)
                            }
                            onBlur={() => setFieldTouched("remark", true)}
                            value={values?.remark}
                            error={touched?.remark && Boolean(errors?.remark)}
                            helperText={touched?.remark && errors?.remark}
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
                          width: "120px",
                          "&:hover": { backgroundColor: "#53B8CA" },
                        }}
                        loading={isSubmitting}
                      >
                        Send Request
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

export default ReplacementModal;
