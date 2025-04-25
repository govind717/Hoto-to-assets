const AllApis = {
    Auth:{
        login:`auth/sign-in`,
        forgetPassword:`auth/forget-password/send-otp`,
        verifyOtp:`auth/forget-password/verify-otp`,
        updatePassword:`auth/forget-password/update-password`
    },
    login:"https://survey.lumacorp.in/api/survey-auth/login?email=abishek@gmail.com&password=password",
    // survey:"https://survey.lumacorp.in/api/inventory/get_gp_survey_details",
    survey:"https://dbombe.kdcstaging.in/api/v1/survey/list-gp-details",
    equipment:"https://survey.lumacorp.in/api/inventory/equipment_list",
    
}
export default AllApis