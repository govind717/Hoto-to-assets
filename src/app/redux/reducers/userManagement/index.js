import { SINGLE_USER_DATA_FAILED, SINGLE_USER_DATA_REQUEST, SINGLE_USER_DATA_SUCCESS, USER_DATA_FAILED, USER_DATA_REQUEST, USER_DATA_SUCCESS } from "app/redux/actions/userManagement/constants";

const INTI_STATE = {
    loading: false,
    user_data: {},
    error: false,
    errorMessage: null
}


export const userDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case USER_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case USER_DATA_SUCCESS:
            return {
                ...state,
                user_data: action.payload.data,
                loading: false
            }
        case USER_DATA_FAILED:
            return {
                user_data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};

export const singleUserDataReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case SINGLE_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_USER_DATA_SUCCESS:
      return {
        ...state,
        user_data: action.payload.data,
        loading: false,
      };
    case SINGLE_USER_DATA_FAILED:
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
