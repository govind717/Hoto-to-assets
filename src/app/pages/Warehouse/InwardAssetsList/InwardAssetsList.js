import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  Chip,
  IconButton,
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
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import FullScreenLoader from "app/pages/Components/Loader";
import {
  Green,
  Orange,
  orangeSecondary,
  Red,
  Yellow,
} from "app/pages/Constants/colors";
import MapLocation from "app/pages/Hoto_to_Assets/MapLocation";
import { BLOCK_MASTER } from "app/utils/constants/routeConstants";
import { hoto_warehouse_inward_assets_data_disptach } from "app/redux/actions/HotoWarehouse";
import DetailModal from "./DetailModal/DetailModal";
import MaterialInward from "./DetailModal/MaterialInward";

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

const InwardAssetsList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [openInward, setOpenInward] = useState(false);
  const { outhotoWarehouseInwardAssetsDataReducer } = useSelector(
    (state) => state
  );

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
      hoto_warehouse_inward_assets_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
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
      hoto_warehouse_inward_assets_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
      })
    );
  }, [sort, page, sortBy, dispatch]);

  const showDetails = (data) => {
    setRow(data);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const closeInward = () => {
    setOpenInward(false);
  };
  const handleInward = (data) => {
    setRow(data);
    setOpenInward(true);
  };
  return (
    <>
      {outhotoWarehouseInwardAssetsDataReducer?.loading && <FullScreenLoader />}
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
                hoto_warehouse_inward_assets_data_disptach({
                  sortBy: sortBy,
                  search_value: "",
                  sort: sort,
                  page: page,
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
      </Div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "100px" }}
              >
                Sr No.
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`transfer_id`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Transfer ID
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`assets_details.equipment_name`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Equipment
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`assets_details.serial_no`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Serial No.
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`transfer_from.location_name`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Transfer From
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
                  Transferer Name
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Condition
                </TableSortLabel>
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Details
                </TableSortLabel>
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
            {outhotoWarehouseInwardAssetsDataReducer?.data?.result?.data
              ?.length > 0 ? (
              outhotoWarehouseInwardAssetsDataReducer?.data?.result?.data?.map(
                (ele, index) => {
                  return (
                    <TableRow key={ele?._id}>
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
                        {ele?.gp?.district?.name || "-"}
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
                        <Chip
                          label={
                            ele?.assets_details?.condition_status
                              ? ele?.assets_details?.condition_status?.toUpperCase()
                              : "-"
                          }
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14",
                            height: "25px",
                            px: 2,
                          }}
                        />
                      </TableCell>
                      {/* <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.condition || "-"}
                      </TableCell> */}

                      {/* <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.condition_status || "-"}
                      </TableCell> */}

                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
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
                          disabled={ele?.transfer_status === "received"}
                          // startIcon={<HomeRepairServiceIcon />}
                          onClick={() => handleInward(ele)}
                          sx={{
                            backgroundColor: orangeSecondary,
                            "&:hover": {
                              backgroundColor: orangeSecondary,
                            },
                          }}
                        >
                          Inward
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
            outhotoWarehouseInwardAssetsDataReducer?.data?.result
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
      <DetailModal row={row} open={open} closeModal={closeModal} />
      <MaterialInward row={row} open={openInward} closeModal={closeInward} />
    </>
  );
};

export default InwardAssetsList;
