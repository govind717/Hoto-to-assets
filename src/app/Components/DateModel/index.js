import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import CloseFilterIcon from "@mui/icons-material/Close";
import DateIcon from "@mui/icons-material/CalendarMonth";
import { Axios } from "index";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
};

const DateModel = ({
  label,
  field,
  setFilters,
  filters,
  setApplyFilter,
  apiUrl,
  staticOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApply = () => {
    if (fromDate && toDate) {
      setFilters((prev) => ({
        ...prev,
        [field]: {
          from: fromDate,
          to: toDate,
        },
      }));
      setApplyFilter((prev) => !prev);
      setIsFilterApplied(true);
      setOpen(false);
    }
  };

  const handleClear = () => {
    const newFilters = { ...filters };
    delete newFilters[field];
    setFilters(newFilters);
    setApplyFilter((prev) => !prev);
    setFromDate("");
    setToDate("");
    setIsFilterApplied(false);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    if (staticOptions && Array.isArray(staticOptions)) {
      const formattedOptions = staticOptions.map((opt) => ({
        label: opt,
      }));
      setFilterOptions(formattedOptions);
    } else if (apiUrl) {
      Axios.get(apiUrl)
        .then((success) => {
          setFilterOptions(success?.data?.result || []);
        })
        .catch((error) => console.log("Error:", error));
    }
  }, [field, open, staticOptions, apiUrl]);

  return (
    <>
      <DateIcon
        onClick={handleOpen}
        fontSize="small"
        style={{ cursor: "pointer" }}
        sx={{ color: isFilterApplied ? "#33eaff" : "inherit" }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseFilterIcon
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
              color: "#555",
            }}
          />
          <FormControl fullWidth size="small" sx={{ my: "2%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" fontSize="14px">
                  From
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" fontSize="14px">
                  To
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClear} size="small">
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={handleApply}
                disabled={!fromDate || !toDate}
                size="small"
              >
                Apply
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DateModel;
