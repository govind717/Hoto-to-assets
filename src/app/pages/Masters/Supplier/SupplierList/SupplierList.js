import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,  
  TableCell as MuiTableCell,
  TableBody as MuiTableBody,  
  Box,
} from "@mui/material";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import {
  SUPPLIER_MASTER_ADD,
  SUPPLIER_MASTER_EDIT,
} from "app/utils/constants/routeConstants";
import { supplier_data_dispatch } from "app/redux/actions/Master";
import moment from "moment";
import { Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import { updateSupplier, updateWarehouse } from "app/services/apis/master";
import FilterModel from "app/Components/FilterModel";
import DateModel from "app/Components/DateModel";

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
const commonCellStyle = {
  textAlign: "left",
  verticalAlign: "middle",
  textTransform: "capitalize",
};
const SupplierList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const { supplierDataReducer } = useSelector((state) => state);
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

  const handleOpenDialog = (contacts) => {
    setSelectedContacts(contacts || []); // if no contacts, empty array
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = function (data) {
    navigate(SUPPLIER_MASTER_EDIT, { state: data });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      supplier_data_dispatch({
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
      supplier_data_dispatch({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
        filters: filters,
      })
    );
  }, [sort, page, applyFilter, sortBy, dispatch]);

  const addMasterItem = () => {
    navigate(SUPPLIER_MASTER_ADD);
  };
  const updateStatus = async (body, id) => {
    const newBody = {
      supplier_details: {
        ...body,
      },
      branch_details: body?.branch_details
    };
    const data = await updateSupplier(newBody, id);
    if (data?.data?.statusCode === 200) {
      Swal.fire({
        icon: "success",
        text: "Status Updated Successfully",
        timer: 1000,
        showConfirmButton: false,
      });

      // 👇 After successful update, fetch the latest list again
      dispatch(
        supplier_data_dispatch({
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
      {supplierDataReducer?.loading && <FullScreenLoader />}
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
                supplier_data_dispatch({
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
            + Add Supplier
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
                    onClick={() => handleSort(`supplierName`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Supplier Name
                  </TableSortLabel>
                  <FilterModel
                    label="Filter upplier Name"
                    field="supplierName"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=supplierName`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`phoneNumber`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Phone Number
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Phone Number"
                    field="phoneNumber"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=phoneNumber`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`email`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Email
                  </TableSortLabel>
                  <FilterModel
                    label="Filter Email"
                    field="email"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=email`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`onBoardingDate`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    on Boarding Date
                  </TableSortLabel>
                  <FilterModel
                    label="Filter on Boarding Date"
                    field="onBoardingDate"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=onBoardingDate`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

                  <TableSortLabel
                    onClick={() => handleSort(`address`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Address
                  </TableSortLabel>
                  <FilterModel
                    label="Filter City"
                    field="city"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=city`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`city`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    City
                  </TableSortLabel>
                  <FilterModel
                    label="Filter City"
                    field="city"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=city`}
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
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=state`}
                  />
                </Box>
              </TableCell>

              <TableCell align="left" sx={{ ...tableCellSx }}>
                Contact Details
              </TableCell>

              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`status`)}
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
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=status`}
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
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=created_user_details.firstName`}
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
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=updated_user_details.firstName`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`createdAt`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
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
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=createdAt`}
                  /> */}
                   <DateModel
                    label="Filter Created Date"
                    field="createdAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=createdAt`}
                  />
                </Box>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TableSortLabel
                    onClick={() => handleSort(`updatedAt`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
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
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=updatedAt`}
                  /> */}
                  <DateModel
                    label="Filter Updated Date"
                    field="updatedAt"
                    filters={filters}
                    setFilters={setFilters}
                    setApplyFilter={setApplyFilter}
                    package_name={packageNoDataReducer?.data}
                    apiUrl={`/master/supplier/filter-dropdown?filter_field=updatedAt`}
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
            {supplierDataReducer?.data?.result?.data?.length > 0 ? (
              supplierDataReducer.data.result.data.map((ele, index) => (
                <TableRow key={ele?.id}>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.supplierName || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.phoneNumber || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.email || "-"}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ ...commonCellStyle, minWidth: "220px" }}
                  >
                    {moment(ele?.onBoardingDate).format("DD-MM-YYYY") || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.address || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.city || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.state || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    <IconButton
                      onClick={() => handleOpenDialog(ele?.contactPerson)}
                      color="primary"
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell align="left" sx={{ ...commonCellStyle }}>
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
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.created_user_details?.firstName || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.updated_user_details?.firstName || "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.createdAt
                      ? moment(ele.createdAt).format("DD-MM-YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
                    {ele?.updatedAt
                      ? moment(ele.updatedAt).format("DD-MM-YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell align="left" sx={{ ...commonCellStyle }}>
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
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={10} sx={commonCellStyle}>
                  No Data Found!
                </TableCell>
              </TableRow>
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Contact Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
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
                  <TableSortLabel
                    onClick={() => handleSort(`supplierName`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align={"left"}
                  sx={{ ...tableCellSx, minWidth: "220px" }}
                >
                  <TableSortLabel
                    onClick={() => handleSort(`phoneNumber`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Phone Number
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  align={"left"}
                  sx={{ ...tableCellSx, minWidth: "220px" }}
                >
                  <TableSortLabel
                    onClick={() => handleSort(`email`)}
                    direction={sort}
                    sx={{ ...tableCellSort }}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedContacts?.length > 0 ? (
                selectedContacts?.map((ele, index) => (
                  <TableRow key={ele?.id}>
                    <TableCell align="left" sx={{ ...commonCellStyle }}>
                      {index + 1}
                    </TableCell>
                    <TableCell align="left" sx={{ ...commonCellStyle }}>
                      {ele?.firstName + " " + ele?.lastName || "-"}
                    </TableCell>
                    <TableCell align="left" sx={{ ...commonCellStyle }}>
                      {ele?.mobileNumber || "-"}
                    </TableCell>
                    <TableCell align="left" sx={{ ...commonCellStyle }}>
                      {ele?.email || "-"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={10} sx={commonCellStyle}>
                    No contact details available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupplierList;
