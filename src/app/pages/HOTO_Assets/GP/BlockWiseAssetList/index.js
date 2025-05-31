import Div from "@jumbo/shared/Div";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
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
import FilterModel from "app/Components/FilterModel";

import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import { hoto_gp_wise_asset_data_disptach } from "app/redux/actions/Hoto_to_servey/GP";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  const { hotoGpWiseAssetDataReducer } = useSelector((state) => state);
  const { packageNoDataReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [availabilityConditionFilters, setAvailabilityConditionFilters] =
    useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterAvailabilityValue, setFilterAvailabilityValue] = useState("All");
  const [filterConditionValue, setFilterConditionValue] = useState("All");
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      hoto_gp_wise_asset_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          availabilityConditionFilters: availabilityConditionFilters,
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
      hoto_gp_wise_asset_data_disptach(
        {
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          availabilityConditionFilters: availabilityConditionFilters,
          filters: filters,
        },
        packageNoDataReducer?.data
      )
    );
  }, [sort, page, sortBy, packageNoDataReducer?.data,filterAvailabilityValue,filterConditionValue, applyFilter, dispatch]);

  const showDetails = (data) => {
    navigate("/dashboards/hoto-survey-gp-data/gp-wise-details", {
      state: data,
    });
  };

  const handleAvailabilityChange = (val) => {
    if (val === "Yes") {
      setAvailabilityConditionFilters((prev)=>({
        ...prev,
        availability:true
      }))
      setFilterAvailabilityValue("Yes");
    } else if (val === "No") {
      setAvailabilityConditionFilters((prev) => ({
        ...prev,
        availability: false,
      }));
      setFilterAvailabilityValue("No");
    } else if (val === "All") {
      const newFilter = { ...availabilityConditionFilters };
      delete newFilter?.availability
      setAvailabilityConditionFilters(newFilter);
      setFilterAvailabilityValue("All");
    }
  };
  const handleConditionChange = (val) => {
    if (val === "Robust") {
      setAvailabilityConditionFilters((prev) => ({
        ...prev,
        condition: 'robust',
      }));
      setFilterConditionValue("Robust");
    } else if (val === "Damaged") {
      setAvailabilityConditionFilters((prev) => ({
        ...prev,
        condition: "damaged",
      }));
      setFilterConditionValue("Damaged");
    } else if (val === "All") {
      const newFilter = { ...availabilityConditionFilters };
      delete newFilter?.condition;
      setAvailabilityConditionFilters(newFilter);
      setFilterConditionValue("All");
    }
  };
  return (
    <>
      {hotoGpWiseAssetDataReducer?.loading && <FullScreenLoader />}
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
                hoto_gp_wise_asset_data_disptach(
                  {
                    sortBy: sortBy,
                    search_value: "",
                    sort: sort,
                    page: page,
                    availabilityConditionFilters: availabilityConditionFilters,
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
        <Div sx={{display:'flex',gap:'20px'}}>
          <FormControl fullWidth size="small" sx={{ my: "2%" }}>
            <Autocomplete
              disablePortal
              size="small"
              options={["All", "Yes", "No"]}
              getOptionLabel={(option) => option}
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
          <FormControl fullWidth size="small" sx={{ my: "2%" }}>
            <Autocomplete
              disablePortal
              size="small"
              options={["All", "Damaged", "Robust"]}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) =>
                option?.label === value?.label
              }
              sx={{ width: 200 }}
              value={filterConditionValue}
              onChange={(_, newValue) => handleConditionChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Condition" />
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
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`location_name`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    GP Name
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Block "
                    field="location_name"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/gp-wise/filter-dropdown?filter_field=location_name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`location_code`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    LGD Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Block "
                    field="location_code"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/hoto-to-assets/gp/gp-wise/filter-dropdown?filter_field=location_code&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
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
                    apiUrl={`/hoto-to-assets/gp/gp-wise/filter-dropdown?filter_field=block.name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
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
                    apiUrl={`/hoto-to-assets/gp/gp-wise/filter-dropdown?filter_field=block.code&package_name=${packageNoDataReducer?.data}`}
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
                    apiUrl={`/hoto-to-assets/gp/gp-wise/filter-dropdown?filter_field=district.name&package_name=${packageNoDataReducer?.data}`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
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
                    apiUrl={`/hoto-to-assets/gp/gp-wise/filter-dropdown?filter_field=district.code&package_name=${packageNoDataReducer?.data}`}
                  />
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
            {hotoGpWiseAssetDataReducer?.data?.result?.data?.length > 0 ? (
              hotoGpWiseAssetDataReducer?.data?.result?.data?.map(
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
                        {ele?.location_name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.location_code || "-"}
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
          count={hotoGpWiseAssetDataReducer?.data?.result?.total_pages || 1}
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
