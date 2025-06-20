import Div from "@jumbo/shared/Div";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
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
  TextField
} from "@mui/material";
import FullScreenLoader from "app/pages/Components/Loader";
import {
  Green,
  Orange,
  Red,
  Yellow
} from "app/pages/Constants/colors";
import { hoto_gp_maintenance_data_disptach } from "app/redux/actions/Hoto_to_servey/GP";
import { Axios } from "index";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FilterModel from "app/Components/FilterModel";
import TableLoader from "app/pages/Components/TableLoader";

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
const addBtnStyle = {
  borderColor: "#B0BAC9",
  textTransform: "capitalize",
  padding: "6px 20px",
  color: "#fff",
  borderRadius: "5px",
  backgroundColor: " #E78F5D",
  "&:hover": { backgroundColor: " #E78F5D" },
};

const MaintainanceList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { hotoGpMaintenanceDataReducer } = useSelector((state) => state);
  const { packageNoDataReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);

  // const [downloadExcelValue, setDownloadExcelValue] = useState('');
  
  //   const downloadExcelValueOptions = [
  //     { label: "Download All Data", value: true },
  //     { label: "Download  Data", value: false },
  //   ];

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
      hoto_gp_maintenance_data_disptach(
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
      hoto_gp_maintenance_data_disptach(
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
  }, [sort, page, packageNoDataReducer?.data, sortBy, applyFilter, dispatch]);

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
        "/hoto-to-assets/gp/maintenance/download-excel"
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
                hoto_gp_maintenance_data_disptach(
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
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Sr No.
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
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
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=maintenance_id&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`createdAt`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Requested Date
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Requested Date "
                    field="createdAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=createdAt&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
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
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=assets_details.equipment_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
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
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=assets_details.serial_no&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
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
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=repair_type&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`maintenance_type`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Allocated To
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Allocated To"
                    field="maintenance_type"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=maintenance_type&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`assign_to`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Assigned To
                </TableSortLabel>
                <FilterModel
                  label="Filter Allocated To"
                  field="assign_to"
                  filters={filters}
                  setFilters={setFilters}
                  setApplyFilter={setApplyFilter}
                  package_name={packageNoDataReducer?.data}
                  apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=assign_to&package_name=${packageNoDataReducer?.data}`}
                />
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
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
                    label="Filter Issue Reported"
                    field="issue_reported"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=issue_reported&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`createdAt`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Issue Date
                </TableSortLabel>
                <FilterModel
                  label="Filter Issue Date"
                  field="createdAt"
                  filters={filters}
                  setFilters={setFilters}
                  setApplyFilter={setApplyFilter}
                  package_name={packageNoDataReducer?.data}
                  apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=createdAt&package_name=${packageNoDataReducer?.data}`}
                />
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`gp.district.code`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    ETA
                  </TableSortLabel>
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
                  apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=assets_details.condition&package_name=${packageNoDataReducer?.data}`}
                />
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(`assets_details.condition_status`)
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Status
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Status"
                    field="assets_details.condition_status"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/maintenance/filter-dropdown?filter_field=assets_details.condition_status&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                Document
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                Remark
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotoGpMaintenanceDataReducer?.loading ? (
              <TableLoader />
            ) : hotoGpMaintenanceDataReducer?.data?.result?.data?.length > 0 ? (
              hotoGpMaintenanceDataReducer?.data?.result?.data?.map(
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
                        {ele?.maintenance_type || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {"-"}
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
                        <Chip
                          label={
                            ele?.assets_details?.condition
                              ? ele?.assets_details?.condition?.toUpperCase()
                              : "-"
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
                                : ele?.assets_details?.condition?.toUpperCase() ===
                                  "MISSING"
                                ? Orange
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
                        {/* {ele?.assets_details?.condition_status || "-"} */}
                        <Chip
                          label={
                            ele?.assets_details?.condition_status
                              ? ele?.assets_details?.condition_status?.toUpperCase()
                              : "-"
                          }
                          sx={{
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
          count={hotoGpMaintenanceDataReducer?.data?.result?.total_pages || 1}
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

export default MaintainanceList;
