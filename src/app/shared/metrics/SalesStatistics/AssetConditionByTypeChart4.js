// // import {
// //   Autocomplete,
// //   Box,
// //   Card,
// //   CardContent,
// //   TextField,
// //   Typography,
// // } from "@mui/material";
// // import { Axios } from "index";
// // import { useEffect, useState } from "react";
// // import {
// //   Bar,
// //   BarChart,
// //   CartesianGrid,
// //   Legend,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";

// // const CustomLegend = () => (
// //   <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
// //     {[
// //       { name: "Robust", color: "#22CAAD" },
// //       { name: "Damaged", color: "#F55757" },
// //       { name: "Semi-Damaged", color: "#FDCF2A" },
// //       { name: "Not Found", color: "#E78F5D" },
// //     ].map((item, index) => (
// //       <Box key={index} display="flex" alignItems="center" gap={1}>
// //         <Box
// //           sx={{
// //             width: 12,
// //             height: 12,
// //             borderRadius: "50%",
// //             backgroundColor: item.color,
// //           }}
// //         />
// //         <Typography variant="body2" sx={{ color: "#000" }}>
// //           {item.name}
// //         </Typography>
// //       </Box>
// //     ))}
// //   </Box>
// // );

// // const AssetConditionByTypeChart4 = () => {
// //   // State management
// //   const [selectedBlock, setSelectedBlock] = useState("");
// //   const [selectedGP, setSelectedGP] = useState(null);
// //   const [selectedEquipment, setSelectedEquipment] = useState("CCU");
// //   const [blocks, setBlocks] = useState([]);
// //   const [gps, setGps] = useState([]);
// //   const [equipmentTypes, setEquipmentTypes] = useState([]);
// //   const [chartData, setChartData] = useState([]);

// //   // Fetch blocks and equipment types on component mount
// //   useEffect(() => {
// //     Axios.get("/hoto-to-assets/equipment/dropdown-block")
// //       .then((response) => setBlocks(response?.data?.result))
// //       .catch((err) => console.error("Error fetching blocks:", err));

// //     Axios.get("/hoto-to-assets/equipment/dropdown-equipments")
// //       .then((response) => setEquipmentTypes(response?.data?.result))
// //       .catch((err) => console.error("Error fetching equipment types:", err));
// //   }, []);

// //   // Handle Block change
// //   const handleBlockChange = (_, newValue) => {
// //     setSelectedBlock(newValue);
// //     setSelectedGP(null);
// //     setGps([]);
// //     setChartData([]);
// //     if (newValue && selectedEquipment) {
// //       Axios.get(
// //         `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}&block_name=${newValue}`
// //       )
// //         .then((result) => {
// //           const responseData = result?.data?.result;

// //           // Transform the data according to mapping
// //           const transformedData = [
// //             {
// //               type: selectedEquipment,
// //               Robust:
// //                 responseData.find((item) => item._id.condition === "Good")
// //                   ?.count || 0,
// //               Damaged:
// //                 responseData.find((item) => item._id.condition === "Damage")
// //                   ?.count || 0,
// //               "Semi-Damaged":
// //                 responseData.find((item) => item._id.condition === "OK")
// //                   ?.count || 0,
// //               "Not Found":
// //                 responseData.find((item) => item._id.condition === "Bad")
// //                   ?.count || 0,
// //             },
// //           ];

// //           // Update the chart data
// //           setChartData(transformedData);
// //         })
// //         .catch((err) => console.log("Error fetching chart data:", err));
// //     }
// //     if (newValue) {
// //       Axios.get(`/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`)
// //         .then((response) => setGps(response.data?.result))
// //         .catch((err) => console.log("Error fetching GPs:", err));
// //     }
// //   };

