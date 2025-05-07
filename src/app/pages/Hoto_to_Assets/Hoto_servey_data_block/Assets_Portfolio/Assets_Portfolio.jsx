import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Div from '@jumbo/shared/Div';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, InputAdornment, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography, Popper, ClickAwayListener, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { hoto_servey_block_data_disptach } from 'app/redux/actions/Hoto_to_servey';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MapLocation from "../../MapLocation";
import FullScreenLoader from "app/pages/Components/Loader";
import { orangeSecondary } from "app/pages/Constants/colors";
import EquipmentModal from "../Gp_equipment_details/Gp_equipments/Equipment_details_models";
import Gp_details from "../Gp_equipment_details/Gp_details";
import AddTransfer from "../Transfer/Add_transfer";
import AddRepair from "../Transfer/Add_repair";
import FilterListIcon from '@mui/icons-material/FilterList';
import { equipment_types } from "app/utils/constants/constants";


const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "150px",
  verticalAlign: "middle",
}

const tableCellSort = {
  color: "white",
  "&:hover": { color: "white" },
  "&.MuiTableSortLabel-root.Mui-active": {
    color: "white",
  },
}


const Assets_Portfolio_List = () => {

  const { hotoServeyBlockDataReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("")
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCancel = () => {
    setAnchorEl(null);
  };
  const [coordinate, setCoordinate] = useState({
    open: false,
    gp_name: null,
    lat: null,
    log: null
  });
  const [equipmentFilterName, setEquipmentFilterName] = useState("racks");
  const [equipment_show, set_equipment_show] = useState({
    open: false,
    equipment_name: equipmentFilterName,
    equipment_details: {}
  });
  const handleOpen = (equipment_details) => {
    set_equipment_show({
      open: true,
      equipment_name: equipmentFilterName,
      equipment_details: equipment_details
    })
  }
  const handleClose = () => {
    set_equipment_show({
      open: false,
      equipment_name: equipmentFilterName,
      equipment_details: {}
    })
  }

  const handleSort = (property) => {
    setSort(sort === "asc" ? "desc" : "asc");
    setSortBy(property);
    setPage(1);
  };

  const handleCloseCoordinate = function () {
    setCoordinate({
      open: false,
      gp_name: null,
      lat: null,
      log: null
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setPage(1)
    // dispatch(hoto_servey_block_data_disptach({
    //   sortBy: sortBy,
    //   search_value: searchTerm.trim(),
    //   sort: sort,
    //   page: page,
    // }));
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
    dispatch(hoto_servey_block_data_disptach({
      sortBy: sortBy,
      search_value: searchTerm.trim(),
      sort: sort,
      page: page,
    }));
  }, [sort, page, sortBy, dispatch])


  const handleCheckboxChange = (event) => {
    setEquipmentFilterName(event.target.value);
  };
  return (
    <>
      {hotoServeyBlockDataReducer?.loading && <FullScreenLoader />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: "2%",
        }}
      >
        <Div>
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
                  hoto_servey_block_data_disptach({
                    sortBy: sortBy,
                    search_value: "",
                    sort: sort,
                    page: page,
                  })
                );
              }
            }}
            sx={{ width: 300 }}
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
        <Div>
          <AddTransfer />
          <AddRepair />
        </Div>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          {/* <TableHead>
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
                                >Vendor</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.companyType`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Serial No.</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.companyType`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >GP Name</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >GP Status</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx,minWidth:"160px" }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Warranty Status</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "80px" }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Condition</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "80px" }}>
                                <TableSortLabel
                                    onClick={() => handleSort(`current_data.commissionPercentage`)}
                                    direction={sort}
                                    sx={{ ...tableCellSort }}
                                >Status</TableSortLabel>
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "80px" }}>
                                Details
                            </TableCell>
                        </TableRow>
                    </TableHead> */}
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#53B8CA" }}>
                            {/* Equipment column with dropdown */}
                            <TableCell align="left" sx={{ ...tableCellSx }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <TableSortLabel
                                            direction={sort}
                                            sx={{ ...tableCellSort }}
                                        >
                                            Sr No
                                        </TableSortLabel>
                                    </Box>
                                </TableCell>
                            <TableCell align="left" sx={{ ...tableCellSx }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    Equipment
                                    <IconButton size="small" onClick={handleFilterClick}>
                                        <FilterListIcon sx={{ color: "white" }} />
                                    </IconButton>
                                </Box>

                                {/* Filter popper with RadioGroup */}
                                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start">
                                    <ClickAwayListener onClickAway={handleCancel}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                bgcolor: "white",
                                                boxShadow: 3,
                                                borderRadius: 2,
                                                minWidth: 200,
                                                zIndex: 10
                                            }}
                                        >
                                            <RadioGroup
                                                value={equipmentFilterName}
                                                onChange={(e) => {
                                                    setEquipmentFilterName(e.target.value);
                                                    setAnchorEl(null); // auto-close popper
                                                }}
                                            >
                                                {Object.keys(equipment_types).map((option) => (
                                                    <FormControlLabel
                                                        key={option}
                                                        value={equipment_types?.[option]}
                                                        control={<Radio size="small" />}
                                                        label={option}
                                                        sx={{ textTransform: "uppercase" }}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </Box>
                                    </ClickAwayListener>
                                </Popper>
                            </TableCell>

                            {/* Other columns with sort icons */}
                            {[
                                "Serial No.",
                                "Location",
                                "Location Code",
                                "Site Type",
                                "Warranty",
                                "Condition",
                                "Status",
                                "Details",
                            ].map((label) => (
                                <TableCell key={label} align="left" sx={{ ...tableCellSx }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <TableSortLabel
                                            onClick={() => handleSort(label)}
                                            direction={sort}
                                            sx={{ ...tableCellSort }}
                                        >
                                            {label}
                                        </TableSortLabel>
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

          <TableBody>
            {/* {hotoServeyBlockDataReducer?.hoto_servey_data?.data?.data?.map(
              (ele, index) => {
                const gp_equipment = ele?.equipment;
                const gp_electrical = ele?.electrical;
                const equipment_listing_data = {
                  racks: {
                    racks: gp_equipment?.racks,
                    vendor: "",
                    status: "",
                    serial_no: "", // No serial number available in equipment_details
                    quantity: gp_equipment?.no_of_racks,
                    warranty_status: "",
                    working_condition: "",
                    remark: "",
                  },
                  smps: {
                    smps: gp_equipment?.smps,
                    vendor: "",
                    status: "",
                    serial_no: gp_equipment?.smps_serial_no,
                    quantity: gp_equipment?.smps_capacity,
                    warranty_status: gp_equipment?.smps_warranty,
                    working_condition: gp_equipment?.smps_condition,
                    remark: "",
                  },
                  ccu: {
                    cuu: gp_equipment?.ccu,
                    vendor: "",
                    status: "",
                    serial_no: gp_equipment?.ccu_serial_no,
                    quantity: "",
                    warranty_status: gp_equipment?.ccu_warranty,
                    working_condition: gp_equipment?.ccu_condition,
                    remark: "",
                  },
                  splitter: {
                    splitter: gp_equipment?.splitter,
                    vendor: "",
                    status: "",
                    serial_no: gp_equipment?.splitter_serial_no,
                    quantity: "",
                    warranty_status: gp_equipment?.splitter_warranty,
                    working_condition: gp_equipment?.splitter_condition,
                    remark: "",
                  },
                  ont: {
                    ont: gp_equipment?.ont,
                    vendor: "",
                    status: "",
                    serial_no: gp_equipment?.ont_unique_id,
                    quantity: "",
                    warranty_status: gp_equipment?.ont_status,
                    working_condition: gp_equipment?.ont_condition,
                    remark: "",
                  },
                  sfp: {
                    sfp: gp_equipment?.sfp,
                    vendor: "",
                    status: "",
                    serial_no: "", // Not available
                    quantity: gp_equipment?.no_of_quantity,
                    warranty_status: "",
                    working_condition: gp_equipment?.working_status,
                    remark: "",
                  },
                  fdms: {
                    fdms: gp_equipment?.fdms,
                    vendor: "",
                    status: "",
                    serial_no: gp_equipment?.fdms_serial_no,
                    quantity: gp_equipment?.no_fdms,
                    warranty_status: "",
                    working_condition: "",
                    remark: "",
                  },
                  cable: {
                    quantity: "",
                    vendor: "",
                    status: "",
                    serial_no: "", // No serial available
                    warranty_status: "",
                    working_condition: "",
                    remark: "",
                  },
                  solar: {
                    quantity: gp_electrical?.solar_panel_count || "",
                    vendor: "",
                    status: "",
                    serial_no: gp_electrical?.solar_panel_serial_no || "", // Added serial number
                    warranty_status: gp_electrical?.solar_panel_warranty || "",
                    working_condition:
                      gp_electrical?.solar_panel_condition || "",
                    remark: gp_electrical?.solar_panel_make || "",
                  },
                  ups: {
                    quantity: gp_electrical?.ups_battery_no || "",
                    vendor: "",
                    status: "",
                    serial_no: gp_electrical?.ups_serial_no || "", // Added serial number
                    warranty_status: gp_electrical?.ups_warranty || "",
                    working_condition: gp_electrical?.ups_condition || "",
                    remark: gp_electrical?.ups_make || "",
                  },
                };

                const equipment_details = {
                  gp_details: ele?.gp,
                  racks: {
                    racks: gp_equipment?.racks,
                    no_of_racks: gp_equipment?.no_of_racks,
                    racks_unit_size: gp_equipment?.racks_unit_size,
                    racks_connectivity: gp_equipment?.racks_connectivity,
                    racks_socket_avail: gp_equipment?.racks_socket_avail,
                  },
                  smps: {
                    smps: gp_equipment?.smps,
                    smps_condition: gp_equipment?.smps_condition,
                    smps_make: gp_equipment?.smps_make,
                    smps_serial_no: gp_equipment?.smps_serial_no,
                    smps_capacity: gp_equipment?.smps_capacity,
                    smps_warranty: gp_equipment?.smps_warranty,
                  },
                  ccu: {
                    ccu: gp_equipment?.ccu,
                    ccu_condition: gp_equipment?.ccu_condition,
                    ccu_make: gp_equipment?.ccu_make,
                    ccu_serial_no: gp_equipment?.ccu_serial_no,
                    ccu_warranty: gp_equipment?.ccu_warranty,
                  },
                  splitter: {
                    splitter: gp_equipment?.splitter,
                    splitter_condition: gp_equipment?.splitter_condition,
                    splitter_make: gp_equipment?.splitter_make,
                    splitter_serial_no: gp_equipment?.splitter_serial_no,
                    splitter_warranty: gp_equipment?.splitter_warranty,
                    spliter_split_ratio: gp_equipment?.spliter_split_ratio,
                  },
                  ont: {
                    ont: gp_equipment?.ont,
                    ont_status: gp_equipment?.ont_status,
                    ont_unique_id: gp_equipment?.ont_unique_id,
                    ont_condition: gp_equipment?.ont_condition,
                    ont_make: gp_equipment?.ont_make,
                    ont_type: gp_equipment?.ont_type,
                  },
                  sfp: {
                    sfp: gp_equipment?.sfp,
                    sfp_count: gp_equipment?.sfp_count,
                    cord_details: gp_equipment?.cord_details,
                    no_of_quantity: gp_equipment?.no_of_quantity,
                    working_status: gp_equipment?.working_status,
                  },
                  fdms: {
                    fdms: gp_equipment?.fdms,
                    fdms_status: gp_equipment?.fdms_status,
                    fdms_type: gp_equipment?.fdms_type,
                    no_fdms: gp_equipment?.no_fdms,
                    no_fdms_port: gp_equipment?.no_fdms_port,
                    fdms_serial_no: gp_equipment?.fdms_serial_no,
                    fdms_connectivity: gp_equipment?.fdms_connectivity,
                    no_of_pathcords_connected:
                      gp_equipment?.no_of_pathcords_connected,
                    termination_ofc_type: gp_equipment?.termination_ofc_type,
                    no_of_spare_fibre_avail:
                      gp_equipment?.no_of_spare_fibre_avail,
                  },
                  cable: {
                    cable_ofc_type: gp_equipment?.cable_ofc_type,
                    cable_fibre_no: gp_equipment?.cable_fibre_no,
                  },
                  solar: {
                    solar_panel_avail: gp_electrical?.solar_panel_avail,
                    solar_panel_count: gp_electrical?.solar_panel_count,
                    terrace_access: gp_electrical?.terrace_access,
                    solar_panel_condition: gp_electrical?.solar_panel_condition,
                    solar_panel_make: gp_electrical?.solar_panel_make,
                    solar_panel_serial_no: gp_electrical?.solar_panel_serial_no,
                    solar_panel_capacity: gp_electrical?.solar_panel_capacity,
                    solar_panel_warranty: gp_electrical?.solar_panel_warranty,
                    solar_panel_img: gp_electrical?.solar_panel_img,
                    solar_panel_img1: gp_electrical?.solar_panel_img1,
                    solar_panel_serial_img:
                      gp_electrical?.solar_panel_serial_img,
                    solar_panel_warranty_img:
                      gp_electrical?.solar_panel_warranty_img,
                    terrace_img: gp_electrical?.terrace_img,
                    terrace_img1: gp_electrical?.terrace_img1,
                  },
                  ups: {
                    ups_avail: gp_electrical?.ups_avail,
                    ups_condition: gp_electrical?.ups_condition,
                    ups_make: gp_electrical?.ups_make,
                    ups_serial_no: gp_electrical?.ups_serial_no,
                    ups_capacity: gp_electrical?.ups_capacity,
                    ups_warranty: gp_electrical?.ups_warranty,
                    ups_battery_no: gp_electrical?.ups_battery_no,
                    ups_serial_img: gp_electrical?.ups_serial_img,
                    ups_warranty_img: gp_electrical?.ups_warranty_img,
                  },
                };
                return (
                  <TableRow key={ele?.id}>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "uppercase",
                      }}
                    >
                      {equipmentFilterName}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {equipment_listing_data?.[equipmentFilterName]?.vendor ||
                        "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {equipment_listing_data?.[equipmentFilterName]
                        ?.serial_no || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {ele?.gp?.name || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {"-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {equipment_listing_data?.[equipmentFilterName]
                        ?.warranty_status || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {equipment_listing_data?.[equipmentFilterName]
                        ?.working_condition || "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        textTransform: "capitalize",
                      }}
                    >
                      {equipment_listing_data?.[equipmentFilterName]?.status ||
                        "-"}
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
                        onClick={() => handleOpen(equipment_details)}
                        sx={{
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
            )} */}
            <TableCell align="left"
              colSpan={10}
              sx={{
                textAlign: "center",
                verticalAlign: "middle",
                textTransform: "capitalize"
              }}>
              No Data Found!
            </TableCell>
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
      {coordinate?.open && (
        <MapLocation
          coordinate={coordinate}
          handleClose={handleCloseCoordinate}
        />
      )}
      {equipment_show?.open && (
        <EquipmentModal
          equipment_show={equipment_show}
          handleClose={handleClose}
          equipment_details={equipment_show?.equipment_details}
          TransferRecTable={<>
            <Div>
              <Div sx={{ mt: 2, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>Transfer</Typography>
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
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "160px" }}>
                          <TableSortLabel
                            onClick={() => handleSort(`current_data.companyType`)}
                            direction={sort}
                            sx={{ ...tableCellSort }}
                          >Transfer Type</TableSortLabel>
                        </TableCell>
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "160px" }}>
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
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "160px" }}>
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
                </TableContainer>
              </Div>
              <Div>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>Repair</Typography>
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
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "160px" }}>
                          <TableSortLabel
                            onClick={() => handleSort(`current_data.companyType`)}
                            direction={sort}
                            sx={{ ...tableCellSort }}
                          >Vendor</TableSortLabel>
                        </TableCell>
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "160px" }}>
                          <TableSortLabel
                            onClick={() => handleSort(`current_data.commissionPercentage`)}
                            direction={sort}
                            sx={{ ...tableCellSort }}
                          >Sent Date</TableSortLabel>
                        </TableCell>
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "220px" }}>
                          <TableSortLabel
                            onClick={() => handleSort(`current_data.commissionPercentage`)}
                            direction={sort}
                            sx={{ ...tableCellSort }}
                          >Estimated Repair Days</TableSortLabel>
                        </TableCell>
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "180px" }}>
                          <TableSortLabel
                            onClick={() => handleSort(`current_data.commissionPercentage`)}
                            direction={sort}
                            sx={{ ...tableCellSort }}
                          >Estimated Date</TableSortLabel>
                        </TableCell>
                        <TableCell align={"left"} sx={{ ...tableCellSx }}>
                          Status
                        </TableCell>
                        <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "180px" }}>
                          <TableSortLabel
                            onClick={() => handleSort(`current_data.commissionPercentage`)}
                            direction={sort}
                            sx={{ ...tableCellSort }}
                          >Issue Reported</TableSortLabel>
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
                </TableContainer>
              </Div>
            </Div>
          </>}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              GP Details
            </Typography>
            <Gp_details
              gp_details={{
                gp: equipment_show?.equipment_details?.gp_details,
              }}
            />
            <Typography variant="h4" sx={{ my: 2, fontWeight: 600 }}>
              Details
            </Typography>
          </Box>
        </EquipmentModal>
      )}
    </>
  );
};

export default Assets_Portfolio_List