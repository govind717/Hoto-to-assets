import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const labelSxTypography = { fontSize: "16px", fontWeight: "500",mb:1 };

export const RackDetails = function ({ equipment_name, equipment_data }) {
  return <>
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={2}>
          <Typography sx={{fontSize:"15px",fontWeight:"500"}}>Racks Availability</Typography>
          {/* <Typogr sx={{fontSize:"15px"}}aphy>{equipment_data || "-"}</Typography> */}
          <Typography>{"-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={2}>
          <Typography sx={{fontSize:"15px",fontWeight:"500"}}>Number Of Racks</Typography>
          <Typography sx={{fontSize:"15px"}}>{equipment_data?.no_of_racks || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={2}>
          <Typography sx={{fontSize:"15px",fontWeight:"500"}}>Unit Size</Typography>
          <Typography sx={{fontSize:"15px"}}>{equipment_data?.racks_unit_size || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={2}>
          <Typography sx={{fontSize:"15px",fontWeight:"500"}}>Racks Connectivity</Typography>
          <Typography sx={{fontSize:"15px"}}>{equipment_data?.racks_connectivity || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={2}>
          <Typography sx={{fontSize:"15px",fontWeight:"500"}}>Socket Availability</Typography>
          <Typography sx={{fontSize:"15px"}}>{equipment_data?.racks_socket_avail || "-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  </>
}
export const SmpsDetails = function ({ equipment_name, equipment_data }) {
  return (
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            SMPS Availability
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.smps || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            SMPS Condition
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.smps_condition || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            SMPS Make
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.smps_make || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            SMPS Serial No
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.smps_serial_no || "-"}
          </Typography>
        </Grid>

        {/* Optional: Image fields */}
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            SMPS Image
          </Typography>
          {/* Replace with actual image logic if available */}
          <Typography sx={{ fontSize: "15px" }}>{"-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            SMPS Capacity
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.smps_capacity || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            SMPS Warranty
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.smps_warranty || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            Serial No Image
          </Typography>
          {/* Replace with actual serial number image logic if available */}
          <Typography sx={{ fontSize: "15px" }}>{"-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const CcuDetails = function ({ equipment_name, equipment_data }) {
  return (
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            CCU Availability
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.ccu || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            CCU Condition
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.ccu_condition || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            CCU Serial Number
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.ccu_serial_no || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            CCU Make
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.ccu_make || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            CCU Image
          </Typography>
          {/* Add your image display logic here */}
          <Typography sx={{ fontSize: "15px" }}>{"-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            CCU Warranty
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {equipment_data?.ccu_warranty || "-"}
          </Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>
            CCU Serial No. Image
          </Typography>
          {/* Add serial no image preview logic here */}
          <Typography sx={{ fontSize: "15px" }}>{"-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const SplitterDetails = function ({ equipment_data }) {
  return (
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Availability</Typography>
          <Typography>{equipment_data?.splitter || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Condition</Typography>
          <Typography>{equipment_data?.splitter_condition || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Serial Number</Typography>
          <Typography>{equipment_data?.splitter_serial_no || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Make</Typography>
          <Typography>{equipment_data?.splitter_make || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Image</Typography>
          <Typography>-</Typography> {/* Replace with image viewer if needed */}
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Warranty</Typography>
          <Typography>{equipment_data?.splitter_warranty || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Serial No Image</Typography>
          <Typography>-</Typography> {/* Replace with image viewer */}
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Splitter Ratio</Typography>
          <Typography>{equipment_data?.spliter_split_ratio || "-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const OntDetails = function ({ equipment_data }) {
  return (
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Availability</Typography>
          <Typography>{equipment_data?.ont || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Status</Typography>
          <Typography>{equipment_data?.ont_status || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Condition</Typography>
          <Typography>{equipment_data?.ont_condition || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Unique Id</Typography>
          <Typography>{equipment_data?.ont_unique_id || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Image</Typography>
          <Typography>-</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Type</Typography>
          <Typography>{equipment_data?.ont_type || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Make</Typography>
          <Typography>{equipment_data?.ont_make || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>ONT Unique Image</Typography>
          <Typography>-</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const SfpDetails = function ({ equipment_data }) {
  return (
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>SFP Availability</Typography>
          <Typography>{equipment_data?.sfp || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>SFP Count</Typography>
          <Typography>{equipment_data?.sfp_count || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>SMPS Cord Details</Typography>
          <Typography>{equipment_data?.cord_details || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>SMPS Quantity</Typography>
          <Typography>{equipment_data?.no_of_quantity || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>SFP Image</Typography>
          <Typography>-</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>SFP Count Image</Typography>
          <Typography>-</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>SMPS Working Status</Typography>
          <Typography>{equipment_data?.working_status || "-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const FdmsDetails = function ({ equipment_data }) {
  return (
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Availability FDMS</Typography>
          <Typography>{equipment_data?.fdms || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Number Of FDMS</Typography>
          <Typography>{equipment_data?.no_fdms || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Number Of FDMS Port</Typography>
          <Typography>{equipment_data?.no_fdms_port || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>FDMS Type</Typography>
          <Typography>{equipment_data?.fdms_type || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>FDMS Serial Number</Typography>
          <Typography>{equipment_data?.fdms_serial_no || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Number Of Patchcords</Typography>
          <Typography>{equipment_data?.no_of_pathcords_connected || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>FDMS Connectivity</Typography>
          <Typography>{equipment_data?.fdms_connectivity || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Termination OFC Type</Typography>
          <Typography>{equipment_data?.termination_ofc_type || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Number Of Spare Fibre</Typography>
          <Typography>{equipment_data?.no_of_spare_fibre_avail || "-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export const CableDetails = function ({ equipment_data }) {
  return (
    <Box width={"100%"}>
      <Grid container justifyContent={"start"} gap={5}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>OFC Type</Typography>
          <Typography>{equipment_data?.cable_ofc_type || "-"}</Typography>
        </Grid>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Cable Fibre</Typography>
          <Typography>{equipment_data?.cable_fibre_no || "-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export const SolarDetails = ({ equipment_data }) => {
  return (
    <Box width={"100%"}>
      <Grid container spacing={3}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Solar Panel Availability</Typography>
          <Typography>{equipment_data?.solar_panel_avail || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Solar Panel Count</Typography>
          <Typography>{equipment_data?.solar_panel_count || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Access to the terrace</Typography>
          <Typography>{equipment_data?.terrace_access || "-"}</Typography>
          {/* {renderIcon(<MapIcon />, equipment_data?.terrace_img)}
          {renderIcon(<ImageIcon />, equipment_data?.terrace_img1)} */}
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Solar Panel Condition</Typography>
          <Typography>{equipment_data?.solar_panel_condition || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Solar Panel Make</Typography>
          <Typography>{equipment_data?.solar_panel_make || "-"}</Typography>
          {/* {renderIcon(<MapIcon />, null)}
          {renderIcon(<ImageIcon />, equipment_data?.solar_panel_img)}
          {renderIcon(<PlayArrowIcon />, equipment_data?.solar_panel_img1)} */}
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Solar Panel Serial No</Typography>
          <Typography>{equipment_data?.solar_panel_serial_no || "-"}</Typography>
          {/* {renderIcon(<ImageIcon />, equipment_data?.solar_panel_serial_img)} */}
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Solar Panel Capacity</Typography>
          <Typography>{equipment_data?.solar_panel_capacity || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>Solar Panel Warranty</Typography>
          <Typography>{equipment_data?.solar_panel_warranty || "-"}</Typography>
          {/* {renderIcon(<ImageIcon />, equipment_data?.solar_panel_warranty_img)} */}
        </Grid>
      </Grid>
    </Box>
  );
};
export const UPSDetails = ({ equipment_data }) => {
  return (
    <Box width={"100%"}>
      <Grid container spacing={3}>
        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>UPS Availability</Typography>
          <Typography>{equipment_data?.ups_avail || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>UPS Condition</Typography>
          <Typography>{equipment_data?.ups_condition || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>UPS Make</Typography>
          <Typography>{equipment_data?.ups_make || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>UPS Serial Number</Typography>
          <Typography>{equipment_data?.ups_serial_no || "-"}</Typography>
          {/* {renderIcon(<ImageIcon />, equipment_data?.ups_serial_img)} */}
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>UPS Capacity</Typography>
          <Typography>{equipment_data?.ups_capacity || "-"}</Typography>
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>UPS Warranty</Typography>
          <Typography>{equipment_data?.ups_warranty || "-"}</Typography>
          {/* {renderIcon(<ImageIcon />, equipment_data?.ups_warranty_img)} */}
        </Grid>

        <Grid item xl={3} md={4} sm={6}>
          <Typography sx={labelSxTypography}>UPS Battery No</Typography>
          <Typography>{equipment_data?.ups_battery_no || "-"}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};


export default function EquipmentModal({ equipment_show, handleClose, equipment_details }) {
  const equipment_name = equipment_show?.equipment_name;
  const equipment_data = equipment_details?.[equipment_name]
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={equipment_show?.open}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2, textTransform: "uppercase" }} id="customized-dialog-title">
          {equipment_name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {equipment_name === "racks" && <RackDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "smps" && <SmpsDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "ccu" && <CcuDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "splitter" && <SplitterDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "ont" && <OntDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "sfp" && <SfpDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "fdms" && <FdmsDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "cable" && <CableDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "solar" && <SolarDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
          {equipment_name === "ups" && <UPSDetails equipment_name={equipment_name} equipment_data={equipment_data} />}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}