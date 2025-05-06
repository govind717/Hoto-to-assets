import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField'
import Div from '@jumbo/shared/Div'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Card, CardContent, CardMedia, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, alpha } from '@mui/material'
import FullViewContent from 'app/Components/FullViewContent'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AllApis from 'app/Apis/apis'
import { Axios } from 'index'
import * as yup from "yup";
import Swal from 'sweetalert2'

const ResetPassword = ({resetPassword,setResetPassword}) => {
    const [showPassword, setShowPassword] = React.useState({
        newPassword: false,
        confirmPassword: false
    });
    const handleClickShowPassword = (name) => {
        setShowPassword((pre) => ({ ...pre, [name]: !pre[name] }))
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleResetSubmit = async (values,action)=>{
        try {
            const { data } = await Axios.post(AllApis?.Auth?.updatePassword, {
                email: resetPassword?.email,
                newPassword:values?.newPassword
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
                setResetPassword((pre)=>({...pre,open:false}))
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error?.response?.data?.status || "Internal Server Error",
                text: error?.response?.data?.message || "",
                timer: 1200,
                showConfirmButton: false,
                customClass: {
                    container: "popupImportant",
                },
            })
        }
    }
    return (
        <FullViewContent>
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
                            Reset password
                        </Typography>
                    </Div>
                </Div>
                <CardContent sx={{ pt: 0 }}>
                    <Formik
                        initialValues={{
                            newPassword:"",
                            confirmPassword:""
                        }}
                        validationSchema={yup.object().shape({
                            newPassword: yup.string()
                                .required('New password is required'),
                            confirmPassword: yup.string()
                                .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
                                .required('Confirm password is required')
                        })}
                        onSubmit={handleResetSubmit}
                    >
                        {({values}) => {
                            return (
                                <Form>
                                    <Box sx={{ mt: 4 }}>
                                        <Field name='newPassword'>
                                            {({ field, meta }) => {
                                                return <FormControl sx={{ width: '100%' }} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-new-password"
                                                        type={showPassword?.newPassword ? 'text' : 'password'}
                                                        {...field}
                                                        name='newPassword'
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    name='newPassword'
                                                                    onClick={() => handleClickShowPassword('newPassword')}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {!showPassword?.newPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="New Password"
                                                        error={meta?.error && meta?.touched}
                                                    />
                                                    {meta?.error && meta?.touched && <FormHelperText id="outlined-adornment-new-password" sx={{ color: "#E73145" }}>{meta?.error}</FormHelperText>}
                                                </FormControl>
                                            }}
                                        </Field>
                                        <Field name='confirmPassword'>
                                            {({ field, meta }) => {
                                                return <FormControl sx={{ width: '100%', mt: 3 }} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-confirm-password"
                                                        type={showPassword?.confirmPassword ? 'text' : 'password'}
                                                        {...field}
                                                        name='confirmPassword'
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    name='confirmPassword'
                                                                    onClick={() => handleClickShowPassword('confirmPassword')}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {!showPassword?.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Confirm Password"
                                                        error={meta?.error && meta?.touched}
                                                    />
                                                    {meta?.error && meta?.touched && <FormHelperText id="outlined-adornment-confirm-password" sx={{ color: "#E73145" }}>{meta?.error}</FormHelperText>}
                                                </FormControl>
                                            }}
                                        </Field>
                                        <LoadingButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            sx={{ my: 3 }}
                                        >Reset Password</LoadingButton>
                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>

                </CardContent>
            </Card>
        </FullViewContent>
    )
}

export default ResetPassword