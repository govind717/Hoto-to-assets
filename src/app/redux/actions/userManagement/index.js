
import AllApis from "app/Apis/apis";
import { Axios } from "index";
import { USER_DATA_FAILED, USER_DATA_REQUEST, USER_DATA_SUCCESS } from "./constants";


export const user_data_disptach = function ({ page = 1,search_value = "",sort="" ,sortBy="" } = {}) {
    return async (dispatch) => {
        try {
            const body = {
              filters: {},
              searchFields: {
                string: [],
                numbers: [],
                arrayField: [],
                boolean: [],
              },
            };
            dispatch({ type: USER_DATA_REQUEST });

           
            const response = await Axios.post(`${AllApis?.users}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body)
            console.log("user dispatch response",response)
            dispatch({
                type: USER_DATA_SUCCESS, payload: {
                    data: response?.data
                }
            })
        } catch (error) {
            dispatch({ type: USER_DATA_FAILED, payload: error?.response?.data?.message });
        }
    }
}
