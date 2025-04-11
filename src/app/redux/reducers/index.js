import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { hotoServeyDataReducer } from './Hoto_servey_data';

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        hotoServeyDataReducer: hotoServeyDataReducer
    });
};

export default exportReducers;

