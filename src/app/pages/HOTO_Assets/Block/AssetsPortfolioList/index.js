import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  Modal,
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
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import { hoto_block_asset_partfolio_data_disptach } from "app/redux/actions/Hoto_to_servey/Block";
import { Axios } from "index";
import { debounce } from "lodash";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import AssetPortfolioTableRow from "./AssetPortfolioTableRow/AssetPortfolioTableRow";
import ItemDetailsModal from "./ItemDetails/AssetsPortFolioItemDetail";
import { useLocation } from "react-router-dom";
import StaticFilterModel from "app/Components/StaticFilterModel";
import DateModel from "app/Components/DateModel";
import TableLoader from "app/pages/Components/TableLoader";

const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "100px",
  verticalAlign: "middle",
};

const tableCellSort = {
  color: "white",
  "&:hover": { color: "white" },
  "&.MuiTableSortLabel-root.Mui-active": {
    color: "white",
  },
};

const hideBtnStyle = {
  backgroundColor: orangeSecondary,
  "&:hover": {
    backgroundColor: orangeSecondary,
  },
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AssetsPortfolioList = ({ allFilterState, setAllFilterState }) => {
  const { packageNoDataReducer } = useSelector((state) => state);
  const hotoBlockAssetPortfolioDataReducer = useSelector(
    (state) => state?.hotoBlockAssetPortfolioDataReducer
  );
  const { state } = useLocation();

  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [itemDetailsForModal, setItemDetailsForModal] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [filters, setFilters] = useState(
    state ? { ...state } : { availability: true }
  );
  const [applyFilter, setApplyFilter] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [downloadExcelValue, setDownloadExcelValue] = useState("");

  const downloadExcelValueOptions = [
    { label: "Export All Data", value: true },
    { label: "Export Data", value: false },
  ];

  const handleOpenDetailModal = (rowDetails) => {
    setOpenDetailModal(true);
  };
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
      hoto_block_asset_partfolio_data_disptach(
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

  // const [filterAvailabilityValue, setFilterAvailabilityValue] = useState(
  //   {
  //     label: "Yes",
  //     value: true,
  //   }
  // );

  //  const [filterAvailabilityValue, setFilterAvailabilityValue] = useState(() => {
  //   if (state?.availability === true) {
  //     return { label: "Yes", value: true };
  //   } else if (state?.availability === false) {
  //     return { label: "No", value: false };
  //   } else if (!state?.availability) {
  //     return { label: "All", value: "all" };
  //   } else {
  //     return { label: "Yes", value: true };
  //   }
  // });

  const [filterAvailabilityValue, setFilterAvailabilityValue] = useState(() => {
    if (!state) {
      return { label: "Yes", value: true };
    } else if (state.availability === true) {
      return { label: "Yes", value: true };
    } else if (state.availability === false) {
      return { label: "No", value: false };
    } else if (state.availability === undefined) {
      return { label: "All", value: "all" };
    } else {
      return { label: "Yes", value: true };
    }
  });

  const filterAvailabilityOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
    { label: "All", value: "all" },
  ];

  const handleAvailabilityChange = (selectedOption) => {
    setFilterAvailabilityValue(selectedOption);
    const val = selectedOption?.value;
    if (val === true) {
      setFilters((prev) => ({ ...prev, availability: true }));
    } else if (val === false) {
      setFilters((prev) => ({ ...prev, availability: false }));
    } else {
      const newObj = { ...filters };
      delete newObj.availability;
      setFilters(newObj);
    }
  };

  useEffect(() => {
    dispatch(
      hoto_block_asset_partfolio_data_disptach(
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
  }, [
    sort,
    page,
    sortBy,
    packageNoDataReducer?.data,
    applyFilter,
    toggle,
    filterAvailabilityValue,
    dispatch,
  ]);

  const isSelectedAll = () => {
    const allSelected =
      hotoBlockAssetPortfolioDataReducer?.data?.result?.data?.every((elm) => {
        return selectedIds.includes(elm?.id);
      });
    return allSelected;
  };

  const handleSelectAll = function (event) {
    try {
      const checked = event.target.checked;
      if (checked) {
        setSelectedIds((prev) => {
          const selecedIdsData = new Set([
            ...hotoBlockAssetPortfolioDataReducer?.data?.result?.data?.map(
              (elm) => elm.id
            ),
            ...prev,
          ]);
          return [...selecedIdsData];
        });
      } else {
        const uncheckAll = selectedIds.filter((id) => {
          return !hotoBlockAssetPortfolioDataReducer?.data?.result?.data.some(
            (elm) => elm?.id === id
          );
        });
        setSelectedIds(uncheckAll);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIsssueForMaintenance = async function () {
    try {
      const issueForMaintenance = await Axios.post(
        "issue for maintainance api here",
        {
          log_itemsids: selectedIds,
        }
      );

      if (issueForMaintenance.status === 200) {
        Swal.fire({
          title: "Issued for Maintenance",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        dispatch(
          hoto_block_asset_partfolio_data_disptach({
            sortBy: sortBy,
            search_value: searchTerm.trim(),
            sort: sort,
            page: page,
          })
        );
        setSelectedIds([]);
      }
    } catch (error) {
      Swal.fire({
        title: error?.message || error?.response?.data?.message,
        icon: "error",
        showConfirmButton: true,
      });
    }
  };
  const handleIsssueForTransfer = async function () {
    try {
      const issueForTransfer = await Axios.post("transfer api here", {
        log_inventory_itemids: selectedIds,
      });
      if (issueForTransfer.status === 200) {
        Swal.fire({
          title: "Issued for Transfer",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        dispatch(
          hoto_block_asset_partfolio_data_disptach({
            sortBy: sortBy,
            search_value: searchTerm.trim(),
            sort: sort,
            page: page,
          })
        );
        setSelectedIds([]);
      }
    } catch (error) {
      Swal.fire({
        title: error?.message || error?.response?.data?.message,
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  const handleIsssueForReplacement = async function () {
    try {
      const issueForReplacement = await Axios.post(
        "Issue for Replacement api here",
        {
          log_itemsids: selectedIds,
        }
      );

      if (issueForReplacement.status === 200) {
        Swal.fire({
          title: "Issued for Replacement",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        dispatch(
          hoto_block_asset_partfolio_data_disptach({
            sortBy: sortBy,
            search_value: searchTerm.trim(),
            sort: sort,
            page: page,
          })
        );
        setSelectedIds([]);
      }
    } catch (error) {
      Swal.fire({
        title: error?.message || error?.response?.data?.message,
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

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

  const handleDownloadExcelChange = (selectedOption) => {
    setDownloadExcelValue(selectedOption);
    if (selectedOption?.value === true) {
      handleAllExportCSV();
    } else if (selectedOption?.value === false) {
      handleExportCSV();
    }
  };

  const handleAllExportCSV = async () => {
    try {
      setLoading(true);
      setSnackbarOpen(true);
      const res = await Axios.post(
        `/hoto-to-assets/block/assets-portfolio/downloadall-excel?package_name=${packageNoDataReducer?.data}`
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

  const handleExportCSV = async () => {
    try {
      setLoading(true);
      setSnackbarOpen(true);
      const res = await Axios.post(
        `/hoto-to-assets/block/assets-portfolio/download-excel?package_name=${packageNoDataReducer?.data}`
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
        <Div sx={{ display: "flex", gap: "2%", flexDirection: "row" }}>
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
                  hoto_block_asset_partfolio_data_disptach(
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
          <FormControl fullWidth size="small" sx={{ my: "2%" }}>
            <Autocomplete
              disablePortal
              size="small"
              options={filterAvailabilityOptions}
              getOptionLabel={(option) => option?.label || ""}
              isOptionEqualToValue={(option, value) =>
                option?.label === value?.label
              }
              sx={{ width: 200 }}
              value={filterAvailabilityValue}
              onChange={(_, newValue) => handleAvailabilityChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Availability" />
              )}
            />
          </FormControl>
        </Div>
        {/* <Div sx={{ my: "2%" }}>
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
        </Div> */}

        <Div sx={{ my: "1%" }}>
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
        </Div>
        <Snackbar
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen}
          message=" CSV Downloading in progress..."
          action={loading && <CircularProgress color="info" size={24} />}
        />
        {/* {selectedIds?.length > 0 && (
          <Div
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              bgcolor: "transparent",
              px: 2,
              py: 1,
              borderRadius: "5px",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography variant="h5" sx={{ color: "black", mt: 1, mr: 1 }}>
              {selectedIds?.length} Selected
            </Typography>
            <Div
              sx={{
                display: "flex",
                columnGap: 2,
                rowGap: 2,
                flexWrap: "wrap",
              }}
            >
              <LoadingButton
                sx={{ ...hideBtnStyle, textTransform: "capitalize" }}
                size="medium"
                variant="contained"
                onClick={() => {
                  Swal.fire({
                    text: "Are you sure you want to Issue for Maintenance?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleIsssueForMaintenance();
                    }
                  });
                }}
              >
                Request Maintenance
              </LoadingButton>
              <LoadingButton
                sx={{ ...hideBtnStyle, textTransform: "capitalize" }}
                size="medium"
                variant="contained"
                onClick={() => {
                  Swal.fire({
                    text: "Are you sure you want to Issue for Replacement?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleIsssueForReplacement();
                    }
                  });
                }}
              >
                Replacement
              </LoadingButton>
              <LoadingButton
                sx={{ ...hideBtnStyle, textTransform: "capitalize" }}
                size="medium"
                variant="contained"
                onClick={() => {
                  Swal.fire({
                    text: "Are you sure you want to Send to Transfer?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleIsssueForTransfer();
                    }
                  });
                }}
              >
                Transfer
              </LoadingButton>
            </Div>
          </Div>
        )} */}
      </Div>
      {/* {hotoBlockAssetPortfolioDataReducer?.loading && <FullScreenLoader />} */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#53B8CA",
                color: "white",
                "& .MuiTableCell-root": {},
              }}
            >
              <TableCell align="left" sx={{ ...tableCellSx }}>
                Sr No
              </TableCell>

              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("equipment_name")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Equipment
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Equipment"
                    field="equipment_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/assets-portfolio/filter-dropdown?filter_field=equipment_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"  
                aria-describedby="modal-modal-description"

              >
                <Box sx={style}>
                  <CloseFilterIcon
                    onClick={handleClose}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      cursor: "pointer",
                      color: "#555",
                    }}
                  />
                  <FormControl fullWidth size="small" sx={{ my: "2%" }}>

                    <Autocomplete
                      disablePortal
                      size="small"
                      options={top100Films}
                      getOptionLabel={(option) => option.label || option}
                      sx={{ width: 300 }}
                      value={selectedFilter}
                      onChange={(_, newValue) => setSelectedFilter(newValue)}
                      renderInput={(params) => <TextField {...params} label="Filter Equipment" />}
                    />

                  </FormControl>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" onClick={handleClose} size="small">
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={handleApply} disabled={!selectedFilter} size="small">
                        Apply
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Modal> */}

              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("serial_no")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Serial No.
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Serial No"
                    field="serial_no"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/assets-portfolio/filter-dropdown?filter_field=serial_no&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align="left"
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort("equipment_details.location_name")
                    }
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Block Location
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Block Location"
                    field="equipment_details.location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/assets-portfolio/filter-dropdown?filter_field=equipment_details.location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align="left"
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort("equipment_details.location_code")
                    }
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Block Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Block Code"
                    field="equipment_details.location_code"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/assets-portfolio/filter-dropdown?filter_field=equipment_details.location_code&package_name=${packageNoDataReducer?.data}`}
                  />
                  {/* {console.log("filters bock code", filters)} */}
                </Box>
              </TableCell>

              {/* <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("site_type")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Site Type
                  </TableSortLabel>
                </Box>
              </TableCell> */}
              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("warranty_status")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Warranty
                  </TableSortLabel>
                </Box>
              </TableCell>

              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("condition")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Condition
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Condition"
                    field="condition"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    // apiUrl={`/hoto-to-assets/block/assets-portfolio/filter-dropdown?filter_field=condition&package_name=${packageNoDataReducer?.data}`}
                    staticOptions={["robust", "damaged"]}
                  />
                </Box>
              </TableCell>
              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("availability")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Availability
                  </TableSortLabel>
                  <StaticFilterModel
                    label="Filter Availability"
                    field="availability"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    filterOptions={["Yes", "No"]}
                  />
                </Box>
              </TableCell>
              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("issued_for")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Issued For
                  </TableSortLabel>
                </Box>
              </TableCell>

              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("condition_status")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Status
                  </TableSortLabel>
                </Box>
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
                  {/* <FilterModel
                    label="Filter Created Date"
                    field="createdAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/assets-portfolio/filter-dropdown?filter_field=createdAt&package_name=${packageNoDataReducer?.data}`}
                  /> */}
                  <DateModel
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
                  {/* <FilterModel
                    label="Filter Updated Date"
                    field="updatedAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/assets-portfolio/filter-dropdown?filter_field=updatedAt&package_name=${packageNoDataReducer?.data}`}
                  /> */}
                  <DateModel
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

              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Details
                </Box>
              </TableCell>

              <TableCell
                sx={{
                  ...tableCellSx,
                  textAlign: "center",
                  px: 1,
                  position: "sticky",
                  right: 0,
                  zIndex: 1,
                  bgcolor: "#53B8CA",
                  width: "50px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              hotoBlockAssetPortfolioDataReducer?.loading ? <TableLoader /> :
                hotoBlockAssetPortfolioDataReducer?.data?.result?.data?.length >
                  0 ? (
                  hotoBlockAssetPortfolioDataReducer?.data?.result?.data?.map(
                    (e, i) => {
                      return (
                        <AssetPortfolioTableRow
                          key={e?.id}
                          e={e}
                          index={i}
                          allFilterState={allFilterState}
                          selectedIds={selectedIds}
                          setSelectedIds={setSelectedIds}
                          setItemDetailsForModal={setItemDetailsForModal}
                          handleOpenDetailModal={handleOpenDetailModal}
                          setToggle={setToggle}
                        />
                      );
                    }
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={14} sx={{ textAlign: "center" }}>
                      No Data Found
                    </TableCell>
                  </TableRow>
                )
            }
          </TableBody>
        </Table>
        <Pagination
          count={
            hotoBlockAssetPortfolioDataReducer?.data?.result?.total_pages || 1
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
        <Modal
          open={openDetailModal}
          onClose={() => {
            setItemDetailsForModal(null);
            setOpenDetailModal(false);
          }}
        >
          <ItemDetailsModal
            itemDetailsForModal={itemDetailsForModal}
            setOpenDetailModal={setOpenDetailModal}
          />
        </Modal>
      </TableContainer>
    </>
  );
};

export default AssetsPortfolioList;
