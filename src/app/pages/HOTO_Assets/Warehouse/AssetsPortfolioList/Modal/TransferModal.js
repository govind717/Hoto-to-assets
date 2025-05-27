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
import { hoto_warehouse_asset_partfolio_data_disptach } from "app/redux/actions/Hoto_to_servey/Warehouse";
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

function TransferModal({ open, handleClose, row, setToggle }) {
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const [transferToOprtions, setTransferToOprtions] = useState([]);
  const initialValues = {
    transfer_type: "",
    transfer_from: row
      ? {
          location_type: row?.equipment_details?.location_type,
          location_name: row?.equipment_details?.location_name,
          location_code: row?.equipment_details?.location_code,
        }
      : null,
    transfer_to_type: "",
    transfer_to: null,
    remarks: "",
  };
  const validationSchema = Yup.object().shape({
    transfer_type: Yup.string().required("Transfer type is required"),
    transfer_from: Yup.object()
      .nullable()
      .required("Transfer From is required"),
    transfer_to_type: Yup.string().required("Transfer to type is required"),
    transfer_to: Yup.object().nullable().required("Transfer To is Required"),
    remarks: Yup.string(),
  });

  const handleSubmit = async (values) => {
    let tranfer_to = {};
    if (values?.transfer_to_type === "block") {
      tranfer_to = {
        location_type: values?.transfer_to_type,
        location_name: values?.transfer_to?.blockName,
        location_code: values?.transfer_to?.blockCode,
      };
    }
    if (values?.transfer_to_type === "gp") {
      tranfer_to = {
        location_type: values?.transfer_to_type,
        location_name: values?.transfer_to?.gpName,
        location_code: values?.transfer_to?.LGDCode,
      };
    }
    if (values?.transfer_to_type === "warehouse") {
      tranfer_to = {
        location_type: values?.transfer_to_type,
        location_name: values?.transfer_to?.warehouse_name,
        location_code: values?.transfer_to?.code,
      };
    }
    const body = {
      assets_ids: [row?._id],
      other_details: {
        transfer_type: values?.transfer_type,
        transfer_from: {
          location_type: row?.equipment_details?.location_type,
          location_name: row?.equipment_details?.location_name,
          location_code: row?.equipment_details?.location_code,
        },
        transfer_to: tranfer_to,
        remarks: values?.remarks,
      },
    };
    setSubmitting(true);
    try {
      const res = await Axios.post(
        "/warehouse-transfer-request/add-transfer-request",
        body
      );

      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        Swal.fire({
          icon: "success",
          text: "Transfer request send successfully",
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
                        Request Transfer
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Transfer Type
                          </Typography>
                          <Autocomplete
                            options={["internal", "external"]}
                            getOptionLabel={(option) => option || ""}
                            // value={}
                            onChange={(e, newValue) => {
                              setFieldValue(
                                "transfer_type",
                                newValue ? newValue : ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                placeholder="Select Transfer Type"
                                name="transfer_type"
                                error={
                                  touched.transfer_type &&
                                  Boolean(errors.transfer_type)
                                }
                                helperText={
                                  touched.transfer_type && errors.transfer_type
                                }
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Transferd From
                          </Typography>
                          <TextField
                            sx={{ width: "100%" }}
                            size="small"
                            placeholder="Enter Transfered From"
                            name="transfer_from"
                            onChange={(e) =>
                              setFieldValue("transfer_from", e.target.value)
                            }
                            onBlur={() =>
                              setFieldTouched("transfer_from", true)
                            }
                            disabled
                            value={`${
                              values?.transfer_from?.location_type ||
                              "warehouse"
                            },${values?.transfer_from?.location_name},${
                              values?.transfer_from?.location_code
                            }`}
                            error={
                              touched?.transfer_from &&
                              Boolean(errors?.transfer_from)
                            }
                            helperText={
                              touched?.transfer_from && errors?.transfer_from
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Transfer to Type
                          </Typography>
                          <Autocomplete
                            options={["block", "gp", "warehouse"]}
                            getOptionLabel={(option) => option || ""}
                            onChange={(e, newValue) => {
                              if (newValue === "block") {
                                Axios.get("/master/block/dropdown")
                                  .then((res) => {
                                    setTransferToOprtions(res?.data?.result);
                                  })
                                  .catch((err) => {
                                    console.log(
                                      "Error while fetching block dropdown"
                                    );
                                  });
                              } else if (newValue === "warehouse") {
                                Axios.get("/master/warehouse/dropdown")
                                  .then((res) => {
                                    setTransferToOprtions(res?.data?.result);
                                  })
                                  .catch((err) => {
                                    console.log(
                                      "Error while fetching warehouse dropdown"
                                    );
                                  });
                              } else {
                                Axios.get("/master/gp/dropdown")
                                  .then((res) => {
                                    setTransferToOprtions(res?.data?.result);
                                  })
                                  .catch((err) => {
                                    console.log(
                                      "Error while fetching warehouse dropdown"
                                    );
                                  });
                              }
                              setFieldValue("transfer_to_type", newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                placeholder="Select transfer to Type"
                                name="transfer_to_type"
                                error={
                                  touched.transfer_to_type &&
                                  Boolean(errors.transfer_to_type)
                                }
                                helperText={
                                  touched.transfer_to_type &&
                                  errors.transfer_to_type
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px" mb={0.5}>
                            Transfer To
                          </Typography>
                          <Autocomplete
                            options={transferToOprtions}
                            getOptionLabel={(option) => {
                              if (values?.transfer_to_type === "block") {
                                return option?.blockName || "";
                              } else if (
                                values?.transfer_to_type === "warehouse"
                              ) {
                                return option?.warehouse_name || "";
                              } else {
                                return option?.gpName || "";
                              }
                            }}
                            value={values?.tranfer_to}
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
                                placeholder="Select Transfer To"
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

                        <Grid item xs={6} md={3}>
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

export default TransferModal;
