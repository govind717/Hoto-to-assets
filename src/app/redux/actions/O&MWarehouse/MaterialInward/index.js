import { oandmWarehouseApis } from "app/Apis/O&MWarehouse";
import { Axios } from "index";
import { OANDM_MARERIALINWARD_GRN_DATA_FAILED, OANDM_MARERIALINWARD_GRN_DATA_REQUEST, OANDM_MARERIALINWARD_GRN_DATA_SUCCESS, OANDM_MARERIALINWARD_INWARDITEM_DATA_FAILED, OANDM_MARERIALINWARD_INWARDITEM_DATA_REQUEST, OANDM_MARERIALINWARD_INWARDITEM_DATA_SUCCESS } from "../constants";

//material Inward
export const oandm_materialinward_grn_data_disptach = function ({
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
      dispatch({ type: OANDM_MARERIALINWARD_GRN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmWarehouseApis?.materialInward?.GRNList}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );

      dispatch({
        type: OANDM_MARERIALINWARD_GRN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_MARERIALINWARD_GRN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

export const oandm_materialinward_inwarditems_data_disptach = function ({
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
      dispatch({ type: OANDM_MARERIALINWARD_INWARDITEM_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmWarehouseApis?.materialInward?.inwardItemList}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );

      dispatch({
        type: OANDM_MARERIALINWARD_INWARDITEM_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_MARERIALINWARD_INWARDITEM_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};