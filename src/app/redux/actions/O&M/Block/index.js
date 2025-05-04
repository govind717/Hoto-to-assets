import { Axios } from "index";

import { hoto_apis } from "app/Apis/hoto_assest";
import {
  OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_FAILED,
  OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_REQUEST,
  OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_SUCCESS,
  OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_FAILED,
  OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_REQUEST,
  OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_SUCCESS,
  OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_BLOCK_SCRAP_REQUEST_DATA_FAILED,
  OANDM_BLOCK_SCRAP_REQUEST_DATA_REQUEST,
  OANDM_BLOCK_SCRAP_REQUEST_DATA_SUCCESS,
  OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_BLOCK_TRANSFER_REQUEST_DATA_FAILED,
  OANDM_BLOCK_TRANSFER_REQUEST_DATA_REQUEST,
  OANDM_BLOCK_TRANSFER_REQUEST_DATA_SUCCESS,
} from "../constants";
import { oandmApis } from "app/Apis/O&M";

//Maintainance
//===========Maintenance request
export const oandm_block_maintenace_request_data_disptach = function ({
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
      dispatch({ type: OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.maintenace?.maintenace_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_block_maintenace_request_assign_data_disptach = function ({
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
      dispatch({ type: OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.maintenace?.maintenace_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//Replacement
//===========replacement request
export const oandm_block_replacement_request_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {},
      searchFields: {
        string: [],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.replacement?.replacement_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
     
      dispatch({
        type: OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//===========Assign Request
export const oandm_block_replacement_request_assign_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {},
      searchFields: {
        string: [],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.replacement?.replacement_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//transfer

//===========Transfer request
export const oandm_block_transfer_request_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {},
      searchFields: {
        string: [],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: OANDM_BLOCK_TRANSFER_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.transfer?.transfer_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      console.log(
        "this is block assets portfolio list",
        response.data?.result?.data
      );
      dispatch({
        type: OANDM_BLOCK_TRANSFER_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_TRANSFER_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_block_transfer_request_assign_data_disptach = function ({
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
      dispatch({ type: OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.transfer?.transfer_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//scrap
//===========Scrap request
export const oandm_block_scrap_request_data_disptach = function ({
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
      dispatch({ type: OANDM_BLOCK_SCRAP_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.scrap?.scrap_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      console.log(
        "this is block assets portfolio list",
        response.data?.result?.data
      );
      dispatch({
        type: OANDM_BLOCK_SCRAP_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_SCRAP_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_block_scrap_request_assign_data_disptach = function ({
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
      dispatch({ type: OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.scrap?.scrap_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
