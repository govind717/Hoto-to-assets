import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colorsMap = {
  Available: "#22CAAD",
  "Not Found": "#F55757",
  // "Semi-Damaged": "#FDCF2A",
  // "Not Defined": "#E78F5D",
  // "Not Found": "#E78F5D",
};


const CustomLegend = ({ total, data, onConditionClick }) => (
  <Box display="flex" justifyContent="center" gap={3} mt={1} flexWrap="wrap">
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#53B8CA",
        }}
      />
      <Typography variant="body2" sx={{ color: "#000" }}>
        {total}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#000", cursor: "pointer" }}
        onClick={() => onConditionClick("total")}
      >
        Total Assets
      </Typography>
    </Box>
    {data.map((item, index) => {
      const percentage = total > 0 ? ((item.value / total) * 100).toFixed(2) : "0.00";
      const valueDisplay = `${item.value} (${percentage}%)`;
      return (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          gap={1}
          onClick={() => onConditionClick(item)}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: colorsMap[item.name] || "#ccc",
            }}
          />
          <Typography variant="body2" sx={{ color: "#000", cursor: "pointer" }}>
            {valueDisplay}
          </Typography>
          <Typography variant="body2" sx={{ color: "#000", cursor: "pointer" }}>
            {item.name}
          </Typography>
        </Box>
      );
    })}
  </Box>
);


