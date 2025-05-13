import { Axios } from "index";
import { PACKAGE_DROPDOWN_DATA_FAILED, PACKAGE_DROPDOWN_DATA_REQUEST, PACKAGE_DROPDOWN_DATA_SUCCESS } from "./constants";

export const package_dropdown_data_disptach = function () {
    return async (dispatch) => {
        try {
          
            dispatch({ type: PACKAGE_DROPDOWN_DATA_REQUEST });

           
            const response = await Axios.get('')
            dispatch({
              type: PACKAGE_DROPDOWN_DATA_SUCCESS,
              payload: {
                data: response?.data,
              },
            });
        } catch (error) {
            dispatch({
              type: PACKAGE_DROPDOWN_DATA_FAILED,
              payload: error?.response?.data?.message,
            });
        }
    }
}
