import { Axios } from "index";
import { hoto_apis } from "app/Apis/hoto_assest";
import {
  HOTO_GP_ASSET_PORTFOLIO_DATA_FAILED,
  HOTO_GP_ASSET_PORTFOLIO_DATA_REQUEST,
  HOTO_GP_ASSET_PORTFOLIO_DATA_SUCCESS,
  HOTO_GP_MAINTENANCE_DATA_FAILED,
  HOTO_GP_MAINTENANCE_DATA_REQUEST,
  HOTO_GP_MAINTENANCE_DATA_SUCCESS,
  HOTO_GP_REPLACEMENT_DATA_FAILED,
  HOTO_GP_REPLACEMENT_DATA_REQUEST,
  HOTO_GP_REPLACEMENT_DATA_SUCCESS,
  HOTO_GP_TRANSFER_DATA_FAILED,
  HOTO_GP_TRANSFER_DATA_REQUEST,
  HOTO_GP_TRANSFER_DATA_SUCCESS,
  HOTO_GP_WAREHOUSE_DATA_FAILED,
  HOTO_GP_WAREHOUSE_DATA_REQUEST,
  HOTO_GP_WAREHOUSE_DATA_SUCCESS,
  HOTO_GP_WISE_ASSET_DATA_FAILED,
  HOTO_GP_WISE_ASSET_DATA_REQUEST,
  HOTO_GP_WISE_ASSET_DATA_SUCCESS,
} from "../constants";

export const hoto_gp_asset_partfolio_data_disptach = function ({
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
           string: ["equipment_name", "block_details?.block?.name"],
           numbers: [],
           arrayField: [],
           boolean: [],
         },
       };
      dispatch({ type: HOTO_GP_ASSET_PORTFOLIO_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.asset_portfolio_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      console.log("res : ", response);
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

export const hoto_gp_wise_asset_data_disptach = function ({
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
           string: ["block?.name", "block_id", "district.name", "district_id"],
           numbers: [],
           arrayField: [],
           boolean: [],
         },
       };
      dispatch({ type: HOTO_GP_WISE_ASSET_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.gp_wise_assets_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_GP_WISE_ASSET_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_WISE_ASSET_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

export const hoto_gp_warehouse_data_disptach = function ({
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
      dispatch({ type: HOTO_GP_WAREHOUSE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.warehouse_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_GP_WAREHOUSE_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_WAREHOUSE_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_gp_maintenance_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
     const body = {
       filters: {},
       searchFields: {
         string: [
           "assets_details.equipment_name",
           "maintenance_id",
           "assets_details.serial_no",
           "repair_type",
           "maintenance_type",
           "issue_reported",
         ],
         numbers: [],
         arrayField: [],
         boolean: [],
       },
     };
    try {
      dispatch({ type: HOTO_GP_MAINTENANCE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.maintenance_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      console.log("gpmaintenn : ", response);
      dispatch({
        type: HOTO_GP_MAINTENANCE_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_MAINTENANCE_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_gp_replacement_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
     const body = {
       filters: {},
       searchFields: {
         string: [
           "replacementId",
           "equipment_name",
           "serialNumber",
           "block_asset_details?.block_details?.gp_name",
           "block_asset_details?.block_details?.gp_code",
           "replacementReason",
           "initiatedBy",
         ],
         numbers: [],
         arrayField: [],
         boolean: [],
       },
     };
    if (!search_value) {
      search_value = "";
    }
    try {
      dispatch({ type: HOTO_GP_REPLACEMENT_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.replacement_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,{...body}
      );
      dispatch({
        type: HOTO_GP_REPLACEMENT_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_REPLACEMENT_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_gp_transfer_data_disptach = function ({
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
      dispatch({ type: HOTO_GP_TRANSFER_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.transfer_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_GP_TRANSFER_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_TRANSFER_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
