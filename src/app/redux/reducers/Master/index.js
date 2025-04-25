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
    WAREHOUSE_DATA,
  } from "app/redux/actions/Master/constants";

  
export const createMasterDataReducer = (type) => {
    const initialState = {
      loading: false,
      master_data: {},
      error: false,
      errorMessage: null,
    };
  
    return (state = initialState, action) => {
      switch (action.type) {
        case `${type}_REQUEST`:
          return { ...state, loading: true };
  
        case `${type}_SUCCESS`:
          return {
            ...state,
            data: action.payload.data,
            loading: false,
            error: false,
            errorMessage: null
          };
  
        case `${type}_FAILED`:
          return {
            ...state,
            data: {},
            error: true,
            errorMessage: action.payload,
            loading: false
          };
  
        default:
          return state;
      }
    };
  };
 
  
  export const packageDataReducer = createMasterDataReducer(PACKAGE_DATA);
  export const districtDataReducer = createMasterDataReducer(DISTRICT_DATA);
  export const blockDataReducer = createMasterDataReducer(BLOCK_DATA);
  export const gpDataReducer = createMasterDataReducer(GP_DATA);
  export const organisationDataReducer = createMasterDataReducer(ORGANISATION_DATA);
  export const departmentDataReducer = createMasterDataReducer(DEPARTMENT_DATA);
  export const teamDataReducer = createMasterDataReducer(TEAM_DATA);
  export const categoryDataReducer = createMasterDataReducer(CATEGORY_DATA);
  export const subCategoryDataReducer = createMasterDataReducer(SUB_CATEGORY_DATA);
  export const materialDataReducer = createMasterDataReducer(MATERIAL_DATA);
  export const uomDataReducer = createMasterDataReducer(UOM_DATA);
  export const hsnCodeDataReducer = createMasterDataReducer(HSN_CODE_DATA);
  export const gstDataReducer = createMasterDataReducer(GST_DATA);
  export const warehouseDataReducer = createMasterDataReducer(WAREHOUSE_DATA);
  