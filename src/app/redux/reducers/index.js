import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import {
  hotoServeyBlockDataReducer,
  hotoServeyDataReducer,
} from "./Hoto_servey_data";
import {
  blockDataReducer,
  categoryDataReducer,
  departmentDataReducer,
  districtDataReducer,
  gpDataReducer,
  gstDataReducer,
  hsnCodeDataReducer,
  materialDataReducer,
  organisationDataReducer,
  packageDataReducer,
  subCategoryDataReducer,
  supplierDataReducer,
  teamDataReducer,
  uomDataReducer,
  warehouseDataReducer,
} from "./Master";
import { singleUserDataReducer, userDataReducer } from "./userManagement";
import {
  hotoBlockAssetPortfolioDataReducer,
  hotoBlockAssetPortfolioMaintenanceDataReducer,
  hotoBlockAssetPortfolioReplacementDataReducer,
  hotoBlockAssetPortfolioTransferDataReducer,
  hotoBlockMaintenanceDataReducer,
  hotoBlockReplacementDataReducer,
  hotoBlockTransferDataReducer,
  hotoBlockWarehouseDataReducer,
  hotoBlockWiseAssetDataReducer,
} from "./Hoto_servey_data/Block";
import {
  hotoGpAssetPortfolioDataReducer,
  hotoGpAssetPortfolioMaintenanceDataReducer,
  hotoGpAssetPortfolioReplacementDataReducer,
  hotoGpAssetPortfolioTransferDataReducer,
  hotoGpMaintenanceDataReducer,
  hotoGpReplacementDataReducer,
  hotoGpTransferDataReducer,
  hotoGpWarehouseDataReducer,
  hotoGpWiseAssetDataReducer,
} from "./Hoto_servey_data/GP";
import {
  oandmBlockMaintenaceRequestAssignDataReducer,
  oandmBlockMaintenaceRequestDataReducer,
  oandmBlockReplacementRequestAssignDataReducer,
  oandmBlockReplacementRequestDataReducer,
  oandmBlockScrapRequestAssignDataReducer,
  oandmBlockScrapRequestDataReducer,
  oandmBlockTransferRequestAssignDataReducer,
  oandmBlockTransferRequestDataReducer,
} from "./O&M/Block";
import {
  oandmGpMaintenaceRequestAssignDataReducer,
  oandmGpMaintenaceRequestDataReducer,
  oandmGpReplacementRequestAssignDataReducer,
  oandmGpReplacementRequestDataReducer,
  oandmGpScrapRequestAssignDataReducer,
  oandmGpScrapRequestDataReducer,
  oandmGpTransferRequestAssignDataReducer,
  oandmGpTransferRequestDataReducer,
} from "./O&M/GP";
import {
  oandmWarehouseDailyStockDataReducer,
  oandmWarehouseStockDataReducer,
  oandmWarehouseVirtualStockDataReducer,
} from "./O&MWarehouse/Warehouse";
import {
  oandmMaterialRequestOpenRequestDataReducer,
  oandmMaterialRequestRequestLogDataReducer,
} from "./O&MWarehouse/MaterialRequest";
import {
  oandmGpMaterialInwardGRNDataReducer,
  oandmGpMaterialInwardInwardItemDataReducer,
} from "./O&MWarehouse/MaterialInward";
import {
  outhotoWarehouseAssetsDataReducer,
  outhotoWarehouseInwardAssetsDataReducer,
  outhotoWarehouseMaintenanceDataReducer,
  outhotoWarehouseReplacementDataReducer,
  outhotoWarehousetransferDataReducer,
} from "./HOTOWarehouse";
import {
  hotoWarehouseAssetPortfolioDataReducer,
  hotoWarehouseAssetPortfolioMaintenanceDataReducer,
  hotoWarehouseAssetPortfolioReplacementDataReducer,
  hotoWarehouseAssetPortfolioTransferDataReducer,
  hotoWarehouseMaintenanceDataReducer,
  hotoWarehouseReplacementDataReducer,
  hotoWarehouseTransferDataReducer,
  hotoWarehouseWiseAssetDataReducer,
} from "./Hoto_servey_data/Warehouse";
import { oandmWarehouseMaintenaceRequestAssignDataReducer, oandmWarehouseMaintenaceRequestDataReducer, oandmWarehouseReplacementRequestAssignDataReducer, oandmWarehouseReplacementRequestDataReducer, oandmWarehouseScrapRequestAssignDataReducer, oandmWarehouseScrapRequestDataReducer, oandmWarehouseTransferRequestAssignDataReducer, oandmWarehouseTransferRequestDataReducer } from "./O&M/Warehouse";

