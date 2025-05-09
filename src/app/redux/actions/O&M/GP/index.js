import { Axios } from "index";
import {
  OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_GP_MAINTENANCE_REQUEST_DATA_FAILED,
  OANDM_GP_MAINTENANCE_REQUEST_DATA_REQUEST,
  OANDM_GP_MAINTENANCE_REQUEST_DATA_SUCCESS,
  OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_GP_REPLACEMENT_REQUEST_DATA_FAILED,
  OANDM_GP_REPLACEMENT_REQUEST_DATA_REQUEST,
  OANDM_GP_REPLACEMENT_REQUEST_DATA_SUCCESS,
  OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_GP_SCRAP_REQUEST_DATA_FAILED,
  OANDM_GP_SCRAP_REQUEST_DATA_REQUEST,
  OANDM_GP_SCRAP_REQUEST_DATA_SUCCESS,
  OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_FAILED,
  OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST,
  OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS,
  OANDM_GP_TRANSFER_REQUEST_DATA_FAILED,
  OANDM_GP_TRANSFER_REQUEST_DATA_REQUEST,
  OANDM_GP_TRANSFER_REQUEST_DATA_SUCCESS,
} from "../constants";
import { oandmApis } from "app/Apis/O&M";

//Maintainance
//===========Maintenance request
export const oandm_gp_maintenace_request_data_disptach = function ({
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
          "assets_details.condition",
          "repair_type",
          "issue_reported",
        ],
        numbers: [],
        arrayField: ["assets_details.location_details.gp_name","assets_details.location_details.gp_code",],
        boolean: [],
      },
    };
    try {
      dispatch({ type: OANDM_GP_MAINTENANCE_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.gp?.maintenace?.maintenace_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_GP_MAINTENANCE_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_MAINTENANCE_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_gp_maintenace_request_assign_data_disptach = function ({
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
            "assets_details.location_details?.gp_name",
            "assets_details.location_details?.gp_code",
            "assets_details.condition",
            "repair_type",
            "issue_reported",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.gp?.maintenace?.maintenace_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//Replacement
//===========replacement request
export const oandm_gp_replacement_request_data_disptach = function ({
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
            "issueDate",
            "gp_asset_details.equipment_name",
            "gp_asset_details.serial_no",
            "dueDate",
            "gp_asset_details.gp_details.gp_name",
            "gp_asset_details.gp_details.gp_code",
            "replacementReason",
            "gp_asset_details.condition",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_GP_REPLACEMENT_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.gp?.replacement?.replacement_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
     
      dispatch({
        type: OANDM_GP_REPLACEMENT_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_REPLACEMENT_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//===========Assign Request
export const oandm_gp_replacement_request_assign_data_disptach = function ({
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
            "requested_item.requested_item_details.replacementId",
            "requested_item.requested_item_details.issueDate",
            "requested_item.requested_item_details.gp_asset_details.equipment_name",
            "requested_item.requested_item_details.gp_asset_details.serial_no",
            "requested_item.requested_item_details.dueDate",
            "requested_item.requested_item_details.gp_asset_details.condition",
            "requested_item.requested_item_details.gp_asset_details.gp_details.gp_name",
            "requested_item.requested_item_details.gp_asset_details.gp_details.gp_code",
            "requested_item.requested_item_details.initiatedBy",
            "requested_item.requested_item_details.gp_asset_details.condition",
            "pickupLocation",
            "replacementStatus",
            "issueDate",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.gp?.replacement?.replacement_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//transfer

//===========Transfer request
export const oandm_gp_transfer_request_data_disptach = function ({
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
            "transfer_id",
            "createdAt",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "transfer_type",
            "transfer_from.location_name",
            "transfer_to.location_name",
            "assets_details.location_details.gp_name",
            "assets_details.location_details.gp_code",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_GP_TRANSFER_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.gp?.transfer?.transfer_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
     
      dispatch({
        type: OANDM_GP_TRANSFER_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_TRANSFER_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_gp_transfer_request_assign_data_disptach = function ({
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
            "transfer_id",
            "createdAt",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "transfer_type",
            "transfer_from.location_name",
            "transfer_to.location_name",
            "createdAt",
            "transfer_status",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.gp?.transfer?.transfer_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//scrap
//===========Scrap request
export const oandm_gp_scrap_request_data_disptach = function ({
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
      dispatch({ type: OANDM_GP_SCRAP_REQUEST_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.gp?.scrap?.scrap_request_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      
      dispatch({
        type: OANDM_GP_SCRAP_REQUEST_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_SCRAP_REQUEST_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
//===========Assign Request
export const oandm_gp_scrap_request_assign_data_disptach = function ({
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
      dispatch({ type: OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_REQUEST });

      const response = await Axios.post(
        `${oandmApis?.block?.scrap?.scrap_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
