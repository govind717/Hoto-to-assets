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
import { hoto_gp_asset_partfolio_data_disptach } from "app/redux/actions/Hoto_to_servey/GP";
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



function RequestMaintenanceModal({ open, handleClose, row, setToggle }) {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    repair_type: "",
    maintenance_type: "",
    issue_reported: "",
    remarks: "",
  };
  const validationSchema = Yup.object().shape({
    repair_type: Yup.string().required("Repair type is required"),
    maintenance_type: Yup.string().required("Maintenance type is required"),
    issue_reported: Yup.string().required("Issue Reported is Required"),
    remarks: Yup.string(),
  });

  const handleSubmit = async (values) => {
    const body = {
      assets_ids: [row?._id],
      other_details: {
        repair_type: values?.repair_type,
        maintenance_type: values?.maintenance_type,
        issue_reported: values?.issue_reported,
        remarks: values?.remarks,
      },
    };
    setSubmitting(true);
    try {
      const res = await Axios.post(
        "/gp-maintenance-request/add-maintenance-request",
        body
      );

      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        Swal.fire({
          icon: "success",
          text: "Maintenance request send successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        setToggle((prev) => !prev);
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
                        Request Maintenance
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        {/* <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Requested Date
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            type="date"
                            name="requestedDate"
                            onChange={(e) =>
                              setFieldValue("requestedDate", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("requestedDate", true)
                            }
                            value={
                              values?.requestedDate ||
                              new Date().toISOString().split("T")[0]
                            }
                            error={
                              touched?.requestedDate &&
                              Boolean(errors?.requestedDate)
                            }
                            helperText={
                              touched?.requestedDate && errors?.requestedDate
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid> */}

                        {/* <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Maintenance ID
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
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Repair Type
                          </Typography>
                          <Autocomplete
                            options={["onsite", "offsite"]}
                            getOptionLabel={(option) => option || ""}
                            // value={}
                            onChange={(e, newValue) => {
                              setFieldValue(
                                "repair_type",
                                newValue ? newValue : ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                placeholder="Select Repair Type"
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
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Allowcated To
                          </Typography>
                          <Autocomplete
                            options={["amc", "o&m"]}
                            getOptionLabel={(option) => option || ""}
                            // value={}
                            onChange={(e, newValue) => {
                              setFieldValue(
                                "maintenance_type",
                                newValue ? newValue : ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                placeholder="Select Repair Type"
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
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Issue Reported
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Issue Reported"
                            name="issue_reported"
                            onChange={(e) =>
                              setFieldValue("issue_reported", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("issue_reported", true)
                            }
                            value={values?.issue_reported}
                            error={
                              touched?.issue_reported &&
                              Boolean(errors?.issue_reported)
                            }
                            helperText={
                              touched?.issue_reported && errors?.issue_reported
                            }
                          />
                        </Grid>
                        {/* <Grid item xs={6} md={3}>
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
                        </Grid> */}
                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            remarks
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter remarks"
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

export default RequestMaintenanceModal;
