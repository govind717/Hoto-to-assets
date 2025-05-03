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
function CreateTransferModal({ open, closeModal }) {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const initialValues = {
    issueDate: "",
    eta: "",
    repairType: "",
    assignedTo: "",
    document: null,
    initiatedBy: "",
    remarks: "",
  };

  const validationSchema = Yup.object().shape({
    issueDate: Yup.date()
      .required("Issue Date is required")
      .typeError("Invalid date"),
    eta: Yup.date()
      .required("ETA is required")
      .min(Yup.ref("issueDate"), "ETA should be same or after Issue Date")
      .typeError("Invalid date"),
    repairType: Yup.string().required("Repair Type is required"),
    assignedTo: Yup.string().required("Assigned To is required"),
    document: Yup.mixed()
      .required("Document is required")
      .test(
        "fileSize",
        "File size is too large (max 5MB)",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      ),
    initiatedBy: Yup.string()
      .required("Initiated By is required")
      .max(100, "Too long"),
    remarks: Yup.string().required("Remarks are required").max(500, "Too long"),
  });

  const handleSubmit = ({ values }) => {};

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
                          Create Transfer
                        </Typography>
                        <TableContainer
                          sx={{
                            marginTop: "15px",
                            maxWidth: "1100px",
                            marginBottom: "30px",
                          }}
                          component={Paper}
                        >
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ bgcolor: "#53B8CA" }}>
                                <TableCell
                                  align="left"
                                  sx={{ ...tableCellSx, minWidth: "100px" }}
                                >
                                  Sr No.
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Equipment
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Serial No.
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Location
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ ...tableCellSx, minWidth: "220px" }}
                                >
                                  Location Code
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Site Type
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Warranty
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Condition
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Status
                                </TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              <TableRow>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">Rack-1</TableCell>
                                <TableCell align="left">
                                  TJS2025-05-01
                                </TableCell>
                                <TableCell align="left">Bhudhana</TableCell>
                                <TableCell align="left">456789</TableCell>
                                <TableCell align="left">Native Site</TableCell>
                                <TableCell align="left">2026</TableCell>
                                <TableCell align="left">Semi-Damage</TableCell>
                                <TableCell align="left">in Use</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Grid container spacing={2}>
                          {/* Row 1 */}
                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Issue Date
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              type="date"
                              name="issueDate"
                              onChange={(e) =>
                                setFieldValue("issueDate", e.target.value)
                              }
                              onBlur={() => setFieldTouched("issueDate", true)}
                              value={values?.issueDate || ""}
                              error={
                                touched?.issueDate && Boolean(errors?.issueDate)
                              }
                              helperText={
                                touched?.issueDate && errors?.issueDate
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transfer Type
                            </Typography>
                            <Autocomplete
                              options={["Internal", "External"]}
                              onChange={(e, val) =>
                                setFieldValue("transferType", val || "")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select"
                                  name="transferType"
                                  error={
                                    touched.transferType &&
                                    Boolean(errors.transferType)
                                  }
                                  helperText={
                                    touched.transferType && errors.transferType
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transfered To
                            </Typography>
                            <Autocomplete
                              options={["268653", "268654"]}
                              onChange={(e, val) =>
                                setFieldValue("transferedTo", val || "")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  name="transferedTo"
                                  error={
                                    touched.transferedTo &&
                                    Boolean(errors.transferedTo)
                                  }
                                  helperText={
                                    touched.transferedTo && errors.transferedTo
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transport
                            </Typography>
                            <Autocomplete
                              options={["Option A", "Option B"]}
                              onChange={(e, val) =>
                                setFieldValue("transport", val || "")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  name="transport"
                                  placeholder="Select"
                                  error={
                                    touched.transport &&
                                    Boolean(errors.transport)
                                  }
                                  helperText={
                                    touched.transport && errors.transport
                                  }
                                />
                              )}
                            />
                          </Grid>

                          {/* Row 2 */}
                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transporter Name
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Transporter Name"
                              name="transporterName"
                              onChange={(e) =>
                                setFieldValue("transporterName", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("transporterName", true)
                              }
                              value={values?.transporterName || ""}
                              error={
                                touched?.transporterName &&
                                Boolean(errors?.transporterName)
                              }
                              helperText={
                                touched?.transporterName &&
                                errors?.transporterName
                              }
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
                              name="vehicleNo"
                              onChange={(e) =>
                                setFieldValue("vehicleNo", e.target.value)
                              }
                              onBlur={() => setFieldTouched("vehicleNo", true)}
                              value={values?.vehicleNo || ""}
                              error={
                                touched?.vehicleNo && Boolean(errors?.vehicleNo)
                              }
                              helperText={
                                touched?.vehicleNo && errors?.vehicleNo
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Driver Name
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Driver Name"
                              name="driverName"
                              onChange={(e) =>
                                setFieldValue("driverName", e.target.value)
                              }
                              onBlur={() => setFieldTouched("driverName", true)}
                              value={values?.driverName || ""}
                              error={
                                touched?.driverName &&
                                Boolean(errors?.driverName)
                              }
                              helperText={
                                touched?.driverName && errors?.driverName
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Driver No.
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Driver No."
                              name="driverNo"
                              onChange={(e) =>
                                setFieldValue("driverNo", e.target.value)
                              }
                              onBlur={() => setFieldTouched("driverNo", true)}
                              value={values?.driverNo || ""}
                              error={
                                touched?.driverNo && Boolean(errors?.driverNo)
                              }
                              helperText={touched?.driverNo && errors?.driverNo}
                            />
                          </Grid>

                          {/* Row 3 */}
                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Document
                            </Typography>
                            <input
                              type="file"
                              id="document"
                              hidden
                              onChange={(event) => {
                                setFieldValue(
                                  "document",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                            <label htmlFor="document">
                              <Button
                                variant="outlined"
                                fullWidth
                                component="span"
                                endIcon={<FileUploadOutlinedIcon />}
                                sx={{
                                  justifyContent: "space-between",
                                  paddingY: "5px",
                                  borderColor: "rgba(0, 0, 0, 0.23)",
                                  lineHeight: "1.9",
                                  color: "text.secondary",
                                  textTransform: "none",
                                  "&:hover": { borderColor: "#475259" },
                                }}
                              >
                                Upload Doc
                              </Button>
                            </label>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Initiated By
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Name"
                              name="initiatedBy"
                              onChange={(e) =>
                                setFieldValue("initiatedBy", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("initiatedBy", true)
                              }
                              value={values?.initiatedBy || ""}
                              error={
                                touched?.initiatedBy &&
                                Boolean(errors?.initiatedBy)
                              }
                              helperText={
                                touched?.initiatedBy && errors?.initiatedBy
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Remarks
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Remarks"
                              name="remarks"
                              onChange={(e) =>
                                setFieldValue("remarks", e.target.value)
                              }
                              onBlur={() => setFieldTouched("remarks", true)}
                              value={values?.remarks || ""}
                              error={
                                touched?.remarks && Boolean(errors?.remarks)
                              }
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

export default CreateTransferModal;
