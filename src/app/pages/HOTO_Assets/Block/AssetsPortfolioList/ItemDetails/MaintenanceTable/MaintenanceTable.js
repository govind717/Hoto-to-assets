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
import moment from "moment";
import { hoto_block_asset_partfolio_maintenance_data_disptach } from "app/redux/actions/Hoto_to_servey/Block";

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

const MaintenanceTable = ({ row }) => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const { hotoBlockAssetPortfolioMaintenanceDataReducer } = useSelector(
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
      hoto_block_asset_partfolio_maintenance_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          filters: {
            _ids: {
              assets_id: row._id,
            },
          },
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
      hoto_block_asset_partfolio_maintenance_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          filters: {
            _ids: {
              assets_id: row._id,
            },
          },
        },
        packageNoDataReducer?.data
      )
    );
  }, [sort, page, sortBy,packageNoDataReducer?.data, dispatch]);

  return (
    <>
      {hotoBlockAssetPortfolioMaintenanceDataReducer?.loading && (
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
                hoto_block_asset_partfolio_maintenance_data_disptach(
                  {
                    sortBy: sortBy,
                    search_value: "",
                    sort: sort,
                    page: page,
                    filters: {
                      _ids: {
                        assets_id: row._id,
                      },
                    },
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
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Maintenance ID
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Requested Date
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
                  Equipment
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
                  Serial No.
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
                  Repair Type
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
                  Allocated To
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
                  Assigned To
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
                  Issue Reported
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Issue Date
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, }}
              >
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
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, }}
              >
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
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Document
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, }}
              >
                Remark
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotoBlockAssetPortfolioMaintenanceDataReducer?.data?.result?.data
              ?.length > 0 ? (
              hotoBlockAssetPortfolioMaintenanceDataReducer?.data?.result?.data?.map(
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
                        {moment(ele?.estimate_arrival_date).format("DD-MM-YYYY") || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.repair_status || "-"}
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
          count={
            hotoBlockAssetPortfolioMaintenanceDataReducer?.data?.result
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
    </>
  );
};

export default MaintenanceTable;
