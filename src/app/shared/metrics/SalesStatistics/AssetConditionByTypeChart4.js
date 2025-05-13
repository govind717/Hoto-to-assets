// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
// } from "recharts";

// // Sample Data Structure with GP data
// const districtData = {
//   Meerut: {
//     Block1: {
//       Khanpur: [
//         { type: "RACK", Robust: 5, Damaged: 2, "Semi-Damaged": 3, Missing: 0 },
//         { type: "CCU", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 1 },
//         { type: "SMPS", Robust: 4, Damaged: 3, "Semi-Damaged": 2, Missing: 1 },
//         { type: "SPLITTER", Robust: 5, Damaged: 0, "Semi-Damaged": 4, Missing: 1 },
//         { type: "OLT", Robust: 8, Damaged: 1, "Semi-Damaged": 0, Missing: 1 },
//         { type: "SFP", Robust: 7, Damaged: 2, "Semi-Damaged": 1, Missing: 0 },
//         { type: "FDMS", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 1 },
//         { type: "CABLE", Robust: 4, Damaged: 2, "Semi-Damaged": 3, Missing: 1 },
//         { type: "SOLAR", Robust: 3, Damaged: 3, "Semi-Damaged": 3, Missing: 1 },
//         { type: "UPS", Robust: 5, Damaged: 1, "Semi-Damaged": 4, Missing: 0 },
//       ],
//       Baroda: [
//         { type: "RACK", Robust: 4, Damaged: 1, "Semi-Damaged": 3, Missing: 2 },
//         { type: "CCU", Robust: 7, Damaged: 0, "Semi-Damaged": 1, Missing: 1 },
//         { type: "SMPS", Robust: 5, Damaged: 2, "Semi-Damaged": 2, Missing: 2 },
//         { type: "SPLITTER", Robust: 6, Damaged: 3, "Semi-Damaged": 1, Missing: 0 },
//         { type: "OLT", Robust: 9, Damaged: 0, "Semi-Damaged": 1, Missing: 0 },
//         { type: "SFP", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
//         { type: "FDMS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 0 },
//         { type: "CABLE", Robust: 4, Damaged: 2, "Semi-Damaged": 1, Missing: 1 },
//         { type: "SOLAR", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
//         { type: "UPS", Robust: 7, Damaged: 0, "Semi-Damaged": 2, Missing: 1 },
//       ],
//     },
//     Block2: {
//       Bahadurpur: [
//         { type: "RACK", Robust: 4, Damaged: 1, "Semi-Damaged": 2, Missing: 3 },
//         { type: "CCU", Robust: 6, Damaged: 0, "Semi-Damaged": 4, Missing: 2 },
//         { type: "SMPS", Robust: 5, Damaged: 2, "Semi-Damaged": 1, Missing: 3 },
//         { type: "SPLITTER", Robust: 3, Damaged: 3, "Semi-Damaged": 2, Missing: 2 },
//         { type: "OLT", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
//         { type: "SFP", Robust: 7, Damaged: 1, "Semi-Damaged": 3, Missing: 1 },
//         { type: "FDMS", Robust: 4, Damaged: 2, "Semi-Damaged": 3, Missing: 0 },
//         { type: "CABLE", Robust: 9, Damaged: 0, "Semi-Damaged": 1, Missing: 0 },
//         { type: "SOLAR", Robust: 6, Damaged: 1, "Semi-Damaged": 3, Missing: 0 },
//         { type: "UPS", Robust: 5, Damaged: 2, "Semi-Damaged": 1, Missing: 2 },
//       ],
//     },
//   },
//   Ghaziabad: {
//     Block1: {
//       Bawana: [
//         { type: "RACK", Robust: 6, Damaged: 1, "Semi-Damaged": 3, Missing: 0 },
//         { type: "CCU", Robust: 7, Damaged: 2, "Semi-Damaged": 1, Missing: 0 },
//         { type: "SMPS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 1 },
//         { type: "SPLITTER", Robust: 6, Damaged: 0, "Semi-Damaged": 3, Missing: 1 },
//         { type: "OLT", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
//         { type: "SFP", Robust: 7, Damaged: 2, "Semi-Damaged": 2, Missing: 1 },
//         { type: "FDMS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 1 },
//         { type: "CABLE", Robust: 4, Damaged: 1, "Semi-Damaged": 4, Missing: 1 },
//         { type: "SOLAR", Robust: 3, Damaged: 2, "Semi-Damaged": 3, Missing: 0 },
//         { type: "UPS", Robust: 6, Damaged: 2, "Semi-Damaged": 1, Missing: 1 },
//       ],
//       Abupur: [
//         { type: "RACK", Robust: 4, Damaged: 1, "Semi-Damaged": 3, Missing: 2 },
//         { type: "CCU", Robust: 7, Damaged: 0, "Semi-Damaged": 1, Missing: 1 },
//         { type: "SMPS", Robust: 5, Damaged: 2, "Semi-Damaged": 2, Missing: 2 },
//         { type: "SPLITTER", Robust: 6, Damaged: 3, "Semi-Damaged": 1, Missing: 0 },
//         { type: "OLT", Robust: 9, Damaged: 0, "Semi-Damaged": 1, Missing: 0 },
//         { type: "SFP", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
//         { type: "FDMS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 0 },
//         { type: "CABLE", Robust: 4, Damaged: 2, "Semi-Damaged": 1, Missing: 1 },
//         { type: "SOLAR", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
//         { type: "UPS", Robust: 7, Damaged: 0, "Semi-Damaged": 2, Missing: 1 },
//       ],
//     },
//   },
// };

