import { HOTO_SERVEY_BLOCK_DATA_FAILED, HOTO_SERVEY_BLOCK_DATA_REQUEST, HOTO_SERVEY_BLOCK_DATA_SUCCESS, HOTO_SERVEY_DATA_FAILED, HOTO_SERVEY_DATA_REQUEST, HOTO_SERVEY_DATA_SUCCESS } from "app/redux/actions/Hoto_to_servey/constants"

const INTI_STATE = {
    loading: false,
    hoto_servey_data: {},
    error: false,
    errorMessage: null
}
const BLOCK_INTI_STATE = {
    loading: false,
    hoto_servey_data: {},
    error: false,
    errorMessage: null
}

export const hotoServeyDataReducer = (state = INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_SERVEY_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_SERVEY_DATA_SUCCESS:
            return {
                ...state,
                hoto_servey_data: action.payload.data,
                loading: false
            }
        case HOTO_SERVEY_DATA_FAILED:
            return {
                hoto_servey_data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
};

export const hotoServeyBlockDataReducer = (state = BLOCK_INTI_STATE, action) => {
    switch (action.type) {
        case HOTO_SERVEY_BLOCK_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case HOTO_SERVEY_BLOCK_DATA_SUCCESS:
            return {
                ...state,
                hoto_servey_data: action.payload.data,
                loading: false
            }
        case HOTO_SERVEY_BLOCK_DATA_FAILED:
            return {
                hoto_servey_data: {},
                error: true,
                errorMessage: action.payload,
                loading: false
            }
        default:
            return state
    }
}