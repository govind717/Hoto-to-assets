import { hoto_apis } from "app/Apis/hoto_assest";
import { Axios } from "index";
import {
  HOTO_GP_ASSET_PORTFOLIO_DATA_FAILED,
  HOTO_GP_ASSET_PORTFOLIO_DATA_REQUEST,
  HOTO_GP_ASSET_PORTFOLIO_DATA_SUCCESS,
  HOTO_GP_ASSET_PORTFOLIO_MAINTENANCE_DATA_FAILED,
  HOTO_GP_ASSET_PORTFOLIO_MAINTENANCE_DATA_REQUEST,
  HOTO_GP_ASSET_PORTFOLIO_MAINTENANCE_DATA_SUCCESS,
  HOTO_GP_ASSET_PORTFOLIO_REPLACEMENT_DATA_FAILED,
  HOTO_GP_ASSET_PORTFOLIO_REPLACEMENT_DATA_REQUEST,
  HOTO_GP_ASSET_PORTFOLIO_REPLACEMENT_DATA_SUCCESS,
  HOTO_GP_ASSET_PORTFOLIO_TRANSFER_DATA_FAILED,
  HOTO_GP_ASSET_PORTFOLIO_TRANSFER_DATA_REQUEST,
  HOTO_GP_ASSET_PORTFOLIO_TRANSFER_DATA_SUCCESS,
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

export const hoto_gp_asset_partfolio_data_disptach = function (
  { page = 1, search_value = "", sort = "", sortBy = "", filters = {} } = {},
  package_name
) {
  return async (dispatch) => {
    try {
      const body = {
        filters: {
          equipment_name: { $ne: "OLT" },
          "equipment_details.location_type": "old gp",
          ...filters,
        },
        searchFields: {
          string: [
            "equipment_name",
            "serial_no",
            "equipment_details.location_name",
            "equipment_details.location_code",
            "equipment_details.block.name",
            "equipment_details.block.code",
            "warranty_status",
            "condition",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: HOTO_GP_ASSET_PORTFOLIO_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.asset_portfolio_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        body
      );
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

//Inner asset portfolio
export const hoto_gp_asset_partfolio_maintenance_data_disptach = function (
  { page = 1, search_value = "", sort = "", sortBy = "", filters = {} } = {},
  package_name
) {
  return async (dispatch) => {
    const body = {
      filters: filters,
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
      dispatch({ type: HOTO_GP_ASSET_PORTFOLIO_MAINTENANCE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.asset_portfolio?.maintenance_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        body
      );
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_MAINTENANCE_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_MAINTENANCE_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_gp_asset_partfolio_replacement_data_disptach = function (
  { page = 1, search_value = "", sort = "", sortBy = "", filters = {} } = {},
  package_name
) {
  return async (dispatch) => {
    try {
      const body = {
        filters: filters,
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
      dispatch({ type: HOTO_GP_ASSET_PORTFOLIO_REPLACEMENT_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.asset_portfolio?.replacement_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        body
      );
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_REPLACEMENT_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_REPLACEMENT_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
export const hoto_gp_asset_partfolio_transfer_data_disptach = function (
  { page = 1, search_value = "", sort = "", sortBy = "", filters = {} } = {},
  package_name
) {
  return async (dispatch) => {
    const body = {
      filters: filters,
      searchFields: {
        string: [],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_GP_ASSET_PORTFOLIO_TRANSFER_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.asset_portfolio?.transfer_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        body
      );
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_TRANSFER_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_GP_ASSET_PORTFOLIO_TRANSFER_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};
// ------------------------
export const hoto_gp_wise_asset_data_disptach = function (
  {
    page = 1,
    search_value = "",
    sort = "",
    sortBy = "",
    filters = {},
    availabilityConditionFilters = {},
  } = {},
  package_name
) {
  return async (dispatch) => {
    try {
      const body = {
        filters: {
          location_type: "old gp",
          ...filters,
        },
        availabilityConditionFilters,
        searchFields: {
          string: [
            "block.name",
            "location_name",
            "location_code",
            "block_id",
            "district.name",
            "district_id",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: HOTO_GP_WISE_ASSET_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.gp_wise_assets_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        body
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
          string: ["equipment_name", "serial_no", "condition"],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: HOTO_GP_WAREHOUSE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.warehouse_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
        body
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
export const hoto_gp_maintenance_data_disptach = function (
  { page = 1, search_value = "", sort = "", sortBy = "", filters = {} } = {},
  package_name
) {
  return async (dispatch) => {
    const body = {
      filters: {
        ...filters,
      },
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
        `${hoto_apis?.gp?.maintenance_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        body
      );
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
export const hoto_gp_replacement_data_disptach = function (
  { page = 1, search_value = "", sort = "", sortBy = "", filters = {} } = {},
  package_name
) {
  return async (dispatch) => {
    const body = {
      filters: {
        ...filters,
      },
      searchFields: {
        string: [
          "replacementId",
          //  "gp_asset_details.equipment_name",
          "serialNumber",
          "replacementReason",
          "initiatedBy",
        ],
        numbers: [],
        arrayField: [
          "gp_asset_details.equipment_details.location_name",
          "gp_asset_details.equipment_details.location_code",
          "gp_asset_details.equipment_name",
        ],
        boolean: [],
      },
    };
    if (!search_value) {
      search_value = "";
    }
    try {
      dispatch({ type: HOTO_GP_REPLACEMENT_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.replacement_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        { ...body }
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
export const hoto_gp_transfer_data_disptach = function (
  { page = 1, search_value = "", sort = "", sortBy = "", filters = {} } = {},
  package_name
) {
  return async (dispatch) => {
    try {
      const body = {
        filters: {
          ...filters,
        },
        searchFields: {
          string: [
            "transfer_id",
            "createdAt",
            "assets_details.equipment_name",
            "assets_details.serial_no",
            "transfer_type",
            "transfer_from.location_name",
            "transfer_to?.location_name",
          ],
          numbers: [],
          arrayField: [],
          boolean: [],
        },
      };
      dispatch({ type: HOTO_GP_TRANSFER_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.gp?.transfer_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}&package_name=${package_name}`,
        body
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
