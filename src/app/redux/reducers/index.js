import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { hotoServeyBlockDataReducer, hotoServeyDataReducer } from './Hoto_servey_data';
import { blockDataReducer, categoryDataReducer, departmentDataReducer, districtDataReducer, gpDataReducer, gstDataReducer, hsnCodeDataReducer, materialDataReducer, organisationDataReducer, packageDataReducer, subCategoryDataReducer, teamDataReducer, uomDataReducer, warehouseDataReducer } from './Master';
import { userDataReducer } from './userManagement';
import { hotoBlockAssetPortfolioDataReducer, hotoBlockMaintenanceDataReducer, hotoBlockReplacementDataReducer, hotoBlockTransferDataReducer, hotoBlockWarehouseDataReducer, hotoBlockWiseAssetDataReducer } from './Hoto_servey_data/Block';
import { hotoGpAssetPortfolioDataReducer, hotoGpMaintenanceDataReducer, hotoGpReplacementDataReducer, hotoGpTransferDataReducer, hotoGpWarehouseDataReducer, hotoGpWiseAssetDataReducer } from './Hoto_servey_data/GP';
import { oandmBlockMaintenaceRequestAssignDataReducer, oandmBlockMaintenaceRequestDataReducer, oandmBlockReplacementRequestAssignDataReducer, oandmBlockReplacementRequestDataReducer, oandmBlockScrapRequestAssignDataReducer, oandmBlockScrapRequestDataReducer, oandmBlockTransferRequestAssignDataReducer, oandmBlockTransferRequestDataReducer } from './O&M/Block';
import { oandmGpMaintenaceRequestAssignDataReducer, oandmGpMaintenaceRequestDataReducer, oandmGpReplacementRequestAssignDataReducer, oandmGpReplacementRequestDataReducer, oandmGpScrapRequestAssignDataReducer, oandmGpScrapRequestDataReducer, oandmGpTransferRequestAssignDataReducer, oandmGpTransferRequestDataReducer } from './O&M/GP';
import { oandmWarehouseDailyStockDataReducer, oandmWarehouseStockDataReducer, oandmWarehouseVirtualStockDataReducer } from './O&MWarehouse/Warehouse';
import { oandmMaterialRequestOpenRequestDataReducer, oandmMaterialRequestRequestLogDataReducer } from './O&MWarehouse/MaterialRequest';
import { oandmGpMaterialInwardGRNDataReducer, oandmGpMaterialInwardInwardItemDataReducer } from './O&MWarehouse/MaterialInward';

const exportReducers = history => {
    return combineReducers({
      router: connectRouter(history),
      hotoServeyDataReducer: hotoServeyDataReducer,
      hotoServeyBlockDataReducer: hotoServeyBlockDataReducer,
      packageDataReducer: packageDataReducer,
      districtDataReducer: districtDataReducer,
      blockDataReducer: blockDataReducer,
      gpDataReducer: gpDataReducer,
      organisationDataReducer: organisationDataReducer,
      departmentDataReducer: departmentDataReducer,
      teamDataReducer: teamDataReducer,
      categoryDataReducer: categoryDataReducer,
      subCategoryDataReducer: subCategoryDataReducer,
      materialDataReducer: materialDataReducer,
      uomDataReducer: uomDataReducer,
      hsnCodeDataReducer: hsnCodeDataReducer,
      gstDataReducer: gstDataReducer,
      warehouseDataReducer: warehouseDataReducer,
      userDataReducer: userDataReducer,
      hotoBlockAssetPortfolioDataReducer: hotoBlockAssetPortfolioDataReducer,
      hotoBlockWiseAssetDataReducer: hotoBlockWiseAssetDataReducer,
      hotoBlockWarehouseDataReducer: hotoBlockWarehouseDataReducer,
      hotoBlockMaintenanceDataReducer: hotoBlockMaintenanceDataReducer,
      hotoBlockReplacementDataReducer: hotoBlockReplacementDataReducer,
      hotoBlockTransferDataReducer: hotoBlockTransferDataReducer,
      hotoGpAssetPortfolioDataReducer: hotoGpAssetPortfolioDataReducer,
      hotoGpWiseAssetDataReducer: hotoGpWiseAssetDataReducer,
      hotoGpWarehouseDataReducer: hotoGpWarehouseDataReducer,
      hotoGpMaintenanceDataReducer: hotoGpMaintenanceDataReducer,
      hotoGpReplacementDataReducer: hotoGpReplacementDataReducer,
      hotoGpTransferDataReducer: hotoGpTransferDataReducer,
      oandmBlockMaintenaceRequestDataReducer:
        oandmBlockMaintenaceRequestDataReducer,
      oandmBlockMaintenaceRequestAssignDataReducer:
        oandmBlockMaintenaceRequestAssignDataReducer,
      oandmBlockReplacementRequestDataReducer:
        oandmBlockReplacementRequestDataReducer,
      oandmBlockReplacementRequestAssignDataReducer:
        oandmBlockReplacementRequestAssignDataReducer,
      oandmBlockTransferRequestDataReducer:
        oandmBlockTransferRequestDataReducer,
      oandmBlockTransferRequestAssignDataReducer:
        oandmBlockTransferRequestAssignDataReducer,
      oandmBlockScrapRequestDataReducer: oandmBlockScrapRequestDataReducer,
      oandmBlockScrapRequestAssignDataReducer:
        oandmBlockScrapRequestAssignDataReducer,
      oandmGpMaintenaceRequestDataReducer: oandmGpMaintenaceRequestDataReducer,
      oandmGpMaintenaceRequestAssignDataReducer:
        oandmGpMaintenaceRequestAssignDataReducer,
      oandmGpReplacementRequestDataReducer:
        oandmGpReplacementRequestDataReducer,
      oandmGpReplacementRequestAssignDataReducer:
        oandmGpReplacementRequestAssignDataReducer,
      oandmGpTransferRequestDataReducer: oandmGpTransferRequestDataReducer,
      oandmGpTransferRequestAssignDataReducer:
        oandmGpTransferRequestAssignDataReducer,
      oandmGpScrapRequestDataReducer: oandmGpScrapRequestDataReducer,
      oandmGpScrapRequestAssignDataReducer:
        oandmGpScrapRequestAssignDataReducer,
      oandmWarehouseDailyStockDataReducer: oandmWarehouseDailyStockDataReducer,
      oandmWarehouseStockDataReducer: oandmWarehouseStockDataReducer,
      oandmWarehouseVirtualStockDataReducer:
        oandmWarehouseVirtualStockDataReducer,
      oandmMaterialRequestOpenRequestDataReducer:
        oandmMaterialRequestOpenRequestDataReducer,
      oandmMaterialRequestRequestLogDataReducer:
        oandmMaterialRequestRequestLogDataReducer,
      oandmGpMaterialInwardInwardItemDataReducer:
        oandmGpMaterialInwardInwardItemDataReducer,
      oandmGpMaterialInwardGRNDataReducer: oandmGpMaterialInwardGRNDataReducer,
    });
};

export default exportReducers;