const ConditionStatusChart3 = () => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGP, setSelectedGP] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [conditionData, setConditionData] = useState([]);
  const { packageNoDataReducer } = useSelector((state) => state);
  const [notFoundCount, setNotFoundCount] = useState(0);
  const navigate = useNavigate();



  useEffect(() => {
    setSelectedBlock("");
  }, [packageNoDataReducer?.data]);
  // Fetch initial blocks
  useEffect(() => {
    Axios.get(
      `/hoto-to-assets/equipment/dropdown-block?package_name=${packageNoDataReducer?.data}`
    ).then((response) => {
      setBlocks(response?.data?.result);
    });
  }, [packageNoDataReducer?.data]);

  // Helper function to process and fill missing data
  const processFetchedData = (fetchedData) => {
    const conditionMap = fetchedData?.reduce((acc, item) => {
      acc[item._id?.toLowerCase()] = item.count;
      return acc;
    }, {});

    const finalData = [
      {
        name: "Available",
        value: conditionMap["available"] || 0,
      },
      {
        name: "Not Found",
        value: conditionMap["not_available"] || 0,
      },
      // {
      //   name: "Not Defined",
      //   value: conditionMap["not_defined"] || 0,
      // },
      // Uncomment if you want to show these as 0 always:
      // {
      //   name: "Semi-Damaged",
      //   value: 0,
      // },
      // {
      //   name: "Missing",
      //   value: conditionMap["missing"] || 0,
      // },
    ];

    setOriginalData(finalData);
    setConditionData(finalData);
  };

  // Handle block change
  const handleBlockChange = (_, newValue) => {
    setSelectedBlock(newValue);
    setSelectedGP(null);
    setGps([]);

    const endpoint = newValue
      ? `/hoto-to-assets/equipment/fetch-gp-availability-notavailability?block_name=${newValue}&package_name=${packageNoDataReducer?.data}`
      : `/hoto-to-assets/equipment//fetch-gp-availability-notavailability?package_name=${packageNoDataReducer?.data}`;

    Axios.get(endpoint)
      .then((result) => {
        processFetchedData(result?.data?.result);
        setNotFoundCount(result?.data?.result[0]?.not_available[0]?.count);
      })
      .catch((err) => console.log("Error : ", err));

    if (newValue) {
      Axios.get(`/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`)
        .then((response) => {
          setGps(response.data?.result);
        })
        .catch((err) => console.log("Error: ", err));
    }
  };

  // Handle GP change
  const handleGPChange = (_, newValue) => {
    setSelectedGP(newValue);
    if (newValue) {
      Axios.get(
        `/hoto-to-assets/equipment/fetch-gp-availability-notavailability?block_name=${selectedBlock}&gp_name=${newValue?.location_name}&package_name=${packageNoDataReducer?.data}`
      )
        .then((result) => {
          processFetchedData(result?.data?.result);
          setNotFoundCount(result?.data?.result[0]?.not_available[0]?.count);
        })
        .catch((err) => console.log("Error : ", err));
    } else {
      Axios.get(
        `/hoto-to-assets/equipment/fetch-gp-availability-notavailability?block_name=${selectedBlock}&package_name=${packageNoDataReducer?.data}`
      )
        .then((result) => {
          processFetchedData(result?.data?.result);
          setNotFoundCount(result?.data?.result[0]?.not_available[0]?.count);
        })
        .catch((err) => console.log("Error : ", err));
    }
  };

  // Initial load of all equipment
  useEffect(() => {
    Axios.get(
      `/hoto-to-assets/equipment/fetch-gp-availability-notavailability?package_name=${packageNoDataReducer?.data}`
    )
      .then((result) => {
        processFetchedData(result?.data?.result);
        setNotFoundCount(result?.data?.result[0]?.not_available[0]?.count);
      })
      .catch((err) => console.log("Error : ", err));
  }, [packageNoDataReducer?.data]);

  const total = originalData.reduce((sum, item) => sum + item.value, 0);
  console.log("total => ", total);
  console.log("og data => ", originalData);

  const handleConditionClick = (item) => {
    if (item === "total") {
      let state = {};
      if (selectedBlock) {
        state = {
          ...state,
          "equipment_details.block.name": selectedBlock,
        };
      }
      if (selectedGP?.location_name) {
        state = {
          ...state,
          "equipment_details.location_name": selectedGP?.location_name,
        };
      }
      navigate("/dashboards/hoto-survey-gp-data", {
        state: {
          ...state,
        },
      });
    } else {
      let state = {};
      if (selectedBlock) {
        state = {
          ...state,
          "equipment_details.block.name": selectedBlock,
        };
      }
      if (selectedGP?.location_name) {
        state = {
          ...state,
          "equipment_details.location_name": selectedGP?.location_name,
        };
      }
      if (item.name == "Available") {
        navigate("/dashboards/hoto-survey-gp-data", {
          state: {
            ...state,
            availability: true,
          },
        });
      } else {
        navigate("/dashboards/hoto-survey-gp-data", {
          state: {
            ...state,
            availability: false,
          },
        });
      }
    }
  };

  const handleNotFoundClick = () => {
    let state = {};
    if (selectedBlock) {
      state = {
        ...state,
        "equipment_details.block.name": selectedBlock,
      };
    }
    if (selectedGP?.location_name) {
      state = {
        ...state,
        "equipment_details.location_name": selectedGP?.location_name,
      };
    }
    navigate("/dashboards/hoto-survey-gp-data", {
      state: {
        ...state,
        // "equipment_details.location_name": selectedGP?.location_name,
        // "equipment_details.block.name": selectedBlock,
        availability: false,
      },
    });
  };

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              GP Total Assets Availability
            </Typography>
            {/* <Typography
              sx={{ fontWeight: 400, cursor: "pointer" }}
              onClick={handleNotFoundClick}
            >
              {notFoundCount || 0} Not Found
            </Typography> */}
          </Box>
          <Box display="flex" gap={2}>

            <Autocomplete
              sx={{ minWidth: "200px" }}
              options={blocks}
              getOptionLabel={(option) => option || ""}
              value={selectedBlock}
              onChange={handleBlockChange}
              renderInput={(params) => (
                <TextField {...params} label="Block" size="small" />
              )}
            />
            <Autocomplete
              sx={{ minWidth: "200px" }}
              options={gps}
              getOptionLabel={(option) => option?.location_name || ""}
              value={selectedGP}
              onChange={handleGPChange}
              renderInput={(params) => (
                <TextField {...params} label="Gram Panchayat" size="small" />
              )}
              disabled={!selectedBlock}
            />
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={conditionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={0}
            >
              {conditionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorsMap[entry.name] || "#ccc"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => {
                const percent = total ? ((value / total) * 100).toFixed(2) : 0;
                return [`${value} (${percent}%)`, name];
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />

          </PieChart>
        </ResponsiveContainer>

        <CustomLegend
          total={total}
          data={conditionData}
          onConditionClick={handleConditionClick}
        />

      </CardContent>
    </Card>
  );
};

export default ConditionStatusChart3;
