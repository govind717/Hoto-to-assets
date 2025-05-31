import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableLoader = () => {
  return (
    // <Box
    //   sx={{
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     width: "100%",
    //     height: "100%",
    //     zIndex: 2,
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "rgba(241, 241, 241,0.4)",
    //   }}
    // >
    //   <CircularProgress />
    // </Box>
    <TableRow>
      <TableCell colSpan={10} align="center">
        <CircularProgress size={35} />
      </TableCell>
    </TableRow>
  );
};

export default TableLoader;
