import { HOTO_BLOCK_ASSET_PORTFOLIO_DATA_FAILED, HOTO_BLOCK_ASSET_PORTFOLIO_DATA_REQUEST, HOTO_BLOCK_ASSET_PORTFOLIO_DATA_SUCCESS, HOTO_BLOCK_ASSET_PORTFOLIO_MAINTENANCE_DATA_FAILED, HOTO_BLOCK_ASSET_PORTFOLIO_MAINTENANCE_DATA_REQUEST, HOTO_BLOCK_ASSET_PORTFOLIO_MAINTENANCE_DATA_SUCCESS, HOTO_BLOCK_ASSET_PORTFOLIO_REPLACEMENT_DATA_FAILED, HOTO_BLOCK_ASSET_PORTFOLIO_REPLACEMENT_DATA_REQUEST, HOTO_BLOCK_ASSET_PORTFOLIO_REPLACEMENT_DATA_SUCCESS, HOTO_BLOCK_ASSET_PORTFOLIO_TRANSFER_DATA_FAILED, HOTO_BLOCK_ASSET_PORTFOLIO_TRANSFER_DATA_REQUEST, HOTO_BLOCK_ASSET_PORTFOLIO_TRANSFER_DATA_SUCCESS, HOTO_BLOCK_MAINTENANCE_DATA_FAILED, HOTO_BLOCK_MAINTENANCE_DATA_REQUEST, HOTO_BLOCK_MAINTENANCE_DATA_SUCCESS, HOTO_BLOCK_REPLACEMENT_DATA_FAILED, HOTO_BLOCK_REPLACEMENT_DATA_REQUEST, HOTO_BLOCK_REPLACEMENT_DATA_SUCCESS, HOTO_BLOCK_TRANSFER_DATA_FAILED, HOTO_BLOCK_TRANSFER_DATA_REQUEST, HOTO_BLOCK_TRANSFER_DATA_SUCCESS, HOTO_BLOCK_WAREHOUSE_DATA_FAILED, HOTO_BLOCK_WAREHOUSE_DATA_REQUEST, HOTO_BLOCK_WAREHOUSE_DATA_SUCCESS, HOTO_BLOCK_WISE_ASSET_DATA_FAILED, HOTO_BLOCK_WISE_ASSET_DATA_REQUEST, HOTO_BLOCK_WISE_ASSET_DATA_SUCCESS } from "app/redux/actions/Hoto_to_servey/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}

export const hotoBlockAssetPortfolioDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_BLOCK_ASSET_PORTFOLIO_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_BLOCK_ASSET_PORTFOLIO_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_BLOCK_ASSET_PORTFOLIO_DATA_FAILED:
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
export const hotoBlockAssetPortfolioMaintenanceDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case HOTO_BLOCK_ASSET_PORTFOLIO_MAINTENANCE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOTO_BLOCK_ASSET_PORTFOLIO_MAINTENANCE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case HOTO_BLOCK_ASSET_PORTFOLIO_MAINTENANCE_DATA_FAILED:
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

export const hotoBlockAssetPortfolioReplacementDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case HOTO_BLOCK_ASSET_PORTFOLIO_REPLACEMENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOTO_BLOCK_ASSET_PORTFOLIO_REPLACEMENT_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case HOTO_BLOCK_ASSET_PORTFOLIO_REPLACEMENT_DATA_FAILED:
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

export const hotoBlockAssetPortfolioTransferDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case HOTO_BLOCK_ASSET_PORTFOLIO_TRANSFER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOTO_BLOCK_ASSET_PORTFOLIO_TRANSFER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case HOTO_BLOCK_ASSET_PORTFOLIO_TRANSFER_DATA_FAILED:
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

export const hotoBlockWiseAssetDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_BLOCK_WISE_ASSET_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_BLOCK_WISE_ASSET_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_BLOCK_WISE_ASSET_DATA_FAILED:
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


export const hotoBlockWarehouseDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_BLOCK_WAREHOUSE_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_BLOCK_WAREHOUSE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_BLOCK_WAREHOUSE_DATA_FAILED:
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

export const hotoBlockMaintenanceDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_BLOCK_MAINTENANCE_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_BLOCK_MAINTENANCE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_BLOCK_MAINTENANCE_DATA_FAILED:
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

export const hotoBlockReplacementDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_BLOCK_REPLACEMENT_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_BLOCK_REPLACEMENT_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_BLOCK_REPLACEMENT_DATA_FAILED:
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

export const hotoBlockTransferDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_BLOCK_TRANSFER_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_BLOCK_TRANSFER_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case HOTO_BLOCK_TRANSFER_DATA_FAILED:
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