// const CustomLegend = () => (
//   <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
//     {[
//       { name: "Robust", color: "#22CAAD" },
//       { name: "Damaged", color: "#F55757" },
//       { name: "Semi-Damaged", color: "#FDCF2A" },
//       { name: "Missing", color: "#E78F5D" },
//     ].map((item, index) => (
//       <Box key={index} display="flex" alignItems="center" gap={1}>
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             backgroundColor: item.color,
//           }}
//         />
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {item.name}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// );

// const AssetConditionByTypeChart4 = () => {
//   const [selectedDistrict, setSelectedDistrict] = useState("Meerut");
//   const [selectedBlock, setSelectedBlock] = useState("Block1");
//   const [selectedGP, setSelectedGP] = useState("Khanpur");

//   const handleDistrictChange = (event) => {
//     setSelectedDistrict(event.target.value);
//     setSelectedBlock(Object.keys(districtData[event.target.value])[0]);
//     setSelectedGP(Object.keys(districtData[event.target.value][Object.keys(districtData[event.target.value])[0]])[0]);
//   };

//   const handleBlockChange = (event) => {
//     setSelectedBlock(event.target.value);
//     setSelectedGP(Object.keys(districtData[selectedDistrict][event.target.value])[0]);
//   };

//   const handleGPChange = (event) => {
//     setSelectedGP(event.target.value);
//   };

