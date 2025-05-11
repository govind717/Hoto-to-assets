import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
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
import { hoto_servey_data_disptach } from "app/redux/actions/Hoto_to_servey";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import MapLocation from "app/pages/Hoto_to_Assets/MapLocation";
import { BLOCK_MASTER } from "app/utils/constants/routeConstants";

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

const IndentList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const { hotoServeyDataReducer } = useSelector((state) => state);

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
    // dispatch(
    //   hoto_servey_data_disptach({
    //     sortBy: sortBy,
    //     search_value: searchTerm.trim(),
    //     sort: sort,
    //     page: page,
    //   })
    // );
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
    // dispatch(
    //   hoto_servey_data_disptach({
    //     sortBy: sortBy,
    //     search_value: searchTerm.trim(),
    //     sort: sort,
    //     page: page,
    //   })
    // );
  }, [sort, page, sortBy, dispatch]);

  const addMasterItem = () => {
    navigate(BLOCK_MASTER);
  };
  return (
    <>
      {/* {hotoServeyDataReducer?.loading && <FullScreenLoader />} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "100px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Sr No.
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Indent ID
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
                  Request Date
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
                  Item Name
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
                  Swap Wise
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
                  District
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
                  Block
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
                  GP
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
                  Indent Status
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
                  ETA
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {
                            hotoServeyDataReducer?.hoto_servey_data?.data?.data?.map((ele, index) => {
                                return (
                                    <TableRow key={ele?.id}>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {ele?.gp?.name || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {ele?.gp?.code || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {ele?.gp?.block?.name || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {ele?.gp?.block?.code || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {ele?.gp?.district?.name || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {ele?.gp?.district?.code || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize",
                                        }}>
                                            <IconButton aria-label="info" size="medium" onClick={() => {
                                                setCoordinate({
                                                    open: true,
                                                    gp_name: ele?.gp?.name,
                                                    lat: ele?.gp?.latitude,
                                                    log: ele?.gp?.longitude
                                                })
                                            }}>
                                                <ShareLocationIcon fontSize="medium" color='primary' />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            <Button variant="contained"
                                                size="small"
                                                startIcon={<HomeRepairServiceIcon />}
                                                onClick={() => handleEquipmentDetails(ele)}
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: orangeSecondary
                                                    }
                                                }}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        } */}
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
          </TableBody>
        </Table>
        <Pagination
          count={1}
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

export default IndentList;
