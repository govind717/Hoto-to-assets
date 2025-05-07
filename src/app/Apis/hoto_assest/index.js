export const hoto_apis = {
  block: {
    asset_portfolio_list: "/survey/list-block-equipment-details",
    block_wise_assets_list: "/survey/list-block-details",
    warehouse_list: "/warehouse/listing-warehouse-details",
    maintenance_list: "/block-maintenance-request/listing-maintenance-request",
    replacement_list: "/hoto-to-assets/block/replacement/list",
    transfer_list: "/block-transfer-request/listing-transfer-request",
  },
  gp: {
    asset_portfolio_list: "/survey/list-gp-equipment-details",
    gp_wise_assets_list: "/survey/list-gp-details",
    warehouse_list: "/warehouse/listing-warehouse-details",
    maintenance_list: "/gp-maintenance-request/listing-maintenance-request",
    replacement_list: "/hoto-to-assets/gp/replacement/list",
    transfer_list: "/gp-transfer-request/listing-transfer-request",
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