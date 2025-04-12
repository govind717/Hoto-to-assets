import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import EquipmentModal from './Equipment_details_models';
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

const Gp_equipments = ({ gp_details }) => {

    const [equipment_show, set_equipment_show] = useState({
        open: false,
        equipment_name: null
    });
    const gp_equipment = gp_details?.equipment
    const equipment_listing_data = {
        racks: {
            racks: gp_equipment?.racks,
            quantity: gp_equipment?.no_of_racks,
            warrenty_status: "",
            working_condition: "",
            remark: "",
        },
        smps: {
            smps: gp_equipment?.smps,
            quantity: gp_equipment?.smps_capacity,
            warrenty_status: gp_equipment?.smps_warranty,
            working_condition: gp_equipment?.smps_condition,
            remark: "",
        },
        ccu: {
            cuu: gp_equipment?.ccu,
            quantity: "",
            warrenty_status: gp_equipment?.ccu_warranty,
            working_condition: gp_equipment?.ccu_condition,
            remark: "",
        },
        splitter: {
            splitter: gp_equipment?.splitter,
            quantity: "",
            warrenty_status: gp_equipment?.splitter_warranty,
            working_condition: gp_equipment?.splitter_condition,
            remark: "",
        },
        ont: {
            ont: gp_equipment?.ont,
            quantity: "",
            warrenty_status: gp_equipment?.ont_status,
            working_condition: gp_equipment?.ont_condition,
            remark: "",
        },
        sfp: {
            sfp: gp_equipment?.sfp,
            quantity: gp_equipment?.no_of_quantity,
            warrenty_status: "",
            working_condition: gp_equipment?.working_status,
            remark: "",
        },
        fdms: {
            fdms: gp_equipment?.fdms,
            quantity: gp_equipment?.no_fdms,
            warrenty_status: "",
            working_condition: "",
            remark: "",
        },
        cable: {
            quantity: "",
            warrenty_status: "",
            working_condition: "",
            remark: "",
        }
    };

    const equipment_details = {
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
            no_of_pathcords_connected: gp_equipment?.no_of_pathcords_connected,
            termination_ofc_type: gp_equipment?.termination_ofc_type,
            no_of_spare_fibre_avail: gp_equipment?.no_of_spare_fibre_avail,
        },
        cable: {
            cable_ofc_type: gp_equipment?.cable_ofc_type,
            cable_fibre_no: gp_equipment?.cable_fibre_no,
        }
    };

    const handleOpen = (equipment_name) => {
        set_equipment_show({
            open: true,
            equipment_name: equipment_name
        })
    }
    const handleClose = () => {
        set_equipment_show({
            open: false,
            equipment_name: null
        })
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ my: "2%" }}>
                <Table sx={{ minWidth: 650 }} size="small" >
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#53B8CA" }}>
                            <TableCell align={"left"} sx={{ ...tableCellSx, minWidth: "40px" }}>
                                Sr No.
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                Equipments
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                Quantity
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                Warrenty Status
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                Working Condition
                            </TableCell>
                            <TableCell align={"left"} sx={{ ...tableCellSx }}>
                                Details
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys(equipment_listing_data)?.map((ele, index) => {
                                const equipment_data = equipment_listing_data?.[ele];
                                return (
                                    <TableRow key={ele?.id}>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {ele || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {equipment_data?.quantity || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {equipment_data?.warrenty_status || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            {equipment_data?.working_condition || "-"}
                                        </TableCell>
                                        <TableCell align="left" sx={{
                                            textAlign: "left",
                                            verticalAlign: "middle",
                                            textTransform: "capitalize"
                                        }}>
                                            <Button variant="contained"
                                                sx={{
                                                    "&:hover":{
                                                        color:"red"
                                                    }
                                                }}
                                                startIcon={<InfoIcon />}
                                                onClick={() => handleOpen(ele)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {equipment_show?.open && <EquipmentModal
                equipment_show={equipment_show}
                handleClose={handleClose}
                equipment_details={equipment_details}
            />}
        </>
    )
}

export default Gp_equipments