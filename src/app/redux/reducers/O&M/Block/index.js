import { OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED, OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST, OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_FAILED, OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_REQUEST, OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_SUCCESS, OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED, OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST, OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_FAILED, OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_REQUEST, OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_SUCCESS, OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_FAILED, OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_REQUEST, OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_BLOCK_SCRAP_REQUEST_DATA_FAILED, OANDM_BLOCK_SCRAP_REQUEST_DATA_REQUEST, OANDM_BLOCK_SCRAP_REQUEST_DATA_SUCCESS, OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_FAILED, OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST, OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_BLOCK_TRANSFER_REQUEST_DATA_FAILED, OANDM_BLOCK_TRANSFER_REQUEST_DATA_REQUEST, OANDM_BLOCK_TRANSFER_REQUEST_DATA_SUCCESS } from "app/redux/actions/O&M/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}

//Maintainance
export const oandmBlockMaintenaceRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_MAINTENANCE_REQUEST_DATA_FAILED:
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

export const oandmBlockMaintenaceRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED:
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
export const oandmBlockReplacementRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_REPLACEMENT_REQUEST_DATA_FAILED:
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

export const oandmBlockReplacementRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED:
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
export const oandmBlockTransferRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_BLOCK_TRANSFER_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_TRANSFER_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_TRANSFER_REQUEST_DATA_FAILED:
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
export const oandmBlockTransferRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_TRANSFER_REQUEST_ASSIGN_DATA_FAILED:
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
export const oandmBlockScrapRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_BLOCK_SCRAP_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_SCRAP_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_SCRAP_REQUEST_DATA_FAILED:
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

export const oandmBlockScrapRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_BLOCK_SCRAP_REQUEST_ASSIGN_DATA_FAILED:
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