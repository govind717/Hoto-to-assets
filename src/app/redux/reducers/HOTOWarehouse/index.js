import { HOTO_WAREHOUSE_ASSETS_DATA_FAILED, HOTO_WAREHOUSE_ASSETS_DATA_REQUEST, HOTO_WAREHOUSE_ASSETS_DATA_SUCCESS, HOTO_WAREHOUSE_INWARD_ASSETS_DATA_FAILED, HOTO_WAREHOUSE_INWARD_ASSETS_DATA_REQUEST, HOTO_WAREHOUSE_INWARD_ASSETS_DATA_SUCCESS, HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED, HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST, HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS, HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED, HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST, HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS, HOTO_WAREHOUSE_TRANSFER_DATA_FAILED, HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST, HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS } from "app/redux/actions/HotoWarehouse/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}


export const hotoWarehouseAssetsDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
      case HOTO_WAREHOUSE_ASSETS_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case HOTO_WAREHOUSE_ASSETS_DATA_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          loading: false,
        };
      case HOTO_WAREHOUSE_ASSETS_DATA_FAILED:
        return {
          user_data: {},
          error: true,
          errorMessage: action.payload,
          loading: false,
        };
      default:
        return state;
    }
};


export const hotoWarehouseInwardAssetsDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case HOTO_WAREHOUSE_INWARD_ASSETS_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOTO_WAREHOUSE_INWARD_ASSETS_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case HOTO_WAREHOUSE_INWARD_ASSETS_DATA_FAILED:
      return {
        data: {},
        error: true,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const hotoWarehouseMaintenanceDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED:
      return {
        data: {},
        error: true,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const hotoWarehouseReplacementDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED:
      return {
        data: {},
        error: true,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const hotoWarehousetransferDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case HOTO_WAREHOUSE_TRANSFER_DATA_FAILED:
      return {
        data: {},
        error: true,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