//   return (
//     <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6">Asset Condition</Typography>
//           <Box display="flex" gap={2}>
//             <FormControl size="small" sx={{ minWidth: 150 }}>
//               <InputLabel>District</InputLabel>
//               <Select
//                 value={selectedDistrict}
//                 label="District"
//                 onChange={handleDistrictChange}
//               >
//                 {Object.keys(districtData).map((district) => (
//                   <MenuItem key={district} value={district}>
//                     {district}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl size="small" sx={{ minWidth: 150 }}>
//               <InputLabel>Block</InputLabel>
//               <Select
//                 value={selectedBlock}
//                 label="Block"
//                 onChange={handleBlockChange}
//               >
//                 {Object.keys(districtData[selectedDistrict]).map((block) => (
//                   <MenuItem key={block} value={block}>
//                     {block}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl size="small" sx={{ minWidth: 150 }}>
//               <InputLabel>Gram Panchayat</InputLabel>
//               <Select
//                 value={selectedGP}
//                 label="Gram Panchayat"
//                 onChange={handleGPChange}
//               >
//                 {Object.keys(districtData[selectedDistrict][selectedBlock]).map((gp) => (
//                   <MenuItem key={gp} value={gp}>
//                     {gp}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Box>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={districtData[selectedDistrict][selectedBlock][selectedGP]}
//             margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
//           >
//             <XAxis dataKey="type" />
//             <YAxis />
//             <CartesianGrid stroke="#ccc" vertical={false} />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "white",
//                 border: "1px solid #eee",
//                 borderRadius: "6px",
//                 boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
//               }}
//               cursor={{ fill: "transparent" }}
//             />
//             <Legend content={<CustomLegend />} />
//             <Bar dataKey="Robust" stackId="a" fill="#22CAAD" barSize={25} />
//             <Bar dataKey="Damaged" stackId="a" fill="#F55757" barSize={25} />
//             <Bar dataKey="Semi-Damaged" stackId="a" fill="#FDCF2A" barSize={25} />
//             <Bar dataKey="Missing" stackId="a" fill="#E78F5D" barSize={25} />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetConditionByTypeChart4;

// import {
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Typography
// } from "@mui/material";
// import { Axios } from "index";
// import { useEffect, useState } from "react";
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

// const CustomLegend = () => (
//   <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
//     {[
//       { name: "Robust", color: "#22CAAD" },
//       { name: "Damaged", color: "#F55757" },
//       { name: "Semi-Damaged", color: "#FDCF2A" },
//       { name: "Missing", color: "#E78F5D" },
//     ].map((item, index) => (
//       <Box key={index} display="flex" alignItems="center" gap={1}>
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             backgroundColor: item.color,
//           }}
//         />
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {item.name}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// );

// const AssetConditionByTypeChart4 = () => {
//   const [selectedBlock, setSelectedBlock] = useState("");
//   const [selectedGP, setSelectedGP] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [blocks, setBlocks] = useState([]);
//   const [gps, setGps] = useState([]);
//  const [equipmentTypes,setEquipmentTypes]=useState([]);
//   useEffect(() => {
//     Axios.get("/hoto-to-assets/equipment/dropdown-block").then((response) => {
//       setBlocks(response?.data?.result);
//     });
//     Axios.get("/hoto-to-assets/equipment/dropdown-equipments").then(
//       (response) => {
//         setEquipmentTypes(response?.data?.result);
//       }
//     );
//   }, []);

//   const handleEquipmentChange = (_, newValue) => {
//     setSelectedEquipment(newValue);
//   };

//   const handleBlockChange = (_, newValue) => {
//     setSelectedBlock(newValue);
//     setSelectedGP(null);
//     setGps([]);

//     if (newValue) {
//       Axios.get(`/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`)
//         .then((response) => {
//           setGps(response.data?.result);
//         })
//         .catch((err) => console.log("Error: ", err));
//     }
//   };

//   // Handle GP change
//   const handleGPChange = (_, newValue) => {
//     setSelectedGP(newValue);
//     if (newValue) {
//       Axios.get(
//         `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}`
//       )
//         .then((result) => {
//           console.log(result?.data?.result)
//           // [
//           //   ({
//           //     _id: {
//           //       condition: "Good",
//           //     },
//           //     count: 376,
//           //   },
//           //   {
//           //     _id: {
//           //       condition: "Bad",
//           //     },
//           //     count: 165,
//           //   })
//           // ];

//         }
//       )
//         .catch((err) => console.log("Error : ", err));
//     }
//   };

//   const data = [
//     {
//       type: "RACK",
//       Robust: 5,
//       Damaged: 2,
//       "Semi-Damaged": 3,
//       Missing: 5,
//     },
//   ];

