import axios from "axios";
import { HOTO_SERVEY_DATA_FAILED, HOTO_SERVEY_DATA_REQUEST, HOTO_SERVEY_DATA_SUCCESS } from "./constants";
import AllApis from "app/Apis/apis";


export const hoto_servey_data_disptach = function ({ page = 1,search_value = "" } = {}) {
    return async (dispatch) => {
        try {
            dispatch({ type: HOTO_SERVEY_DATA_REQUEST });

            const login_response = await axios.post(AllApis?.login)
            const user_details = login_response?.data;
            const servey_data_response = await axios.post(`${AllApis?.survey}?page=${page}&search=${search_value ? search_value : ""}`, {
                headers: {
                    Authorization: `Bearer ${user_details?.access_token}`
                }
            })

            dispatch({
                type: HOTO_SERVEY_DATA_SUCCESS, payload: {
                    data: servey_data_response?.data
                }
            })
        } catch (error) {
            dispatch({ type: HOTO_SERVEY_DATA_FAILED, payload: error?.response?.data?.message });
        }
    }
}