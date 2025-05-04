import {
  Pagination,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { oandm_block_maintenace_request_assign_data_disptach } from "app/redux/actions/O&M/Block";
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
const ScrapAssignRequest = () => {
  const [sortBy, setSortBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

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

  return (
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
              sx={{ ...tableCellSx, minWidth: "220px" }}
            >
              <TableSortLabel
                onClick={() => handleSort(`current_data.companyType`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Maintenance Id
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
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Serial No.
              </TableSortLabel>
            </TableCell>
            <TableCell align={"left"} sx={{ ...tableCellSx }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
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
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Location Code
              </TableSortLabel>
            </TableCell>
            <TableCell align={"left"} sx={{ ...tableCellSx, minWidth:"220px" }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Maintenance Type
              </TableSortLabel>
            </TableCell>
            <TableCell align={"left"} sx={{ ...tableCellSx }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Condition
              </TableSortLabel>
            </TableCell>
            <TableCell align={"left"} sx={{ ...tableCellSx }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align={"left"} sx={{ ...tableCellSx }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Issue Date
              </TableSortLabel>
            </TableCell>
            <TableCell align={"left"} sx={{ ...tableCellSx }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Due Date
              </TableSortLabel>
            </TableCell>

            <TableCell align={"left"} sx={{ ...tableCellSx }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
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
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Repair Reason
              </TableSortLabel>
            </TableCell>
            <TableCell
              align={"left"}
              sx={{ ...tableCellSx, minWidth: "220px" }}
            >
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Repair Status
              </TableSortLabel>
            </TableCell>

            <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "80px" }}>
              <TableSortLabel
                onClick={() => handleSort(`current_data.commissionPercentage`)}
                direction={sort}
                sx={{ ...tableCellSort }}
              >
                Details
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        
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
  );
};
export default ScrapAssignRequest;
