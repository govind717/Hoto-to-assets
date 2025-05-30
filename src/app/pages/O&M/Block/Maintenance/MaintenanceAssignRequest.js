import {
  Box,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer, 
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import InfoIcon from "@mui/icons-material/Info";

import FullScreenLoader from "app/pages/Components/Loader";
import { oandm_block_maintenace_request_assign_data_disptach } from "app/redux/actions/O&M/Block";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AssignViewModal from "./Modal/AssignViewModal";
import moment from "moment";
import Div from "@jumbo/shared/Div";
import { Axios } from "index";
import Swal from "sweetalert2";
import { Blue, Green, Orange, Red, Yellow } from "app/pages/Constants/colors";
import FilterModel from "app/Components/FilterModel";
const tableBodyCell = { textAlign: "left", px: 1 };
const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "150px",
  verticalAlign: "middle",
};

const tableCellSort = {
  color: "white",
  "&:hover": { color: "white" },
  "&.MuiTableSortLabel-root.Mui-active": {
    color: "white",
  },
};
const MaintenanceAssignRequest = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);
  const [filters, setFilters] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);
  const { oandmBlockMaintenaceRequestAssignDataReducer } = useSelector(
    (state) => state
  );
  const { packageNoDataReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      oandm_block_maintenace_request_assign_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        package_name: packageNoDataReducer?.data,
      })
    );
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    if (searchTerm !== "") {
      debouncedHandleSearch(searchTerm);
    }
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      oandm_block_maintenace_request_assign_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        package_name: packageNoDataReducer?.data,
      })
    );
  }, [sort, page, sortBy, packageNoDataReducer?.data, applyFilter, dispatch]);
  const closeModal = () => {
    setOpen(false);
  };
  const showDetails = (data) => {
    setRow(data);
    setOpen(true);
  };
  const statusOptions = [
    "installed",
    "under_repair",
    "repaired",
    "assigned",
    "not_assigned",
  ];

  const handleStatusChange = async (newStatus, rowData) => {
    const body = {
      repair_status: newStatus,
    };
    Axios.patch(
      `/block-maintenance-issued/update-maintenance-repair-status/${rowData?._id}`,
      body
    )
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          dispatch(
            oandm_block_maintenace_request_assign_data_disptach({
              sortBy: sortBy,
              search_value: searchTerm.trim(),
              sort: sort,
              page: page,
              package_name: packageNoDataReducer?.data,
            })
          );
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err?.response?.data?.message || err.message,
        });
        console.log("Error : ", err);
      });
  };

  return (
    <>
      {oandmBlockMaintenaceRequestAssignDataReducer?.loading && (
        <FullScreenLoader />
      )}
      <Div sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          id="search"
          type="search"
          label="Search"
          value={searchTerm}
          size="small"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === "") {
              dispatch(
                oandm_block_maintenace_request_assign_data_disptach({
                  sortBy: sortBy,
                  search_value: "",
                  sort: sort,
                  page: page,
                  package_name: packageNoDataReducer?.data,
                })
              );
            }
          }}
          sx={{ width: 300, my: "2%" }}
          InputProps={{
            endAdornment: (
              <Div sx={{ cursor: "pointer" }}>
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              </Div>
            ),
          }}
        />
        {/* <Div sx={{ my: "2%" }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#B0BAC9",
              padding: "6px 20px",
              color: "#000",
              borderRadius: "5px",
            }}
            // onClick={handleDownload}
          >
            <CloudDownloadOutlinedIcon sx={{ mr: "10px" }} /> Export
          </Button>
        </Div> */}
      </Div>
      <TableContainer sx={{ marginTop: "15px" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "100px" }}
              >
                Sr No.
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`maintenance_id`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Maintenance ID
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Maintenance ID "
                    field="maintenance_id"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=maintenance_id&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box> 
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "170px" }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`maintenance_request_details.createdAt`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Request Date
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`assets_details.equipment_name`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Equipment
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Equipment"
                    field="assets_details.equipment_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=assets_details.equipment_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`assets_details.serial_no`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Serial No.
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Serial No."
                    field="assets_details.serial_no"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=assets_details.serial_no&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(
                        `assets_details.location_details.location_name`
                      )
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Location
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Location "
                    field="assets_details.location_details.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=assets_details.location_details.location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(
                        `assets_details.location_details.location_code`
                      )
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Location Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Location Code"
                    field="assets_details.location_details.location_code"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=assets_details.location_details.location_code&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`assets_details.condition`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Condition
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Condition"
                    field="assets_details.condition"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=assets_details.condition&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`repair_type`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Repair Type
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Repair Type"
                    field="repair_type"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=repair_type&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`assign_to`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Assigned To
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Assigned To"
                    field="assign_to"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=assign_to&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`issue_reported`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Issue Reported
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Issue Reported"
                    field="issue_reported"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=issue_reported&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`issue_date`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Issue Date
                </TableSortLabel>
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`estimate_arrival_date`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  ETA
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`repair_status`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Repair Status
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Repair Status"
                    field="repair_status"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request-assign?filter_field=repair_status&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Document
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                Remark
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {oandmBlockMaintenaceRequestAssignDataReducer?.data?.result?.data
              ?.length > 0 ? (
              oandmBlockMaintenaceRequestAssignDataReducer?.data?.result?.data?.map(
                (ele, index) => {
                  return (
                    <TableRow key={ele?.id}>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {index + 1 || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.maintenance_id || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(
                          ele?.maintenance_request_details?.createdAt
                        ).format("DD-MM-YYYY") || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.equipment_name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.serial_no || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.location_details?.location_name ||
                          "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.location_details?.location_code ||
                          "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        <Chip
                          // label={e?.condition ? e.condition?.toUpperCase() : "-"}
                          label={
                            ele?.assets_details?.condition
                              ? ele?.assets_details?.condition?.toUpperCase()
                              : ele?.availability
                              ? "NOT DEFINED"
                              : "NOT FOUND"
                          }
                          sx={{
                            backgroundColor:
                              ele?.assets_details?.condition?.toUpperCase() ===
                              "DAMAGED"
                                ? Red
                                : ele?.assets_details?.condition?.toUpperCase() ===
                                  "SEMI-DAMAGED"
                                ? Yellow
                                : ele?.assets_details?.condition?.toUpperCase() ===
                                  "ROBUST"
                                ? Green
                                : ele?.assets_details?.condition === null &&
                                  ele?.availability === true
                                ? Orange
                                : ele?.assets_details?.condition === null &&
                                  ele?.availability === false
                                ? Yellow
                                : "",
                            color: "#FFF",
                            fontWeight: "bold",
                            fontSize: "14",
                            height: "25px",
                            px: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.repair_type || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assign_to || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.issue_reported || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(ele?.issue_date).format("DD-MM-YYYY") || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(ele?.estimate_arrival_date).format(
                          "DD-MM-YYYY"
                        ) || "-"}
                      </TableCell>
                      {/* <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.repair_status?.replaceAll("_", " ") || "-"}
                      </TableCell> */}
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        <Select
                          value={ele?.repair_status || ""}
                          onChange={(e) =>
                            handleStatusChange(e.target.value, ele)
                          }
                          displayEmpty
                          fullWidth
                          size="small"
                          sx={{
                            backgroundColor:
                              ele?.repair_status === "repaired"
                                ? Blue
                                : ele?.repair_status === "under_repair"
                                ? Yellow
                                : ele?.repair_status === "installed"
                                ? Green
                                : ele?.repair_status === "assigned"
                                ? Orange
                                : Red,
                            color: "#fff",
                            borderRadius: "6px",
                            paddingTop: "0",
                            fontSize: "12px",
                            height: "32px",
                            ".MuiSelect-select": {
                              padding: "6px 8px",
                            },
                            ".MuiSelect-icon": {
                              color: "#fff",
                            },
                          }}
                        >
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status
                                .replaceAll("_", " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.document || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.remarks || "-"}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...tableBodyCell,
                        }}
                      >
                        <InfoIcon
                          sx={{
                            "&:hover": { cursor: "pointer", color: "black" },
                          }}
                          onClick={() => {
                            showDetails(ele);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )
            ) : (
              <TableCell
                align="left"
                colSpan={10}
                sx={{
                  textAlign: "center",
                  verticalAlign: "middle",
                  textTransform: "capitalize",
                }}
              >
                No Data Found!
              </TableCell>
            )}
          </TableBody>
        </Table>
        <Pagination
          count={
            oandmBlockMaintenaceRequestAssignDataReducer?.data?.result
              ?.total_pages || 1
          }
          page={page}
          onChange={handleChangePage}
          sx={{
            position: "sticky",
            bottom: 0,
            left: 0,
            p: "1%",
            backgroundColor: "white",
            borderTop: "1px solid #ddd",
          }}
        />
      </TableContainer>
      <AssignViewModal open={open} closeModal={closeModal} row={row} />
    </>
  );
};
export default MaintenanceAssignRequest;
