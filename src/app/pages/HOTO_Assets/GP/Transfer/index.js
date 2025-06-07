import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Box,
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
  Autocomplete,
  CircularProgress,
  Slide,
  Snackbar,
} from "@mui/material";
import FilterModel from "app/Components/FilterModel";
import FullScreenLoader from "app/pages/Components/Loader";
import { hoto_gp_transfer_data_disptach } from "app/redux/actions/Hoto_to_servey/GP";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { Axios } from "index";
import TableLoader from "app/pages/Components/TableLoader";
const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "145px",
  verticalAlign: "middle",
};

const tableCellSort = {
  color: "white",
  "&:hover": { color: "white" },
  "&.MuiTableSortLabel-root.Mui-active": {
    color: "white",
  },
};

const Transferlist = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { hotoGpTransferDataReducer } = useSelector((state) => state);
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
      hoto_gp_transfer_data_disptach(
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
      hoto_gp_transfer_data_disptach(
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
        "/hoto-to-assets/gp/transfer/download-excel"
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
                hoto_gp_transfer_data_disptach(
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
      </Div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Sr. No.
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`transfer_id`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Transfer ID
                  </TableSortLabel>
                  <FilterModel
                    label="Filter  Transfer ID"
                    field="transfer_id"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=transfer_id&package_name=${packageNoDataReducer?.data}`}
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
                    label="Filter Requested Date"
                    field="createdAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=createdAt&package_name=${packageNoDataReducer?.data}`}
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
                    label="Filter Equipment"
                    field="assets_details.equipment_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=assets_details.equipment_name&package_name=${packageNoDataReducer?.data}`}
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
                    label="Filter Serial No."
                    field="assets_details.serial_no"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=assets_details.serial_no&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`transfer_type`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Transfer Type
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Transfer Type"
                    field="transfer_type"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=transfer_type&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`transfer_from.location_name`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Transfer From
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Transfer From"
                    field="transfer_from.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=transfer_from.location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`transfer_to.location_name`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Transfer To
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Transfer To"
                    field="transfer_to.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=transfer_to.location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              {/* <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "160px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`incharge`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Incharge
                </TableSortLabel>
              </TableCell> */}
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(``)}
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
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=createdAt&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`tansfer_status`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Transfer Status
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Transfer Status"
                    field="transfer_status"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/transfer/filter-dropdown?filter_field=transfer_status&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Document
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Remark
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotoGpTransferDataReducer?.loading ? (
              <TableLoader />
            ) : hotoGpTransferDataReducer?.data?.result?.data?.length > 0 ? (
              hotoGpTransferDataReducer?.data?.result?.data?.map(
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
                        {ele?.transfer_id || "-"}
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
                        {ele?.transfer_type || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.transfer_from?.location_name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.transfer_to?.location_name || "-"}
                      </TableCell>
                      {/* <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.incharge || "-"}
                      </TableCell> */}

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
                        {ele?.transfer_status || "-"}
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
          count={hotoGpTransferDataReducer?.data?.result?.total_pages || 1}
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

export default Transferlist;
