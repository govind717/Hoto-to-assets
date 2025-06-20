import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
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

import { debounce, filter } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import { hoto_block_wise_asset_data_disptach } from "app/redux/actions/Hoto_to_servey/Block";
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

const BlockWiseAssetList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const {state}=useLocation();
  const { hotoBlockWiseAssetDataReducer } = useSelector((state) => state);
  const { packageNoDataReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [robustFilterValue, setRobustFilterValue] = useState(null);
  const [robustFilterKey, setRobustFilterKey] = useState("");
  const [filters, setFilters] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterAvailabilityValue,setFilterAvailabilityValue]=useState('All')
  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  // const handleItemAction = function (menuItems) {
  //     const data = menuItems?.data;
  //     switch (menuItems.action) {
  //         case "equipmentDetails":
  //             navigate("/dashboards/hoto-survey-data/equipment-details", {
  //                 state: {
  //                     gp_data: data
  //                 }
  //             })
  //             break;
  //         default:
  //             break;
  //     }
  // }

  const handleEquipmentDetails = function (data) {
    navigate("/dashboards/hoto-survey-data/equipment-details", {
      state: {
        gp_data: data,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      hoto_block_wise_asset_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          robustper: state?.robustper || robustFilterKey,
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
      hoto_block_wise_asset_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          robustper: state?.robustper || robustFilterKey,
          filters: filters,
        },
        packageNoDataReducer?.data
      )
    );
  }, [sort, page, sortBy, packageNoDataReducer?.data,filterAvailabilityValue,robustFilterKey, applyFilter, dispatch]);

  const showDetails = (data) => {
    navigate("/dashboards/hoto-survey-block-data/block-wise-details", {
      state: data,
    });
  };

  const handleAvailabilityChange=(val)=>{
    if (val === "Yes") {
      setFilters((prev) => ({ ...prev, availability: true }));
      setFilterAvailabilityValue("Yes");
    } else if (val === "No") {
      setFilters((prev) => ({ ...prev, availability: false }));
      setFilterAvailabilityValue("No");
    }else if(val === "All") {
      const newFilter={...filters};
      delete newFilter?.availability;
      setFilters(newFilter);
      setFilterAvailabilityValue("All");
    }
  }
  const getRobustLabel = (percentage) => {
    if (percentage === 100) return "100% Robust";
    if (percentage > 50) return "Greater than 50";
    if (percentage < 50) return "Less than 50";
    return "N/A";
  };
  const handleRobustChange = (_, newValue) => {
    setRobustFilterValue(newValue);

    if (newValue === "100% Robust") {
      setRobustFilterKey("equal100");
    } else if (newValue === "greater than 50%") {
      setRobustFilterKey("greater50");
    } else if (newValue === "less than 50%") {
      setRobustFilterKey("lesser50");
    } else {
      setRobustFilterKey("");
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
                hoto_block_wise_asset_data_disptach(
                  {
                    sortBy: sortBy,
                    search_value: "",
                    sort: sort,
                    page: page,
                    robustper: state?.robustper || robustFilterKey,
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
          <Div sx={{ display: "flex", gap: "20px" }}>
                  <FormControl fullWidth size="small" sx={{ my: "2%" }}>
                    <Autocomplete
                      disablePortal
                      size="small"
                      options={["100% Robust", "greater than 50%", "less than 50%"]}
                      getOptionLabel={(option) => option}
                      isOptionEqualToValue={(option, value) => option === value}
                      sx={{ minWidth: 150 }}
                      value={robustFilterValue}
                      onChange={handleRobustChange}
                      renderInput={(params) => (
                        <TextField {...params} label="Robust Filter" />
                      )}
                    />
                  </FormControl>
                </Div>
      </Div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Sr No
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`block.name`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Block
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Block "
                    field="block.name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/block-wise/filter-dropdown?filter_field=block.name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`block.code`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Block Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Block Code"
                    field="block.code"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/block-wise/filter-dropdown?filter_field=block.code&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`district.name`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    District
                  </TableSortLabel>
                  <FilterModel
                    label="Filter District "
                    field="district.name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/block-wise/filter-dropdown?filter_field=district.name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`district.code`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    District Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter District Code"
                    field="district.code"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/block/block-wise/filter-dropdown?filter_field=district.code&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`robustPercentage`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Robust %
                  </TableSortLabel>
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                Assets
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotoBlockWiseAssetDataReducer?.loading ? (
              <TableLoader />
            ) : hotoBlockWiseAssetDataReducer?.data?.result?.data?.length >
              0 ? (
              hotoBlockWiseAssetDataReducer?.data?.result?.data?.map(
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
                        {ele?.block?.name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.block?.code || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.district?.name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.district?.code || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {getRobustLabel(ele?.robustPercentage)}
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
                          startIcon={<HomeRepairServiceIcon />}
                          onClick={() => showDetails(ele)}
                          // onClike={() => showDetails(ele)}
                          sx={{
                            backgroundColor: orangeSecondary,
                            "&:hover": {
                              backgroundColor: orangeSecondary,
                            },
                          }}
                        >
                          View
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
          count={hotoBlockWiseAssetDataReducer?.data?.result?.total_pages || 1}
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

export default BlockWiseAssetList;
