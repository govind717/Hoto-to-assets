import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import shadows from "@mui/material/styles/shadows";
import { alpha } from "@mui/material/styles";
// import {auth} from "@jumbo/services/auth/firebase/firebase";
import * as yup from 'yup';
import { Field, Form, Formik } from "formik";
// import {useAuthSignInWithEmailAndPassword} from "@react-query-firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { ASSET_AVATARS, ASSET_IMAGES } from "../../../utils/constants/paths";
// import { getAssetPath } from "../../../utils/appHelpers";
import OTPInput from 'react-otp-input';
import FullViewContent from 'app/Components/FullViewContent';
import Swal from 'sweetalert2';
import { Axios } from 'index';
import AllApis from 'app/Apis/apis';
import { useDispatch } from 'react-redux';
// import { getSingleMarketExecutive } from 'app/redux/actions/MarketExecutive';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

const LoginAndForgotPassword = ({ setResetPassword }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const [forgetPassword, setForgetPassword] = useState({
        open: false,
        email: "",
        otp: "",
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    // const mutation = useAuthSignInWithEmailAndPassword(auth, {
    //     onError(error) {
    //         console.log(error);
    //     },
    //     onSuccess(data) {
    //         navigate("/", {replace: true});
    //     }
    // });

    const onSignIn = async (email, password) => {
        try {
            const reponse = await Axios.post(AllApis?.Auth?.login, {
                email,
                password
            });
            const resultData = reponse?.data;
            if (resultData?.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    // title: '',
                    text: resultData?.message,
                    timer: 1200,
                    showConfirmButton: false,
                    customClass: {
                        container: "popupImportant",
                    },
                })
                localStorage.setItem("dbomUserAndToken", JSON.stringify({
                    token: resultData?.result?.token,
                    user: resultData?.result?.userDetails,
                    isAuthenticated:true
                }));
                // dispatch(getSingleMarketExecutive())
                navigate("/");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error?.response?.data?.message || "",
                timer: 1200,
                showConfirmButton: false,
                customClass: {
                    container: "popupImportant",
                },
            })
        }
    };

    const handleSendForgetPasswordOtp = async (email) => {
        try {
            const response = await Axios.post(AllApis?.Auth?.forgetPassword, {
                email: email,
            });
            const resultData = response?.data
            if (resultData?.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: resultData?.message,
                    timer: 1200,
                    showConfirmButton: false,
                    customClass: {
                        container: "popupImportant",
                    },
                })
                setForgetPassword({
                    ...forgetPassword,
                    email: email,
                    open: true,
                })
            }
        } catch (error) {
            setForgetPassword({
                ...forgetPassword,
                email: "",
                open: false,
            })
            Swal.fire({
                icon: "error",
                title: "Falied",
                text: error?.response?.data?.message || "",
                timer: 1200,
                showConfirmButton: false,
                customClass: {
                    container: "popupImportant",
                },
            })
        }
    }


    const handleVerifyOtp = async () => {
        try {
            const { data } = await Axios.post(AllApis?.Auth?.verifyOtp, {
                email: forgetPassword?.email,
                otp: forgetPassword?.otp
            });
            if (data?.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    title: data?.status,
                    text: data?.message,
                    timer: 1200,
                    showConfirmButton: false,
                    customClass: {
                        container: "popupImportant",
                    },
                })
                setResetPassword((...pre) => ({ ...pre, open: true, email: forgetPassword.email }))
                setForgetPassword({
                    ...forgetPassword,
                    open: false,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error?.response?.data?.message || "",
                timer: 1200,
                showConfirmButton: false,
                customClass: {
                    container: "popupImportant",
                },
            })
        }
    }

    // useEffect(()=>{

    // },[forgetPassword?.open])

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
                <Card sx={{ maxWidth: '100%', width: 360, mb: 4 }}>
                    <Div sx={{ position: 'relative', height: '200px' }}>
                        <CardMedia
                            component="div"
                            // alt="green iguana"
                            height="200"
                        // image={`${ASSET_IMAGES}/colin-watts.jpg`}
                        />
                        <Div
                            sx={{
                                flex: 1,
                                inset: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: theme => alpha("#5a9cc1", 1),
                                p: theme => theme.spacing(3),
                            }}
                        >
                            <Typography
                                variant={"h2"}
                                sx={{
                                    color: 'common.white',
                                    fontSize: '1.5rem',
                                    mb: 0
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
                                email: '',
                                password: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                setSubmitting(true);
                                onSignIn(data.email, data.password);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, handleChange, handleBlur, values }) => (
                                <Form style={{ textAlign: 'left' }} noValidate>
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
                                            disabled={forgetPassword?.open}
                                            name="email"
                                            label="Email"
                                        />
                                    </Div>
                                    {!forgetPassword?.open ? <Div sx={{ mb: 2, mt: 1 }}>
                                        <Field name='password'>
                                            {({ field, meta }) => {
                                                return <FormControl sx={{ width: '100%' }} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        {...field}
                                                        // autoComplete="new-password"
                                                        autoComplete="off"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    // onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Password"
                                                        error={meta?.error && meta?.touched}
                                                    />
                                                    {meta?.error && meta?.touched && <FormHelperText id="outlined-adornment-password" sx={{ color: "#E73145" }}>{meta?.error}</FormHelperText>}
                                                </FormControl>
                                            }}
                                        </Field>
                                    </Div> : <Box mb={2} px={0.5}>
                                        <Typography mb={2}>Enter OTP</Typography>
                                        <OTPInput
                                            value={forgetPassword?.otp}
                                            shouldAutoFocus={true}
                                            containerStyle={{
                                                justifyContent: "space-between"
                                            }}
                                            inputStyle={{
                                                width: "3rem",
                                                height: "3rem",
                                                border: "2px solid #7352C7",
                                                borderRadius: "5px"
                                            }}
                                            onChange={(value) => {
                                                setForgetPassword({
                                                    ...forgetPassword,
                                                    otp: value
                                                })
                                            }}
                                            numInputs={5}
                                            renderSeparator={<span></span>}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                    </Box>}
                                    {!forgetPassword?.open && <Typography
                                        textAlign={"right"}
                                        variant={"body1"}
                                    >
                                        <Button size='small' sx={{
                                            bgcolor: "transparent", textTransform: "capitalize", p: 0, "&:hover": {
                                                bgcolor: "transparent"
                                            }
                                        }}
                                            onClick={() => { handleSendForgetPasswordOtp(values?.email) }}
                                        >Forgot your password?</Button>
                                        {/* <Link underline="none" href="/forget-password">Forgot your password?</Link> */}
                                    </Typography>}
                                    {!forgetPassword?.open ?
                                        <LoadingButton
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            sx={{ mb: 3, mt: 2 }}
                                            loading={isSubmitting || mutation.isLoading}
                                        >Login</LoadingButton> :
                                        <>
                                            <LoadingButton
                                                fullWidth
                                                variant="contained"
                                                size="large"
                                                sx={{ mb: 3, mt: 2 }}
                                                onClick={handleVerifyOtp}
                                            // loading={isSubmitting || mutation.isLoading}
                                            >Verify OTP</LoadingButton>
                                            <Box sx={{textAlign:"center"}}>
                                                <Typography onClick={()=> handleSendForgetPasswordOtp(forgetPassword?.email)}>Resend OTP</Typography>
                                            </Box>
                                        </>
                                    }
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
