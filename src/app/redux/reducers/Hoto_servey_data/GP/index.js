import { HOTO_GP_ASSET_PORTFOLIO_DATA_FAILED, HOTO_GP_ASSET_PORTFOLIO_DATA_REQUEST, HOTO_GP_ASSET_PORTFOLIO_DATA_SUCCESS, HOTO_GP_MAINTENANCE_DATA_FAILED, HOTO_GP_MAINTENANCE_DATA_REQUEST, HOTO_GP_MAINTENANCE_DATA_SUCCESS, HOTO_GP_REPLACEMENT_DATA_FAILED, HOTO_GP_REPLACEMENT_DATA_REQUEST, HOTO_GP_REPLACEMENT_DATA_SUCCESS, HOTO_GP_TRANSFER_DATA_FAILED, HOTO_GP_TRANSFER_DATA_REQUEST, HOTO_GP_TRANSFER_DATA_SUCCESS, HOTO_GP_WAREHOUSE_DATA_FAILED, HOTO_GP_WAREHOUSE_DATA_REQUEST, HOTO_GP_WAREHOUSE_DATA_SUCCESS, HOTO_GP_WISE_ASSET_DATA_FAILED, HOTO_GP_WISE_ASSET_DATA_REQUEST, HOTO_GP_WISE_ASSET_DATA_SUCCESS } from "app/redux/actions/Hoto_to_servey/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}

export const hotoGpAssetPortfolioDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
      case HOTO_GP_ASSET_PORTFOLIO_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case HOTO_GP_ASSET_PORTFOLIO_DATA_SUCCESS:
        console.log("action : ", action?.payload.data);
        return {
          ...state,
          data: action?.payload?.data,
          loading: false,
        };
      case HOTO_GP_ASSET_PORTFOLIO_DATA_FAILED:
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


export const hotoGpWiseAssetDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_GP_WISE_ASSET_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_GP_WISE_ASSET_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_GP_WISE_ASSET_DATA_FAILED:
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

export const hotoGpWarehouseDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_GP_WAREHOUSE_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_GP_WAREHOUSE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_GP_WAREHOUSE_DATA_FAILED:
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

export const hotoGpMaintenanceDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_GP_MAINTENANCE_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_GP_MAINTENANCE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_GP_MAINTENANCE_DATA_FAILED:
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

export const hotoGpReplacementDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_GP_REPLACEMENT_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_GP_REPLACEMENT_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_GP_REPLACEMENT_DATA_FAILED:
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

export const hotoGpTransferDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_GP_TRANSFER_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_GP_TRANSFER_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_GP_TRANSFER_DATA_FAILED:
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