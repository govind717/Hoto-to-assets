import { OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_SUCCESS, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_SUCCESS, OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_SUCCESS, OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_FAILED, OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST, OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_FAILED, OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_REQUEST, OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_SUCCESS } from "app/redux/actions/O&M/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}

//Maintainance
export const oandmWarehouseMaintenaceRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_MAINTENANCE_REQUEST_DATA_FAILED:
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

export const oandmWarehouseMaintenaceRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED:
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

//Replacement
export const oandmWarehouseReplacementRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_REPLACEMENT_REQUEST_DATA_FAILED:
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

export const oandmWarehouseReplacementRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED:
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

//Transfer
export const oandmWarehouseTransferRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_TRANSFER_REQUEST_DATA_FAILED:
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
export const oandmWarehouseTransferRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_TRANSFER_REQUEST_ASSIGN_DATA_FAILED:
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

//Scrap
export const oandmWarehouseScrapRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_SCRAP_REQUEST_DATA_FAILED:
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

export const oandmWarehouseScrapRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_WAREHOUSE_SCRAP_REQUEST_ASSIGN_DATA_FAILED:
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