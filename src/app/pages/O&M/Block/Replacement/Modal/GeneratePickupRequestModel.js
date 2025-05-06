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
function GeneratePickupRequestModel({ open, closeModal, row }) { 
  const [isSubmitting, setSubmitting] = useState(false);
  const initialValues = {
    issueDate: "",
    pickupLocation: "",
    transport_type: "",

    road: {
      transporter_name: "",
      vehicle_no: "",
      driver_name: "",
      driver_phone_no: "",
    },

    air: {
      transporter_name: "",
      awb_no: "",
    },

    // document: "", // or {} if using the nested object version
    initiatedBy: "",
    remarks: "",
  };

  const validationSchema = Yup.object().shape({
    issueDate: Yup.date().required("Issue date is required"),
    pickupLocation: Yup.string().required("Pickup location is required"),
    // wayOfTransport: Yup.string().required("Way of transport is required"),
    // transporterName: Yup.string().required("Transporter name is required"),
    // vehicleNumber: Yup.string().required("Vehicle number is required"),
    // driverName: Yup.string().required("Driver name is required"),
    // driverNumber: Yup.string()
    //   .required("Driver number is required")
    //   .matches(/^[0-9]{10}$/, "Driver number must be 10 digits"),
    // document: Yup.string().nullable(), // Adjust if using object
    initiatedBy: Yup.string().required("Initiator is required"),
    remarks: Yup.string().nullable(),
  });

  const handleSubmit = async (values) => {
    const body = {
      requested_item: {
        requested_item_id: row?._id,
        requested_item_details: {
          ...row,
        },
      },
      transport_details: {
        transport_type: values?.transport_type,
      },
      issueDate: values?.issueDate,
      pickupLocation: values?.pickupLocation,
      // wayOfTransport: values?.wayOfTransport,
      // transporterName: values?.transporterName,
      // vehicleNumber: values?.vehicleNumber,
      // driverName: values?.driverName,
      // driverNumber: values?.driverName,
      // document: values?.document,
      // document: {
      //   invoiceNumber: "INV-20250430-001",
      //   manifest: "Manifest details or link here",
      //   attachments: ["invoice.pdf", "manifest.pdf"],
      // },
      initiatedBy: values?.initiatedBy,
      remarks: values?.remarks,
    };
    if (values.transport_type === "road") {
      body.transport_details.road = {
        transporter_name: values?.road?.transporter_name,
        vehicle_no: values?.road?.vehicle_no,
        driver_name: values?.road?.driver_name,
        driver_phone_no: values?.road?.driver_phone_no,
      };
    } else {
      body.transport_details.air = {
        transporter_name: values?.air?.transporter_name,
        awb_no: values?.air?.awb_no,
      };
    }
   
    setSubmitting(true);
    try {
      const res = await Axios.post("/o&m/block/replacement/assign", body);

      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        closeModal();
        Swal.fire({
          icon: "success",
          text: "Replacement request send successfully",
          timer: 1000,
          showConfirmButton: false,
        });
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
      closeModal();
      setSubmitting(false);
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
                          Generate Pickup Request
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
                                {/* <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Site Type
                                </TableCell> */}
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
                                  {row?.block_asset_details?.equipment_name ||
                                    "-"}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.block_asset_details?.serial_no || "-"}
                                </TableCell>

                                <TableCell align="left">
                                  {row?.block_asset_details?.block_details
                                    ?.gp_name || "-"}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.block_asset_details?.block_details
                                    ?.gp_code || "-"}
                                </TableCell>
                                {/* <TableCell align="left">Native Site</TableCell> */}
                                <TableCell align="left">
                                  {row?.equipment_details?.warranty_status
                                    ? "Yes"
                                    : "No"}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.block_asset_details?.condition || "-"}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.block_asset_details?.condition_status ||
                                    "-"}
                                </TableCell>
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
                              value={values.issueDate}
                              onChange={(e) =>
                                setFieldValue("issueDate", e.target.value)
                              }
                              onBlur={() => setFieldTouched("issueDate", true)}
                              error={
                                touched.issueDate && Boolean(errors.issueDate)
                              }
                              helperText={touched.issueDate && errors.issueDate}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Pickup Location
                            </Typography>
                            <Autocomplete
                              options={
                                [
                                  "BSNL-Warehouse1",
                                  "BSNL-Warehouse2",
                                  "BSNL-Warehouse3",
                                  "BSNL-Warehouse4",
                                  "BSNL-Warehouse5",
                                ] || []
                              }
                              onChange={(e, val) =>
                                setFieldValue("pickupLocation", val || "")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  name="pickupLocation"
                                  placeholder="Select"
                                  error={
                                    touched.pickupLocation &&
                                    Boolean(errors.pickupLocation)
                                  }
                                  helperText={
                                    touched.pickupLocation &&
                                    errors.pickupLocation
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transport Type
                            </Typography>
                            <Autocomplete
                              options={["road", "air"]}
                              onChange={(e, val) =>
                                setFieldValue("transport_type", val || "")
                              }
                              value={values.transport_type || ""}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  name="transport_type"
                                  placeholder="Select"
                                  error={
                                    touched.transport_type &&
                                    Boolean(errors.transport_type)
                                  }
                                  helperText={
                                    touched.transport_type &&
                                    errors.transport_type
                                  }
                                />
                              )}
                            />
                          </Grid>

                          {values.transport_type === "road" && (
                            <>
                              <Grid item xs={12} md={3}>
                                <Typography fontSize="14px" gutterBottom>
                                  Transporter Name
                                </Typography>
                                <TextField
                                  fullWidth
                                  size="small"
                                  placeholder="Enter Transporter Name"
                                  name="road.transporter_name"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "road.transporter_name",
                                      e.target.value
                                    )
                                  }
                                  value={values.road?.transporter_name || ""}
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
                                  name="road.vehicle_no"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "road.vehicle_no",
                                      e.target.value
                                    )
                                  }
                                  value={values.road?.vehicle_no || ""}
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
                                  name="road.driver_name"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "road.driver_name",
                                      e.target.value
                                    )
                                  }
                                  value={values.road?.driver_name || ""}
                                />
                              </Grid>

                              <Grid item xs={12} md={3}>
                                <Typography fontSize="14px" gutterBottom>
                                  Driver Phone No.
                                </Typography>
                                <TextField
                                  fullWidth
                                  size="small"
                                  placeholder="Enter Driver Phone No."
                                  name="road.driver_phone_no"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "road.driver_phone_no",
                                      e.target.value
                                    )
                                  }
                                  value={values.road?.driver_phone_no || ""}
                                />
                              </Grid>
                            </>
                          )}

                          {values.transport_type === "air" && (
                            <>
                              <Grid item xs={12} md={3}>
                                <Typography fontSize="14px" gutterBottom>
                                  Transporter Name
                                </Typography>
                                <TextField
                                  fullWidth
                                  size="small"
                                  placeholder="Enter Transporter Name"
                                  name="air.transporter_name"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "air.transporter_name",
                                      e.target.value
                                    )
                                  }
                                  value={values.air?.transporter_name || ""}
                                />
                              </Grid>

                              <Grid item xs={12} md={3}>
                                <Typography fontSize="14px" gutterBottom>
                                  AWB No.
                                </Typography>
                                <TextField
                                  fullWidth
                                  size="small"
                                  placeholder="Enter AWB No."
                                  name="air.awb_no"
                                  onChange={(e) =>
                                    setFieldValue("air.awb_no", e.target.value)
                                  }
                                  value={values.air?.awb_no || ""}
                                />
                              </Grid>
                            </>
                          )}
                          {/* 
                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transport
                            </Typography>
                            <Autocomplete
                              options={["Road", "Air"] || []}
                              onChange={(e, val) =>
                                setFieldValue("wayOfTransport", val || "")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  name="wayOfTransport"
                                  placeholder="Select"
                                  error={
                                    touched.wayOfTransport &&
                                    Boolean(errors.wayOfTransport)
                                  }
                                  helperText={
                                    touched.wayOfTransport &&
                                    errors.wayOfTransport
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transporter Name
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Transporter Name"
                              name="transporterName"
                              value={values.transporterName}
                              onChange={(e) =>
                                setFieldValue("transporterName", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("transporterName", true)
                              }
                              error={
                                touched.transporterName &&
                                Boolean(errors.transporterName)
                              }
                              helperText={
                                touched.transporterName &&
                                errors.transporterName
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
                              name="vehicleNumber"
                              value={values.vehicleNumber}
                              onChange={(e) =>
                                setFieldValue("vehicleNumber", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("vehicleNumber", true)
                              }
                              error={
                                touched.vehicleNumber &&
                                Boolean(errors.vehicleNumber)
                              }
                              helperText={
                                touched.vehicleNumber && errors.vehicleNumber
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
                              value={values.driverName}
                              onChange={(e) =>
                                setFieldValue("driverName", e.target.value)
                              }
                              onBlur={() => setFieldTouched("driverName", true)}
                              error={
                                touched.driverName && Boolean(errors.driverName)
                              }
                              helperText={
                                touched.driverName && errors.driverName
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
                              name="driverNumber"
                              value={values.driverNumber}
                              onChange={(e) =>
                                setFieldValue("driverNumber", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("driverNumber", true)
                              }
                              error={
                                touched.driverNumber &&
                                Boolean(errors.driverNumber)
                              }
                              helperText={
                                touched.driverNumber && errors.driverNumber
                              }
                            />
                          </Grid> */}

                          {/* <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Document
                            </Typography>
                            <input
                              type="file"
                              id="document"
                              hidden
                              onChange={(e) =>
                                setFieldValue("document", e.target.files[0])
                              }
                            />
                            <label htmlFor="document">
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                endIcon={<FileUploadOutlinedIcon />}
                                sx={{
                                  justifyContent: "space-between",
                                  paddingY: "5px",
                                  borderColor: "rgba(0, 0, 0, 0.23)",
                                  color: "text.secondary",
                                  textTransform: "none",
                                  "&:hover": { borderColor: "#475259" },
                                }}
                              >
                                Upload Doc
                              </Button>
                            </label>
                          </Grid> */}

                          {/* Row 3 */}
                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Initiated By
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Enter Name"
                              name="initiatedBy"
                              value={values.initiatedBy}
                              onChange={(e) =>
                                setFieldValue("initiatedBy", e.target.value)
                              }
                              onBlur={() =>
                                setFieldTouched("initiatedBy", true)
                              }
                              error={
                                touched.initiatedBy &&
                                Boolean(errors.initiatedBy)
                              }
                              helperText={
                                touched.initiatedBy && errors.initiatedBy
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
                              value={values.remarks}
                              onChange={(e) =>
                                setFieldValue("remarks", e.target.value)
                              }
                              onBlur={() => setFieldTouched("remarks", true)}
                              error={touched.remarks && Boolean(errors.remarks)}
                              helperText={touched.remarks && errors.remarks}
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

export default GeneratePickupRequestModel;
