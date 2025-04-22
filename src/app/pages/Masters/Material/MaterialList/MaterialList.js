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
import { MATERIAL_MASTER_ADD } from "app/utils/constants/routeConstants";

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

const MaterialList = () => {
  const [sortBy, setSortBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [coordinate, setCoordinate] = useState({
    open: false,
    gp_name: null,
    lat: null,
    log: null,
  });

  const { hotoServeyDataReducer } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleEquipmentDetails = function (data) {
    navigate("/dashboards/hoto-survey-data/equipment-details", {
      state: {
        gp_data: data,
      },
    });
  };

  const handleCloseCoordinate = function () {
    setCoordinate({
      open: false,
      gp_name: null,
      lat: null,
      log: null,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      hoto_servey_data_disptach({
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
      hoto_servey_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
      })
    );
  }, [sort, page, sortBy, dispatch]);

  const addMasterItem = () => {
    navigate(MATERIAL_MASTER_ADD);
  };
  return (
    <>
      {hotoServeyDataReducer?.loading && <FullScreenLoader />}
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
                hoto_servey_data_disptach({
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
        <Div sx={{ my: "2%" }}>
          <Button
            variant="contained"
            sx={{ ...addBtnStyle }}
            onClick={addMasterItem}
          >
            + Add Material
          </Button>
        </Div>
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
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Material Name
                </TableSortLabel>
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
                  Material Code
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Sub Category
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  UOM
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  HSN Code
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  GST %
                </TableSortLabel>
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
                  Status
                </TableSortLabel>
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
                  Created By
                </TableSortLabel>
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
                  Updated By
                </TableSortLabel>
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
                  Created Date
                </TableSortLabel>
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
                  Updated Date
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
      {coordinate?.open && (
        <MapLocation
          coordinate={coordinate}
          handleClose={handleCloseCoordinate}
        />
      )}
    </>
  );
};

export default MaterialList;
