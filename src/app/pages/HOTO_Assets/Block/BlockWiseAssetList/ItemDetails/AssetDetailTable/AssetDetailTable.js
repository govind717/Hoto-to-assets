import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditModal from "../Modal/EditModal";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import EquipmentModal from "./Equipment_details_models";
const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "145px",
  verticalAlign: "middle",
};

const tableCellSort = {
  color: "white",
  "&:hover": { color: "white" },
  "&.MuiTableSortLabel-root.Mui-active": {
    color: "white",
  },
};
const AssetDetailTable = ({ data }) => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);
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

  useEffect(() => {}, [sort, page, sortBy, dispatch]);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const showDetails = (data) => {
    navigate(
      "/dashboards/hoto-survey-block-data/block-wise-details/rack-details"
    );
  };
    const [equipment_show, set_equipment_show] = useState({
      open: false,
      equipment_name: null,
    });
    
    
    const handleOpen = (data) => {
      set_equipment_show({
        open: true,
        data: data,
      });
    };
    const handleClose = () => {
      set_equipment_show({
        open: false,
        equipment_name: null,
      });
    };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#53B8CA" }}>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Sr No
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`equipment`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Equipment
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`serial_no`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Serial No.
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "220px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`current_data.companyType`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Warranty Status
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "160px" }}
              >
                <TableSortLabel
                  onClick={() => handleSort(`transferFrom`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Condition
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                <TableSortLabel
                  onClick={() => handleSort(`transferTo`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Details
              </TableCell>
              <TableCell align={"left"} sx={{ ...tableCellSx }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data?.map((ele, index) => {
                return (
                  <TableRow>
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
                      {ele?.equipment_name || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.serial_no || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.warranty_status ? "True" : "false"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.condition || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.condition_status || "-"}
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // textAlign: "left",
                          // px: 1,
                          // display: "flex",
                          // alignItems: "center",
                          // justifyContent: "center",
                        }
                      }
                    >
                      <InfoIcon
                        sx={{
                          "&:hover": { cursor: "pointer", color: "black" },
                        }}
                        // onClick={() => {
                        //   showDetails(ele);
                        // }}
                        onClick={() => handleOpen(ele)}
                      />
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // textAlign: "left",
                          // px: 1,
                          // display: "flex",
                          // alignItems: "center",
                          // justifyContent: "center",
                        }
                      }
                    >
                      <EditIcon
                        sx={{
                          "&:hover": { cursor: "pointer", color: "black" },
                        }}
                        onClick={() => {
                          setRow(ele);
                          setOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
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
      {equipment_show?.open && (
              <EquipmentModal
                equipment_show={equipment_show}
                handleClose={handleClose}
              />
            )}
      <EditModal open={open} handleClose={handleCloseModal} row={row} />
    </>
  );
};
export default AssetDetailTable;
