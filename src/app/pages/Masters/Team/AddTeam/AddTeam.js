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
import {
  TEAM_MASTER,
  TEAM_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { addTeam, updateTeam } from "app/services/apis/master";
import MasterApis from "app/Apis/master";
import { Axios } from "index";

function AddTeam() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state } = useLocation();
  const [departmentOptions,setDepartmentOptions] = useState([]);
  const [formInitialValues,setFormInitialValues]=useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    departmentName: state?.departmentName ? state.departmentName : "",
    teamName: state?.teamName ? state.teamName : "",
  };

  const validationSchema = yup.object({
    teamName: yup
      .string("Enter Team Name")
      .trim()
      .required("Team Name is required"),
    departmentName: yup
    .object().nullable()
      .required("Department Name is required"),
  });

  const onUserSave = async (values) => {
    const body = {
      departmentId: values?.departmentName.id,
      teamName: values?.teamName,
    };

    setSubmitting(true);
    try {
      if (pathname === TEAM_MASTER_EDIT) {
        const data = await updateTeam(body, state?.id);
        if (data?.data?.statusCode === 200) {
          navigate(TEAM_MASTER);
          Swal.fire({
            icon: "success",
            text: "Team Updated Successfully",
            // text: "",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while updating Team",
            // text: "",
          });
        }
      } else {
        const data = await addTeam(body);
        if (data?.data?.statusCode === 201) {
          Swal.fire({
            icon: "success",
            text: "Team Added Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(TEAM_MASTER);
        } else {
          Swal.fire({
            icon: "error",
            text: data?.data?.message
              ? data?.data?.message
              : "Error while adding Team",
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

   useEffect(() => {
      Axios.get(MasterApis?.department?.departmentDropdown)
        .then((res) => {
          console.log("List : ",res?.data?.result);
          const departments = res?.data?.result || [];
          setDepartmentOptions(departments);
        })
        .catch((err) => console.error("Package Fetch Error: ", err));
    }, []);

  useEffect(() => {
      if (
        departmentOptions.length &&
        (!state?.packageId || departmentOptions.length || !state?.departmentId)
      ) {
        setFormInitialValues({
          departmentName: state?.departmentId
            ? departmentOptions.find((opt) => opt.id === state.departmentId)
            : null,
          teamName:state.teamName ? state?.teamName : ""
        });
      }
    }, [departmentOptions]);
  return (
    <>
      <HotoHeader />
      <Div sx={{ mt: 0 }}>
        <Div>
        {
          formInitialValues && 
          <Formik
            validateOnChange={true}
            initialValues={formInitialValues}
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
                      Add Team
                    </Typography>
                    <Grid container rowSpacing={2} columnSpacing={3}>
                      {/* <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          Department
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Department Name"
                          name="departmentName"
                          onChange={(e) =>
                            setFieldValue("departmentName", e.target.value)
                          }
                          onBlur={() => setFieldTouched("departmentName", true)}
                          value={values?.departmentName}
                          error={touched?.departmentName && Boolean(errors?.departmentName)}
                          helperText={touched?.departmentName && errors?.departmentName}
                        />
                      </Grid> */}

                      <Grid item xs={12} md={3}>
                        <Typography variant="h6" fontSize="14px">
                          Department
                        </Typography>
                        <Autocomplete
                          size="small"
                          options={departmentOptions}
                          getOptionLabel={(option) => option.departmentName || ""}
                          isOptionEqualToValue={(opt, val) => opt.id === val.id}
                          value={values.departmentName}
                          onChange={(_, value) =>
                            setFieldValue("departmentName", value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Department"
                              error={
                                touched.departmentName && Boolean(errors.departmentName)
                              }
                              helperText={touched.departmentName && errors.departmentName}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <Typography variant="h6" fontSize="14px">
                          Team Name
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          size="small"
                          placeholder="Enter Team Name"
                          name="organisationName"
                          onChange={(e) =>
                            setFieldValue("teamName", e.target.value)
                          }
                          onBlur={() => setFieldTouched("teamName", true)}
                          value={values?.teamName}
                          error={touched?.teamName && Boolean(errors?.teamName)}
                          helperText={touched?.teamName && errors?.teamName}
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
                            navigate();
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
        }
        </Div>
      </Div>
    </>
  );
}
export default AddTeam;
