// import {
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Axios } from "index";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const CustomLegend = ({ data }) => {
//   const legendItems = [
//     { name: "Robust", color: "#22CAAD" },
//     { name: "Damaged", color: "#F55757" },
//     // { name: "Not Found", color: "#E78F5D" },
//     // { name: "Semi-Damaged", color: "#FDCF2A" }, // Commented as requested
//   ];

//   const latestData = data[0] || {};
//   let total = 0;
//   legendItems.map((item) => {
//     total = total + latestData[item.name];
//   });
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       gap={3}
//       mt={1.5}
//       flexWrap="wrap"
//     >
//       <Box display="flex" alignItems="center" gap={1}>
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             backgroundColor: "#53B8CA",
//           }}
//         />
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {total}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           Total Assets
//         </Typography>
//       </Box>
//       {legendItems.map((item, index) => (
//         <Box key={index} display="flex" alignItems="center" gap={1}>
//           <Box
//             sx={{
//               width: 12,
//               height: 12,
//               borderRadius: "50%",
//               backgroundColor: item.color,
//             }}
//           />
//           <Typography variant="body2">
//             {latestData[item.name] ?? 0} {item.name}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// const AssetConditionByTypeChart4 = () => {
//   const [selectedBlock, setSelectedBlock] = useState("");
//   const [selectedGP, setSelectedGP] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState("CCU");
//   const [blocks, setBlocks] = useState([]);
//   const [gps, setGps] = useState([]);
//   const [equipmentTypes, setEquipmentTypes] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const { packageNoDataReducer } = useSelector((state) => state);
//   const fetchData = (equipment, block = "", gp = "") => {
//     Axios.get(
//       `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${equipment}&package_name=${packageNoDataReducer?.data}&block_name=${block}&gp_name=${gp}`
//     )
//       .then((result) => {
//         const responseData = result?.data?.result;

//         const transformedData = [
//           {
//             type: equipment,
//             Robust:
//               responseData.find((item) => item._id.condition === "robust")
//                 ?.count || 0,
//             Damaged:
//               responseData.find((item) => item._id.condition === "damaged")
//                 ?.count || 0,
//             // "Not Found":
//             //   responseData.find((item) => item._id.condition === null)?.count ||
//             //   0,
//             // "Semi-Damaged": 0, // Commented out as requested
//           },
//         ];
//         setChartData(transformedData);
//       })
//       .catch((err) => console.error("Error fetching chart data:", err));
//   };

//   useEffect(() => {
//     Axios.get(
//       `/hoto-to-assets/equipment/dropdown-block?package_name=${packageNoDataReducer?.data}`
//     ).then((response) => setBlocks(response?.data?.result));

//     Axios.get("/hoto-to-assets/equipment/dropdown-equipments").then(
//       (response) => setEquipmentTypes(response?.data?.result)
//     );
//     fetchData(selectedEquipment);
//   }, [packageNoDataReducer?.data]);

//   useEffect(() => {
//     setSelectedBlock("");
//   }, [packageNoDataReducer?.data]);
//   const handleEquipmentChange = (_, newValue) => {
//     if (newValue) {
//       setSelectedEquipment(newValue);
//       fetchData(newValue);
//     }
//   };

//   const handleBlockChange = (_, newValue) => {
//     setSelectedBlock(newValue);
//     setSelectedGP(null);
//     setGps([]);
//     fetchData(selectedEquipment, newValue);
//     if (newValue) {
//       Axios.get(
//         `/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`
//       ).then((response) => setGps(response.data?.result));
//     }
//   };

//   const handleGPChange = (_, newValue) => {
//     setSelectedGP(newValue);
//     fetchData(selectedEquipment, selectedBlock, newValue?.location_name);
//   };

//   return (
//     <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//       <CardContent>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={1}
//         >
//           <Typography variant="h6">GP POP Asset Condition</Typography>
//           <Box display="flex" gap={2}>
//             <Autocomplete
//               sx={{ minWidth: "200px" }}
//               options={equipmentTypes}
//               getOptionLabel={(option) => option || ""}
//               value={selectedEquipment}
//               onChange={handleEquipmentChange}
//               renderInput={(params) => (
//                 <TextField {...params} label="Item" size="small" />
//               )}
//             />
//             <Autocomplete
//               sx={{ minWidth: "200px" }}
//               options={blocks}
//               getOptionLabel={(option) => option || ""}
//               value={selectedBlock}
//               onChange={handleBlockChange}
//               renderInput={(params) => (
//                 <TextField {...params} label="Block" size="small" />
//               )}
//             />
//             <Autocomplete
//               sx={{ minWidth: "200px" }}
//               options={gps}
//               getOptionLabel={(option) => option?.location_name || ""}
//               value={selectedGP}
//               onChange={handleGPChange}
//               renderInput={(params) => (
//                 <TextField {...params} label="Gram Panchayat" size="small" />
//               )}
//               disabled={!selectedBlock}
//             />
//           </Box>
//         </Box>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={chartData}
//             margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
//           >
//             <XAxis dataKey="type" />
//             <YAxis />
//             <CartesianGrid stroke="#ccc" vertical={false} />
//             <Tooltip cursor={{ fill: "transparent" }} />
//             <Legend content={<CustomLegend data={chartData} />} />
//             <Bar dataKey="Robust" fill="#22CAAD" barSize={30} />
//             <Bar dataKey="Damaged" fill="#F55757" barSize={30} />
//             {/* <Bar dataKey="Not Found" fill="#E78F5D" barSize={30} /> */}
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetConditionByTypeChart4;








// =======================new code







// import {
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Axios } from "index";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const CustomLegend = ({ data }) => {
//   const legendItems = [
//     { name: "Robust", color: "#22CAAD" },
//     { name: "Damaged", color: "#F55757" },
//     // { name: "Not Found", color: "#E78F5D" },
//     // { name: "Semi-Damaged", color: "#FDCF2A" }, // Commented as requested
//   ];

//   const latestData = data[0] || {};
//   let total = 0;
//   legendItems.map((item) => {
//     total = total + latestData[item.name];
//   });
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       gap={3}
//       mt={1.5}
//       flexWrap="wrap"
//     >
//       <Box display="flex" alignItems="center" gap={1}>
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             backgroundColor: "#53B8CA",
//           }}
//         />
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {total}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           Total Assets
//         </Typography>
//       </Box>
//       {legendItems.map((item, index) => (
//         <Box key={index} display="flex" alignItems="center" gap={1}>
//           <Box
//             sx={{
//               width: 12,
//               height: 12,
//               borderRadius: "50%",
//               backgroundColor: item.color,
//             }}
//           />
//           <Typography variant="body2">
//             {latestData[item.name] ?? 0} {item.name}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// const AssetConditionByTypeChart4 = () => {
//   const [selectedBlock, setSelectedBlock] = useState("");
//   const [selectedGP, setSelectedGP] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState("CCU");
//   const [blocks, setBlocks] = useState([]);
//   const [gps, setGps] = useState([]);
//   const [equipmentTypes, setEquipmentTypes] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const { packageNoDataReducer } = useSelector((state) => state);
//   const [notFoundCount, setNotFoundCount] = useState(0);
//   const fetchData = (equipment, block = "", gp = "") => {
//     Axios.get(
//       `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${equipment}&package_name=${packageNoDataReducer?.data}&block_name=${block}&gp_name=${gp}`
//     )
//       .then((result) => {
//         const responseData = result?.data?.result[0]?.available;

//         // const transformedData = [
//         //   {
//         //     type: equipment,
//         //     Robust:
//         //       responseData.find((item) => item._id.condition === "robust")
//         //         ?.count || 0,
//         //     Damaged:
//         //       responseData.find((item) => item._id.condition === "damaged")
//         //         ?.count || 0,
//         //     // "Not Found":
//         //     //   responseData.find((item) => item._id.condition === null)?.count ||
//         //     //   0,
//         //     // "Semi-Damaged": 0, // Commented out as requested
//         //   },
//         // ];
//         const transformedData = [
//           {
//             type: equipment,
//             Robust:
//               responseData.find((item) => item._id === "robust")?.count || 0,
//             Damaged:
//               responseData.find((item) => item._id === "damaged")?.count || 0,
//           },
//         ];
//         setChartData(transformedData);
//         setNotFoundCount(result?.data?.result[0]?.not_available[0]?.count);
//       })
//       .catch((err) => console.error("Error fetching chart data:", err));
//   };

//   useEffect(() => {
//     Axios.get(
//       `/hoto-to-assets/equipment/dropdown-block?package_name=${packageNoDataReducer?.data}`
//     ).then((response) => setBlocks(response?.data?.result));

//     Axios.get("/hoto-to-assets/equipment/dropdown-equipments").then(
//       (response) => setEquipmentTypes(response?.data?.result)
//     );
//     fetchData(selectedEquipment);
//   }, [packageNoDataReducer?.data]);

//   useEffect(() => {
//     setSelectedBlock("");
//   }, [packageNoDataReducer?.data]);
//   const handleEquipmentChange = (_, newValue) => {
//     if (newValue) {
//       setSelectedEquipment(newValue);
//       fetchData(newValue);
//     }
//   };

//   const handleBlockChange = (_, newValue) => {
//     setSelectedBlock(newValue);
//     setSelectedGP(null);
//     setGps([]);
//     fetchData(selectedEquipment, newValue);
//     if (newValue) {
//       Axios.get(
//         `/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`
//       ).then((response) => setGps(response.data?.result));
//     }
//   };

//   const handleGPChange = (_, newValue) => {
//     setSelectedGP(newValue);
//     fetchData(selectedEquipment, selectedBlock, newValue?.location_name);
//   };

//   return (
//     <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//       <CardContent>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={1}
//         >
//           <Box>
//             <Typography variant="h6" sx={{ fontWeight: "500" }}>
//               GP POP Asset Condition
//             </Typography>
//             <Typography sx={{ fontWeight: 400 }}>
//               {notFoundCount || 0} Not Found
//             </Typography>
//           </Box>
//           <Box display="flex" gap={2}>
//             <Autocomplete
//               sx={{ minWidth: "200px" }}
//               options={equipmentTypes}
//               getOptionLabel={(option) => option || ""}
//               value={selectedEquipment}
//               onChange={handleEquipmentChange}
//               renderInput={(params) => (
//                 <TextField {...params} label="Item" size="small" />
//               )}
//             />
//             <Autocomplete
//               sx={{ minWidth: "200px" }}
//               options={blocks}
//               getOptionLabel={(option) => option || ""}
//               value={selectedBlock}
//               onChange={handleBlockChange}
//               renderInput={(params) => (
//                 <TextField {...params} label="Block" size="small" />
//               )}
//             />
//             <Autocomplete
//               sx={{ minWidth: "200px" }}
//               options={gps}
//               getOptionLabel={(option) => option?.location_name || ""}
//               value={selectedGP}
//               onChange={handleGPChange}
//               renderInput={(params) => (
//                 <TextField {...params} label="Gram Panchayat" size="small" />
//               )}
//               disabled={!selectedBlock}
//             />
//           </Box>
//         </Box>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={chartData}
//             margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
//           >
//             <XAxis dataKey="type" />
//             <YAxis />
//             <CartesianGrid stroke="#ccc" vertical={false} />
//             <Tooltip cursor={{ fill: "transparent" }} />
//             <Legend content={<CustomLegend data={chartData} />} />
//             <Bar dataKey="Robust" fill="#22CAAD" barSize={30} />
//             <Bar dataKey="Damaged" fill="#F55757" barSize={30} />
//             {/* <Bar dataKey="Not Found" fill="#E78F5D" barSize={30} /> */}
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetConditionByTypeChart4;



// ==================newest 

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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// CustomLegend component with click handler
const CustomLegend = ({ data, onLegendClick }) => {
  const legendItems = [
    { name: "Robust", color: "#22CAAD" },
    { name: "Damaged", color: "#F55757" },
    // Add more conditions here if needed
  ];

  const latestData = data[0] || {};
  let total = 0;
  legendItems.forEach((item) => {
    total += latestData[item.name] || 0;
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap={3}
      mt={1.5}
      flexWrap="wrap"
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#53B8CA",
          }}
        />
        <Typography variant="body2" sx={{ color: "#000" }}>
          {total}
        </Typography>
        <Typography variant="body2" sx={{ color: "#000" }}>
          Total Assets
        </Typography>
      </Box>
      {legendItems.map((item, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ cursor: "pointer" }}
          onClick={() => onLegendClick?.(item.name)}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: item.color,
            }}
          />
          <Typography variant="body2">
            {latestData[item.name] ?? 0} {item.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const AssetConditionByTypeChart4 = () => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGP, setSelectedGP] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("CCU");
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { packageNoDataReducer } = useSelector((state) => state);
  const [notFoundCount, setNotFoundCount] = useState(0);
  const navigate=useNavigate();
  const fetchData = (equipment, block = "", gp = "") => {
    Axios.get(
      `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${equipment}&package_name=${packageNoDataReducer?.data}&block_name=${block}&gp_name=${gp}`
    )
      .then((result) => {
        const responseData = result?.data?.result[0]?.available || [];

        const transformedData = [
          {
            type: equipment,
            Robust:
              responseData.find((item) => item._id === "robust")?.count || 0,
            Damaged:
              responseData.find((item) => item._id === "damaged")?.count || 0,
          },
        ];
        setChartData(transformedData);
        setNotFoundCount(result?.data?.result[0]?.not_available[0]?.count || 0);
      })
      .catch((err) => console.error("Error fetching chart data:", err));
  };

  useEffect(() => {
    Axios.get(
      `/hoto-to-assets/equipment/dropdown-block?package_name=${packageNoDataReducer?.data}`
    ).then((response) => setBlocks(response?.data?.result));

    Axios.get("/hoto-to-assets/equipment/dropdown-equipments").then(
      (response) => setEquipmentTypes(response?.data?.result)
    );

    fetchData(selectedEquipment);
  }, [packageNoDataReducer?.data]);

  useEffect(() => {
    setSelectedBlock("");
  }, [packageNoDataReducer?.data]);

  const handleEquipmentChange = (_, newValue) => {
    if (newValue) {
      setSelectedEquipment(newValue);
      fetchData(newValue);
    }
  };

  const handleBlockChange = (_, newValue) => {
    setSelectedBlock(newValue);
    setSelectedGP(null);
    setGps([]);
    fetchData(selectedEquipment, newValue);
    if (newValue) {
      Axios.get(
        `/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`
      ).then((response) => setGps(response.data?.result));
    }
  };

  const handleGPChange = (_, newValue) => {
    setSelectedGP(newValue);
    fetchData(selectedEquipment, selectedBlock, newValue?.location_name);
  };

  // Legend click handler
  const handleLegendClick = (conditionName) => {
    if (conditionName === "Not Found") {
      navigate("/dashboards/hoto-survey-gp-data", {
        state: {
          equipment_name: selectedEquipment,
          "equipment_details.location_name": selectedGP?.location_name,
          "equipment_details.block.name": selectedBlock,
          availability: false,
          // condition: conditionName?.toLowerCase(),
        },
      });
    } else {
      navigate("/dashboards/hoto-survey-gp-data", {
        state: {
          equipment_name: selectedEquipment,
          "equipment_details.location_name": selectedGP?.location_name,
          "equipment_details.block.name": selectedBlock,
          condition: conditionName?.toLowerCase(),
        },
      });
    }
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              GP POP Asset Condition
            </Typography>
            <Typography
              sx={{ fontWeight: 400 ,cursor:'pointer' }}
              onClick={() => handleLegendClick("Not Found")}
            >
              {notFoundCount || 0} Not Found
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Autocomplete
              sx={{ minWidth: "200px" }}
              options={equipmentTypes}
              getOptionLabel={(option) => option || ""}
              value={selectedEquipment}
              onChange={handleEquipmentChange}
              renderInput={(params) => (
                <TextField {...params} label="Item" size="small" />
              )}
            />
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="type" />
            <YAxis />
            <CartesianGrid stroke="#ccc" vertical={false} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Legend
              content={
                <CustomLegend
                  data={chartData}
                  onLegendClick={handleLegendClick}
                />
              }
            />
            <Bar dataKey="Robust" fill="#22CAAD" barSize={30} />
            <Bar dataKey="Damaged" fill="#F55757" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart4;
