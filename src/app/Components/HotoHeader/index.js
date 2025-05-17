import Div from "@jumbo/shared/Div";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { package_no_data_disptach } from "app/redux/actions/HotoHeader";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HotoHeader = () => {
  const dispatch=useDispatch();
  const {packageNoDataReducer}=useSelector((state)=>state);
  // const [selectedValue, setSelectedValue] = useState("Package 1");
  const [packageList, setPackageList] = useState("");
  const handleChange = (event) => {
    // setSelectedValue(event.target.value);
    dispatch(package_no_data_disptach(event.target.value));
  };
  useEffect(() => {
    Axios.get("/hoto-to-assets/equipment/dropdown-package")
      .then((result) => {
        setPackageList(result?.data?.result);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);
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
              value={packageNoDataReducer?.data}
              onChange={(e) => handleChange(e)}
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
              {packageList?.length > 0 &&
                packageList?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item?.packageName}>
                      {item?.packageName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Div>
      </Box>
    </Div>
  );
};

export default HotoHeader;
