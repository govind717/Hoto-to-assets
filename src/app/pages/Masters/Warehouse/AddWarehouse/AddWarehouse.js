import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import HotoHeader from "app/Components/HotoHeader";
import { addWarehouse, updateWarehouse } from "app/services/apis/master";
import {
  WAREHOUSE_MASTER,
  WAREHOUSE_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { City, State } from "country-state-city";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
function AddWarehouse() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [isSubmitting, setSubmitting] = useState(false);
  const states = State.getStatesOfCountry("IN"); // Replace "IN" if needed
  const [cities, setCities] = useState([]);
  const initialValues = {
    warehouse_name: state?.warehouse_name || "",
    code: state?.code || "",
    warehouse_type: state?.warehouse_type || "",
    address: state?.address || "",
    state: state?.state || "",
    district: state?.district || "",
    city: state?.city || "",
    country: state?.country || "",
    pincode: state?.pincode || "",
    capacity: state?.capacity || "",
    status: state?.status ?? true,
    latitude: state?.latitude || "",
    longitude: state?.longitude || "",
    contact_persons: state?.contact_persons || [],
    newContact: { name: "", email: "", mobile: "" }, // Added initial value for new contact
  };

  const contactPersonValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup
      .string()
      .matches(/^\d{10}$/, "Mobile must be 10 digits")
      .required("Mobile is required"),
  });

  const validationSchema = yup.object({
    warehouse_name: yup.string().required("Warehouse Name is required"),
    code: yup.string().required("Warehouse Code is required"),
    warehouse_type: yup.string().required("Warehouse Type is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    district: yup.string().required("District is required"),
    city: yup.string().required("City is required"),
    // country: yup.string().required("Country is required"), // <-- Commented country
    pincode: yup
      .string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    capacity: yup.string().required("Capacity is required"),
    latitude: yup.string().required("Latitude is required"),
    longitude: yup.string().required("Longitude is required"),
    contact_persons: yup.array().of(contactPersonValidationSchema),
  });

  const onUserSave = async (values) => {
    const body = {
      warehouse_name: values.warehouse_name,
      warehouse_type: values.warehouse_type,
      code: values.code,
      address: values.address,
      state: values.state,
      district: values.district,
      city: values.city,
      country: values.country,
      pincode: values.pincode,
      capacity: values.capacity,
      latitude: values.latitude,
      longitude: values.longitude,
      contact_persons: values.contact_persons,
    };



    if (body?.contact_persons?.length <= 0) {
      Swal.fire({
        icon: "error",
        text: "At least on contact person is require",
      });
    } else {
      setSubmitting(true);
      try {
        if (pathname === WAREHOUSE_MASTER_EDIT) {
          const data = await updateWarehouse(body, state?._id);
          if (data?.data?.statusCode === 200) {
            navigate(WAREHOUSE_MASTER);
            Swal.fire({
              icon: "success",
              text: "Warehouse Updated Successfully",
              timer: 1000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: data?.data?.message || "Error while updating Warehouse",
            });
          }
        } else {
          const data = await addWarehouse(body);
          if (data?.data?.statusCode === 201) {
            Swal.fire({
              icon: "success",
              text: "Warehouse Added Successfully",
              timer: 1000,
              showConfirmButton: false,
            });
            navigate(WAREHOUSE_MASTER);
          } else {
            Swal.fire({
              icon: "error",
              text: data?.data?.message || "Error while adding Warehouse",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message || "Something went wrong",
        });
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      <HotoHeader/>
      <Div sx={{ mt: 0 }}>
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onUserSave}
        >
          {({ values, touched, errors, setFieldValue, setFieldTouched }) => (
            <Form noValidate autoComplete="off">
              <Div sx={{ mt: 4 }}>
                <Typography variant="h3" fontWeight={600} mb={2}>
                  {pathname === WAREHOUSE_MASTER_EDIT
                    ? "Edit Warehouse"
                    : "Add Warehouse"}
                </Typography>

                <Grid container rowSpacing={2} columnSpacing={3}>
                  {/* Warehouse Info */}

                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Warehouse Name
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="warehouse_name"
                      placeholder="Enter Warehouse Name"
                      value={values.warehouse_name}
                      onChange={(e) =>
                        setFieldValue("warehouse_name", e.target.value)
                      }
                      onBlur={() => setFieldTouched("warehouse_name")}
                      error={
                        touched.warehouse_name && Boolean(errors.warehouse_name)
                      }
                      helperText={
                        touched.warehouse_name && errors.warehouse_name
                      }
                    />
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Warehouse Code
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="code"
                      placeholder="Enter Warehouse Code"
                      value={values.code}
                      onChange={(e) => setFieldValue("code", e.target.value)}
                      onBlur={() => setFieldTouched("code")}
                      error={touched.code && Boolean(errors.code)}
                      helperText={touched.code && errors.code}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Warehouse Type
                    </Typography>
                    <Autocomplete
                      options={["zonal", "district"]}
                      value={values?.warehouse_type || ""}
                      onChange={(e, newValue) =>
                        setFieldValue("warehouse_type", newValue)
                      }
                      onBlur={() => setFieldTouched("warehouse_type", true)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Select Warehouse Type"
                          error={
                            touched?.warehouse_type &&
                            Boolean(errors?.warehouse_type)
                          }
                          helperText={
                            touched?.warehouse_type && errors?.warehouse_type
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Address
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="address"
                      placeholder="Enter Address"
                      value={values.address}
                      onChange={(e) => setFieldValue("address", e.target.value)}
                      onBlur={() => setFieldTouched("address")}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  {/* <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      State
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="state"
                      placeholder="Enter State"
                      value={values.state}
                      onChange={(e) => setFieldValue("state", e.target.value)}
                      onBlur={() => setFieldTouched("state")}
                      error={touched.state && Boolean(errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </Grid> */}

                  <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontSize="14px" mb={0.5}>
                      State
                    </Typography>
                    <Autocomplete
                      options={states}
                      getOptionLabel={(option) => option.name || ""}
                      value={
                        states.find((state) => state.name === values.state) ||
                        null
                      }
                      onChange={(e, newValue) => {
                        if (newValue) {
                          setFieldValue("state", newValue.name);
                          setFieldValue("city", ""); // Clear city when state changes
                          const stateCities = City.getCitiesOfState(
                            "IN",
                            newValue.isoCode
                          );
                          setCities(stateCities || []);
                        } else {
                          setFieldValue("state", "");
                          setFieldValue("city", "");
                          setCities([]);
                        }
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
                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      District
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="district"
                      placeholder="Enter District"
                      value={values.district}
                      onChange={(e) =>
                        setFieldValue("district", e.target.value)
                      }
                      onBlur={() => setFieldTouched("district")}
                      error={touched.district && Boolean(errors.district)}
                      helperText={touched.district && errors.district}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontSize="14px" mb={0.5}>
                      City
                    </Typography>
                    <Autocomplete
                      options={cities}
                      getOptionLabel={(option) => option.name || ""}
                      value={
                        cities.find((city) => city.name === values.city) || null
                      }
                      onChange={(e, newValue) => {
                        if (newValue) {
                          setFieldValue("city", newValue.name);
                        } else {
                          setFieldValue("city", "");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          placeholder="Select City"
                          name="city"
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      )}
                    />
                  </Grid>

                  {/* <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      City
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="city"
                      placeholder="Enter City"
                      value={values.city}
                      onChange={(e) => setFieldValue("city", e.target.value)}
                      onBlur={() => setFieldTouched("city")}
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid> */}

                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Pincode
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="pincode"
                      placeholder="Enter Pincode"
                      value={values.pincode}
                      onChange={(e) => setFieldValue("pincode", e.target.value)}
                      onBlur={() => setFieldTouched("pincode")}
                      error={touched.pincode && Boolean(errors.pincode)}
                      helperText={touched.pincode && errors.pincode}
                    />
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Capacity
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="capacity"
                      placeholder="Enter Capacity"
                      value={values.capacity}
                      onChange={(e) =>
                        setFieldValue("capacity", e.target.value)
                      }
                      onBlur={() => setFieldTouched("capacity")}
                      error={touched.capacity && Boolean(errors.capacity)}
                      helperText={touched.capacity && errors.capacity}
                    />
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Latitude
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="latitude"
                      placeholder="Enter Latitude"
                      value={values.latitude}
                      onChange={(e) =>
                        setFieldValue("latitude", e.target.value)
                      }
                      onBlur={() => setFieldTouched("latitude")}
                      error={touched.latitude && Boolean(errors.latitude)}
                      helperText={touched.latitude && errors.latitude}
                    />
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h6" fontSize="14px">
                      Longitude
                    </Typography>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      name="longitude"
                      placeholder="Enter Longitude"
                      value={values.longitude}
                      onChange={(e) =>
                        setFieldValue("longitude", e.target.value)
                      }
                      onBlur={() => setFieldTouched("longitude")}
                      error={touched.longitude && Boolean(errors.longitude)}
                      helperText={touched.longitude && errors.longitude}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ mt: 4 }}>
                    <Typography variant="h5" mb={2}>
                      Contact Persons
                    </Typography>

                    {/* Input Form to Add Contact */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Name"
                          name="newContact.name"
                          value={values.newContact?.name || ""}
                          onChange={(e) =>
                            setFieldValue("newContact.name", e.target.value)
                          }
                          error={touched.blockCode && Boolean(errors.blockCode)}
                          helperText={touched.blockCode && errors.blockCode}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Email"
                          name="newContact.email"
                          value={values.newContact?.email || ""}
                          onChange={(e) =>
                            setFieldValue("newContact.email", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Mobile"
                          name="newContact.mobile"
                          value={values.newContact?.mobile || ""}
                          onChange={(e) =>
                            setFieldValue("newContact.mobile", e.target.value)
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            height: "30px",
                            "&:hover": { bgcolor: "#53B8CA" },
                          }}
                          onClick={async () => {
                            try {
                              await contactPersonValidationSchema.validate(
                                values.newContact,
                                { abortEarly: false }
                              );
                              setFieldValue("contact_persons", [
                                ...values.contact_persons,
                                values.newContact,
                              ]);
                              setFieldValue("newContact", {
                                name: "",
                                email: "",
                                mobile: "",
                              });
                            } catch (validationErrors) {
                              const errorMessages = validationErrors.inner
                                .map((err) => err.message)
                                .join("\n");
                              Swal.fire({
                                icon: "error",
                                title: "Validation Error",
                                text: errorMessages,
                              });
                            }
                          }}
                        >
                          Add Contact Person
                        </Button>
                      </Grid>
                    </Grid>

                    {values.contact_persons.length > 0 && (
                      <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ minWidth: "25%" }}>
                                <strong>Name</strong>
                              </TableCell>
                              <TableCell sx={{ minWidth: "25%" }}>
                                <strong>Email</strong>
                              </TableCell>
                              <TableCell sx={{ minWidth: "25%" }}>
                                <strong>Mobile</strong>
                              </TableCell>
                              <TableCell sx={{ minWidth: "25%" }}>
                                <strong>Actions</strong>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {values.contact_persons.map((contact, index) => (
                              <TableRow key={index}>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.mobile}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    sx={{ mr: 1 }}
                                    onClick={() => {
                                      const updatedContacts = [
                                        ...values.contact_persons,
                                      ];
                                      updatedContacts.splice(index, 1);
                                      setFieldValue(
                                        "contact_persons",
                                        updatedContacts
                                      );
                                    }}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {
                                      setFieldValue("newContact", contact);
                                      const updatedContacts = [
                                        ...values.contact_persons,
                                      ];
                                      updatedContacts.splice(index, 1);
                                      setFieldValue(
                                        "contact_persons",
                                        updatedContacts
                                      );
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Grid>
                </Grid>

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
                          navigate(WAREHOUSE_MASTER);
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
    </>
  );
}

export default AddWarehouse;
