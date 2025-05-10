import { HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_FAILED, HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_REQUEST, HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_SUCCESS, HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED, HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST, HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS, HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED, HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST, HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS, HOTO_WAREHOUSE_TRANSFER_DATA_FAILED, HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST, HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS, HOTO_WAREHOUSE_WAREHOUSE_DATA_FAILED, HOTO_WAREHOUSE_WAREHOUSE_DATA_REQUEST, HOTO_WAREHOUSE_WAREHOUSE_DATA_SUCCESS, HOTO_WAREHOUSE_WISE_ASSET_DATA_FAILED, HOTO_WAREHOUSE_WISE_ASSET_DATA_REQUEST, HOTO_WAREHOUSE_WISE_ASSET_DATA_SUCCESS } from "app/redux/actions/Hoto_to_servey/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}

export const hotoWarehouseAssetPortfolioDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_WAREHOUSE_ASSET_PORTFOLIO_DATA_FAILED:
            return {
                data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};

//inner portfolio tables
export const hotoWarehouseAssetPortfolioMaintenanceDataReducer = (
  state = INTI_STATE,
  action
) => {
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

export const hotoWarehouseAssetPortfolioReplacementDataReducer = (
  state = INTI_STATE,
  action
) => {
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

export const hotoWarehouseAssetPortfolioTransferDataReducer = (
  state = INTI_STATE,
  action
) => {
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

export const hotoWarehouseWiseAssetDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_WAREHOUSE_WISE_ASSET_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_WAREHOUSE_WISE_ASSET_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_WAREHOUSE_WISE_ASSET_DATA_FAILED:
            return {
                data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};


export const hotoWarehouseWarehouseDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_WAREHOUSE_WAREHOUSE_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_WAREHOUSE_WAREHOUSE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_WAREHOUSE_WAREHOUSE_DATA_FAILED:
            return {
                data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};

export const hotoWarehouseMaintenanceDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_WAREHOUSE_MAINTENANCE_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_WAREHOUSE_MAINTENANCE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_WAREHOUSE_MAINTENANCE_DATA_FAILED:
            return {
                data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};

export const hotoWarehouseReplacementDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_WAREHOUSE_REPLACEMENT_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_WAREHOUSE_REPLACEMENT_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_WAREHOUSE_REPLACEMENT_DATA_FAILED:
            return {
                data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};

export const hotoWarehouseTransferDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_WAREHOUSE_TRANSFER_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_WAREHOUSE_TRANSFER_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_WAREHOUSE_TRANSFER_DATA_FAILED:
            return {
                data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};