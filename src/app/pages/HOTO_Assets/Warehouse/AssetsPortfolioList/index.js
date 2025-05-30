import Div from "@jumbo/shared/Div";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Modal,
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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemDetailsModal from "./ItemDetails/AssetsPortFolioItemDetail";
import AssetPortfolioTableRow from "./AssetPortfolioTableRow/AssetPortfolioTableRow";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { Axios } from "index";
import { orangeSecondary } from "app/pages/Constants/colors";
import { BorderColor } from "@mui/icons-material";
import { hoto_warehouse_asset_partfolio_data_disptach } from "app/redux/actions/Hoto_to_servey/Warehouse";
import FullScreenLoader from "app/pages/Components/Loader";

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

const hideBtnStyle = {
  backgroundColor: orangeSecondary,
  "&:hover": {
    backgroundColor: orangeSecondary,
  },
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AssetsPortfolioList = ({ allFilterState, setAllFilterState }) => {
  const { hotoWarehouseAssetPortfolioDataReducer } = useSelector(
    (state) => state
  );
  const { packageNoDataReducer } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [toggle,setToggle]=useState(false);
  const [itemDetailsForModal, setItemDetailsForModal] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

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
      hoto_warehouse_asset_partfolio_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
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
      hoto_warehouse_asset_partfolio_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
        },
        packageNoDataReducer?.data
      )
    );
  }, [sort, page,packageNoDataReducer?.data, toggle, sortBy, dispatch]);

  const isSelectedAll = () => {
    const allSelected =
      hotoWarehouseAssetPortfolioDataReducer?.data?.result?.data?.every((elm) => {
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
            ...hotoWarehouseAssetPortfolioDataReducer?.data?.result?.data?.map(
              (elm) => elm.id
            ),
            ...prev,
          ]);
          return [...selecedIdsData];
        });
      } else {
        const uncheckAll = selectedIds.filter((id) => {
          return !hotoWarehouseAssetPortfolioDataReducer?.data?.result?.data.some(
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
          hoto_warehouse_asset_partfolio_data_disptach({
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
          hoto_warehouse_asset_partfolio_data_disptach({
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
          hoto_warehouse_asset_partfolio_data_disptach({
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
                hoto_warehouse_asset_partfolio_data_disptach(
                  {
                    sortBy: sortBy,
                    search_value: "",
                    sort: sort,
                    page: page,
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
        {selectedIds?.length > 0 && (
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
        )}
      </Div>
      {hotoWarehouseAssetPortfolioDataReducer?.loading && <FullScreenLoader />}
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
              {/* <TableCell
                sx={{
                  ...tableCellSx,
                  color: "white",
                  minWidth: "50px",
                  textAlign: "center",
                }}
              >
                <Checkbox
                  {...label}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                  checked={isSelectedAll()}
                  onChange={handleSelectAll}
                  size="small"
                />
              </TableCell> */}
              <TableCell align="left" sx={{ ...tableCellSx ,minWidth:"100px"}}>
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
                </Box>
              </TableCell>

              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort("serial_no")}
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Serial No.
                  </TableSortLabel>
                </Box>
              </TableCell>

              <TableCell align="left" sx={{ ...tableCellSx,minWidth:"220px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort("equipment_details.location_name")
                    }
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Warehouse Location
                  </TableSortLabel>
                </Box>
              </TableCell>

              <TableCell align="left" sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort("equipment_details?.location_code")
                    }
                    direction={sort}
                    sx={{ ...tableCellSx }}
                  >
                    Warehouse Code
                  </TableSortLabel>
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

              {/* <TableCell
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
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {hotoWarehouseAssetPortfolioDataReducer?.data.result?.data &&
            hotoWarehouseAssetPortfolioDataReducer?.data?.result?.data?.length >
              0 ? (
              hotoWarehouseAssetPortfolioDataReducer?.data?.result?.data?.map(
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
            hotoWarehouseAssetPortfolioDataReducer?.data?.result?.total_pages ||
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
