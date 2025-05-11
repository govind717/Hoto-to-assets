export const hoto_apis = {
  block: {
    // asset_portfolio_list: "/survey/list-block-equipment-details",
    // block_wise_assets_list: "/survey/list-block-details",
    asset_portfolio_list: "/hoto-to-assets/equipment/list-equipments",
    asset_portfolio: {
      maintenance_list: "/operation/list-maintenance-details",
      transfer_list: "operation/list-transfer-details",
      replacement_list: "/operation/list-replacement-details",
    },
    block_wise_assets_list: "/hoto-to-assets/equipment/list-equipment-details",
    warehouse_list: "/warehouse/listing-warehouse-details",
    maintenance_list: "/block-maintenance-request/listing-maintenance-request",
    replacement_list: "/hoto-to-assets/block/replacement/list",
    transfer_list: "/block-transfer-request/listing-transfer-request",
  },
  gp: {
    // asset_portfolio_list: "/survey/list-gp-equipment-details",
    // gp_wise_assets_list: "/survey/list-gp-details",
    asset_portfolio_list: "/hoto-to-assets/equipment/list-equipments",
    gp_wise_assets_list: "/hoto-to-assets/equipment/list-equipment-details",
    warehouse_list: "/warehouse/listing-warehouse-details",
    maintenance_list: "/gp-maintenance-request/listing-maintenance-request",
    replacement_list: "/hoto-to-assets/gp/replacement/list",
    transfer_list: "/gp-transfer-request/listing-transfer-request",
  },
  warehouse: {
    asset_portfolio_list: "/hoto-to-assets/equipment/list-equipments",
    warehouse_wise_assets_list:
      "/hoto-to-assets/equipment/list-equipment-details",
    warehouse_list: "/warehouse/listing-warehouse-details",
    maintenance_list:
      "/warehouse-maintenance-request/listing-maintenance-request",
    replacement_list: "/hoto-to-assets/warehouse/replacement/list",
    transfer_list: "/warehouse-transfer-request/listing-transfer-request",
  },
  rkm: {
    span_wise_list: "",
    asset_wise_list: "",
  },
};

export const hoto_warehouse_apis = {
  assets: {
    listing: "/warehouse/listing-warehouse-details",
  },
  inward_assets: {
    listing: "/warehouse/listing-warehouse-inward-details",
  },
  maintenance: {
    listing: "/warehouse/listing-warehouse-maintenance-details",
  },
  replacement: {
    listing: "/warehouse/listing-warehouse-replacement-details",
  },
  transfer: {
    listing: "/warehouse/listing-warehouse-inward-details",
  },
};