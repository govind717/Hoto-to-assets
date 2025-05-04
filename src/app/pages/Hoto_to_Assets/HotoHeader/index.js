import Div from "@jumbo/shared/Div";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const HotoHeader = () => {
  const [selectedValue, setSelectedValue] = useState("Package 6");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Div
      sx={{
        border: "2px solid #E78F5D",
        borderRadius: "10px",
        // my:1
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1.5,
          px: 2.5,
        }}
      >
        <Div>
          <Typography
            sx={{
              border: "1px solid #b0bAC9",
              color: "#53B8CA",
              py: 1,
              px: 2,
              borderRadius: "10px",
              mb: 0,
            }}
            variant="h3"
          >
            Inventory & Assets Tracking Management
          </Typography>
        </Div>
        <Div>
          {/* <Typography sx={{ border: "1px solid #b0bAC9", color: "#53B8CA", py: 1, px: 2, borderRadius: "10px", mb: 0 }} variant='h3'>Package 3</Typography> */}
          <FormControl
            sx={{
              minWidth: 150,
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#b0bAC9", // default
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc", // on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc", // on focus
                },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#ccc", // on dropdown open (click)
                  },
              },
            }}
          >
            <Select
              value={selectedValue}
              onChange={handleChange}
              displayEmpty
              IconComponent={KeyboardArrowDown}
              sx={{
                height: 41,
                borderRadius: 2,
                bgcolor: "#fff",
                color: "#53B8CA", // text color
                fontSize: "1.25rem",
                fontWeight: "400",
                px: 1.5,
                "& .MuiSelect-icon": {
                  color: "#53B8CA", // dropdown arrow color
                },
              }}
            >
              <MenuItem value="Package 1">Package 1</MenuItem>
              <MenuItem value="Package 2">Package 2</MenuItem>
              <MenuItem value="Package 3">Package 3</MenuItem>
              <MenuItem value="Package 4">Package 4</MenuItem>
              <MenuItem value="Package 5">Package 5</MenuItem>
              <MenuItem value="Package 6">Package 6</MenuItem>
            </Select>
          </FormControl>
        </Div>
      </Box>
    </Div>
  );
};

export default HotoHeader;
