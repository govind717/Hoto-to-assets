import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Autocomplete,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// import ToastAlerts from '../Toast';
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  minWidth: "1100px",
};
const tableCellSx = {
  textTransform: "capitalize",
  color: "white",
  textAlign: "left",
  minWidth: "150px",
  verticalAlign: "middle",
};
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
function AssignViewModal({ open, closeModal,row }) {
 return (
     <div>
       <Modal
         open={open}
         onClose={closeModal}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
         <>
           <Div
             sx={{ mt: 0, backgroundColor: "#FFF", padding: "30px" }}
             style={style}
           >
             <Typography variant="h3" fontWeight={600} mb={2}>
               Rack
             </Typography>
             {/* <TableContainer
               sx={{
                 marginTop: "15px",
                 maxWidth: "1100px",
                 marginBottom: "30px",
               }}
               component={Paper}
             >
               <Table size="small">
                 <TableHead>
                   <TableRow sx={{ bgcolor: "#53B8CA" }}>
                     <TableCell
                       align="left"
                       sx={{ ...tableCellSx, minWidth: "100px" }}
                     >
                       Transport
                     </TableCell>
                     <TableCell
                       align="left"
                       sx={{ ...tableCellSx, minWidth: "220px" }}
                     >
                       Transporter Name
                     </TableCell>
                     <TableCell align="left" sx={{ ...tableCellSx }}>
                       Vahicle No.
                     </TableCell>
                     <TableCell align="left" sx={{ ...tableCellSx }}>
                       Driver Name
                     </TableCell>
                     <TableCell
                       align="left"
                       sx={{ ...tableCellSx, minWidth: "180px" }}
                     >
                       Driver No.
                     </TableCell>
                     <TableCell align="left" sx={{ ...tableCellSx }}>
                       Location
                     </TableCell>
                     <TableCell align="left" sx={{ ...tableCellSx }}>
                       Warranty
                     </TableCell>
                     <TableCell align="left" sx={{ ...tableCellSx }}>
                       Vendor Ack
                     </TableCell>
                     <TableCell align="left" sx={{ ...tableCellSx }}>
                       Varified By
                     </TableCell>
                     <TableCell align="left" sx={{ ...tableCellSx }}>
                       Photo
                     </TableCell>
                   </TableRow>
                 </TableHead>
 
                 <TableBody>
                   <TableRow>
                     <TableCell align="left">Road</TableCell>
                     <TableCell align="left">Name</TableCell>
                     <TableCell align="left">TJS2025-05-01</TableCell>
                     <TableCell align="left">Name</TableCell>
                     <TableCell align="left">4567856789</TableCell>
                     <TableCell align="left">Native Site</TableCell>
                     <TableCell align="left">2026</TableCell>
                     <TableCell align="left">Repaired</TableCell>
                     <TableCell align="left">in Use</TableCell>
                     <TableCell align="left">Rajesh</TableCell>
                   </TableRow>
                 </TableBody>
               </Table>
             </TableContainer> */}
             <Typography
               variant="h5"
               fontSize="16px"
               fontWeight="600"
               mb={-2}
               mt={2}
             >
               Details
             </Typography>
             <Grid container spacing={2} mt={2}>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   Unit Size
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.unit_size || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   Make
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.make || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   Model
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.model || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   Rack Positioning
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.rack_positioning || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   OFC Connectivity
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.ofc_connectivity || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   No. of Connectivity Entry
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.no_of_connectivity_entry || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   OFC Type
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.ofc_type || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   Entry Point
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.entry_point || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   Power Socket Availability
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.power_socket_availability || "-"}{" "}
                 </Box>
               </Grid>
               <Grid item xs={6} md={2.4}>
                 <Typography variant="h6" fontSize="14px">
                   Single Slot/Multy Slot
                 </Typography>
                 <Box sx={patternBoxStyle}>
                   {row?.assets_details?.unit_size || "-"}{" "}
                 </Box>
               </Grid>
             </Grid>
             <Div sx={{ display: "flex", justifyContent: "center" }}>
               <Button
                 variant="outlined"
                 size="small"
                 onClick={closeModal}
                 sx={{ marginTop: "30px" }}
               >
                 Cancel
               </Button>
             </Div>
           </Div>
         </>
       </Modal>
     </div>
   );
}

export default AssignViewModal;
