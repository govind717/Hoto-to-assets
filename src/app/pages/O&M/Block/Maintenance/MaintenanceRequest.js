import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";

import Div from "@jumbo/shared/Div";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import FilterModel from "app/Components/FilterModel";
import FullScreenLoader from "app/pages/Components/Loader";
import {
  Green,
  Orange,
  orangeSecondary,
  Red,
  Yellow,
} from "app/pages/Constants/colors";
import { oandm_block_maintenace_request_data_disptach } from "app/redux/actions/O&M/Block";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MaintenanaceRequestView from "./Modal/MaintenanaceRequestView";
import MaintenanceRequestModal from "./Modal/MaintenanceRequestModal";
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
const MaintenanceRequest = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openRequestManagement, setOpenRequestManagement] = useState(false);
  const [row, setRow] = useState(null);
  const [filters, setFilters] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);
  const { oandmBlockMaintenaceRequestDataReducer } = useSelector(
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
      oandm_block_maintenace_request_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        package_name: packageNoDataReducer?.data,
        filters: filters,
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
      oandm_block_maintenace_request_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters: filters,
        package_name: packageNoDataReducer?.data,
      })
    );
  }, [sort, page, sortBy, packageNoDataReducer?.data, applyFilter, dispatch]);

  const closeModal = () => {
    setOpenRequestManagement(false);
    setOpen(false);
  };
  const handleAssign = (data) => {
    setRow(data);
    setOpenRequestManagement(true);
  };
  const showDetails = (data) => {
    setRow(data);
    setOpen(true);
  };
  return (
    <>
      {oandmBlockMaintenaceRequestDataReducer?.loading && <FullScreenLoader />}
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
                oandm_block_maintenace_request_data_disptach({
                  sortBy: sortBy,
                  search_value: "",
                  sort: sort,
                  page: page,
                  filters: filters,
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
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=maintenance_id&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box> 
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`createdAt`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Requested Date
                  </TableSortLabel>
                  {/* <FilterModel
                    label="Filter Requested Date "
                    field="createdAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=createdAt&package_name=${packageNoDataReducer?.data}`}
                  /> */}
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
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
                    label="Filter Equipment "
                    field="assets_details.equipment_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=assets_details.equipment_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
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
                    label="Filter Serial No. "
                    field="assets_details.serial_no"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=assets_details.serial_no&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
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
                    label="Filter Location"
                    field="assets_details.location_details.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=assets_details.location_details.location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(
                        `assets_details.location_details.location_code`
                      )
                    }
                    direction={sort}
                    sx={{ ...tableCellSort, minWidth: "130px" }}
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
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=assets_details.location_details.location_code&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
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
                  apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=assets_details.condition&package_name=${packageNoDataReducer?.data}`}
                />
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
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
                    apiUrl={`/o&m/block/filter-dropdown/maintenance-request?filter_field=repair_type&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`issue_reported`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Issue Reported
                </TableSortLabel>
              </TableCell>

               <TableCell
                  align="left"
                  sx={{ ...tableCellSx, minWidth: "180px" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TableSortLabel
                      onClick={() => handleSort("createdAt")}
                      direction={sort}
                      sx={{ ...tableCellSx }}
                    >
                      Created Date
                    </TableSortLabel>
                    <FilterModel
                      label="Filter Created Date"
                      field="createdAt"
                      filters={filters}
                      setFilters={setFilters}
                      setApplyFilter={setApplyFilter}
                      package_name={packageNoDataReducer?.data}
                      apiUrl={`/hoto-to-assets/gp/assets-portfolio/filter-dropdown?filter_field=createdAt&package_name=${packageNoDataReducer?.data}`}
                    />
                  </Box>
                </TableCell>

                <TableCell
                  align="left"
                  sx={{ ...tableCellSx, minWidth: "220px" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TableSortLabel
                      onClick={() => handleSort("updatedAt")}
                      direction={sort}
                      sx={{ ...tableCellSx }}
                    >
                      Updated Date
                    </TableSortLabel>
                    <FilterModel
                      label="Filter Updated Date"
                      field="updatedAt"
                      filters={filters}
                      setFilters={setFilters}
                      setApplyFilter={setApplyFilter}
                      package_name={packageNoDataReducer?.data}
                      apiUrl={`/hoto-to-assets/gp/assets-portfolio/filter-dropdown?filter_field=updatedAt&package_name=${packageNoDataReducer?.data}`}
                    />
                  </Box>
                </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Initiated By
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Remark
                </TableSortLabel>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                Details
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  actions
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {oandmBlockMaintenaceRequestDataReducer?.data?.result?.data
              ?.length > 0 ? (
              oandmBlockMaintenaceRequestDataReducer?.data?.result?.data?.map(
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
                        {moment(ele?.createdAt).format("DD-MM-YYYY") || "-"}
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
                        {ele?.assets_details?.location_details.location_code ||
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
                        {ele?.created_user_details.firstName || "-"}
                      </TableCell>
                      <TableCell sx={{ ...tableBodyCell, textTransform: "capitalize" }}>
                        {moment(ele?.
                          createdAt).format("DD-MM-YYYY") || "-"}
                      </TableCell>
                      <TableCell sx={{ ...tableBodyCell, textTransform: "capitalize" }}>
                        {moment(ele?.updatedAt)
                          .format("DD-MM-YYYY") || "-"}
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
                          textAlign: "center",
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
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          disabled={ele?.is_created || ele?.is_cancelled}
                          onClick={() => handleAssign(ele)}
                          sx={{
                            backgroundColor: orangeSecondary,
                            "&:hover": {
                              backgroundColor: orangeSecondary,
                            },
                          }}
                        >
                          Assign
                        </Button>
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
            oandmBlockMaintenaceRequestDataReducer?.data?.result?.total_pages ||
            1
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
      <MaintenanaceRequestView open={open} closeModal={closeModal} row={row} />
      <MaintenanceRequestModal
        open={openRequestManagement}
        closeModal={closeModal}
        row={row}
      />
    </>
  );
};
export default MaintenanceRequest;
