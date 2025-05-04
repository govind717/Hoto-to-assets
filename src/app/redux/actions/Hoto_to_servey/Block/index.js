import { Axios } from "index";
import {
  HOTO_BLOCK_ASSET_PORTFOLIO_DATA_FAILED,
  HOTO_BLOCK_ASSET_PORTFOLIO_DATA_REQUEST,
  HOTO_BLOCK_ASSET_PORTFOLIO_DATA_SUCCESS,
  HOTO_BLOCK_MAINTENANCE_DATA_FAILED,
  HOTO_BLOCK_MAINTENANCE_DATA_REQUEST,
  HOTO_BLOCK_MAINTENANCE_DATA_SUCCESS,
  HOTO_BLOCK_REPLACEMENT_DATA_FAILED,
  HOTO_BLOCK_REPLACEMENT_DATA_REQUEST,
  HOTO_BLOCK_REPLACEMENT_DATA_SUCCESS,
  HOTO_BLOCK_TRANSFER_DATA_FAILED,
  HOTO_BLOCK_TRANSFER_DATA_REQUEST,
  HOTO_BLOCK_TRANSFER_DATA_SUCCESS,
  HOTO_BLOCK_WAREHOUSE_DATA_FAILED,
  HOTO_BLOCK_WAREHOUSE_DATA_REQUEST,
  HOTO_BLOCK_WAREHOUSE_DATA_SUCCESS,
  HOTO_BLOCK_WISE_ASSET_DATA_FAILED,
  HOTO_BLOCK_WISE_ASSET_DATA_REQUEST,
  HOTO_BLOCK_WISE_ASSET_DATA_SUCCESS,
} from "../constants";
import { hoto_apis } from "app/Apis/hoto_assest";

export const hoto_block_asset_partfolio_data_disptach = function ({
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
      dispatch({ type: HOTO_BLOCK_ASSET_PORTFOLIO_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.asset_portfolio_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_BLOCK_ASSET_PORTFOLIO_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_BLOCK_ASSET_PORTFOLIO_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

export const hoto_block_wise_asset_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {},
      searchFields: {
        string: ["block?.name", "block_id", "district.name", "district_id"],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_BLOCK_WISE_ASSET_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.block_wise_assets_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_BLOCK_WISE_ASSET_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_BLOCK_WISE_ASSET_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

export const hoto_block_warehouse_data_disptach = function ({
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
      dispatch({ type: HOTO_BLOCK_WAREHOUSE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.warehouse_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_BLOCK_WAREHOUSE_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_BLOCK_WAREHOUSE_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_block_maintenance_data_disptach = function ({
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
      dispatch({ type: HOTO_BLOCK_MAINTENANCE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.maintenance_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: HOTO_BLOCK_MAINTENANCE_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_BLOCK_MAINTENANCE_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_block_replacement_data_disptach = function ({
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
            string: [
              "replacementId",
              "block_asset_details.equipment_name",
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
      dispatch({ type: HOTO_BLOCK_REPLACEMENT_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.replacement_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_BLOCK_REPLACEMENT_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_BLOCK_REPLACEMENT_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_block_transfer_data_disptach = function ({
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
      dispatch({ type: HOTO_BLOCK_TRANSFER_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.transfer_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_BLOCK_TRANSFER_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_BLOCK_TRANSFER_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
