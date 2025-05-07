import { oandmWarehouseApis } from "app/Apis/O&MWarehouse";
import { Axios } from "index";
import { OANDM_WAREHOUSE_DAILYSTOCK_DATA_FAILED, OANDM_WAREHOUSE_DAILYSTOCK_DATA_REQUEST, OANDM_WAREHOUSE_DAILYSTOCK_DATA_SUCCESS, OANDM_WAREHOUSE_STOCK_DATA_FAILED, OANDM_WAREHOUSE_STOCK_DATA_REQUEST, OANDM_WAREHOUSE_STOCK_DATA_SUCCESS, OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_FAILED, OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_REQUEST, OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_SUCCESS } from "../constants";

//warehouse
export const oandm_warehouse_dailystock_data_disptach = function ({
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
      dispatch({ type: OANDM_WAREHOUSE_DAILYSTOCK_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmWarehouseApis?.warehouse?.dailyStockList}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
     
      dispatch({
        type: OANDM_WAREHOUSE_DAILYSTOCK_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_DAILYSTOCK_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const oandm_warehouse_stock_data_disptach = function ({
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
      dispatch({ type: OANDM_WAREHOUSE_STOCK_DATA_REQUEST});

      const response = await Axios.post(
        `${oandmWarehouseApis?.warehouse?.stockList}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );

      dispatch({
        type: OANDM_WAREHOUSE_STOCK_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_STOCK_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const oandm_warehouse_virtualstock_data_disptach = function ({
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
      dispatch({ type: OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmWarehouseApis?.warehouse?.virtualStockList}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );

      dispatch({
        type: OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};