// //   // Handle Equipment change
// //   const handleEquipmentChange = (_, newValue) => {
// //     setSelectedEquipment(newValue);
// //     setSelectedBlock("");
// //     setSelectedGP(null);
// //     setChartData([]);
// //     if (newValue && selectedEquipment) {
// //       Axios.get(
// //         `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${newValue}`
// //       )
// //         .then((result) => {
// //           const responseData = result?.data?.result;

// //           // Transform the data according to mapping
// //           const transformedData = [
// //             {
// //               type: selectedEquipment,
// //               Robust:
// //                 responseData.find((item) => item._id.condition === "Good")
// //                   ?.count || 0,
// //               Damaged:
// //                 responseData.find((item) => item._id.condition === "Damage")
// //                   ?.count || 0,
// //               "Semi-Damaged":
// //                 responseData.find((item) => item._id.condition === "OK")
// //                   ?.count || 0,
// //               "Not Found":
// //                 responseData.find((item) => item._id.condition === "Bad")
// //                   ?.count || 0,
// //             },
// //           ];

// //           // Update the chart data
// //           setChartData(transformedData);
// //         })
// //         .catch((err) => console.log("Error fetching chart data:", err));
// //     }else{
// //       Axios.get(
// //         `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name="RACK"`
// //       )
// //         .then((result) => {
// //           setSelectedEquipment("RACK");
// //           const responseData = result?.data?.result;

// //           // Transform the data according to mapping
// //           const transformedData = [
// //             {
// //               type: selectedEquipment,
// //               Robust:
// //                 responseData.find((item) => item._id.condition === "Good")
// //                   ?.count || 0,
// //               Damaged:
// //                 responseData.find((item) => item._id.condition === "Damage")
// //                   ?.count || 0,
// //               "Semi-Damaged":
// //                 responseData.find((item) => item._id.condition === "OK")
// //                   ?.count || 0,
// //               "Not Found":
// //                 responseData.find((item) => item._id.condition === "Bad")
// //                   ?.count || 0,
// //             },
// //           ];

// //           // Update the chart data
// //           setChartData(transformedData);
// //         })
// //         .catch((err) => console.log("Error fetching chart data:", err));
       
// //     }
// //   };

// //   // Handle GP change and fetch chart data
// //   const handleGPChange = (_, newValue) => {
// //     setSelectedGP(newValue);
// //     setChartData([]);
// //     if (newValue && selectedEquipment) {
// //       Axios.get(
// //         `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}&block_name=${selectedBlock}&gp_name=${newValue?.location_name}`
// //       )
// //         .then((result) => {
// //           const responseData = result?.data?.result;

// //           // Transform the data according to mapping
// //           const transformedData = [
// //             {
// //               type: selectedEquipment,
// //               Robust:
// //                 responseData.find((item) => item._id.condition === "Good")
// //                   ?.count || 0,
// //               Damaged:
// //                 responseData.find((item) => item._id.condition === "Damage")
// //                   ?.count || 0,
// //               "Semi-Damaged":
// //                 responseData.find((item) => item._id.condition === "OK")
// //                   ?.count || 0,
// //               "Not Found":
// //                 responseData.find((item) => item._id.condition === "Bad")
// //                   ?.count || 0,
// //             },
// //           ];

// //           // Update the chart data
// //           setChartData(transformedData);
// //         })
// //         .catch((err) => console.log("Error fetching chart data:", err));
// //     }else{
// //       Axios.get(
// //         `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}&block_name=${selectedBlock}`
// //       )
// //         .then((result) => {
// //           const responseData = result?.data?.result;

// //           // Transform the data according to mapping
// //           const transformedData = [
// //             {
// //               type: selectedEquipment,
// //               Robust:
// //                 responseData.find((item) => item._id.condition === "Good")
// //                   ?.count || 0,
// //               Damaged:
// //                 responseData.find((item) => item._id.condition === "Damage")
// //                   ?.count || 0,
// //               "Semi-Damaged":
// //                 responseData.find((item) => item._id.condition === "OK")
// //                   ?.count || 0,
// //               "Not Found":
// //                 responseData.find((item) => item._id.condition === "Bad")
// //                   ?.count || 0,
// //             },
// //           ];

