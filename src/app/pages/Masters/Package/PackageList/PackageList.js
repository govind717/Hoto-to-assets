import Div from "@jumbo/shared/Div";
import Edit from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  Pagination,
  Paper,
  Switch,
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
import { package_data_dispatch } from "app/redux/actions/Master";
import { updatePackage } from "app/services/apis/master";
import {
  PACKAGE_MASTER_ADD,
  PACKAGE_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

const PackageList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [filters,setFilters]=useState({});
  const [applyFilter, setApplyFilter] = useState(false);
  const { packageDataReducer } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleEdit = function (data) {
    navigate(PACKAGE_MASTER_EDIT, { state: data });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      package_data_dispatch({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters: filters,
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
      package_data_dispatch({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters: filters,
      })
    );
  }, [sort, page, sortBy,applyFilter, dispatch]);

  const addMasterItem = () => {
    navigate(PACKAGE_MASTER_ADD);
  };

  const updateStatus = async (body, id) => {
    const data = await updatePackage(body, id);
    if (data?.data?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        text: "Status Updated Successfully",
        timer: 1000,
        showConfirmButton: false,
      });

      // 👇 After successful update, fetch the latest list again
      dispatch(
        package_data_dispatch({
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          filters: filters,
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        text: data?.data?.message
          ? data?.data?.message
          : "Error while updating Status",
      });
    }
  };

  return (
    <>
      {packageDataReducer?.loading && <FullScreenLoader />}
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
                package_data_dispatch({
                  sortBy: sortBy,
                  search_value: "",
                  sort: sort,
                  page: page,
                  filters: filters,
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
            + Add Package
          </Button>
        </Div>
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
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`packageName`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Package Name
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Package Name"
                    field="packageName"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    apiUrl={`/master/package/filter-dropdown?filter_field=packageName`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`code`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Code
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Code"
                    field="code"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    apiUrl={`/master/package/filter-dropdown?filter_field=code`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`state`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    State
                  </TableSortLabel>
                  <FilterModel
                    label="Filter State"
                    field="state"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    apiUrl={`/master/package/filter-dropdown?filter_field=state`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`created_user_details.firstName`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Created By
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Created By"
                    field="created_user_details.firstName"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    apiUrl={`/master/package/filter-dropdown?filter_field=created_user_details.firstName`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`updated_user_details.firstName`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Updated By
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Updated By"
                    field="updated_user_details.firstName"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    apiUrl={`/master/package/filter-dropdown?filter_field=updated_user_details.firstName`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`createdAt`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Created Date
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`updatedAt`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Updated Date
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`status`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "100px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packageDataReducer?.data?.result?.data.length > 0 ? (
              packageDataReducer?.data?.result?.data.map((ele, index) => {
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
                      {ele?.packageName || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.code || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.state || "-"}
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.created_user_details?.firstName || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.updated_user_details?.firstName || "-"}
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
                      {moment(ele?.updatedAt).format("DD-MM-YYYY") || "-"}
                    </TableCell>
                    <TableCell align="left" sx={{ ...tableCellSx }}>
                      <Switch
                        checked={ele?.status === true}
                        onChange={(event) => {
                          const newStatus = event.target.checked;
                          const body = { ...ele, status: newStatus };
                          updateStatus(body, ele?._id);
                        }}
                        color="primary"
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
                        variant="outlined"
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleEdit(ele)}
                        sx={{
                          "&:hover": {
                            backgroundColor: orangeSecondary,
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
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

export default PackageList;
