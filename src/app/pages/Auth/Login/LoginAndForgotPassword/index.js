import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { alpha } from "@mui/material/styles";
// import {auth} from "@jumbo/services/auth/firebase/firebase";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
// import {useAuthSignInWithEmailAndPassword} from "@react-query-firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { ASSET_AVATARS, ASSET_IMAGES } from "../../../utils/constants/paths";
// import { getAssetPath } from "../../../utils/appHelpers";
import OTPInput from "react-otp-input";
import FullViewContent from "app/Components/FullViewContent";
import { bluePrimary, orangeSecondary } from "app/pages/Constants/colors";
import Swal from "sweetalert2";
import axios from "axios";
import { Axios } from "index";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const LoginAndForgotPassword = ({ setResetPassword }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [forgetPassword, setForgetPassword] = useState({
    open: false,
    email: "",
    otp: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const mutation = useAuthSignInWithEmailAndPassword(auth, {
  //     onError(error) {
  //         console.log(error);
  //     },
  //     onSuccess(data) {
  //         navigate("/", {replace: true});
  //     }
  // });
  const user_emails  = ["inventorymanager@gmail.com","assetmanager@gmail.com" ]

  const onSignIn = async (email, password) => {
    
   if(email && password){
    const userData = {
      email ,
      password
    }
    console.log("userData : ",userData);
    const res = await Axios.post("auth/sign-in",userData);
    localStorage.setItem("token",res?.data?.result?.token);
    if(res?.data?.result?.token){
      localStorage.setItem("user_details",JSON.stringify({email ,
        password,is_logged_in:true}));
    }
    Swal.fire({icon :"success",text :"Logged in  successfully.",position :"center",width:""})
    navigate("/dashboards")
   }else{
    console.log('test')
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid Credentials",
      timer: 1200,
      showConfirmButton: false,
      customClass: {
          container: "popupImportant",
      },
  })
   }
  };

  const handleForgetPassword = () => {
    setResetPassword((...pre) => ({
      ...pre,
      open: true,
      email: forgetPassword.email,
    }));
    setForgetPassword({
      ...forgetPassword,
      open: false,
    });
  };

  //temp
  const mutation = { isError: false };
  return (
    <FullViewContent>
      <Div>
        {/* <Div sx={{mb: 3, display: 'inline-flex'}}>
                <Link
                    href="#"
                    underline="none"
                    sx={{display: 'inline-flex'}}
                >
                    <img src={`${ASSET_IMAGES}/logo.png`} alt="Jumbo React"/>
                </Link>
            </Div> */}
        <Card sx={{ maxWidth: "100%", width: 360, mb: 4 }}>
          <Div sx={{ position: "relative", height: "100px" }}>
            <CardMedia
              component="div"
              // alt="green iguana"
              height="100"
              // image={`${ASSET_IMAGES}/colin-watts.jpg`}
            />
            <Div
              sx={{
                flex: 1,
                inset: 0,
                position: "absolute",
                display: "flex",
                justifyContent:"center",
                alignItems: "center",
                textAlign:"center",
                backgroundColor: (theme) => alpha(bluePrimary, 1),
                p: (theme) => theme.spacing(3),
              }}
            >
              <Typography
                variant={"h2"}
                sx={{
                  color: "common.white",
                  fontSize: "1.5rem",
                  mb: 0,
                }}
              >
                {!forgetPassword.open ? "Sign In" : "Forgot password"}
              </Typography>
            </Div>
          </Div>
          <CardContent sx={{ pt: 0 }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                onSignIn(data.email, data.password);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, handleChange, handleBlur, values }) => (
                <Form
                  style={{ textAlign: "left" }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <Avatar
                                    alt="Remy Sharp" src={getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`)}
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        marginLeft: 'auto',
                                        boxShadow: shadows[3],
                                        transform: 'translateY(-50%)',
                                    }}
                                />
                                {mutation.isError && <p>{mutation.error.message}</p>} */}
                  <Div sx={{ mb: 3, mt: 5 }}>
                    <JumboTextField
                      fullWidth
                      disabled={forgetPassword.open}
                      name="email"
                      label="Email"
                    />
                  </Div>
                  {!forgetPassword?.open ? (
                    <Div sx={{ mb: 2, mt: 1 }}>
                      <Field name="password">
                        {({ field, meta }) => {
                          return (
                            <FormControl
                              sx={{ width: "100%" }}
                              variant="outlined"
                            >
                              <InputLabel htmlFor="outlined-adornment-password">
                                Password
                              </InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                {...field}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {!showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                                error={meta?.error && meta?.touched}
                              />
                              {meta?.error && meta?.touched && (
                                <FormHelperText
                                  id="outlined-adornment-password"
                                  sx={{ color: "#E73145" }}
                                >
                                  {meta?.error}
                                </FormHelperText>
                              )}
                            </FormControl>
                          );
                        }}
                      </Field>
                    </Div>
                  ) : (
                    <Box mb={2} px={0.5}>
                      <Typography mb={2}>Enter OTP</Typography>
                      <OTPInput
                        value={forgetPassword?.otp}
                        shouldAutoFocus={true}
                        containerStyle={{
                          justifyContent: "space-between",
                        }}
                        inputStyle={{
                          width: "3rem",
                          height: "3rem",
                          border: "2px solid #7352C7",
                          borderRadius: "5px",
                        }}
                        onChange={(value) => {
                          setForgetPassword({
                            ...forgetPassword,
                            otp: value,
                          });
                        }}
                        numInputs={5}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                      />
                    </Box>
                  )}
                  
                  {/* //forgot password */}
                  {/* {!forgetPassword?.open && (
                    <Typography textAlign={"right"} variant={"body1"}>
                      <Button
                        size="small"
                        sx={{
                          bgcolor: "transparent",
                          textTransform: "capitalize",
                          p: 0,
                          "&:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                        onClick={() => {
                          setForgetPassword({
                            ...forgetPassword,
                            email: values.email,
                            open: true,
                          });
                        }}
                      >
                        Forgot your password?
                      </Button>
                    </Typography>
                  )} */}
                  {!forgetPassword?.open ? (
                    <LoadingButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ mb: 3, mt: 2,"&:hover":{
                        backgroundColor:orangeSecondary
                      } }}
                      loading={isSubmitting || mutation.isLoading}
                    >
                      Login
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ mb: 3, mt: 2 }}
                      onClick={handleForgetPassword}
                      // loading={isSubmitting || mutation.isLoading}
                    >
                      Verify OTP
                    </LoadingButton>
                  )}
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Div>
    </FullViewContent>
  );
};

export default LoginAndForgotPassword;