// //           // Update the chart data
// //           setChartData(transformedData);
// //         })
// //         .catch((err) => console.log("Error fetching chart data:", err));
// //     }

// //   };
// //   useEffect(()=>{
// //     if (selectedEquipment) {
// //       Axios.get(
// //         `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${selectedEquipment}`
// //       )
// //         .then((result) => {
// //           const responseData = result?.data?.result;

// //           // Transform the data according to mapping
// //           const transformedData = [
// //             {
// //               type: selectedEquipment,
// //               Robust:
// //                 responseData.find((item) => item._id.condition === "Good")
// //                   ?.count || 0,
// //               Damaged:
// //                 responseData.find((item) => item._id.condition === "Damage")
// //                   ?.count || 0,
// //               "Semi-Damaged":
// //                 responseData.find((item) => item._id.condition === "OK")
// //                   ?.count || 0,
// //               "Not Found":
// //                 responseData.find((item) => item._id.condition === "Bad")
// //                   ?.count || 0,
// //             },
// //           ];

// //           // Update the chart data
// //           setChartData(transformedData);
// //         })
// //         .catch((err) => console.log("Error fetching chart data:", err));
// //     }
// //   },[])

// //   return (
// //     <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
// //       <CardContent>
// //         <Box
// //           display="flex"
// //           justifyContent="space-between"
// //           alignItems="center"
// //           mb={1}
// //         >
// //           <Typography variant="h6">Total Assets</Typography>
// //           <Box display="flex" gap={2}>
// //             <Autocomplete
// //               sx={{ minWidth: "200px" }}
// //               options={equipmentTypes}
// //               getOptionLabel={(option) => option || ""}
// //               value={selectedEquipment}
// //               onChange={handleEquipmentChange}
// //               renderInput={(params) => (
// //                 <TextField {...params} label="Item" size="small" />
// //               )}
// //             />
// //             <Autocomplete
// //               sx={{ minWidth: "200px" }}
// //               options={blocks}
// //               getOptionLabel={(option) => option || ""}
// //               value={selectedBlock}
// //               onChange={handleBlockChange}
// //               renderInput={(params) => (
// //                 <TextField {...params} label="Block" size="small" />
// //               )}
// //             />
// //             <Autocomplete
// //               sx={{ minWidth: "200px" }}
// //               options={gps}
// //               getOptionLabel={(option) => option?.location_name || ""}
// //               value={selectedGP}
// //               onChange={handleGPChange}
// //               renderInput={(params) => (
// //                 <TextField {...params} label="Gram Panchayat" size="small" />
// //               )}
// //               disabled={!selectedBlock}
// //             />
// //           </Box>
// //         </Box>

// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart
// //             data={chartData}
// //             margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
// //           >
// //             <XAxis dataKey="type" />
// //             <YAxis />
// //             <CartesianGrid stroke="#ccc" vertical={false} />
// //             <Tooltip cursor={{ fill: "transparent" }} />
// //             <Legend content={<CustomLegend />} />
// //             <Bar dataKey="Robust" fill="#22CAAD" barSize={30} />
// //             <Bar dataKey="Damaged" fill="#F55757" barSize={30} />
// //             <Bar dataKey="Semi-Damaged" fill="#FDCF2A" barSize={30} />
// //             <Bar dataKey="Not Found" fill="#E78F5D" barSize={30} />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default AssetConditionByTypeChart4;


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
//       { name: "Not Found", color: "#E78F5D" },
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
//         <Typography variant="body2">{item.name}</Typography>
//       </Box>
//     ))}
//   </Box>
// );

