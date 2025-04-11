import React, { useState } from 'react'
import LoginAndForgotPassword from './LoginAndForgotPassword'
import ResetPassword from './ResetPassword'

const Login = () => {
    const [resetPassword, setResetPassword] = useState({
        open: false,
        email: ""
    })
    console.log(resetPassword)
    return (
        <>
            {!resetPassword?.open ?
                <LoginAndForgotPassword resetPassword={resetPassword} setResetPassword={setResetPassword}/> :
                <ResetPassword resetPassword={resetPassword} setResetPassword={setResetPassword}/>
            }
        </>
    )
}

export default Login