import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import Div from "@jumbo/shared/Div";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Axios } from "index";
import MasterApis from "app/Apis/master";
import AllApis from "app/Apis/apis";
import {
  USER_MANAGEMENT,
  USER_MANAGEMENT_ADD,
  USER_MANAGEMENT_EDIT,
} from "app/utils/constants/routeConstants";
import { State } from "country-state-city";
import { useDispatch } from "react-redux";
import { single_user_data_disptach } from "app/redux/actions/userManagement";
function AdduserManagement() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [formInitialValues, setFormInitialValues] = useState(null);
  const [organisationNameOptions, setOrganisationNameOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const states = State.getStatesOfCountry("IN");
  const dispatch = useDispatch();
  const roleInitialVal = {
    hoto_assets: {
      userManagement: {
        create: state?.role?.hoto_assets?.userManagement?.create || false,
        view: state?.role?.hoto_assets?.userManagement?.view || false,
        edit: state?.role?.hoto_assets?.userManagement?.edit || false,
      },
      packageMaster: {
        create: state?.role?.hoto_assets?.packageMaster?.create || false,
        view: state?.role?.hoto_assets?.packageMaster?.view || false,
        edit: state?.role?.hoto_assets?.packageMaster?.edit || false,
      },
      districtMaster: {
        create: state?.role?.hoto_assets?.districtMaster?.create || false,
        view: state?.role?.hoto_assets?.districtMaster?.view || false,
        edit: state?.role?.hoto_assets?.districtMaster?.edit || false,
      },
      blockMaster: {
        create: state?.role?.hoto_assets?.blockMaster?.create || false,
        view: state?.role?.hoto_assets?.blockMaster?.view || false,
        edit: state?.role?.hoto_assets?.blockMaster?.edit || false,
      },
      gpMaster: {
        create: state?.role?.hoto_assets?.gpMaster?.create || false,
        view: state?.role?.hoto_assets?.gpMaster?.view || false,
        edit: state?.role?.hoto_assets?.gpMaster?.edit || false,
      },
      organisationMaster: {
        create: state?.role?.hoto_assets?.organisationMaster?.create || false,
        view: state?.role?.hoto_assets?.organisationMaster?.view || false,
        edit: state?.role?.hoto_assets?.organisationMaster?.edit || false,
      },
      departmentMaster: {
        create: state?.role?.hoto_assets?.departmentMaster?.create || false,
        view: state?.role?.hoto_assets?.departmentMaster?.view || false,
        edit: state?.role?.hoto_assets?.departmentMaster?.edit || false,
      },
      teamMaster: {
        create: state?.role?.hoto_assets?.teamMaster?.create || false,
        view: state?.role?.hoto_assets?.teamMaster?.view || false,
        edit: state?.role?.hoto_assets?.teamMaster?.edit || false,
      },
      categoryMaster: {
        create: state?.role?.hoto_assets?.categoryMaster?.create || false,
        view: state?.role?.hoto_assets?.categoryMaster?.view || false,
        edit: state?.role?.hoto_assets?.categoryMaster?.edit || false,
      },
      subCategoryMaster: {
        create: state?.role?.hoto_assets?.subCategoryMaster?.create || false,
        view: state?.role?.hoto_assets?.subCategoryMaster?.view || false,
        edit: state?.role?.hoto_assets?.subCategoryMaster?.edit || false,
      },
      materialMaster: {
        create: state?.role?.hoto_assets?.materialMaster?.create || false,
        view: state?.role?.hoto_assets?.materialMaster?.view || false,
        edit: state?.role?.hoto_assets?.materialMaster?.edit || false,
      },
      uomMaster: {
        create: state?.role?.hoto_assets?.uomMaster?.create || false,
        view: state?.role?.hoto_assets?.uomMaster?.view || false,
        edit: state?.role?.hoto_assets?.uomMaster?.edit || false,
      },
      hsnCodeMaster: {
        create: state?.role?.hoto_assets?.hsnCodeMaster?.create || false,
        view: state?.role?.hoto_assets?.hsnCodeMaster?.view || false,
        edit: state?.role?.hoto_assets?.hsnCodeMaster?.edit || false,
      },
      gstMaster: {
        create: state?.role?.hoto_assets?.gstMaster?.create || false,
        view: state?.role?.hoto_assets?.gstMaster?.view || false,
        edit: state?.role?.hoto_assets?.gstMaster?.edit || false,
      },
      warehouseMaster: {
        create: state?.role?.hoto_assets?.warehouseMaster?.create || false,
        view: state?.role?.hoto_assets?.warehouseMaster?.view || false,
        edit: state?.role?.hoto_assets?.warehouseMaster?.edit || false,
      },
      supplierMaster: {
        create: state?.role?.hoto_assets?.supplierMaster?.create || false,
        view: state?.role?.hoto_assets?.supplierMaster?.view || false,
        edit: state?.role?.hoto_assets?.supplierMaster?.edit || false,
      },
      hotoBlock: {
        create: state?.role?.hoto_assets?.hotoBlock?.create || false,
        view: state?.role?.hoto_assets?.hotoBlock?.view || false,
        edit: state?.role?.hoto_assets?.hotoBlock?.edit || false,
      },

      hotoGp: {
        create: state?.role?.hoto_assets?.hotoGp?.create || false,
        view: state?.role?.hoto_assets?.hotoGp?.view || false,
        edit: state?.role?.hoto_assets?.hotoGp?.edit || false,
      },
      hotoWarehouse: {
        create: state?.role?.hoto_assets?.hotoWarehouse?.create || false,
        view: state?.role?.hoto_assets?.hotoWarehouse?.view || false,
        edit: state?.role?.hoto_assets?.hotoWarehouse?.edit || false,
      },
      hotoRkm: {
        create: state?.role?.hoto_assets?.hotoRkm?.create || false,
        view: state?.role?.hoto_assets?.hotoRkm?.view || false,
        edit: state?.role?.hoto_assets?.hotoRkm?.edit || false,
      },
      hotoWarehouseModule: {
        create: state?.role?.hoto_assets?.hotoWarehouseModule?.create || false,
        view: state?.role?.hoto_assets?.hotoWarehouseModule?.view || false,
        edit: state?.role?.hoto_assets?.hotoWarehouseModule?.edit || false,
      },
      oandmBlock: {
        create: state?.role?.hoto_assets?.oandmBlock?.create || false,
        view: state?.role?.hoto_assets?.oandmBlock?.view || false,
        edit: state?.role?.hoto_assets?.oandmBlock?.edit || false,
      },

      oandmGp: {
        create: state?.role?.hoto_assets?.oandmGp?.create || false,
        view: state?.role?.hoto_assets?.oandmGp?.view || false,
        edit: state?.role?.hoto_assets?.oandmGp?.edit || false,
      },
      oandmWarehouse: {
        create: state?.role?.hoto_assets?.oandmWarehouse?.create || false,
        view: state?.role?.hoto_assets?.oandmWarehouse?.view || false,
        edit: state?.role?.hoto_assets?.oandmWarehouse?.edit || false,
      },
      oandmRkm: {
        create: state?.role?.hoto_assets?.oandmRkm?.create || false,
        view: state?.role?.hoto_assets?.oandmRkm?.view || false,
        edit: state?.role?.hoto_assets?.oandmRkm?.edit || false,
      },
      oandmWarehouseWarehouse: {
        create:
          state?.role?.hoto_assets?.oandmWarehouseWarehouse?.create || false,
        view: state?.role?.hoto_assets?.oandmWarehouseWarehouse?.view || false,
        edit: state?.role?.hoto_assets?.oandmWarehouseWarehouse?.edit || false,
      },
      oandmWarehouseMaterialInward: {
        create:
          state?.role?.hoto_assets?.oandmWarehouseMaterialInward?.create ||
          false,
        view:
          state?.role?.hoto_assets?.oandmWarehouseMaterialInward?.view || false,
        edit:
          state?.role?.hoto_assets?.oandmWarehouseMaterialInward?.edit || false,
      },
      oandmWarehouseMaterialRequest: {
        create:
          state?.role?.hoto_assets?.oandmWarehouseMaterialRequest?.create ||
          false,
        view:
          state?.role?.hoto_assets?.oandmWarehouseMaterialRequest?.view ||
          false,
        edit:
          state?.role?.hoto_assets?.oandmWarehouseMaterialRequest?.edit ||
          false,
      },
    },
  };
  const [roleCheked, setRoleChecked] = useState(roleInitialVal);
  const initialValues = {
    organisationName: state?.organisationName || null,
    departmentName: state?.departmentName || null,
    teamName: state?.teamName || null,
    firstName: state?.firstName || "",
    lastName: state?.lastName || "",
    type: state?.type || "",
    email: state?.email || "",
    password: state?.password || "",
    mobileNo: state?.mobileNo || "",
    address: state?.address || "",
    state: state?.state || "",
    city: state?.city || "",
    pincode: state?.pincode || "",
  };

  const validationSchema = yup.object({
    organisationName: yup
      .object()
      .nullable()
      .required("Organisation is required"),
    departmentName: yup.object().nullable().required("Department is required"),
    teamName: yup.object().nullable(),
    firstName: yup.string().trim().required("First Name is required"),
    lastName: yup.string().trim().required("Last Name is required"),
    password: yup.string().trim().required("Password is required"),
    mobileNo: yup
      .string()
      .trim()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit Mobile Number")
      .required("Mobile Number is required"),
    address: yup.string().trim().required("Address is required"),
    state: yup.string().trim().required("State is required"),
    city: yup.string().trim().required("City is required"),
    pincode: yup.string().trim().required("Pincode is required"),
    type: yup.string().trim().required("Type is required"),
  });

  const fetchDepartments = (orgId) => {
    Axios.get(
      `${MasterApis?.department?.departmentDropdown}?organisationId=${orgId}`
    )
      .then((res) => {
        setDepartmentOptions(res?.data?.result || []);
        setTeamOptions([]);
      })
      .catch((err) => console.error("Department Fetch Error:", err));
  };

  const fetchTeams = (departmentId) => {
    Axios.get(`${MasterApis?.team?.teamDropdown}?id=${departmentId}`)
      .then((res) => {
        setTeamOptions(res?.data?.result || []);
      })
      .catch((err) => console.error("Team Fetch Error:", err));
  };

  const onUserSave = async (values) => {
    const payload = {
      organisationId: values?.organisationName?._id,
      departmentId: values?.departmentName?._id,
      teamId: values?.teamName?._id,
      firstName: values?.firstName,
      lastName: values?.lastName,
      type: values?.type,
      email: values?.email,
      mobileNo: values?.mobileNo,
      password: values?.password,
      address: values?.address,
      state: values?.state,
      city: values?.city,
      pincode: values?.pincode,
      role: roleCheked,
    };

    setSubmitting(true);
    try {
      const res =
        pathname === USER_MANAGEMENT_EDIT
          ? await Axios.patch(
              `${AllApis?.Auth?.updateUser}/${state?._id}`,
              payload
            )
          : await Axios.post(AllApis?.Auth?.addUser, payload);
      if (pathname === USER_MANAGEMENT_EDIT) {
        dispatch(
          single_user_data_disptach(state?._id)
        );
      }
      const statusCode = res?.data?.statusCode;

      if (statusCode === 200 || statusCode === 201) {
        Swal.fire({
          icon: "success",
          text:
            pathname === USER_MANAGEMENT_EDIT
              ? "User Updated Successfully"
              : "User Added Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate(USER_MANAGEMENT);
      } else {
        throw new Error(res?.data?.message || "Unknown Error");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err?.response?.data?.message || err.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    Axios.get(MasterApis?.organisation?.organisationDropdown)
      .then((res) => {
        setOrganisationNameOptions(res?.data?.result || []);
      })
      .catch((err) => console.error("Organisation Fetch Error:", err));
    if (state?.organisationId) {
      fetchDepartments(state?.organisationId);
    }
    if (state?.departmentId) {
      fetchTeams(state?.departmentId);
    }
  }, [state]);

  useEffect(() => {
    if (state?.organisationId) {
      setFormInitialValues({
        organisationName: state?.organisationId
          ? organisationNameOptions.find(
              (ele) => ele._id === state?.organisationId
            ) || null
          : null,
        departmentName: state?.departmentId
          ? departmentOptions.find((opt) => opt._id === state.departmentId) ||
            null
          : null,
        teamName: state?.teamId
          ? teamOptions.find((opt) => opt._id === state.teamId) || null
          : null,
        firstName: state?.firstName || "",
        lastName: state?.lastName || "",
        type: state?.type || "",
        email: state?.email || "",
        password: state?.password || "",
        mobileNo: state?.mobileNo || "",
        address: state?.address || "",
        state: state?.state || "",
        city: state?.city || "",
        pincode: state?.pincode || "",
        role: state?.role || {},
      });
    }
  }, [state, organisationNameOptions, departmentOptions, teamOptions]);

  return (
    <Div sx={{ mt: 4 }}>
      <Typography variant="h3" fontWeight={600} mb={2}>
        {pathname === USER_MANAGEMENT_EDIT ? "Edit User" : "Create User"}
      </Typography>
      <Formik
        initialValues={formInitialValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onUserSave}
        enableReinitialize
      >
        {({ setFieldValue, values, touched, errors }) => (
          <Form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px">
                  Organization Name
                </Typography>
                <Autocomplete
                  size="small"
                  options={organisationNameOptions}
                  getOptionLabel={(option) => option.organisationName || ""}
                  isOptionEqualToValue={(opt, val) => opt._id === val?._id}
                  value={values.organisationName}
                  onChange={(_, value) => {
                    setFieldValue("organisationName", value);
                    setFieldValue("departmentName", null);
                    setFieldValue("teamName", null);
                    if (value) fetchDepartments(value._id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Organization"
                      error={
                        touched.organisationName &&
                        Boolean(errors.organisationName)
                      }
                      helperText={
                        touched.organisationName && errors.organisationName
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px">
                  Department
                </Typography>
                <Autocomplete
                  size="small"
                  options={departmentOptions}
                  getOptionLabel={(option) => option.departmentName || ""}
                  isOptionEqualToValue={(opt, val) => opt._id === val?._id}
                  value={values.departmentName}
                  onChange={(_, value) => {
                    setFieldValue("departmentName", value);
                    setFieldValue("teamName", null);
                    if (value) fetchTeams(value._id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Department"
                      error={
                        touched.departmentName && Boolean(errors.departmentName)
                      }
                      helperText={
                        touched.departmentName && errors.departmentName
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px">
                  Team
                </Typography>
                <Autocomplete
                  size="small"
                  options={teamOptions}
                  getOptionLabel={(option) => option.teamName || ""}
                  isOptionEqualToValue={(opt, val) => opt._id === val?._id}
                  value={values.teamName}
                  onChange={(_, value) => setFieldValue("teamName", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Team"
                      error={touched.teamName && Boolean(errors.teamName)}
                      helperText={touched.teamName && errors.teamName}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={(e) => setFieldValue("firstName", e.target.value)}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  Last Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={(e) => setFieldValue("lastName", e.target.value)}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px">
                  Type
                </Typography>
                <Autocomplete
                  size="small"
                  options={["Super Admin", "Admin", "Staff"]}
                  getOptionLabel={(option) => option || ""}
                  isOptionEqualToValue={(opt, val) => opt === val}
                  value={values.type}
                  onChange={(_, value) => {
                    setFieldValue("type", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Type"
                      error={touched.type && Boolean(errors.type)}
                      helperText={touched.type && errors.type}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              {pathname === USER_MANAGEMENT_ADD && (
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" fontSize="14px" mb={0.5}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter Password"
                    name="password"
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
              )}

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  Mobile Number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Mobile Number"
                  name="mobileNo"
                  value={values.mobileNo}
                  onChange={(e) => setFieldValue("mobileNo", e.target.value)}
                  error={touched.mobileNo && Boolean(errors.mobileNo)}
                  helperText={touched.mobileNo && errors.mobileNo}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  Address
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Address"
                  name="address"
                  value={values.address}
                  onChange={(e) => setFieldValue("address", e.target.value)}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  State
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter State"
                  name="state"
                  value={values.state}
                  onChange={(e) => setFieldValue("state", e.target.value)}
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                />
              </Grid> */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  State
                </Typography>
                <Autocomplete
                  options={states}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    states.find((state) => state.name === values.state) || null
                  }
                  onChange={(e, newValue) => {
                    setFieldValue("state", newValue ? newValue.name : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      placeholder="Select State"
                      name="state"
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  City
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter City"
                  name="city"
                  value={values.city}
                  onChange={(e) => setFieldValue("city", e.target.value)}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="h6" fontSize="14px" mb={0.5}>
                  Pincode
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Pincode"
                  name="pincode"
                  value={values.pincode}
                  onChange={(e) => setFieldValue("pincode", e.target.value)}
                  error={touched.pincode && Boolean(errors.pincode)}
                  helperText={touched.pincode && errors.pincode}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} mt={3}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "600", fontSize: "18px !importent" }}
                  >
                    HOTO Assets
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      User Management
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.userManagement
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      userManagement: {
                                        ...prev.hoto_assets.userManagement,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.userManagement?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      userManagement: {
                                        ...prev.hoto_assets.userManagement,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.userManagement?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      userManagement: {
                                        ...prev.hoto_assets.userManagement,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Package Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.packageMaster?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      packageMaster: {
                                        ...prev.hoto_assets.packageMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.packageMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      packageMaster: {
                                        ...prev.hoto_assets.packageMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.packageMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      packageMaster: {
                                        ...prev.hoto_assets.packageMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      District Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.districtMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      districtMaster: {
                                        ...prev.hoto_assets.districtMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.districtMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      districtMaster: {
                                        ...prev.hoto_assets.districtMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.districtMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      districtMaster: {
                                        ...prev.hoto_assets.districtMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Block Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.blockMaster?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      blockMaster: {
                                        ...prev.hoto_assets.blockMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.blockMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      blockMaster: {
                                        ...prev.hoto_assets.blockMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.blockMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      blockMaster: {
                                        ...prev.hoto_assets.blockMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      GP Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.gpMaster?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      gpMaster: {
                                        ...prev.hoto_assets.gpMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.gpMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      gpMaster: {
                                        ...prev.hoto_assets.gpMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.gpMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      gpMaster: {
                                        ...prev.hoto_assets.gpMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Organisation Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.organisationMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      organisationMaster: {
                                        ...prev.hoto_assets.organisationMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.organisationMaster
                                    ?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      organisationMaster: {
                                        ...prev.hoto_assets.organisationMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.packageMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      packageMaster: {
                                        ...prev.hoto_assets.packageMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Department Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.districtMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      districtMaster: {
                                        ...prev.hoto_assets.districtMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.districtMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      districtMaster: {
                                        ...prev.hoto_assets.districtMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.districtMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      districtMaster: {
                                        ...prev.hoto_assets.districtMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Team Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.teamMaster?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      teamMaster: {
                                        ...prev.hoto_assets.teamMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.teamMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      teamMaster: {
                                        ...prev.hoto_assets.teamMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.teamMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      teamMaster: {
                                        ...prev.hoto_assets.teamMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Category Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.categoryMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      categoryMaster: {
                                        ...prev.hoto_assets.categoryMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.categoryMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      categoryMaster: {
                                        ...prev.hoto_assets.categoryMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.categoryMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      categoryMaster: {
                                        ...prev.hoto_assets.categoryMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Sub Category Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.subCategoryMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      subCategoryMaster: {
                                        ...prev.hoto_assets.subCategoryMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.subCategoryMaster
                                    ?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      subCategoryMaster: {
                                        ...prev.hoto_assets.subCategoryMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.subCategoryMaster
                                    ?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      subCategoryMaster: {
                                        ...prev.hoto_assets.subCategoryMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Material Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.materialMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      materialMaster: {
                                        ...prev.hoto_assets.materialMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.materialMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      materialMaster: {
                                        ...prev.hoto_assets.materialMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.materialMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      materialMaster: {
                                        ...prev.hoto_assets.materialMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      UOM Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.uomMaster?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      uomMaster: {
                                        ...prev.hoto_assets.uomMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.uomMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      uomMaster: {
                                        ...prev.hoto_assets.uomMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.uomMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      uomMaster: {
                                        ...prev.hoto_assets.uomMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      HSN Code Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hsnCodeMaster?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hsnCodeMaster: {
                                        ...prev.hoto_assets.hsnCodeMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hsnCodeMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hsnCodeMaster: {
                                        ...prev.hoto_assets.hsnCodeMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hsnCodeMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hsnCodeMaster: {
                                        ...prev.hoto_assets.hsnCodeMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      GST Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.gstMaster?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      gstMaster: {
                                        ...prev.hoto_assets.gstMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.gstMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      gstMaster: {
                                        ...prev.hoto_assets.gstMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.gstMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      gstMaster: {
                                        ...prev.hoto_assets.gstMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Warehouse Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.warehouseMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      warehouseMaster: {
                                        ...prev.hoto_assets.warehouseMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.warehouseMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      warehouseMaster: {
                                        ...prev.hoto_assets.warehouseMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.warehouseMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      warehouseMaster: {
                                        ...prev.hoto_assets.warehouseMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Supplier Master
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.supplierMaster
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      supplierMaster: {
                                        ...prev.hoto_assets.supplierMaster,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.supplierMaster?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      supplierMaster: {
                                        ...prev.hoto_assets.supplierMaster,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.supplierMaster?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      supplierMaster: {
                                        ...prev.hoto_assets.supplierMaster,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Hoto-Assets Block
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoBlock?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoBlock: {
                                        ...prev.hoto_assets.hotoBlock,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoBlock?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoBlock: {
                                        ...prev.hoto_assets.hotoBlock,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoBlock?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoBlock: {
                                        ...prev.hoto_assets.hotoBlock,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Hoto-Assets GP
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoGp?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoGp: {
                                        ...prev.hoto_assets.hotoGp,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={roleCheked?.hoto_assets?.hotoGp?.view}
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoGp: {
                                        ...prev.hoto_assets.hotoGp,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={roleCheked?.hoto_assets?.hotoGp?.edit}
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoGp: {
                                        ...prev.hoto_assets.hotoGp,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Hoto-Assets RKM
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoRkm?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoRkm: {
                                        ...prev.hoto_assets.hotoRkm,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={roleCheked?.hoto_assets?.hotoRkm?.view}
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoRkm: {
                                        ...prev.hoto_assets.hotoRkm,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={roleCheked?.hoto_assets?.hotoRkm?.edit}
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoRkm: {
                                        ...prev.hoto_assets.hotoRkm,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Hoto-Assets Warehouse
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoWarehouse?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoWarehouse: {
                                        ...prev.hoto_assets.hotoWarehouse,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoWarehouse?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoWarehouse: {
                                        ...prev.hoto_assets.hotoWarehouse,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoWarehouse?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoWarehouse: {
                                        ...prev.hoto_assets.hotoWarehouse,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      Hoto Warehouse
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoWarehouseModule
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoWarehouseModule: {
                                        ...prev.hoto_assets.hotoWarehouseModule,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoWarehouseModule
                                    ?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoWarehouseModule: {
                                        ...prev.hoto_assets.hotoWarehouseModule,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.hotoWarehouseModule
                                    ?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      hotoWarehouseModule: {
                                        ...prev.hoto_assets.hotoWarehouseModule,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      O&M Block
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmBlock?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmBlock: {
                                        ...prev.hoto_assets.oandmBlock,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmBlock?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmBlock: {
                                        ...prev.hoto_assets.oandmBlock,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmBlock?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmBlock: {
                                        ...prev.hoto_assets.oandmBlock,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      O&M GP
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmGp?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmGp: {
                                        ...prev.hoto_assets.oandmGp,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={roleCheked?.hoto_assets?.oandmGp?.view}
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmGp: {
                                        ...prev.hoto_assets.oandmGp,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={roleCheked?.hoto_assets?.oandmGp?.edit}
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmGp: {
                                        ...prev.hoto_assets.oandmGp,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      O&M RKM
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmRkm?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmRkm: {
                                        ...prev.hoto_assets.oandmRkm,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmRkm?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmRkm: {
                                        ...prev.hoto_assets.oandmRkm,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmRkm?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmRkm: {
                                        ...prev.hoto_assets.oandmRkm,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      O&M Warehouse
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmWarehouse
                                    ?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouse: {
                                        ...prev.hoto_assets.oandmWarehouse,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmWarehouse?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouse: {
                                        ...prev.hoto_assets.oandmWarehouse,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets?.oandmWarehouse?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouse: {
                                        ...prev.hoto_assets.oandmWarehouse,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      O&M-Warehouse Warehouse
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseWarehouse?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseWarehouse: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseWarehouse,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseWarehouse?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseWarehouse: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseWarehouse,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseWarehouse?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseWarehouse: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseWarehouse,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      O&M-Warehouse Material Inward
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseMaterialInward?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseMaterialInward: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseMaterialInward,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseMaterialInward?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseMaterialInward: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseMaterialInward,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseMaterialInward?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseMaterialInward: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseMaterialInward,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                  <Div sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      fontWeight={500}
                      mb={1}
                    >
                      O&M-Warehouse Material Request
                    </Typography>
                    <Div sx={{ pl: 2, mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        fontSize="14px"
                        fontWeight={500}
                      ></Typography>
                      <Grid container spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseMaterialRequest?.create
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseMaterialRequest: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseMaterialRequest,
                                        create: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Create"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseMaterialRequest?.view
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseMaterialRequest: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseMaterialRequest,
                                        view: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"View"}
                          />
                        </Grid>
                        <Grid item xs={4} sm={2}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  roleCheked?.hoto_assets
                                    ?.oandmWarehouseMaterialRequest?.edit
                                }
                                onChange={(e) =>
                                  setRoleChecked((prev) => ({
                                    ...prev,
                                    hoto_assets: {
                                      ...prev.hoto_assets,
                                      oandmWarehouseMaterialRequest: {
                                        ...prev.hoto_assets
                                          .oandmWarehouseMaterialRequest,
                                        edit: e.target.checked,
                                      },
                                    },
                                  }))
                                }
                              />
                            }
                            label={"Edit"}
                          />
                        </Grid>
                      </Grid>
                    </Div>
                  </Div>
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Submit Button */}

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
                      navigate(USER_MANAGEMENT);
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
          </Form>
        )}
      </Formik>
    </Div>
  );
}

export default AdduserManagement;
