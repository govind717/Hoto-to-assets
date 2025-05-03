// import axios from "axios";

// import MasterApis from "app/Apis/master";
// import AllApis from "app/Apis/apis";
// import {
//   PACKAGE_DATA,
//   DISTRICT_DATA,
//   BLOCK_DATA,
//   GP_DATA,
//   ORGANISATION_DATA,
//   DEPARTMENT_DATA,
//   TEAM_DATA,
//   CATEGORY_DATA,
//   SUB_CATEGORY_DATA,
//   MATERIAL_DATA,
//   UOM_DATA,
//   HSN_CODE_DATA,
//   GST_DATA,
//   PACKAGE_LIST,
//   DISTRICT_LIST,
//   BLOCK_LIST,
//   GP_LIST,
//   ORGANISATION_LIST,
//   DEPARTMENT_LIST,
//   TEAM_LIST,
//   CATEGORY_LIST,
//   SUB_CATEGORY_LIST,
//   MATERIAL_LIST,
//   UOM_LIST,
//   HSN_CODE_LIST,
//   GST_LIST,
//   WAREHOUSE_DATA,
//   WAREHOUSE_LIST,
//   SUPPLIER_DATA,
//   SUPPLIER_LIST,
// } from "./constants";
// import { Axios } from "index";

// //Dynamic dispacture for all masters
// const createMasterDataDispatcher = (type, apiKey) => {
//   const REQUEST = `${type}_REQUEST`;
//   const SUCCESS = `${type}_SUCCESS`;
//   const FAILED = `${type}_FAILED`;

//   return function ({
//     page = 1,
//     search_value = "",
//     sort = "",
//     sortBy = "",
//   } = {}) {
//     return async (dispatch) => {
//       try {
//         dispatch({ type: REQUEST });

//         const login_response = await axios.post(AllApis?.login);
//         const user_details = login_response?.data;

//         const res = await Axios.post(
//           `${apiKey}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user_details?.access_token}`,
//             },
//           }
//         );

//         dispatch({
//           type: SUCCESS,
//           payload: { data: res?.data },
//         });
//       } catch (error) {
//         dispatch({
//           type: FAILED,
//           payload: error?.response?.data?.message,
//         });
//       }
//     };
//   };
// };

// export const package_data_dispatch = createMasterDataDispatcher(
//   PACKAGE_DATA,
//   PACKAGE_LIST
// );
// export const district_data_dispatch = createMasterDataDispatcher(
//   DISTRICT_DATA,
//   DISTRICT_LIST
// );
// export const block_data_dispatch = createMasterDataDispatcher(
//   BLOCK_DATA,
//   BLOCK_LIST
// );
// export const gp_data_dispatch = createMasterDataDispatcher(GP_DATA, GP_LIST);
// export const organisation_data_dispatch = createMasterDataDispatcher(
//   ORGANISATION_DATA,
//   ORGANISATION_LIST
// );
// export const department_data_dispatch = createMasterDataDispatcher(
//   DEPARTMENT_DATA,
//   DEPARTMENT_LIST
// );
// export const team_data_dispatch = createMasterDataDispatcher(
//   TEAM_DATA,
//   TEAM_LIST
// );
// export const category_data_dispatch = createMasterDataDispatcher(
//   CATEGORY_DATA,
//   CATEGORY_LIST
// );
// export const sub_category_data_dispatch = createMasterDataDispatcher(
//   SUB_CATEGORY_DATA,
//   SUB_CATEGORY_LIST
// );
// export const material_data_dispatch = createMasterDataDispatcher(
//   MATERIAL_DATA,
//   MATERIAL_LIST
// );
// export const uom_data_dispatch = createMasterDataDispatcher(UOM_DATA, UOM_LIST);
// export const hsn_code_data_dispatch = createMasterDataDispatcher(
//   HSN_CODE_DATA,
//   HSN_CODE_LIST
// );
// export const gst_data_dispatch = createMasterDataDispatcher(GST_DATA, GST_LIST);
// export const warehouse_data_dispatch = createMasterDataDispatcher(
//   WAREHOUSE_DATA,
//   WAREHOUSE_LIST
// );
// export const supplier_data_dispatch = createMasterDataDispatcher(
//   SUPPLIER_DATA,
//   SUPPLIER_LIST
// );

