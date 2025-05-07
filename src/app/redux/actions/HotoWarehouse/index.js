import { hoto_warehouse_apis } from "app/Apis/hoto_assest";
import { Axios } from "index";
import { HOTO_WAREHOUSE_ASSETS_DATA_FAILED, HOTO_WAREHOUSE_ASSETS_DATA_REQUEST, HOTO_WAREHOUSE_ASSETS_DATA_SUCCESS, HOTO_WAREHOUSE_INWARD_ASSETS_DATA_FAILED, HOTO_WAREHOUSE_INWARD_ASSETS_DATA_REQUEST, HOTO_WAREHOUSE_INWARD_ASSETS_DATA_SUCCESS, HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED, HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST, HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS, HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED, HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST, HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS, HOTO_WAREHOUSE_TRANSFER_DATA_FAILED, HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST, HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS } from "./constants";

export const hoto_warehouse_assets_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {},
      searchFields: {
        string: ["equipment_name", "serial_no", "condition"],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_WAREHOUSE_ASSETS_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_warehouse_apis?.assets?.listing}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: HOTO_WAREHOUSE_ASSETS_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_ASSETS_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};


export const hoto_warehouse_inward_assets_data_disptach = function ({
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
          "transfer_id",
          "assets_details.equipment_name",
          "assets_details.serial_no",
          "transfer_from.location_name",
          "assets_details.condition",
          "assets_details.condition_status",
        ],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_WAREHOUSE_INWARD_ASSETS_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_warehouse_apis?.inward_assets?.listing}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: HOTO_WAREHOUSE_INWARD_ASSETS_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_INWARD_ASSETS_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};


export const hoto_warehouse_maintenance_data_disptach = function ({
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
          "maintenance_id",
          "createdAt",
          "assets_details.equipment_name",
          "assets_details.serial_no",
          "repair_type",
          "maintenance_type",
          "assign_to",
          "issue_reported",
          "issueDate",
          "estimate_arrival_date",
          "repair_status",
          "remarks"
        ],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_warehouse_apis?.maintenance?.listing}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};


export const hoto_warehouse_replacement_data_disptach = function ({
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
          "requested_item.requested_item_details.replacementId",
          "issueDate",
          "requested_item.requested_item_details.block_asset_details.equipment_name",
          "requested_item.requested_item_details.block_asset_details.serial_no",
          "requested_item.requested_item_details.block_asset_details.block_details.gp_name",
          "requested_item.requested_item_details.block_asset_details.block_details.gp_code",
          "requested_item.requested_item_details.replacementReason",
          "replacementStatus",
          "initiatedBy"
        ],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_warehouse_apis?.replacement?.listing}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};


export const hoto_warehouse_transfer_data_disptach = function ({
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
          "transfer_id",
          "createdAt",
          "assets_details.equipment_name",
          "assets_details.serial_no",
          "transfer_type",
          "transfer_from.location_name",
          "transfer_to.location_name",
          "current_data.commissionPercentage",
          "issueDate",
          "transfer_status",
        ],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_warehouse_apis?.transfer?.listing}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_TRANSFER_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
