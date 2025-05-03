import { OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED, OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST, OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_GP_MAINTENANCE_REQUEST_DATA_FAILED, OANDM_GP_MAINTENANCE_REQUEST_DATA_REQUEST, OANDM_GP_MAINTENANCE_REQUEST_DATA_SUCCESS, OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED, OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST, OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_GP_REPLACEMENT_REQUEST_DATA_FAILED, OANDM_GP_REPLACEMENT_REQUEST_DATA_REQUEST, OANDM_GP_REPLACEMENT_REQUEST_DATA_SUCCESS, OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_FAILED, OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_REQUEST, OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_GP_SCRAP_REQUEST_DATA_FAILED, OANDM_GP_SCRAP_REQUEST_DATA_REQUEST, OANDM_GP_SCRAP_REQUEST_DATA_SUCCESS, OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_FAILED, OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST, OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS, OANDM_GP_TRANSFER_REQUEST_DATA_FAILED, OANDM_GP_TRANSFER_REQUEST_DATA_REQUEST, OANDM_GP_TRANSFER_REQUEST_DATA_SUCCESS } from "app/redux/actions/O&M/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}
//Maintainance
export const oandmGpMaintenaceRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_GP_MAINTENANCE_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_MAINTENANCE_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_MAINTENANCE_REQUEST_DATA_FAILED:
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

export const oandmGpMaintenaceRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_MAINTENANCE_REQUEST_ASSIGN_DATA_FAILED:
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
export const oandmGpReplacementRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_GP_REPLACEMENT_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_REPLACEMENT_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_REPLACEMENT_REQUEST_DATA_FAILED:
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

export const oandmGpReplacementRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_REPLACEMENT_REQUEST_ASSIGN_DATA_FAILED:
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
export const oandmGpTransferRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_GP_TRANSFER_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_TRANSFER_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_TRANSFER_REQUEST_DATA_FAILED:
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

export const oandmGpTransferRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_TRANSFER_REQUEST_ASSIGN_DATA_FAILED:
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
export const oandmGpScrapRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_GP_SCRAP_REQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_SCRAP_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_SCRAP_REQUEST_DATA_FAILED:
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

export const oandmGpScrapRequestAssignDataReducer = (
  state = INTI_STATE,
  action
) => {
  switch (action.type) {
    case OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_GP_SCRAP_REQUEST_ASSIGN_DATA_FAILED:
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