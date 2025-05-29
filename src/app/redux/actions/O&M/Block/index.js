import { Axios } from "index";

import { oandmApis } from "app/Apis/O&M";
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

//Maintainance
//===========Maintenance request
export const oandm_block_maintenace_request_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
  filters={},
  package_name = "",
} = {}) {
  return async (dispatch) => {
    try {
      const body = {
        filters: {
          ...filters,
          "assets_details.location_details.package.name": package_name,
        },
        searchFields: {
          string: [
            "maintenance_id",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "assets_details.location_details.location_name",
            "assets_details.location_details.location_code",
            "assets_details.condition",
            "repair_type",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.maintenace?.maintenace_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
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
  package_name=''
} = {}) {
  return async (dispatch) => {
    try {
      const body = {
        filters: {
          "assets_details.location_details.package.name":package_name,
        },
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
            "issue_date",
            "repair_status",
            "estimate_arrival_date"
          ],
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
  package_name=''
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {
        "block_asset_details.block_details.package.name":package_name,
      },
      searchFields: {
        string: [
          "replacementId",
          "issueDate",
          "block_asset_details.equipment_name",
          "block_asset_details.serial_no",
          "dueDate",
          "block_asset_details.block_details.location_name",
          "block_asset_details.block_details.location_code",
          "replacementReason",
          "block_asset_details.condition",
        ],
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
  package_name=''
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {
        "requested_item.requested_item_details.block_asset_details.equipment_details.package.name":package_name,
      },
      searchFields: {
        string: [
          "requested_item.requested_item_details.replacementId",
          "requested_item.requested_item_details.issueDate",
          "requested_item.requested_item_details.block_asset_details.equipment_name",
          "requested_item.requested_item_details.block_asset_details.serial_no",
          "requested_item.requested_item_details.dueDate",
          "requested_item.requested_item_details.block_asset_details.equipment_details.location_name",
          "requested_item.requested_item_details.block_asset_details.equipment_details.location_code",
          "initiatedBy",
          "requested_item.requested_item_details.block_asset_details.condition",
          "pickupLocation",
          "issueDate",
          "replacementStatus",
          
        ],
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
  package_name=''
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {
        "assets_details.location_details.package.name":package_name,
      },
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
          "remarks"
        ],
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
  package_name=''
} = {}) {
  return async (dispatch) => {
    try {
      const body = {
        filters: {
          "assets_details.location_details.package.name": package_name,
        },
        searchFields: {
          string: [
            "transfer_id",
            "createdAt",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "transfer_type",
            "transfer_from.location_name",
            'assets_details.location_details.location_name',
            'assets_details.location_details.location_code',
            "transfer_to.location_name",
            "assets_details.condition",
            "transfer_status",
          ],
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
