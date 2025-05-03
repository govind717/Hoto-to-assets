import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import { Badge, Checkbox, Chip, TableCell, TableRow } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Axios } from "index";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import RequestMaintenanceModal from "../Modal/RequestMaintenanceModal";
import ReplacementModal from "../Modal/ReplacementModal";
import TransferModal from "../Modal/TransferModal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const tableBodyCell = { textAlign: "left", px: 1 };

const tableRowBodySticky = {
  textAlign: "center",
  px: 1,
  position: "sticky",
  right: 0,
  zIndex: 1,
  bgcolor: "white",
  width: "50px",
};

const AssetPortfolioTableRow = ({
  e,
  index,
  allFilterState,
  selectedIds,
  setSelectedIds,
  setItemDetailsForModal,
  handleOpenDetailModal,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [openReplacement, setOpenReplacement] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [row, setRow] = useState(null);
  const handleCheckLogId = function (event, id) {
    const checked = event.target.checked;
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => {
        const restOfIds = prev?.filter((e) => e !== id);
        return restOfIds;
      });
    }
  };

  const showDetails = (e) => {
    navigate("/dashboards/hoto-survey-block-data/asset-portflio-details", {
      state: e,
    });
  };
  const handleItemAction = (menuItem) => {
    const row = menuItem?.row;
    switch (menuItem.action) {
      case "issueForMaintenance":
        setRow(row);
        setOpenMaintenance(true);
        break;
      case "issueForReplacement":
        setRow(row);
        setOpenReplacement(true);
        break;
      case "issueForTransfer":
         setRow(row);
        setOpenTransfer(true);
        break;
      default:
        
    }
  };
  const handleCloseModal = () => {
    setOpenMaintenance(false);
    setOpenReplacement(false);
    setOpenTransfer(false);

  };
  return (
    <>
      <TableRow key={e?.id}>
        {/* <TableCell sx={{ ...tableBodyCell, textAlign: "center" }}>
        <Checkbox
          {...label}
          size="small"
          checked={selectedIds.includes(e?.id)}
          onChange={(event) => handleCheckLogId(event, e?.id)}
        />
      </TableCell> */}
        <TableCell sx={{ ...tableBodyCell, minWidth: "100px" }}>
          {index + 1 || "-"}
        </TableCell>
        <TableCell sx={{ ...tableBodyCell }}>
          {e?.equipment_name || "-"}
        </TableCell>
        <TableCell sx={{ ...tableBodyCell }}>{e?.serial_no || "-"}</TableCell>
        <TableCell sx={{ ...tableBodyCell }}>
          {e?.block_details?.block?.name || "-"}
        </TableCell>
        <TableCell sx={{ ...tableBodyCell }}>
          {e?.block_details?.block_id || "-"}
        </TableCell>
        <TableCell sx={{ ...tableBodyCell }}>{e?.sity_type || "-"}</TableCell>
        <TableCell sx={{ ...tableBodyCell }}>
          {e?.warranty_status ? "Yes" : "No"}
        </TableCell>
        <TableCell sx={{ ...tableBodyCell }}>{e?.condition || "-"}</TableCell>
        <TableCell sx={{ ...tableBodyCell, minWidth: "150px" }}>
          <Chip
            label={e?.condition_status || "-"}
            sx={{
              backgroundColor: "#aaa",
              color: "#4E4E4E",
              fontWeight: "bold",
              height: "25px",
              px: 2,
            }}
          />
        </TableCell>

        <TableCell
          sx={{
            ...tableBodyCell,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfoIcon
            sx={{ "&:hover": { cursor: "pointer", color: "black" } }}
            onClick={() => {
              showDetails(e);
            }}
          />
        </TableCell>
        <TableCell sx={{ ...tableBodyCell, ...tableRowBodySticky }}>
          <JumboDdMenu
            icon={<MoreHorizIcon />}
            menuItems={[
              // {
              //   icon: <EditIcon />,
              //   title: "Edit",
              //   action: "edit",
              //   show: true,
              //   row: e,
              // },
              {
                icon: <AddCircleOutlineIcon />,
                title: "Request Maintenance",
                action: "issueForMaintenance",
                show: true,
                row: e,
              },
              {
                icon: <AddCircleOutlineIcon />,
                title: "Request Replacement",
                action: "issueForReplacement",
                show: true,
                row: e,
              },
              {
                icon: <AddCircleOutlineIcon />,
                title: "Request Transfer",
                action: "issueForTransfer",
                show: true,
                row: e,
              },
            ].filter((ele) => ele?.show)}
            onClickCallback={handleItemAction}
          />
        </TableCell>
      </TableRow>
      <RequestMaintenanceModal
        handleClose={handleCloseModal}
        open={openMaintenance}
        row={row}
      />
      <ReplacementModal
        handleClose={handleCloseModal}
        row={row}
        open={openReplacement}
      />
      <TransferModal
        handleClose={handleCloseModal}
        row={row}
        open={openTransfer}
      />
    </>
  );
};

export default AssetPortfolioTableRow;
