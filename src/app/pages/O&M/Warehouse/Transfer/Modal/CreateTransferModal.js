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
function CreateTransferModal({ open, closeModal, row }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [blockTransferOptions, setBlockTransferOptions] = useState([]);
  const [gpTransferOptions, setGpTransferOptions] = useState([]);
  const [warehouseTransferOptions, setWarehouseTransferOptions] = useState([]);
  console.log("Row5 : ", row);
  const initialValues = {
    issueDate: row?.createdAt || "",
    transfer_type: row?.transfer_type || "",
    transfer_to: row?.transfer_to || null,
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
    transfer_location_type: row?.transfer_from?.location_type,
    remarks: "",
  };
  const validationSchema = Yup.object().shape({
    issueDate: Yup.date()
      .required("Issue Date is required")
      .typeError("Invalid date"),
    transfer_to: Yup.object().nullable().required("Transfer to is Required"),
    transfer_type: Yup.string().required("Transper Type is required"),
    transport_type: Yup.string().required("Transport Type is required"),
    transfer_location_type: Yup.string().required(
      "Transfer location type is required"
    ),
    remarks: Yup.string(),
  });

  const handleSubmit = async (values) => {
    let tranfer_to = {};
    if (values?.transfer_location_type === "block") {
      tranfer_to = {
        location_type: values?.transfer_location_type,
        location_name:
          values?.transfer_to?.blockName || values?.transfer_to?.location_name,
        location_code:
          values?.transfer_to?.blockCode || values?.transfer_to?.location_code,
      };
    }
    if (values?.transfer_location_type === "gp") {
      tranfer_to = {
        location_type: values?.transfer_location_type,
        location_name:
          values?.transfer_to?.gpName || values?.transfer_to?.location_name,
        location_code:
          values?.transfer_to?.LGDCode || values?.transfer_to?.location_code,
      };
    }
    if (values?.transfer_location_type === "warehouse") {
      tranfer_to = {
        location_type: values?.transfer_location_type,
        location_name:
          values?.transfer_to?.warehouse_name ||
          values?.transfer_to?.location_name,
        location_code:
          values?.transfer_to?.code || values?.transfer_to?.location_code,
      };
    }
    const body = {
      transfer_type: values?.transfer_type,
      transfer_from: row?.transfer_from,
      transfer_to: tranfer_to,
      transport_details: {
        transport_type: values?.transport_type,
      },
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
    console.log("Body1 : ",body);
    setSubmitting(true);
    try {
      const res = await Axios.post(
        `/warehouse-transfer-received/received-transfer-request/${row._id}`,
        body
      );

      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        Swal.fire({
          icon: "success",
          text: "Transfer request Assigned successfully",
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
  useEffect(() => {
    if (row?.transfer_type === "gp") {
    } else if (row?.transfer_type === "block") {
    } else if (row?.transfer_type === "warehouse") {
    }
    Axios.get("/master/gp/dropdown")
      .then((res) => {
        setGpTransferOptions(res?.data?.result);
      })
      .catch((err) => {
        console.log("Error while fetching block dropdown");
      });
    Axios.get("/master/block/dropdown")
      .then((res) => {
        setBlockTransferOptions(res?.data?.result);
      })
      .catch((err) => {
        console.log("Error while fetching block dropdown");
      });
    Axios.get("/master/warehouse/dropdown")
      .then((res) => {
        setWarehouseTransferOptions(res?.data?.result);
      })
      .catch((err) => {
        console.log("Error while fetching block dropdown");
      });
  }, []);
  // const fetchTransferToOptions = (val) => {
  //   if (val === "gp") {
  //     Axios.get("/master/gp/dropdown")
  //       .then((res) => {
  //         setTransferOptions(res?.data?.result);
  //       })
  //       .catch((err) => {
  //         console.log("Error while fetching block dropdown");
  //       });
  //   } else if (val === "block") {
  //     Axios.get("/master/block/dropdown")
  //       .then((res) => {
  //         setTransferOptions(res?.data?.result);
  //       })
  //       .catch((err) => {
  //         console.log("Error while fetching block dropdown");
  //       });
  //   } else if (val === "warehouse") {
  //     Axios.get("/master/warehouse/dropdown")
  //       .then((res) => {
  //         setTransferOptions(res?.data?.result);
  //       })
  //       .catch((err) => {
  //         console.log("Error while fetching block dropdown");
  //       });
  //   }
  // };

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
                                  sx={{ ...tableCellSx, minWidth: "180px" }}
                                >
                                  Equipment
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ ...tableCellSx, minWidth: "120px" }}
                                >
                                  Serial No.
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Transfer Type
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Transfer From
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ ...tableCellSx, minWidth: "180px" }}
                                >
                                  Transfer To
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Initaited By
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Status
                                </TableCell>
                                <TableCell align="left" sx={{ ...tableCellSx }}>
                                  Remark
                                </TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              <TableRow>
                                <TableCell align="left">
                                  {row?.assets_details?.equipment_name}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.assets_details?.serial_no}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.transfer_type}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.transfer_from?.location_name}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.transfer_to?.location_name}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.created_user_details?.firstName}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.assets_details?.condition}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.remarks}
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
                              onChange={(e) =>
                                setFieldValue(
                                  "issueDate",
                                  moment(e.target.value).format("YYYY-MM-DD")
                                )
                              }
                              onBlur={() => setFieldTouched("issueDate", true)}
                              // value={values?.issueDate || ""}
                              value={
                                moment(values?.issue_date).format(
                                  "YYYY-MM-DD"
                                ) || "-"
                              }
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
                              options={["internal", "external"]}
                              onChange={(e, val) =>
                                setFieldValue("transfer_type", val || "")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select"
                                  name="transfer_type"
                                  error={
                                    touched.transfer_type &&
                                    Boolean(errors.transfer_type)
                                  }
                                  helperText={
                                    touched.transfer_type &&
                                    errors.transfer_type
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <Typography fontSize="14px" gutterBottom>
                              Transfer Location Type
                            </Typography>
                            <Autocomplete
                              options={["gp", "block", "warehouse"]}
                              value={values.transfer_location_type || ""}
                              onChange={(e, val) => {
                                setFieldValue(
                                  "transfer_location_type",
                                  val || ""
                                );
                                // fetchTransferToOptions(val);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select Location Type"
                                  name="transfer_location_type"
                                  error={
                                    touched.transfer_location_type &&
                                    Boolean(errors.transfer_location_type)
                                  }
                                  helperText={
                                    touched.transfer_location_type &&
                                    errors.transfer_location_type
                                  }
                                />
                              )}
                            />
                          </Grid>

                          {values?.transfer_location_type === "block" && (
                            <Grid item xs={12} md={3}>
                              <Typography variant="h6" fontSize="14px" mb={0.5}>
                                Transfer To
                              </Typography>
                              <Autocomplete
                                options={blockTransferOptions}
                                // getOptionLabel={(option) =>
                                //   option?.location_name || ""
                                // }
                                getOptionLabel={(option) => {
                                  return option?.blockName || "";
                                }}
                                value={values?.transfer_to}
                                onChange={(e, newValue) => {
                                  setFieldValue(
                                    "transfer_to",
                                    newValue ? newValue : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    size="small"
                                    placeholder="Select Repair Type"
                                    name="transfer_to"
                                    error={
                                      touched.transfer_to &&
                                      Boolean(errors.transfer_to)
                                    }
                                    helperText={
                                      touched.transfer_to && errors.transfer_to
                                    }
                                  />
                                )}
                              />
                            </Grid>
                          )}
                          {values?.transfer_location_type === "gp" && (
                            <Grid item xs={12} md={3}>
                              <Typography variant="h6" fontSize="14px" mb={0.5}>
                                Transfer To
                              </Typography>
                              <Autocomplete
                                options={gpTransferOptions}
                                // getOptionLabel={(option) =>
                                //   option?.location_name || ""
                                // }
                                getOptionLabel={(option) => {
                                  return (
                                    option?.gpName || option?.location_name
                                  );
                                }}
                                value={values?.transfer_to}
                                onChange={(e, newValue) => {
                                  setFieldValue(
                                    "transfer_to",
                                    newValue ? newValue : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    size="small"
                                    placeholder="Select Repair Type"
                                    name="transfer_to"
                                    error={
                                      touched.transfer_to &&
                                      Boolean(errors.transfer_to)
                                    }
                                    helperText={
                                      touched.transfer_to && errors.transfer_to
                                    }
                                  />
                                )}
                              />
                            </Grid>
                          )}
                          {values?.transfer_location_type === "warehouse" &&
                          <Grid item xs={12} md={3}>
                            <Typography variant="h6" fontSize="14px" mb={0.5}>
                              Transfer To
                            </Typography>
                            <Autocomplete
                              options={warehouseTransferOptions}
                              // getOptionLabel={(option) =>
                              //   option?.location_name || ""
                              // }
                              getOptionLabel={(option) => {
                                return option?.warehouse_name || "";
                              }}
                              value={values?.transfer_to}
                              onChange={(e, newValue) => {
                                setFieldValue(
                                  "transfer_to",
                                  newValue ? newValue : ""
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  placeholder="Select Repair Type"
                                  name="transfer_to"
                                  error={
                                    touched.transfer_to &&
                                    Boolean(errors.transfer_to)
                                  }
                                  helperText={
                                    touched.transfer_to && errors.transfer_to
                                  }
                                />
                              )}
                            />
                          </Grid>
                          }

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