const exportReducers = (history) => {
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
    supplierDataReducer: supplierDataReducer,
    userDataReducer: userDataReducer,
    singleUserDataReducer,
    hotoBlockAssetPortfolioDataReducer: hotoBlockAssetPortfolioDataReducer,
    hotoBlockAssetPortfolioMaintenanceDataReducer,
    hotoBlockAssetPortfolioReplacementDataReducer,
    hotoBlockAssetPortfolioTransferDataReducer,
    hotoGpAssetPortfolioMaintenanceDataReducer,
    hotoGpAssetPortfolioReplacementDataReducer,
    hotoGpAssetPortfolioTransferDataReducer,

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

    hotoWarehouseAssetPortfolioDataReducer:
      hotoWarehouseAssetPortfolioDataReducer,
      hotoWarehouseAssetPortfolioMaintenanceDataReducer,
      hotoWarehouseAssetPortfolioReplacementDataReducer,
      hotoWarehouseAssetPortfolioTransferDataReducer,
    hotoWarehouseWiseAssetDataReducer,
    hotoWarehouseMaintenanceDataReducer,
    hotoWarehouseReplacementDataReducer,
    hotoWarehouseTransferDataReducer,

    oandmBlockMaintenaceRequestDataReducer:
      oandmBlockMaintenaceRequestDataReducer,
    oandmBlockMaintenaceRequestAssignDataReducer:
      oandmBlockMaintenaceRequestAssignDataReducer,
    oandmBlockReplacementRequestDataReducer:
      oandmBlockReplacementRequestDataReducer,
    oandmBlockReplacementRequestAssignDataReducer:
      oandmBlockReplacementRequestAssignDataReducer,
    oandmBlockTransferRequestDataReducer: oandmBlockTransferRequestDataReducer,
    oandmBlockTransferRequestAssignDataReducer:
      oandmBlockTransferRequestAssignDataReducer,
    oandmBlockScrapRequestDataReducer: oandmBlockScrapRequestDataReducer,
    oandmBlockScrapRequestAssignDataReducer:
      oandmBlockScrapRequestAssignDataReducer,
    oandmGpMaintenaceRequestDataReducer: oandmGpMaintenaceRequestDataReducer,
    oandmGpMaintenaceRequestAssignDataReducer:
      oandmGpMaintenaceRequestAssignDataReducer,
    oandmGpReplacementRequestDataReducer: oandmGpReplacementRequestDataReducer,
    oandmGpReplacementRequestAssignDataReducer:
      oandmGpReplacementRequestAssignDataReducer,
    oandmGpTransferRequestDataReducer: oandmGpTransferRequestDataReducer,
    oandmGpTransferRequestAssignDataReducer:
      oandmGpTransferRequestAssignDataReducer,
    oandmGpScrapRequestDataReducer: oandmGpScrapRequestDataReducer,
    oandmGpScrapRequestAssignDataReducer: oandmGpScrapRequestAssignDataReducer,
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
    outhotoWarehouseAssetsDataReducer,
    outhotoWarehouseInwardAssetsDataReducer,
    outhotoWarehouseMaintenanceDataReducer,
    outhotoWarehouseReplacementDataReducer,
    outhotoWarehousetransferDataReducer,
    oandmWarehouseMaintenaceRequestDataReducer,
    oandmWarehouseMaintenaceRequestAssignDataReducer,
    oandmWarehouseReplacementRequestDataReducer,
    oandmWarehouseReplacementRequestAssignDataReducer,
    oandmWarehouseTransferRequestDataReducer,
    oandmWarehouseTransferRequestAssignDataReducer,
    oandmWarehouseScrapRequestDataReducer,
    oandmWarehouseScrapRequestAssignDataReducer,
  });
};

export default exportReducers;
