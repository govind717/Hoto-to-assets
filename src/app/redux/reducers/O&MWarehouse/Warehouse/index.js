import { OANDM_WAREHOUSE_DAILYSTOCK_DATA_FAILED, OANDM_WAREHOUSE_DAILYSTOCK_DATA_REQUEST, OANDM_WAREHOUSE_DAILYSTOCK_DATA_SUCCESS, OANDM_WAREHOUSE_STOCK_DATA_FAILED, OANDM_WAREHOUSE_STOCK_DATA_REQUEST, OANDM_WAREHOUSE_STOCK_DATA_SUCCESS, OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_FAILED, OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_REQUEST, OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_SUCCESS } from "app/redux/actions/O&MWarehouse/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}

//Daily stock
export const oandmWarehouseDailyStockDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_DAILYSTOCK_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_DAILYSTOCK_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_DAILYSTOCK_DATA_FAILED:
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

// stock
export const oandmWarehouseStockDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_STOCK_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_STOCK_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_STOCK_DATA_FAILED:
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
// Virtual stock
export const oandmWarehouseVirtualStockDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_VIRTUALSTOCK_DATA_FAILED:
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