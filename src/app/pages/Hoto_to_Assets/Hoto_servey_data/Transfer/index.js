import Div from '@jumbo/shared/Div';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const tableCellSx = {
    textTransform: "capitalize",
    color: "white",
    textAlign: "left",
    minWidth: "145px",
    verticalAlign: "middle",
}

const tableCellSort = {
    color: "white",
    "&:hover": { color: "white" },
    "&.MuiTableSortLabel-root.Mui-active": {
        color: "white",
    },
}


const Transfer_list = () => {

    const [sortBy, setSortBy] = useState("created_at");
    const [searchTerm, setSearchTerm] = useState("")
    const [sort, setSort] = useState("desc");
    const [page, setPage] = useState(1);


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
        setPage(1)
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
    }, [sort, page, sortBy, dispatch])

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
            </Div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" >
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#53B8CA" }}>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.marketExecutiveId.current_data.contact_person_details.first_name`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Equipment</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.companyType`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Type</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.companyType`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Serial No.</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx,minWidth:"160px" }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.companyType`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Transfer Type</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx,minWidth:"160px" }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Transfer From</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Transfer To</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx,minWidth:"160px" }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Transfer Date</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Received By</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                Status
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                Remark
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left"
                                colSpan={10}
                                sx={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    textTransform: "capitalize"
                                }}>
                                No Data Found!
                            </TableCell>

                        </TableRow>
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
    )
}

export default Transfer_list