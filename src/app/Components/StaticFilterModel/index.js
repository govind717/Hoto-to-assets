import CloseFilterIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
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

const StaticFilterModel = ({
  label,
  field,
  setFilters,
  filters,
  setApplyFilter,
  filterOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filterValue, setFilterValue] = useState({});
  // const [filterOptions, setFilterOptions] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    if (filterValue==="Yes" || filterValue ==="No") {
      let newFilterValue='';
      if (filterValue === "Yes") {
        newFilterValue = true;
      } else if (filterValue === "No") {
        newFilterValue = false;
      }
        setFilters((prev) => ({
          ...prev,
          [`${field}`]: newFilterValue,
        }));
      setApplyFilter((prev) => !prev);
      setIsFilterApplied(true);
      setOpen(false);
    } else {
      setFilters((prev) => ({
        ...prev,
        [`${field}`]: filterValue,
      }));
      setApplyFilter((prev) => !prev);
      setIsFilterApplied(true);
      setOpen(false);
    }
  };
  const handleClear = () => {
    const newObj = { ...filters };
    // delete newObj.equipment_name;
    delete newObj[field];
    setFilters(newObj);
    setApplyFilter((prev) => !prev);
    setFilterValue("");
    setIsFilterApplied(false);
    setOpen(false);
  };

  // useEffect(() => {
  //   if (open && apiUrl) {
  //     Axios.get(apiUrl)
  //       .then((success) => {
  //         setFilterOptions(success?.data?.result);
  //         console.log("success?.data?.result", success?.data?.result);
  //       })
  //       .catch((error) => console.log("Error : ", error));
  //   }
  // }, [field, open]);
  return (
    <>
      <FilterListIcon
        onClick={handleOpen}
        fontSize="small"
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
            <Autocomplete
              disablePortal
              size="small"
              options={filterOptions}
              // getOptionLabel={(option) => option?.label || option}
              getOptionLabel={(option) => option || ""}
              // isOptionEqualToValue={(option, value) =>
              //   option?.label === value?.l
              // }
              sx={{ width: 300 }}
              value={filterValue}
              onChange={(_, newValue) => setFilterValue(newValue)}
              renderInput={(params) => <TextField {...params} label={label} />}
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClear} size="small">
                Clear
              </Button>

              <Button
                variant="contained"
                onClick={handleApply}
                disabled={!filterValue}
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

export default StaticFilterModel;
