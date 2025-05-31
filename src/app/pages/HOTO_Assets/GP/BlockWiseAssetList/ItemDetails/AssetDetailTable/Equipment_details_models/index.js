import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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


const imageBoxStyle = {
  width: "100%",
  minHeight: "36px",
  maxHeight: "100px",
  overflow: "hidden",
  borderRadius: "4px",
  cursor: "pointer",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "4px",
};

export const RackDetails = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="RACK image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );

  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Racks Availability
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.rack_availablity ? "Yes" : "No"}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Racks Make Controller
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.rack_make_controller ? "Yes" : "No"}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Rack Positioning
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.rack_positioning
              ? data?.other_details?.rack_positioning
              : "-"}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Has Rack OFC Connectivity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.has_rack_ofc_connectivity ? "Yes" : "No"}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            OFC Entry Rack Count
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ofc_entry_rack_count
              ? data?.other_details?.ofc_entry_rack_count
              : "-"}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Rack Slot Type
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.rack_slot_type
              ? data?.other_details?.rack_slot_type
              : "-"}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Rack Unutilised Sockets
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.rack_unutilised_sockets
              ? data?.other_details?.rack_unutilised_sockets
              : "-"}
          </Box>
        </Grid>

      </Grid>

      {/* Rack Make Images */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Rack Make Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.rackMake_img)}
      </Grid>

      {/* Rack OFC Entry Images */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Rack OFC Entry Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.rackOfcEntry_img)}
      </Grid>

      {/* Rack Positioning Images */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Rack Positioning Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.rackPositioning_img)}
      </Grid>

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export const SmpsDetails = function ({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="SMPS image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            SMPS Condition
          </Typography>
          <Box sx={patternBoxStyle}>{data?.condition || "-"} </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            SMPS Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_make_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            SMPS Serial No
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            SMPS Capacity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.smps_capacity || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
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
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Capacity Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsCapacity_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Condition Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsCondition_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Make Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsMake_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Serial No. Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsSerialNo_img)}
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Warranty Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsWarranty_img)}
      </Grid>

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export const CcuDetails = function ({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="CCU image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            CCU Condition
          </Typography>
          <Box sx={patternBoxStyle}>{data?.condition || "-"} </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            CCU Serial Number
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            CCU Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_make_controller || "-"}{" "}
          </Box>
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            CCU Capacity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_capacity_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            CCU Warranty
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_warranty || "-"}{" "}
          </Box>
        </Grid>
        
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Battery Availablity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_battery_availablity ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Battery Count
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_battery_count || 0}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Charger Availablity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ccu_charger_availablity ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Battery Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.batteries)}
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        CCU Capacity Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.ccuCapacity_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        CCU Condition Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.ccuCondition_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        CCU Make Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.ccuMake_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        CCU Serial No. Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.ccuSerialNo_img)}
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        CCU Warranty Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.ccuWarranty_img)}
      </Grid>

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export const SplitterDetails = function ({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="ONT image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Splitter Availability
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_availablity ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Splitter Condition
          </Typography>
          <Box sx={patternBoxStyle}>{data?.condition || "-"} </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Splitter Serial Number
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Splitter Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.splitter_make_controller || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Splitter Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.splitter_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Splitter Condition Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.splitterCondition_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Splitter Make Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.splitterMake_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        Splitter Serial No. Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.splitterSerialNo_img)}
      </Grid>

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export const OntDetails = function ({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="ONT image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            ONT Availablity
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ont_availablity ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            ONT Condition
          </Typography>
          <Box sx={patternBoxStyle}>{data?.condition || "-"} </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            ONT Status
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ont_status || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            ONT Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ont_make_controller || "-"}{" "}
          </Box>
        </Grid>
      
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        ONT Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.ont_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        ONT Serial No. Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.ontSerialNo_img)}
      </Grid>

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export const OltDetails = function ({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="ONT image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Has OLT
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.has_olt ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            OLT Condition
          </Typography>
          <Box sx={patternBoxStyle}>{data?.condition || "-"} </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            OLT Connector Type
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_connector_type || "-"}{" "}
          </Box>
        </Grid>

        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            OLT Status
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_status || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            OLT Pon Port
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_pon_port || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            OLT Used Port Controller
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.olt_used_port_controller || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        OLT Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.olt_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        OLT Serial No. Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.oltSerialNo_img)}
      </Grid>

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export const SfpDetails = function ({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="ONT image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Has SFP
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.has_sfp ? "Yes" : "No"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            SFP Count
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.sfp_count || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            SFP Count Controller
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.sfp_count_controller || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
      {/* <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Capacity Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsCapacity_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Condition Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsCondition_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Make Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsMake_img)}
      </Grid>

      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Serial No. Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsSerialNo_img)}
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        SMPS Warranty Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.smpsWarranty_img)}
      </Grid> */}

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export const FdmsDetails = function ({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpenDialog(true);
  };

  const renderImages = (images = []) =>
    images?.length > 0 ? (
      images.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            sx={imageBoxStyle}
            onClick={() =>
              handleImageClick(
                `https://survey.lumacorp.in/storage/survey_images/${item}`
              )
            }
          >
            <img
              style={imageStyle}
              src={`https://survey.lumacorp.in/storage/survey_images/${item}`}
              alt="ONT image URL ERROR"
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={6} sm={4} md={3}>
        <Box sx={imageBoxStyle}>-</Box>
      </Grid>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Has FDMS
          </Typography>
          <Box sx={patternBoxStyle}>{data?.has_fdms ? "Yes" : "No"} </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            FDMS Condition
          </Typography>
          <Box sx={patternBoxStyle}>{data?.condition || "-"} </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            FDMS Make
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.make_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            OFC Count
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ofc_count_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Serial No.
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.serial_no_controller || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Port Type
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.port_type || "-"}{" "}
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontSize="14px">
            Ports Used
          </Typography>
          <Box sx={patternBoxStyle}>
            {data?.other_details?.ports_used || "-"}{" "}
          </Box>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        sx={{ fontWeight: "500" }}
        fontSize="15px"
        mt={3}
      >
        FDMS Images
      </Typography>
      <Grid container spacing={2} mt={1}>
        {renderImages(data?.other_details?.images)}
      </Grid>

      {/* Zoom Image Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <Box p={2}>
          <img
            src={selectedImage}
            alt="Zoomed"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Box>
      </Dialog>
    </>
  );
};


export default function EquipmentModal({ equipment_show, handleClose, }) {
 
  let data = equipment_show?.data;
  return (
    <>
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
    </>
  );
};
