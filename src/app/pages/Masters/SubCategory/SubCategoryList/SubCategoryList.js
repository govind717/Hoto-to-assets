import Div from "@jumbo/shared/Div";
import { Edit } from "@mui/icons-material";
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
import { sub_category_data_dispatch } from "app/redux/actions/Master";
import { updateSubCategory } from "app/services/apis/master";
import { SUB_CATEGORY_MASTER_ADD, SUB_CATEGORY_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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

const SubCategoryList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const { subCategoryDataReducer } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { packageNoDataReducer } = useSelector((state) => state);
  const [filters, setFilters] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };


  const handleEdit = function (data) {
    navigate(SUB_CATEGORY_MASTER_EDIT, { state: data });
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      sub_category_data_dispatch({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters:filters,
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
      sub_category_data_dispatch({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters:filters,
      })
    );
  }, [sort, page, sortBy,applyFilter, dispatch]);

  const addMasterItem = () => {
    navigate(SUB_CATEGORY_MASTER_ADD);
  };

  const updateStatus = async (body, id) => {
    const data = await updateSubCategory(body, id);
    if (data?.data?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        text: "Status Updated Successfully",
        timer: 1000,
        showConfirmButton: false,
      });

      // 👇 After successful update, fetch the latest list again
      dispatch(
        sub_category_data_dispatch({
          sortBy: sortBy,
          search_value: searchTerm.trim(),
          sort: sort,
          page: page,
          filters:filters,
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
      {subCategoryDataReducer?.loading && <FullScreenLoader />}
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
                sub_category_data_dispatch({
                  sortBy: sortBy,
                  search_value: "",
                  sort: sort,
                  page: page,
                  filters:filters,
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
            + Add Sub Category
          </Button>
        </Div>
      </Div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Sr No.
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`category_details.category`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Category
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Category"
                    field="category_details.category"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/sub-category/filter-dropdown?filter_field=category_details.category`}
                  />
                </Box>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "180px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`subcategory`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Sub Category
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Sub Category"
                    field="subcategory"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/sub-category/filter-dropdown?filter_field=subcategory`}
                  />
                </Box>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(`created_user_details.firstName`)
                    }
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
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/sub-category/filter-dropdown?filter_field=created_user_details.firstName`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(`updated_user_details.firstName`)
                    }
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
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/sub-category/filter-dropdown?filter_field=updated_user_details.firstName`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(`createdAt`)
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Created Date
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Created Date"
                    field="createdAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/sub-category/filter-dropdown?filter_field=createdAt`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "200px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(`updatedAt`)
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Updated Date
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Updated Date"
                    field="updatedAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/sub-category/filter-dropdown?filter_field=updatedAt`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "80px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() =>
                      handleSort(`status`)
                    }
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Status
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Status"
                    field="status"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/sub-category/filter-dropdown?filter_field=status`}
                  />
                </Box>
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
            {subCategoryDataReducer?.data?.result?.data.length > 0 ? (
              subCategoryDataReducer?.data?.result?.data.map((ele, index) => {
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
                      {ele?.category_details?.category || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.subcategory || "-"}
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

export default SubCategoryList;
