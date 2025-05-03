import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { hoto_servey_data_disptach } from "app/redux/actions/Hoto_to_servey";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import MapLocation from "app/pages/Hoto_to_Assets/MapLocation";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import { GP_MASTER, GP_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { addGP, updateGP } from "app/services/apis/master";
import { Axios } from "index";
import MasterApis from "app/Apis/master";

function AddGP() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [packageOptions, setPackageOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    packageName: state?.packageName || "",
    district: state?.district || "",
    block: state?.block || "",
    gpName: state?.gpName || "",
    LGDCode: state?.LGDCode || "",
    phase: state?.phase || "",
    latLong: state?.latLong || "",
    gpStatus: state?.gpStatus || "",
    covered: state?.covered || "",
    SRStatus: state?.SRStatus || "",
  };

  const validationSchema = yup.object({
    packageName: yup.object().nullable().required("Package Name is required"),
    district: yup.object().nullable().required("District Name is required"),
    block: yup.object().nullable().required("Block Name is required"),
    gpName: yup.string("Enter GP Name").trim().required("GP Name is required"),
    LGDCode: yup
      .string("Enter LGD Code")
      .trim()
      .required("LGD Code is required"),
    phase: yup.string("Enter Phase").trim().required("Phase is required"),
    latitude: yup
      .string("Enter Latitute")
      .trim()
      .required("Latitute is required"),
    longitude: yup
      .string("Enter Longitude")
      .trim()
      .required("Longitude is required"),
    gpStatus: yup
      .string("Enter GP Status")
      .trim()
      .required("GP Status is required"),
    covered: yup
      .string("Enter Covered")
      .trim()
      .required("Covered field is required"),
    SRStatus: yup
      .string("Enter SR Status")
      .trim()
      .required("SR Status is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      packageId: values?.packageName?.id,
      districtId: values?.district?.id,
      blockId: values?.block?.id,
      gpName: values?.gpName,
      LGDCode: values?.LGDCode,
      phase: values?.phase,
      latitude: values?.latitude,
      longitude: values?.longitude,
      gpStatus: values?.gpStatus,
      covered: values?.covered,
      SRStatus: values?.SRStatus,
    };

    setSubmitting(true);
    try {
      if (pathname === GP_MASTER_EDIT) {
        const data = await updateGP(body, state?.id);
        if (data?.data?.statusCode === 200) {
          navigate(GP_MASTER);
          Swal.fire({
            icon: "success",
            text: "GP Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating GP",
            // text: "",
          });
        }
      } else {
        const data = await addGP(body);
        if (data?.data?.statusCode === 201) {
          navigate(GP_MASTER);
          Swal.fire({
            icon: "success",
            text: "GP Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding GP",
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

  const fetchDistrictDropdown = (packageId) => {
    Axios.get(`${MasterApis?.district?.districtDropdown}?id=${packageId}`)
      .then((res) => setDistrictOptions(res?.data?.result || []))
      .catch((err) => console.error("District Fetch Error: ", err));
  };
  const fetchBlockDropdown = (blockId) => {
    Axios.get(`${MasterApis?.block?.blockDropdown}?id=${blockId}`)
      .then((res) => setBlockOptions(res?.data?.result || []))
      .catch((err) => console.error("District Fetch Error: ", err));
  };
  useEffect(() => {
    Axios.get(MasterApis?.package?.packageDropdown)
      .then((res) => {
        const packages = res?.data?.result || [];
        setPackageOptions(packages);

        if (state?.packageId) {
          const selectedPackage = packages.find(
            (opt) => opt.id === state.packageId
          );
          if (selectedPackage) {
            fetchDistrictDropdown(selectedPackage.id);
          }
        }
        if (state?.districtId) {
            fetchBlockDropdown(state.districtId);
        }
      })
      .catch((err) => console.error("Package Fetch Error: ", err));
  }, []);

  useEffect(() => {
    if (
      packageOptions.length &&
      (!state?.packageId || districtOptions.length || !state?.districtId)
    ) {
      setFormInitialValues({
        packageName: state?.packageId
          ? packageOptions.find((opt) => opt.id === state.packageId)
          : null,
        district: state?.districtId
          ? districtOptions.find((opt) => opt.id === state.districtId)
          : null,
        block: state?.blockId
          ? blockOptions.find((opt) => opt.id === state.blockId)
          : null,
        gpName: state?.gpName || "",
        LGDCode: state?.LGDCode || "",
        phase: state?.phase || "",
        latLong: state?.latLong || "",
        gpStatus: state?.gpStatus || "",
        covered: state?.covered || "",
        SRStatus: state?.SRStatus || "",
        latitude:state?.latitude || "",
        longitude:state?.longitude || "",
      });
    }
  }, [packageOptions, districtOptions, blockOptions]);

  const coveredOptions = [
    { label: "COVERED", value: "COVERED" },
    { label: "UNCOVERED", value: "UNCOVERED" },
  ];

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
                      {pathname === GP_MASTER_EDIT ? "Edit GP" : "Add GP"}
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={3}>
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Package Name
                          </Typography>
                          <Autocomplete
                            size="small"
                            options={packageOptions}
                            getOptionLabel={(option) =>
                              option.packageName || ""
                            }
                            value={values.packageName}
                            onChange={(_, value) => {
                              setFieldValue("packageName", value);
                              setFieldValue("district", null);
                              setFieldValue("block", null);
                              if (value?.id) fetchDistrictDropdown(value.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Package"
                                error={
                                  touched.packageName &&
                                  Boolean(errors.packageName)
                                }
                                helperText={
                                  touched.packageName && errors.packageName
                                }
                              />
                            )}
                          />
                        </Grid>

                        {/* District */}
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            District
                          </Typography>
                          <Autocomplete
                            size="small"
                            options={districtOptions}
                            getOptionLabel={(option) => option.district || ""}
                            value={values.district}
                            onChange={(_, value) => {
                              setFieldValue("block", null);
                              setFieldValue("district", value);
                              if (value?.id) fetchBlockDropdown(value.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select District"
                                error={
                                  touched.district && Boolean(errors.district)
                                }
                                helperText={touched.district && errors.district}
                              />
                            )}
                          />
                        </Grid>
                        {/* Block */}
                        <Grid item xs={12} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Block
                          </Typography>
                          <Autocomplete
                            size="small"
                            options={blockOptions}
                            getOptionLabel={(option) => option.blockName || ""}
                            value={values.block}
                            onChange={(_, value) => {
                              setFieldValue("block", value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Block"
                                error={touched.block && Boolean(errors.block)}
                                helperText={touched.block && errors.block}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            GP
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter GP Name"
                            name="gpName"
                            onChange={(e) =>
                              setFieldValue("gpName", e.target.value)
                            }
                            onBlur={() => setFieldTouched("gpName", true)}
                            value={values?.gpName}
                            error={touched?.gpName && Boolean(errors?.gpName)}
                            helperText={touched?.gpName && errors?.gpName}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            LGD Code
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter LGD Code"
                            name="LGDCode"
                            onChange={(e) =>
                              setFieldValue("LGDCode", e.target.value)
                            }
                            onBlur={() => setFieldTouched("LGDCode", true)}
                            value={values?.LGDCode}
                            error={touched?.LGDCode && Boolean(errors?.LGDCode)}
                            helperText={touched?.LGDCode && errors?.LGDCode}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Phase
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Phase"
                            name="phase"
                            onChange={(e) =>
                              setFieldValue("phase", e.target.value)
                            }
                            onBlur={() => setFieldTouched("phase", true)}
                            value={values?.phase}
                            error={touched?.phase && Boolean(errors?.phase)}
                            helperText={touched?.phase && errors?.phase}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                          Latitute
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Latitute"
                            name="latitude"
                            onChange={(e) =>
                              setFieldValue("latitude", e.target.value)
                            }
                            onBlur={() => setFieldTouched("latitude", true)}
                            value={values?.latitude}
                            error={touched?.latitude && Boolean(errors?.latitude)}
                            helperText={touched?.latitude && errors?.latitude}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                          Longitude
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Longitude"
                            name="longitude"
                            onChange={(e) =>
                              setFieldValue("longitude", e.target.value)
                            }
                            onBlur={() => setFieldTouched("longitude", true)}
                            value={values?.longitude}
                            error={touched?.longitude && Boolean(errors?.longitude)}
                            helperText={touched?.longitude && errors?.longitude}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            GP Status
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter GP Status"
                            name="gpStatus"
                            onChange={(e) =>
                              setFieldValue("gpStatus", e.target.value)
                            }
                            onBlur={() => setFieldTouched("gpStatus", true)}
                            value={values?.gpStatus}
                            error={
                              touched?.gpStatus && Boolean(errors?.gpStatus)
                            }
                            helperText={touched?.gpStatus && errors?.gpStatus}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            Covered
                          </Typography>
                          <Autocomplete
                            size="small"
                            options={coveredOptions}
                            getOptionLabel={(option) => option.label || ""}
                            value={
                              coveredOptions.find(
                                (opt) => opt.value === values.covered
                              ) || null
                            }
                            onChange={(_, value) => {
                              setFieldValue("covered", value?.value || "");
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select"
                                error={
                                  touched.covered && Boolean(errors.covered)
                                }
                                helperText={touched.covered && errors.covered}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={6} md={3}>
                          <Typography variant="h6" fontSize="14px">
                            SR Status
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter SR Status"
                            name="SRStatus"
                            onChange={(e) =>
                              setFieldValue("SRStatus", e.target.value)
                            }
                            onBlur={() => setFieldTouched("SRStatus", true)}
                            value={values?.SRStatus}
                            error={
                              touched?.SRStatus && Boolean(errors?.SRStatus)
                            }
                            helperText={touched?.SRStatus && errors?.SRStatus}
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
                              navigate(GP_MASTER);
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
export default AddGP;
