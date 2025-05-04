import { OANDM_MARERIALINWARD_GRN_DATA_FAILED, OANDM_MARERIALINWARD_GRN_DATA_REQUEST, OANDM_MARERIALINWARD_GRN_DATA_SUCCESS, OANDM_MARERIALINWARD_INWARDITEM_DATA_FAILED, OANDM_MARERIALINWARD_INWARDITEM_DATA_REQUEST, OANDM_MARERIALINWARD_INWARDITEM_DATA_SUCCESS } from "app/redux/actions/O&MWarehouse/constants";

const INTI_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: null
}
//Maintainance
export const oandmGpMaterialInwardInwardItemDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_MARERIALINWARD_INWARDITEM_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_MARERIALINWARD_INWARDITEM_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_MARERIALINWARD_INWARDITEM_DATA_FAILED:
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

export const oandmGpMaterialInwardGRNDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case OANDM_MARERIALINWARD_GRN_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OANDM_MARERIALINWARD_GRN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case OANDM_MARERIALINWARD_GRN_DATA_FAILED:
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
