import { oandmWarehouseApis } from "app/Apis/O&MWarehouse";
import { Axios } from "index";
import { OANDM_MARERIALREQUEST_OPENREQUEST_DATA_FAILED, OANDM_MARERIALREQUEST_OPENREQUEST_DATA_REQUEST, OANDM_MARERIALREQUEST_OPENREQUEST_DATA_SUCCESS, OANDM_MARERIALREQUEST_REQUESTLOG_DATA_FAILED, OANDM_MARERIALREQUEST_REQUESTLOG_DATA_REQUEST, OANDM_MARERIALREQUEST_REQUESTLOG_DATA_SUCCESS } from "../constants";


//material Inward
export const oandm_materialrequest_openrequest_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
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
      dispatch({ type: OANDM_MARERIALREQUEST_OPENREQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmWarehouseApis?.materialInward?.GRNList}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );

      dispatch({
        type: OANDM_MARERIALREQUEST_OPENREQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_MARERIALREQUEST_OPENREQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const oandm_materialrequest_requestlog_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
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
      dispatch({ type: OANDM_MARERIALREQUEST_REQUESTLOG_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmWarehouseApis?.materialInward?.GRNList}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );

      dispatch({
        type: OANDM_MARERIALREQUEST_REQUESTLOG_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_MARERIALREQUEST_REQUESTLOG_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};