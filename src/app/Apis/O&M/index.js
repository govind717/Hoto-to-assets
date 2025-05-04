export const oandmApis = {
  block: {
    maintenace: {
      maintenace_request_list:
        "/block-maintenance-request/listing-maintenance-request",
      maintenace_request_assign_list:
        "/block-maintenance-issued/listing-maintenance-issued",
    },
    replacement: {
      replacement_request_list: "/o&m/block/replacement/list",
      replacement_request_assign_list: "/o&m/block/replacement/assign-list",
    },
    transfer: {
      transfer_request_list: "/block-transfer-request/listing-transfer-request",
      transfer_request_assign_list:
        "/block-transfer-issued/listing-transfer-issued",
    },
    scrap: {
      scrap_request_list: "",
      scrap_request_assign_list: "",
    },
  },
  gp: {
    maintenace: {
      maintenace_request_list:
        "/gp-maintenance-request/listing-maintenance-request",
      maintenace_request_assign_list:
        "/gp-maintenance-issued/listing-maintenance-issued",
    },
    replacement: {
      replacement_request_list: "/o&m/gp/replacement/list",
      replacement_request_assign_list: "/o&m/gp/replacement/assign-list",
    },
    transfer: {
      transfer_request_list: "/gp-transfer-request/listing-transfer-request",
      transfer_request_assign_list:
        "/gp-transfer-issued/listing-transfer-issued",
    },
    scrap: {
      scrap_request_list: "",
      scrap_request_assign_list: "",
    },
  },
};