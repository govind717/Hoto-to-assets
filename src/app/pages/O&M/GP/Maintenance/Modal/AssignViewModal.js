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
function AssignViewModal({ open, closeModal,row }) {
  console.log("row11 : ",row);

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
              View Details
            </Typography>
            <TableContainer
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
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left"> {"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                    <TableCell align="left">{"-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Div sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" size="small" onClick={closeModal}>
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
