import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from "@jumbo/shared/Div";
import SearchIcon from "@mui/icons-material/Search";
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
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import { UOM_MASTER_ADD, UOM_MASTER_EDIT } from "app/utils/constants/routeConstants";
import { uom_data_dispatch } from "app/redux/actions/Master";
import moment from "moment";
import { Edit } from "@mui/icons-material";

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

const UOMList = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
 

  const { uomDataReducer } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

   
  const handleEdit = function (data) {
    navigate(UOM_MASTER_EDIT, {state: data});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1);
    dispatch(
      uom_data_dispatch({
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
      uom_data_dispatch({
        sortBy: sortBy,
        search_value: searchTerm.trim(),
        sort: sort,
        page: page,
      })
    );
  }, [sort, page, sortBy, dispatch]);

  const addMasterItem = () => {
    navigate(UOM_MASTER_ADD);
  };
  return (
    <>
      {uomDataReducer?.loading && <FullScreenLoader />}
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
                uom_data_dispatch({
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
            + Add UOM
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
                <TableSortLabel
                  onClick={() => handleSort(`uom`)}
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  UOM
                </TableSortLabel>
              </TableCell>

              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`createdBy`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Created By
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`updatedBy`)
                  }
                  direction={sort}
                  sx={{ ...tableCellSort }}
                >
                  Updated By
                </TableSortLabel>
              </TableCell>
              <TableCell
                align={"left"}
                sx={{ ...tableCellSx, minWidth: "180px" }}
              >
                <TableSortLabel
                  onClick={() =>
                    handleSort(`createdAt`)
                  }
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
                  onClick={() =>
                    handleSort(`updatedAt`)
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
                     {uomDataReducer?.data?.result?.data.length > 0 ? (
                      uomDataReducer?.data?.result?.data.map((ele, index) => {
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
                               {ele?.uom || "-"}
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

export default UOMList;