//   return (
//     <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//       <CardContent>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={1}
//         >
//           <Typography variant="h6">Total Assets</Typography>
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
//             data={data}
//             margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
//           >
//             <XAxis dataKey="type" />
//             <YAxis />
//             <CartesianGrid stroke="#ccc" vertical={false} />
//             <Tooltip cursor={{ fill: "transparent" }} />
//             <Legend content={<CustomLegend />} />
//             <Bar
//               dataKey="Robust"
//               fill="#22CAAD"
//               barSize={30}
//               isAnimationActive={false}
//             />
//             <Bar
//               dataKey="Damaged"
//               fill="#F55757"
//               barSize={30}
//               isAnimationActive={false}
//             />
//             <Bar
//               dataKey="Semi-Damaged"
//               fill="#FDCF2A"
//               barSize={30}
//               isAnimationActive={false}
//             />
//             <Bar
//               dataKey="Missing"
//               fill="#E78F5D"
//               barSize={30}
//               isAnimationActive={false}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetConditionByTypeChart4;


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

const CustomLegend = () => (
  <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
    {[
      { name: "Robust", color: "#22CAAD" },
      { name: "Damaged", color: "#F55757" },
      { name: "Semi-Damaged", color: "#FDCF2A" },
      { name: "Missing", color: "#E78F5D" },
    ].map((item, index) => (
      <Box key={index} display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: item.color,
          }}
        />
        <Typography variant="body2" sx={{ color: "#000" }}>
          {item.name}
        </Typography>
      </Box>
    ))}
  </Box>
);

