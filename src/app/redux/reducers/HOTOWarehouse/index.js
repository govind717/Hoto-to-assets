import { OUT_HOTO_WAREHOUSE_ASSETS_DATA_FAILED, OUT_HOTO_WAREHOUSE_ASSETS_DATA_REQUEST, OUT_HOTO_WAREHOUSE_ASSETS_DATA_SUCCESS, OUT_HOTO_WAREHOUSE_INWARD_ASSETS_DATA_FAILED, OUT_HOTO_WAREHOUSE_INWARD_ASSETS_DATA_REQUEST, OUT_HOTO_WAREHOUSE_INWARD_ASSETS_DATA_SUCCESS, OUT_HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED, OUT_HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST, OUT_HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS, OUT_HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED, OUT_HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST, OUT_HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS, OUT_HOTO_WAREHOUSE_TRANSFER_DATA_FAILED, OUT_HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST, OUT_HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS } from "app/redux/actions/HotoWarehouse/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}


export const outhotoWarehouseAssetsDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
      case OUT_HOTO_WAREHOUSE_ASSETS_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case OUT_HOTO_WAREHOUSE_ASSETS_DATA_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          loading: false,
        };
      case OUT_HOTO_WAREHOUSE_ASSETS_DATA_FAILED:
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


export const outhotoWarehouseInwardAssetsDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OUT_HOTO_WAREHOUSE_INWARD_ASSETS_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OUT_HOTO_WAREHOUSE_INWARD_ASSETS_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OUT_HOTO_WAREHOUSE_INWARD_ASSETS_DATA_FAILED:
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

export const outhotoWarehouseMaintenanceDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OUT_HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OUT_HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OUT_HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED:
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

export const outhotoWarehouseReplacementDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OUT_HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OUT_HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OUT_HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED:
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

export const outhotoWarehousetransferDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OUT_HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OUT_HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OUT_HOTO_WAREHOUSE_TRANSFER_DATA_FAILED:
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

