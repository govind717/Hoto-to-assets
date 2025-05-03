import { OANDM_MARERIALREQUEST_OPENREQUEST_DATA_FAILED, OANDM_MARERIALREQUEST_OPENREQUEST_DATA_REQUEST, OANDM_MARERIALREQUEST_OPENREQUEST_DATA_SUCCESS, OANDM_MARERIALREQUEST_REQUESTLOG_DATA_FAILED, OANDM_MARERIALREQUEST_REQUESTLOG_DATA_REQUEST, OANDM_MARERIALREQUEST_REQUESTLOG_DATA_SUCCESS } from "app/redux/actions/O&MWarehouse/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}

//Maintainance
export const oandmMaterialRequestOpenRequestDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_MARERIALREQUEST_OPENREQUEST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_MARERIALREQUEST_OPENREQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_MARERIALREQUEST_OPENREQUEST_DATA_FAILED:
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
export const oandmMaterialRequestRequestLogDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_MARERIALREQUEST_REQUESTLOG_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_MARERIALREQUEST_REQUESTLOG_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_MARERIALREQUEST_REQUESTLOG_DATA_FAILED:
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
