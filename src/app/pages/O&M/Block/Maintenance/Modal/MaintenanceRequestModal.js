import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Autocomplete, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Axios } from "index";
import Swal from "sweetalert2";
import moment from "moment";
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
function MaintenanceRequestModal({ open, closeModal,row }) {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  console.log("row1: ",row);
  const initialValues = {
    issue_date: row?.createdAt || "",
    estimate_arrival_date: "",
    repair_type: row?.repair_type || "",
    assign_to: row?.assign_to || "",
    maintenance_type:row?.maintenance_type || "",
    // document: null,
    issue_reported: row?.issue_reported || "",
    remarks: "",
  };

  const validationSchema = Yup.object().shape({
    issue_date: Yup.date()
      .required("Issue Date is required")
      .typeError("Invalid date"),
    estimate_arrival_date: Yup.date()
      .required("estimate_arrival_date is required")
      .min(Yup.ref("issue_date"), "estimate_arrival_date should be same or after Issue Date")
      .typeError("Invalid date"),
    repair_type: Yup.string().required("Repair Type is required"),
    assign_to: Yup.string().required("Assigned To is required"),
    maintenance_type: Yup.string().required("Maintenace Type is required"),
    // document: Yup.mixed()
    //   .required("Document is required")
    //   .test(
    //     "fileSize",
    //     "File size is too large (max 5MB)",
    //     (value) => !value || (value && value.size <= 5 * 1024 * 1024)
    //   ),
    issue_reported: Yup.string()
      .required("Issue Reported is required")
      .max(100, "Too long"),
    remarks: Yup.string().required("Remarks are required").max(500, "Too long"),
  });

  const handleSubmit = async (values) => {
      const body = {
        issue_date: values?.issue_date,
        estimate_arrival_date: values?.estimate_arrival_date,
        repair_type: values?.repair_type,
        maintenance_type: values?.maintenance_type,
        issue_reported: values?.issue_reported,
        assign_to: values?.assign_to,
        remarks: values?.remarks,
      };
      setSubmitting(true);
      try {
        const res = await Axios.post(
          `/block-maintenance-issued/issued-maintenance-request/${row._id}`,
          body
        );
  
        const statusCode = res?.data?.statusCode;
  
        if (statusCode === 200 || statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Maintenance request Assigned successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          closeModal();
        } else {
          throw new Error(res?.data?.message || "Unknown Error");
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          text: err?.response?.data?.message || err.message,
        });
        closeModal();
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
                          Request Maintenance
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
                                <TableCell align="left">
                                  {row?.assets_details?.equipment_name}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.assets_details?.serial_no}
                                </TableCell>
                                <TableCell align="left">
                                  {
                                    row?.assets_details?.location_details
                                      ?.location_name
                                  }
                                </TableCell>
                                <TableCell align="left">
                                  {
                                    row?.assets_details?.location_details
                                      ?.location_code
                                  }
                                </TableCell>

                                <TableCell align="left">Native Site</TableCell>
                                <TableCell align="left">
                                  {moment(row?.warranty_date).format("YYYY")}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.assets_details?.condition}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.assets_details?.condition_status}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Grid container rowSpacing={2} columnSpacing={3}>
                          <Grid item xs={6} md={3}>
                            <Typography variant="h6" fontSize="14px">
                              Issue Date
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              type="date"
                              name="issue_date"
                              onChange={(e) =>
                                setFieldValue("issue_date", e.target.value)
                              }
                              onBlur={() => setFieldTouched("issue_date", true)}
                              // value={values?.issue_date || "-"}
                              value={moment(values?.issue_date).format("YYYY-MM-DD") || "-"}
                              error={
                                touched?.issue_date &&
                                Boolean(errors?.issue_date)
                              }
                              helperText={
                                touched?.issue_date && errors?.issue_date
                              }
                            />
                          </Grid>

                          <Grid item xs={6} md={3}>
                            <Typography variant="h6" fontSize="14px">
                              ETA
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              type="date"
                              name="estimate_arrival_date"
                              onChange={(e) =>
                                setFieldValue(
                                  "estimate_arrival_date",
                                  e.target.value
                                )
                              }
                              onBlur={() =>
                                setFieldTouched("estimate_arrival_date", true)
                              }
                              value={values?.estimate_arrival_date || ""}
                              error={
                                touched?.estimate_arrival_date &&
                                Boolean(errors?.estimate_arrival_date)
                              }
                              helperText={
                                touched?.estimate_arrival_date &&
                                errors?.estimate_arrival_date
                              }
                            />
                          </Grid>

                          <Grid item xs={6} md={3}>
                            <Typography variant="h6" fontSize="14px">
                              Repair Type
                            </Typography>
                            <Autocomplete
                              options={["onsite", "offsite"]}
                              onChange={(e, newValue) =>
                                setFieldValue("repair_type", newValue || "")
                              }
                              value={values?.repair_type || null}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select"
                                  name="repair_type"
                                  error={
                                    touched.repair_type &&
                                    Boolean(errors.repair_type)
                                  }
                                  helperText={
                                    touched.repair_type && errors.repair_type
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={6} md={3}>
                            <Typography variant="h6" fontSize="14px">
                              Assigned To
                            </Typography>
                            <Autocomplete
                              options={["Technician A", "Technician B"]} // Replace with real data
                              onChange={(e, newValue) =>
                                setFieldValue("assign_to", newValue || "")
                              }
                              value={values?.assign_to || null}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select"
                                  name="assign_to"
                                  error={
                                    touched.assign_to &&
                                    Boolean(errors.assign_to)
                                  }
                                  helperText={
                                    touched.assign_to && errors.assign_to
                                  }
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <Typography variant="h6" fontSize="14px">
                              Allocated To
                            </Typography>
                            <Autocomplete
                              options={["o&m", "amc"]} // Replace with real data
                              onChange={(e, newValue) =>
                                setFieldValue(
                                  "maintenance_type",
                                  newValue || ""
                                )
                              }
                              value={values?.maintenance_type || null}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select Allocated To"
                                  name="maintenance_type"
                                  error={
                                    touched.maintenance_type &&
                                    Boolean(errors.maintenance_type)
                                  }
                                  helperText={
                                    touched.maintenance_type &&
                                    errors.maintenance_type
                                  }
                                />
                              )}
                            />
                          </Grid>

                          {/* <Grid item xs={12} md={3}>
                            <Typography variant="h6" fontSize="14px">
                              Document
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
                          </Grid> */}

                          <Grid item xs={6} md={3}>
                            <Typography variant="h6" fontSize="14px">
                              Issue Reported
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Name"
                              name="issue_reported"
                              onChange={(e) =>
                                setFieldValue("issue_reported", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("issue_reported", true)
                              }
                              value={values?.issue_reported || ""}
                              error={
                                touched?.issue_reported &&
                                Boolean(errors?.issue_reported)
                              }
                              helperText={
                                touched?.issue_reported &&
                                errors?.issue_reported
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography variant="h6" fontSize="14px">
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

export default MaintenanceRequestModal;