const AssetConditionByTypeChart4 = () => {
  // State management
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGP, setSelectedGP] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("CCU");
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch blocks and equipment types on component mount
  useEffect(() => {
    Axios.get("/hoto-to-assets/equipment/dropdown-block")
      .then((response) => setBlocks(response?.data?.result))
      .catch((err) => console.error("Error fetching blocks:", err));

    Axios.get("/hoto-to-assets/equipment/dropdown-equipments")
      .then((response) => setEquipmentTypes(response?.data?.result))
      .catch((err) => console.error("Error fetching equipment types:", err));
  }, []);

  // Handle Block change
  const handleBlockChange = (_, newValue) => {
    setSelectedBlock(newValue);
    setSelectedGP(null);
    setGps([]);
    setChartData([]);
    if (newValue && selectedEquipment) {
      Axios.get(
        `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}&block_name=${newValue}`
      )
        .then((result) => {
          const responseData = result?.data?.result;

          // Transform the data according to mapping
          const transformedData = [
            {
              type: selectedEquipment,
              Robust:
                responseData.find((item) => item._id.condition === "Good")
                  ?.count || 0,
              Damaged:
                responseData.find((item) => item._id.condition === "Damage")
                  ?.count || 0,
              "Semi-Damaged":
                responseData.find((item) => item._id.condition === "OK")
                  ?.count || 0,
              Missing:
                responseData.find((item) => item._id.condition === "Bad")
                  ?.count || 0,
            },
          ];

          // Update the chart data
          setChartData(transformedData);
        })
        .catch((err) => console.log("Error fetching chart data:", err));
    }
    if (newValue) {
      Axios.get(`/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`)
        .then((response) => setGps(response.data?.result))
        .catch((err) => console.log("Error fetching GPs:", err));
    }
  };

  // Handle Equipment change
  const handleEquipmentChange = (_, newValue) => {
    setSelectedEquipment(newValue);
    setSelectedBlock("");
    setSelectedGP(null);
    setChartData([]);
    if (newValue && selectedEquipment) {
      Axios.get(
        `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${newValue}`
      )
        .then((result) => {
          const responseData = result?.data?.result;

          // Transform the data according to mapping
          const transformedData = [
            {
              type: selectedEquipment,
              Robust:
                responseData.find((item) => item._id.condition === "Good")
                  ?.count || 0,
              Damaged:
                responseData.find((item) => item._id.condition === "Damage")
                  ?.count || 0,
              "Semi-Damaged":
                responseData.find((item) => item._id.condition === "OK")
                  ?.count || 0,
              Missing:
                responseData.find((item) => item._id.condition === "Bad")
                  ?.count || 0,
            },
          ];

          // Update the chart data
          setChartData(transformedData);
        })
        .catch((err) => console.log("Error fetching chart data:", err));
    }else{
      Axios.get(
        `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name="RACK"`
      )
        .then((result) => {
          const responseData = result?.data?.result;

          // Transform the data according to mapping
          const transformedData = [
            {
              type: selectedEquipment,
              Robust:
                responseData.find((item) => item._id.condition === "Good")
                  ?.count || 0,
              Damaged:
                responseData.find((item) => item._id.condition === "Damage")
                  ?.count || 0,
              "Semi-Damaged":
                responseData.find((item) => item._id.condition === "OK")
                  ?.count || 0,
              Missing:
                responseData.find((item) => item._id.condition === "Bad")
                  ?.count || 0,
            },
          ];

          // Update the chart data
          setChartData(transformedData);
        })
        .catch((err) => console.log("Error fetching chart data:", err));
        setSelectedEquipment("RACK")
    }
  };

  // Handle GP change and fetch chart data
  const handleGPChange = (_, newValue) => {
    setSelectedGP(newValue);
    setChartData([]);
    if (newValue && selectedEquipment) {
      Axios.get(
        `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}&block_name=${selectedBlock}&gp_name=${newValue?.location_name}`
      )
        .then((result) => {
          const responseData = result?.data?.result;

          // Transform the data according to mapping
          const transformedData = [
            {
              type: selectedEquipment,
              Robust:
                responseData.find((item) => item._id.condition === "Good")
                  ?.count || 0,
              Damaged:
                responseData.find((item) => item._id.condition === "Damage")
                  ?.count || 0,
              "Semi-Damaged":
                responseData.find((item) => item._id.condition === "OK")
                  ?.count || 0,
              Missing:
                responseData.find((item) => item._id.condition === "Bad")
                  ?.count || 0,
            },
          ];

          // Update the chart data
          setChartData(transformedData);
        })
        .catch((err) => console.log("Error fetching chart data:", err));
    }else{
      Axios.get(
        `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}&block_name=${selectedBlock}`
      )
        .then((result) => {
          const responseData = result?.data?.result;

          // Transform the data according to mapping
          const transformedData = [
            {
              type: selectedEquipment,
              Robust:
                responseData.find((item) => item._id.condition === "Good")
                  ?.count || 0,
              Damaged:
                responseData.find((item) => item._id.condition === "Damage")
                  ?.count || 0,
              "Semi-Damaged":
                responseData.find((item) => item._id.condition === "OK")
                  ?.count || 0,
              Missing:
                responseData.find((item) => item._id.condition === "Bad")
                  ?.count || 0,
            },
          ];

          // Update the chart data
          setChartData(transformedData);
        })
        .catch((err) => console.log("Error fetching chart data:", err));
    }

  };
  useEffect(()=>{
    if (selectedEquipment) {
      Axios.get(
        `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}`
      )
        .then((result) => {
          const responseData = result?.data?.result;

          // Transform the data according to mapping
          const transformedData = [
            {
              type: selectedEquipment,
              Robust:
                responseData.find((item) => item._id.condition === "Good")
                  ?.count || 0,
              Damaged:
                responseData.find((item) => item._id.condition === "Damage")
                  ?.count || 0,
              "Semi-Damaged":
                responseData.find((item) => item._id.condition === "OK")
                  ?.count || 0,
              Missing:
                responseData.find((item) => item._id.condition === "Bad")
                  ?.count || 0,
            },
          ];

          // Update the chart data
          setChartData(transformedData);
        })
        .catch((err) => console.log("Error fetching chart data:", err));
    }
  },[])

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">Total Assets</Typography>
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
            <Legend content={<CustomLegend />} />
            <Bar dataKey="Robust" fill="#22CAAD" barSize={30} />
            <Bar dataKey="Damaged" fill="#F55757" barSize={30} />
            <Bar dataKey="Semi-Damaged" fill="#FDCF2A" barSize={30} />
            <Bar dataKey="Missing" fill="#E78F5D" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart4;
