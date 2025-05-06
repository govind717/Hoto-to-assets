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
import FullScreenLoader from "app/pages/Components/Loader";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateTransferModal from "./Modal/CreateTransferModal";
import TransferRequestViewModel from "./Modal/TransferRequestViewModel";
import { oandm_gp_transfer_request_data_disptach } from "app/redux/actions/O&M/GP";
import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { orangeSecondary } from "app/pages/Constants/colors";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
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
const TransferRequest = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [openCreateTransefer,setOpenCreateTransefer]=useState(false);
  const [openTransferRequest,setOpenTransferRequest]=useState(false);
  const [row,setRow]=useState(null);
  const { oandmGpTransferRequestDataReducer } = useSelector(
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
      oandm_gp_transfer_request_data_disptach({
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
      oandm_gp_transfer_request_data_disptach({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
      })
    );
  }, [sort, page, sortBy, dispatch]);
  const closeCreateTransefer=()=>{
    setOpenCreateTransefer(false)
  }
  const closeTransferRequest =()=>{
    setOpenTransferRequest(false);
  }
   const handleAssign = (data) => {
     setRow(data);
     setOpenCreateTransefer(true);
   };
   const showDetails = (data) => {
     setRow(data);
     setOpenTransferRequest(true);
   };
  return (
    <>
      {oandmGpTransferRequestDataReducer?.loading && <FullScreenLoader />}
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
                oandm_gp_transfer_request_data_disptach({
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
            variant="outlined"
            sx={{
              borderColor: "#B0BAC9",
              padding: "6px 20px",
              color: "#000",
              borderRadius: "5px",
            }}
            // onClick={handleDownload}
          >
            <CloudDownloadOutlinedIcon sx={{ mr: "10px" }} /> Export
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
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Transfer ID
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Request Date
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
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
                  Transfer Type
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
                  Transfer From
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
                  Transfer To
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
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() =>
                    handleSort(`current_data.commissionPercentage`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Initiated By
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
                  Remark
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
                  Actions
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {oandmGpTransferRequestDataReducer?.data?.result?.data?.length >
            0 ? (
              oandmGpTransferRequestDataReducer?.data?.result?.data?.map(
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
                        {ele?.transfer_type || "-"}
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
                        {ele?.transfer_to?.location_name || "-"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.gp?.block?.code || "-"}
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
                        align="left"
                        sx={{
                          textAlign: "left",
                          verticalAlign: "middle",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.remarks || "-"}
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
                          // startIcon={<HomeRepairServiceIcon />}
                          onClick={() => handleAssign(ele)}
                          sx={{
                            backgroundColor: orangeSecondary,
                            "&:hover": {
                              backgroundColor: orangeSecondary,
                            },
                          }}
                        >
                          Assign
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
      <CreateTransferModal
        open={openCreateTransefer}
        closeModal={closeCreateTransefer}
        row={row}
      />
      <TransferRequestViewModel
        open={openTransferRequest}
        row={row}
        closeModal={closeTransferRequest}
      />
    </>
  );
};
export default TransferRequest;
