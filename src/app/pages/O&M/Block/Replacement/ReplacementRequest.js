import Div from "@jumbo/shared/Div";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Chip, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from "@mui/material";
import FilterModel from "app/Components/FilterModel";
import FullScreenLoader from "app/pages/Components/Loader";
import { Green, Orange, orangeSecondary, Red, Yellow } from "app/pages/Constants/colors";
import { oandm_block_replacement_request_data_disptach } from "app/redux/actions/O&M/Block";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GeneratePickupRequestModel from "./Modal/GeneratePickupRequestModel";
import ReplacementRequestModal from "./Modal/ReplacementRequestModal";
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
const ReplacementRequest = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
 const [open,setOpen]=useState(false);
 const [row,setRow]=useState(null);
 const [openGeneratePickupRequest,setOpenGeneratePickupRequest]=useState(false);
  const { oandmBlockReplacementRequestDataReducer } = useSelector(
    (state) => state
  );
  const { packageNoDataReducer } = useSelector((state) => state);
   const [filters, setFilters] = useState({});
    const [applyFilter, setApplyFilter] = useState(false);
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
      oandm_block_replacement_request_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters:filters,
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
      oandm_block_replacement_request_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters:filters,
        package_name: packageNoDataReducer?.data,
      })
    );
  }, [sort, page, sortBy, packageNoDataReducer?.data,applyFilter, dispatch]);

  const closeModal=()=>{
    setOpen(false);
  }
  const closeGeneratePickupRequest=()=>{
    setOpenGeneratePickupRequest(false);
  }
  const handleAssign=(data)=>{
    setRow(data);
    setOpenGeneratePickupRequest(true);
  }
  const showDetails=(data)=>{
     setRow(data);
    setOpen(true);
  }
 
  return (
    <>
      {oandmBlockReplacementRequestDataReducer?.loading && <FullScreenLoader />}
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
                oandm_block_replacement_request_data_disptach({
                  sortBy: sortBy,
                  search_value: "",
                  sort: sort,
                  page: page,
                  filters:filters,
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
                    onClick={() => handleSort(`replacementId`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Replacement ID
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Replacement ID"
                    field="replacementId"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/replacement-request?filter_field=replacementId&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
 
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`issueDate`)}
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
                    onClick={() =>
                      handleSort(`block_asset_details.equipment_name`)
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Equipment
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Equipment"
                    field="block_asset_details.equipment_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/replacement-request?filter_field=block_asset_details.equipment_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`block_asset_details.serial_no`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Serial No.
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Serial No."
                    field="block_asset_details.serial_no"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/replacement-request?filter_field=block_asset_details.serial_no&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`dueDate`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Due Date
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(
                        `block_asset_details.block_details.location_name`
                      )
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Location
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Location"
                    field="block_asset_details.block_details.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/replacement-request?filter_field=block_asset_details.block_details.location_name&package_name=${packageNoDataReducer?.data}`}
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
                        `block_asset_details.block_details.location_code`
                      )
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Location Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Location Code"
                    field="block_asset_details.block_details.location_code"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/replacement-request?filter_field=block_asset_details.block_details.location_code&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "240px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`replacementReason`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Replacement Reason
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Replacement Reason"
                    field="replacementReason"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/replacement-request?filter_field=replacementReason&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`initiatedBy`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Initiated By
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "240px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`block_asset_details.condition`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Condition
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Condition"
                    field="block_asset_details.condition"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/o&m/block/filter-dropdown/replacement-request?filter_field=block_asset_details.condition&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Details
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {oandmBlockReplacementRequestDataReducer?.data?.result?.data
              ?.length > 0 ? (
              oandmBlockReplacementRequestDataReducer?.data?.result?.data?.map(
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
                        {ele?.replacementId || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(ele?.issueDate).format("DD-MM-YY") || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.block_asset_details?.equipment_name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.block_asset_details?.serial_no || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(ele?.dueDate).format("DD-MM-YY") || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.block_asset_details?.equipment_details
                          ?.location_name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.block_asset_details?.equipment_details
                          ?.location_code || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.replacementReason || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.initiatedBy || "-"}
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
                            ele?.block_asset_details?.condition
                              ? ele?.block_asset_details?.condition?.toUpperCase()
                              : ele?.availability
                              ? "NOT DEFINED"
                              : "NOT FOUND"
                          }
                          sx={{
                            backgroundColor:
                              ele?.block_asset_details?.condition?.toUpperCase() ===
                              "DAMAGED"
                                ? Red
                                : ele?.block_asset_details?.condition?.toUpperCase() ===
                                  "SEMI-DAMAGED"
                                ? Yellow
                                : ele?.block_asset_details?.condition?.toUpperCase() ===
                                  "ROBUST"
                                ? Green
                                : ele?.block_asset_details?.condition === null &&
                                  ele?.availability === true
                                ? Orange
                                : ele?.block_asset_details?.condition === null &&
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
                          // startIcon={<HomeRepairServiceIcon />}
                          disabled={ele?.isCancelled || ele?.isCreated}
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
            oandmBlockReplacementRequestDataReducer?.data?.result
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
      <ReplacementRequestModal open={open} closeModal={closeModal} row={row} />
      <GeneratePickupRequestModel
        open={openGeneratePickupRequest}
        closeModal={closeGeneratePickupRequest}
        row={row}
      />
    </>
  );
};
export default ReplacementRequest;