// const AssetConditionByTypeChart4 = () => {
//   const [selectedBlock, setSelectedBlock] = useState("");
//   const [selectedGP, setSelectedGP] = useState(null);
//   const [selectedEquipment, setSelectedEquipment] = useState("CCU");
//   const [blocks, setBlocks] = useState([]);
//   const [gps, setGps] = useState([]);
//   const [equipmentTypes, setEquipmentTypes] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   const fetchData = (equipment, block = "", gp = "") => {
//     Axios.get(
//       `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${equipment}&block_name=${block}&gp_name=${gp}`
//     )
//       .then((result) => {
//         const responseData = result?.data?.result;
//         const transformedData = [
//           {
//             type: equipment,
//             Robust:
//               responseData.find((item) => item._id.condition === "Good")
//                 ?.count || 0,
//             Damaged:
//               responseData.find((item) => item._id.condition === "Damage")
//                 ?.count || 0,
//             "Semi-Damaged":
//               responseData.find((item) => item._id.condition === "OK")?.count ||
//               0,
//             "Not Found":
//               responseData.find((item) => item._id.condition === "Bad")
//                 ?.count || 0,
//           },
//         ];
//         setChartData(transformedData);
//       })
//       .catch((err) => console.error("Error fetching chart data:", err));
//   };

//   useEffect(() => {
//     Axios.get("/hoto-to-assets/equipment/dropdown-block").then((response) =>
//       setBlocks(response?.data?.result)
//     );
//     Axios.get("/hoto-to-assets/equipment/dropdown-equipments").then(
//       (response) => setEquipmentTypes(response?.data?.result)
//     );
//     fetchData(selectedEquipment);
//   }, []);

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
//             data={chartData}
//             margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
//           >
//             <XAxis dataKey="type" />
//             <YAxis />
//             <CartesianGrid stroke="#ccc" vertical={false} />
//             <Tooltip cursor={{ fill: "transparent" }} />
//             <Legend content={<CustomLegend />} />
//             <Bar dataKey="Robust" fill="#22CAAD" barSize={30} />
//             <Bar dataKey="Damaged" fill="#F55757" barSize={30} />
//             <Bar dataKey="Semi-Damaged" fill="#FDCF2A" barSize={30} />
//             <Bar dataKey="Not Found" fill="#E78F5D" barSize={30} />
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
      { name: "Not Found", color: "#E78F5D" },
      { name: "Semi-Damaged", color: "#FDCF2A" },
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
        <Typography variant="body2">{item.name}</Typography>
      </Box>
    ))}
  </Box>
);

const AssetConditionByTypeChart4 = () => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGP, setSelectedGP] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("CCU");
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchData = (equipment, block = "", gp = "") => {
    Axios.get(
      `/hoto-to-assets/equipment/fetch-equipments-by-block-and-gp?equipment_name=${equipment}&block_name=${block}&gp_name=${gp}`
    )
      .then((result) => {
        const responseData = result?.data?.result;
        const transformedData = [
          {
            type: equipment,
            Robust:
              (responseData.find((item) => item._id.condition === "Good")
                ?.count || 0) +
              (responseData.find((item) => item._id.condition === "OK")
                ?.count || 0),
            Damaged:
              (responseData.find((item) => item._id.condition === "Damage")
                ?.count || 0) +
              (responseData.find((item) => item._id.condition === "Bad")
                ?.count || 0),
            "Not Found": 0,
            "Semi-Damaged": 0,
          },
        ];
        setChartData(transformedData);
      })
      .catch((err) => console.error("Error fetching chart data:", err));
  };

  useEffect(() => {
    Axios.get("/hoto-to-assets/equipment/dropdown-block").then((response) =>
      setBlocks(response?.data?.result)
    );
    Axios.get("/hoto-to-assets/equipment/dropdown-equipments").then(
      (response) => setEquipmentTypes(response?.data?.result)
    );
    fetchData(selectedEquipment);
  }, []);

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
            <Bar dataKey="Not Found" fill="#E78F5D" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart4;
