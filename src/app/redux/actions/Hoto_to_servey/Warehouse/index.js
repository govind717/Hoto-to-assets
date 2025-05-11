import { Axios } from "index";

import { hoto_apis } from "app/Apis/hoto_assest";
import { HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_FAILED, HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_REQUEST, HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_SUCCESS, HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED, HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST, HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS, HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED, HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST, HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS, HOTO_WAREHOUSE_TRANSFER_DATA_FAILED, HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST, HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS, HOTO_WAREHOUSE_WAREHOUSE_DATA_FAILED, HOTO_WAREHOUSE_WAREHOUSE_DATA_REQUEST, HOTO_WAREHOUSE_WAREHOUSE_DATA_SUCCESS, HOTO_WAREHOUSE_WISE_ASSET_DATA_FAILED, HOTO_WAREHOUSE_WISE_ASSET_DATA_REQUEST, HOTO_WAREHOUSE_WISE_ASSET_DATA_SUCCESS } from "../constants";

export const hoto_warehouse_asset_partfolio_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    try {
        const body = {
          filters: {
            "equipment_details.location_type": "warehouse",
          },
          searchFields: {
            string: [
              "equipment_name",
              "serial_no",
              "equipment_details.location_name",
              "equipment_details.location_code",
            ],
            numbers: [],
            arrayField: [],
            boolean: [],
          },
        };
      dispatch({ type: HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.asset_portfolio_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

//portfolio inner tables dispacture
// export const hoto_block_asset_partfolio_maintenance_data_disptach = function ({
//   page = 1,
//   search_value = "",
//   sort = "",
//   sortBy = "",
//   filters={}
// } = {}) {
//   return async (dispatch) => {
//     const body = {
//       filters: filters,
//       searchFields: {
//         string: [
//           "assets_details.equipment_name",
//           "maintenance_id",
//           "assets_details.serial_no",
//           "repair_type",
//           "maintenance_type",
//           "issue_reported",
//         ],
//         numbers: [],
//         arrayField: [],
//         boolean: [],
//       },
//     };
//     try {
//       dispatch({ type: HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST });

//       const response = await Axios.post(
//         `${oandmApis?.block?.maintenace?.maintenace_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
//         body
//       );
//       dispatch({
//         type: HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS,
//         payload: {
//           data: response?.data,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED,
//         payload: error?.response?.data?.message,
//       });
//     }
//   };
// };
// export const hoto_block_asset_partfolio_replacement_data_disptach = function ({
//   page = 1,
//   search_value = "",
//   sort = "",
//   sortBy = "",
//   filters={},
// } = {}) {
//   return async (dispatch) => {
//     try {
//       const body = {
//         filters: filters,
//         searchFields: {
//           string: [
//             "replacementId",
//             "block_asset_details.equipment_name",
//             "serialNumber",
//             "block_asset_details?.block_details?.gp_name",
//             "block_asset_details?.block_details?.gp_code",
//             "replacementReason",
//             "initiatedBy",
//           ],
//           numbers: [],
//           arrayField: [],
//           boolean: [],
//         },
//       };
//       dispatch({ type: HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST });

//       const response = await Axios.post(
//         `${oandmApis?.block?.replacement?.replacement_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
//         body
//       );
//       dispatch({
//         type: HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS,
//         payload: {
//           data: response?.data,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED,
//         payload: error?.response?.data?.message,
//       });
//     }
//   };
// };
// export const hoto_block_asset_partfolio_transfer_data_disptach = function ({
//   page = 1,
//   search_value = "",
//   sort = "",
//   sortBy = "",
//   filters={}
// } = {}) {
//   return async (dispatch) => {
//     const body = {
//       filters: filters,
//       searchFields: {
//         string: [],
//         numbers: [],
//         arrayField: [],
//         boolean: [],
//       },
//     };
//     try {
//       dispatch({ type: HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST });

//       const response = await Axios.post(
//         `${oandmApis?.block?.transfer?.transfer_request_assign_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
//         body
//       );
//       dispatch({
//         type: HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS,
//         payload: {
//           data: response?.data,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: HOTO_WAREHOUSE_TRANSFER_DATA_FAILED,
//         payload: error?.response?.data?.message,
//       });
//     }
//   };
// };



export const hoto_warehouse_wise_asset_data_disptach = function ({
  page = 1,
  search_value = "",
  sort = "",
  sortBy = "",
} = {}) {
  return async (dispatch) => {
    const body = {
      filters: {
        location_type:"warehouse"
      },
      searchFields: {
        string: ["location_name","location_code","block.name", "block_id", "district.name", "district_id"],
        numbers: [],
        arrayField: [],
        boolean: [],
      },
    };
    try {
      dispatch({ type: HOTO_WAREHOUSE_WISE_ASSET_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.warehouse?.warehouse_wise_assets_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_WAREHOUSE_WISE_ASSET_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_WISE_ASSET_DATA_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
};

export const hoto_warehouse_warehouse_data_disptach = function ({
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
            string: ["equipment_name", "serial_no","condition"],
            numbers: [],
            arrayField: [],
            boolean: [],
          },
        };
      dispatch({ type: HOTO_WAREHOUSE_WAREHOUSE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.block?.warehouse_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
      );
      dispatch({
        type: HOTO_WAREHOUSE_WAREHOUSE_DATA_SUCCESS,
        payload: {
          data: response?.data,
        },
      });
    } catch (error) {
      dispatch({
        type: HOTO_WAREHOUSE_WAREHOUSE_DATA_FAILED,
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
      dispatch({ type: HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.warehouse?.maintenance_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
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
    try {
        const body = {
          filters: {},
          searchFields: {
            string: [
              "replacementId",
              "block_asset_details.equipment_name",
              "serialNumber",
              "block_asset_details?.block_details?.location_name",
              "block_asset_details?.block_details?.location_code",
              "replacementReason",
              "initiatedBy",
            ],
            numbers: [],
            arrayField: [],
            boolean: [],
          },
        };
      dispatch({ type: HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.warehouse?.replacement_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
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
          "assets_details.equipment_name",
          "createdAt",
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
    try {
      dispatch({ type: HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST });

      const response = await Axios.post(
        `${hoto_apis?.warehouse?.transfer_list}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,body
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
