import { Axios } from "index";

import { oandmApis } from "app/Apis/O&M";
import { OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_SUCCESS, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_SUCCESS, OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_SUCCESS, OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_SUCCESS } from "../constants";

//Maintainance
//===========Maintenance request
export const oandm_warehouse_maintenace_request_data_disptach = function ({
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
            "maintenance_id",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "assets_details.location_details.location_name",
            "assets_details.location_details.location_code",
            "assets_details.condition",
            "repair_type",
            "issue_reported",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.maintenace?.maintenace_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_warehouse_maintenace_request_assign_data_disptach = function ({
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
            "maintenance_id",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "assets_details.location_details.location_name",
            "assets_details.location_details.location_code",
            "assets_details.condition",
            "repair_type",
            "issue_reported",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.maintenace?.maintenace_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//Replacement
//===========replacement request
export const oandm_warehouse_replacement_request_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {},
      searchFields: {
        string: ["replacementId", "issueDate", "replacementReason"],
        numbers: [],
        arrayField: [
          "warehouse_asset_details.equipment_name",
          "warehouse_asset_details.serial_no",
          "warehouse_asset_details.equipment_details.location_name",
          "warehouse_asset_details.equipment_details.location_code",
          "warehouse_asset_details.condition",
        ],
        boolean: [],
      },
    };
    try {
      dispatch({ type: OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.replacement?.replacement_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );

      dispatch({
        type: OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//===========Assign Request 
export const oandm_warehouse_replacement_request_assign_data_disptach = function ({
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
          "requested_item.requested_item_details.issueDate",
          "requested_item.requested_item_details.warehouse_asset_details.equipment_name",
          "requested_item.requested_item_details.warehouse_asset_details.serial_no",
          "requested_item.requested_item_details.dueDate",
          "requested_item.requested_item_details.warehouse_asset_details.equipment_details.location_name",
          "requested_item.requested_item_details.warehouse_asset_details.equipment_details.location_code",
          "requested_item.requested_item_details.warehouse_asset_details.condition",
          "pickupLocation",
          "issueDate",
        ],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({
        type: OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST,
      });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.replacement?.replacement_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//transfer

//===========Transfer request
export const oandm_warehouse_transfer_request_data_disptach = function ({
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
          "transfer_type",
          "transfer_from.location_name",
          "transfer_to.location_name",
          "assets_details.equipment_name",
          "assets_details.serial_no",
          "assets_details.location_details.location_name",
          "assets_details.location_details.location_code",
          "assets_details.condition",
          "repair_type",
          "remarks",
        ],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.transfer?.transfer_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );

      dispatch({
        type: OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_warehouse_transfer_request_assign_data_disptach = function ({
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
            "transfer_status",
            "transfer_id",
            "createdAt",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "transfer_type",
            "transfer_from.location_name",
            "transfer_to.location_name",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.transfer?.transfer_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//scrap
//===========Scrap request
export const oandm_warehouse_scrap_request_data_disptach = function ({
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
      dispatch({ type: OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.scrap?.scrap_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );

      dispatch({
        type: OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_warehouse_scrap_request_assign_data_disptach = function ({
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
      dispatch({ type: OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.warehouse?.scrap?.scrap_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
      );
      dispatch({
        type: OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
