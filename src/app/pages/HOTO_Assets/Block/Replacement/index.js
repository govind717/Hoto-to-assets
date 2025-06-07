import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Pagination,
  Paper,
  Slide,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import FilterModel from "app/Components/FilterModel";
import { hoto_block_replacement_data_disptach } from "app/redux/actions/Hoto_to_servey/Block";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Axios } from "index";
import TableLoader from "app/pages/Components/TableLoader";

const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "130px",
  verticalAlign: "middle",
};

const tableCellSort = {
  color: "white",
  "&:hover": { color: "white" },
  "&.MuiTableSortLabel-root.Mui-active": {
    color: "white",
  },
};

const ReplacementList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { hotoBlockReplacementDataReducer } = useSelector((state) => state);
  const { packageNoDataReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);

  // const [downloadExcelValue, setDownloadExcelValue] = useState('');

  // const downloadExcelValueOptions = [
  //   { label: "Download All Data", value: true },
  //   { label: "Download  Data", value: false },
  // ];

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
      hoto_block_replacement_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          filters: filters,
        },
        packageNoDataReducer?.data
      )
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
      hoto_block_replacement_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          filters: filters,
        },
        packageNoDataReducer?.data
      )
    );
  }, [sort, page, sortBy, packageNoDataReducer?.data, applyFilter, dispatch]);


  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      container: "popupImportant",
    },
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  

  const handleExportCSV = async () => {
    try {
      setLoading(true);
      setSnackbarOpen(true);
      const res = await Axios.post(
        "/hoto-to-assets/block/replacement/download-excel"
      );
    
      if (res.data.success) {
        window.open(res?.data?.result);

        Toast.fire({
          timer: 3000,
          icon: "success",
          title: "CSV  Downloaded Successfully...",
          position: "top-right",
          // background: theme.palette.background.paper,
        });
        setLoading(false);
        setSnackbarOpen(false);
      } else {
        Toast.fire({
          timer: 3000,
          icon: "error",
          title: "CSV  Downloading failed..",
          position: "top-right",
          // background: theme.palette.background.paper,
        });
        setLoading(false);
        setSnackbarOpen(false);
      }
    } catch (error) {
      setLoading(false);
      setSnackbarOpen(false);
      Toast.fire({
        timer: 3000,
        icon: "error",
        title:
          error.response?.data.message ||
          "An error occured while downloading csv",
        position: "top-right",
        // background: theme.palette.background.paper,
      });
    }
  };

  return (
    <>
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
                hoto_block_replacement_data_disptach(
                  {
                    sortBy: sortBy,
                    search_value: "",
                    sort: sort,
                    page: page,
                    filters: filters,
                  },
                  packageNoDataReducer?.data
                )
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
        <Div sx={{ my: "2%" }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#B0BAC9",
              padding: "6px 20px",
              color: "#000",
              borderRadius: "5px",
            }}
            onClick={handleExportCSV}
          >
            <CloudDownloadOutlinedIcon sx={{ mr: "10px" }} /> Export
          </Button>
        </Div>
        <Snackbar
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen}
          message=" CSV Downloading in progress..."
          action={loading && <CircularProgress color="info" size={24} />}
        />
        {/* <Div sx={{ my: "2%" }}>
          <Autocomplete
            disablePortal
            size="small"
            options={downloadExcelValueOptions}
            getOptionLabel={(option) => option?.label || ""}
            isOptionEqualToValue={(option, value) =>
              option?.label === value?.label
            }
            sx={{ width: 200 }}
            value={downloadExcelValue}
            onChange={(_, newValue) => handleDownloadExcelChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Export Excel" />
            )}
          />
        </Div> */}
      </Div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Sr No
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
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
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=replacementId&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`issueDate`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Request Date
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Request Date"
                    field="issueDate"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=issueDate&package_name=${packageNoDataReducer?.data}`}
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
                      handleSort(`block_asset_details.equipment_name`)
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Equipment
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Equipment"
                    field="block_asset_details.equipment_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=block_asset_details.equipment_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`serialNumber`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Serial No.
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Serial No."
                    field="serialNumber"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=serialNumber&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(
                        `block_asset_details.equipment_details.location_name`
                      )
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Location
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Location"
                    field="block_asset_details.equipment_details.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=block_asset_details.equipment_details.location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(
                        `block_asset_details.equipment_details.location_code`
                      )
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Location Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter   Location Code"
                    field="block_asset_details.equipment_details.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=block_asset_details.equipment_details.location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "290px" }}
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
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=replacementReason&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "160px" }}
              >
                ETA
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "160px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`dueDate`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Due Date
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Due Date"
                    field="dueDate"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=dueDate&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                Initiated By
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                New Serial No.
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "290px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`replacementStatus`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Replacement Status
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Replacement Status"
                    field="replacementStatus"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/replacement/filter-dropdown?filter_field=replacementStatus&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Document
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                Remark
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotoBlockReplacementDataReducer?.loading ? (
              <TableLoader />
            ) : hotoBlockReplacementDataReducer?.data?.result?.data?.length >
              0 ? (
              hotoBlockReplacementDataReducer?.data?.result?.data?.map(
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
                        {moment(ele?.issueDate).format("DD-MM-YYYY") || "-"}
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
                        {ele?.serialNumber || "-"}
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
                        {ele?.gp?.district?.code || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(ele?.dueDate).format("DD-MM-YYYY") || "-"}
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
                        {ele?.gp?.district?.code || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.replacementStatus?.replaceAll("_", " ") || "-"}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.gp?.district?.code || "-"}
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
                    </TableRow>
                  );
                }
              )
            ) : (
              <TableRow>
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
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          count={
            hotoBlockReplacementDataReducer?.data?.result?.total_pages || 1
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
    </>
  );
};

export default ReplacementList;
