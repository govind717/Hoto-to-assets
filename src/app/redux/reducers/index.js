import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { hotoServeyDataReducer } from './Hoto_servey_data';
import { blockDataReducer, categoryDataReducer, departmentDataReducer, districtDataReducer, gpDataReducer, gstDataReducer, hsnCodeDataReducer, materialDataReducer, organisationDataReducer, packageDataReducer, subCategoryDataReducer, teamDataReducer, uomDataReducer } from './Master';

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        hotoServeyDataReducer: hotoServeyDataReducer,
        packageDataReducer:packageDataReducer,
        districtDataReducer:districtDataReducer,
        blockDataReducer:blockDataReducer,
        gpDataReducer:gpDataReducer,
        organisationDataReducer:organisationDataReducer,
        departmentDataReducer:departmentDataReducer,
        teamDataReducer:teamDataReducer,
        categoryDataReducer:categoryDataReducer,
        subCategoryDataReducer:subCategoryDataReducer,
        materialDataReducer:materialDataReducer,
        uomDataReducer:uomDataReducer,
        hsnCodeDataReducer:hsnCodeDataReducer,
        gstDataReducer:gstDataReducer
    });
};

export default exportReducers;