import axios from "axios";

import MasterApis from "app/Apis/master";
import AllApis from "app/Apis/apis";
import {
  PACKAGE_DATA,
  DISTRICT_DATA,
  BLOCK_DATA,
  GP_DATA,
  ORGANISATION_DATA,
  DEPARTMENT_DATA,
  TEAM_DATA,
  CATEGORY_DATA,
  SUB_CATEGORY_DATA,
  MATERIAL_DATA,
  UOM_DATA,
  HSN_CODE_DATA,
  GST_DATA,
  PACKAGE_LIST,
  DISTRICT_LIST,
  BLOCK_LIST,
  GP_LIST,
  ORGANISATION_LIST,
  DEPARTMENT_LIST,
  TEAM_LIST,
  CATEGORY_LIST,
  SUB_CATEGORY_LIST,
  MATERIAL_LIST,
  UOM_LIST,
  HSN_CODE_LIST,
  GST_LIST,
  WAREHOUSE_DATA,
  WAREHOUSE_LIST,
  SUPPLIER_DATA,
  SUPPLIER_LIST,
} from "./constants";
import { Axios } from "index";

//Dynamic dispacture for all masters
const createMasterDataDispatcher = (type, apiKey, searchFields) => {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILED = `${type}_FAILED`;

  return function ({
    page = 1,
    search_value = "",
    sort = "",
    sortBy = "",
  } = {}) {
    return async (dispatch) => {
      try {
        const body = {
          filters: {},
          searchFields: searchFields,
        };
        dispatch({ type: REQUEST });

        const res = await Axios.post(
          `${apiKey}?page=${page}&search=${search_value}&sort=${sort}&sort_field=${sortBy}`,
          body
        );

        dispatch({
          type: SUCCESS,
          payload: { data: res?.data },
        });
      } catch (error) {
        dispatch({
          type: FAILED,
          payload: error?.response?.data?.message,
        });
      }
    };
  };
};

export const package_data_dispatch = createMasterDataDispatcher(
  PACKAGE_DATA,
  PACKAGE_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const district_data_dispatch = createMasterDataDispatcher(
  DISTRICT_DATA,
  DISTRICT_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const block_data_dispatch = createMasterDataDispatcher(
  BLOCK_DATA,
  BLOCK_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const gp_data_dispatch = createMasterDataDispatcher(GP_DATA, GP_LIST, {
  string: [],
  numbers: [],
  arrayField: [],
  boolean: [],
});
export const organisation_data_dispatch = createMasterDataDispatcher(
  ORGANISATION_DATA,
  ORGANISATION_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const department_data_dispatch = createMasterDataDispatcher(
  DEPARTMENT_DATA,
  DEPARTMENT_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const team_data_dispatch = createMasterDataDispatcher(
  TEAM_DATA,
  TEAM_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const category_data_dispatch = createMasterDataDispatcher(
  CATEGORY_DATA,
  CATEGORY_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const sub_category_data_dispatch = createMasterDataDispatcher(
  SUB_CATEGORY_DATA,
  SUB_CATEGORY_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const material_data_dispatch = createMasterDataDispatcher(
  MATERIAL_DATA,
  MATERIAL_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const uom_data_dispatch = createMasterDataDispatcher(
  UOM_DATA,
  UOM_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const hsn_code_data_dispatch = createMasterDataDispatcher(
  HSN_CODE_DATA,
  HSN_CODE_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const gst_data_dispatch = createMasterDataDispatcher(GST_DATA, GST_LIST);
export const warehouse_data_dispatch = createMasterDataDispatcher(
  WAREHOUSE_DATA,
  WAREHOUSE_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
export const supplier_data_dispatch = createMasterDataDispatcher(
  SUPPLIER_DATA,
  SUPPLIER_LIST,
  {
    string: [],
    numbers: [],
    arrayField: [],
    boolean: [],
  }
);
