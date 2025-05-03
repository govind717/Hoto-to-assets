import {
  Button,
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
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import InfoIcon from "@mui/icons-material/Info";

import FullScreenLoader from "app/pages/Components/Loader";
import { oandm_block_maintenace_request_assign_data_disptach } from "app/redux/actions/O&M/Block";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AssignViewModal from "./Modal/AssignViewModal";
import moment from "moment";
import Div from "@jumbo/shared/Div";
const tableBodyCell = { textAlign: "left", px: 1 };
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
const MaintenanceAssignRequest = () => {
  const [sortBy, setSortBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);
  const { oandmBlockMaintenaceRequestAssignDataReducer } = useSelector(
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
      oandm_block_maintenace_request_assign_data_disptach({
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
      oandm_block_maintenace_request_assign_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
      })
    );
  }, [sort, page, sortBy, dispatch]);
  const closeModal = () => {
    setOpen(false);
  };
  const showDetails = (data) => {
    setRow(data);
    setOpen(true);
  };
  return (
    <>
      {oandmBlockMaintenaceRequestAssignDataReducer?.loading && (
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
                            oandm_block_maintenace_request_assign_data_disptach(
                              {
                                sortBy: sortBy,
                                search_value: "",
                                sort: sort,
                                page: page,
                              }
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
                    <Div sx={{ my: "2%" }}>
                      <Button variant="outlined" sx={{borderColor : "#B0BAC9", padding : "6px 20px" , color : "#000" , borderRadius : "5px"}} 
                      // onClick={handleDownload}
                      >
                        <CloudDownloadOutlinedIcon sx={{mr:'10px'}}/> Export
                      </Button>
                    </Div>
                  </Div>
      <TableContainer sx={{ marginTop: "15px" }} component={Paper}>
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
                sx={{ ...tableCellSx, minWidth: "170px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Maintenance Id
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "170px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Request Date
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
                  Location
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
                  Location Code
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
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
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
                  Repair Status
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
                  Document
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
                  Details
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {oandmBlockMaintenaceRequestAssignDataReducer?.data?.result?.data
              ?.length > 0 ? (
              oandmBlockMaintenaceRequestAssignDataReducer?.data?.result?.data?.map(
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
                        {moment(
                          ele?.maintenance_request_details?.createdAt
                        ).format("DD-MM-YYYY") || "-"}
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
                        {ele?.assets_details?.location_details?.gp_name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.location_details?.gp_code || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.assets_details?.condition || "-"}
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
                        {moment(ele?.estimate_arrival_date).format(
                          "DD-MM-YYYY"
                        ) || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.repair_status?.replaceAll("_"," ") || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.document || "-"}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...tableBodyCell,
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
      <AssignViewModal open={open} closeModal={closeModal} row={row} />
    </>
  );
};
export default MaintenanceAssignRequest;
