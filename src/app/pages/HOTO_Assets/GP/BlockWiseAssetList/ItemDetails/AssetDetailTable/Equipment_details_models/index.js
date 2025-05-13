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

const labelSxTypography = { fontSize: "16px", fontWeight: "500", mb: 1 };
const patternBoxStyle = {
  width: "100%",
  minHeight: "36px",
  maxHeight: "100px",
  display: "flex",
  alignItems: "center",
  paddingX: 1,
  paddingY: 0.5,
  border: "1px solid #aaa",
  borderRadius: "4px",
  backgroundColor: "transparent",
  color: "black",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};
export const RackDetails = function ({data}) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Racks Availability
          </Typography>
          <Box sx={patternBoxStyle}>{data?.other_details?.rack_availablity ? "Yes" : "No" } </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Number Of Racks
          </Typography>
          <Box sx={patternBoxStyle}>{"-"} </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Unit Size
          </Typography>
          <Box sx={patternBoxStyle}>{"-"} </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Racks Connectivity
          </Typography>
          <Box sx={patternBoxStyle}>{"-"} </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Socket Availability
          </Typography>
          <Box sx={patternBoxStyle}>{"-"} </Box>
        </Grid>
      </Grid>
    </>
  );
}
export const SmpsDetails = function ({ data }) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            SMPS Availability
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_availablity
              ? data?.other_details?.smps_availablity === true
                ? "Yes"
                : "No"
              : "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            SMPS Condition
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_condition || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            SMPS Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_make_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            SMPS Serial No
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            SMPS Image
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_img?.length || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            SMPS Capacity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_capacity || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            SMPS Warranty
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_warranty
              ? data?.other_details?.smps_warranty === true
                ? "Yes"
                : "No"
              : "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Serial No Image
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smpsSerialNo_img ? data?.other_details?.smpsSerialNo_img?.length : "-"}{" "}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const CcuDetails = function ({ data }) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Availability
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_availablity
              ? data?.other_details?.ccu_availablity
                ? "Yes"
                : "No"
              : "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Condition
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_condition || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Serial Number
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_make_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Image
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_image || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Capacity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_capacity_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Warranty
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_warranty || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            CCU Serial No. Image
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccuSerialNo_img?.length || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Battery Availablity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_battery_availablity ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Battery Count
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_battery_count || 0}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Charger Availablity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_charger_availablity ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const SplitterDetails = function ({ data }) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Availability
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_availablity ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Condition
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_condition || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Serial Number
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_make_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Image
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_img || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Warranty
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_warranty || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Serial No Image
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitterSerialNo_img?.length || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Splitter Ratio
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccuSerialNo_img?.length || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const OntDetails = function ({ data }) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Has ONT
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.has_olt ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Condition
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_condition || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Connector Type
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_connector_type || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Pon Port
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_pon_port || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Serial No.
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Status
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_status || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Used Port
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_used_port_controller || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const OltDetails = function ({ data }) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Has OLT
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.has_olt ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Condition
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_condition || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Connector Type
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_connector_type || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Pon Port
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_pon_port || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Serial No.
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Status
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_status || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Used Port
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_used_port_controller || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const SfpDetails = function ({ data }) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Has OLT
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.has_olt ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Condition
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_condition || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Connector Type
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_connector_type || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OLT Pon Port
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_pon_port || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Serial No.
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Status
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_status || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Used Port
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_used_port_controller || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const FdmsDetails = function ({ data }) {
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            FDMD Condition
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.condition || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            FDMD Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.make_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            OFC Count
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ofc_count_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Serial No.
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Port Type
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.port_type || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography variant="h6" fontSize="14px">
            Ports Used
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ports_used || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
    </>
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


export default function EquipmentModal({ equipment_show, handleClose, }) {
  console.log("Equipment : ", equipment_show);
  let data = equipment_show?.data;
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={equipment_show?.open}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textTransform: "uppercase" }}
          id="customized-dialog-title"
        >
          {data?.equipment_name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ pl: 2 }}>
            {data?.equipment_name === "RACK" && <RackDetails data={data} />}
            {data?.equipment_name === "SMPS" && <SmpsDetails data={data} />}
            {data?.equipment_name === "CCU" && <CcuDetails data={data} />}
            {data?.equipment_name === "SPLITTER" && (
              <SplitterDetails data={data} />
            )}
            {data?.equipment_name === "OLT" && <OltDetails data={data} />}
            {data?.equipment_name === "ONT" && <OntDetails data={data} />}
            {data?.equipment_name === "FDMS" && <FdmsDetails data={data} />}
            {data?.equipment_name === "SFP" && <SfpDetails data={data} />}

            {/* {data?.equipment_name === "cable" && <CableDetails data={data} />}
            {data?.equipment_name === "solar" && <SolarDetails data={data} />}
            {data?.equipment_name === "ups" && <UPSDetails />} */}
          </Box>
          {/* {TransferRecTable} */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};