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
// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// const CustomLegend = ({ total, data }) => (
//   <Box display="flex" justifyContent="center" gap={3} mt={1} flexWrap="wrap">
//     <Box display="flex" alignItems="center" gap={1}>
//       <Box
//         sx={{
//           width: 10,
//           height: 10,
//           borderRadius: "50%",
//           backgroundColor: "#53B8CA",
//         }}
//       />
//       <Typography variant="body2" sx={{ color: "#000" }}>
//         {total}
//       </Typography>
//       <Typography variant="body2" sx={{ color: "#000" }}>
//         Total Assets
//       </Typography>
//     </Box>
//     {data.map((item, index) => (
//       <Box key={index} display="flex" alignItems="center" gap={1}>
//         <Box
//           sx={{
//             width: 10,
//             height: 10,
//             borderRadius: "50%",
//             backgroundColor:
//               item?._id?.condition === "Damaged"
//                 ? "#F55757"
//                 : item?._id?.condition === "Good"
//                 ? "#22CAAD"
//                 : item?._id?.condition === "Bad"
//                 ? "#FDCF2A"
//                 : item?._id?.condition === "OK"
//                 ? "#E78F5D"
//                 : "",
//           }}
//         />
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {item?.count}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {item?._id?.condition}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// );

// const ConditionStatusChart2 = () => {
//   const [selectedBlock, setSelectedBlock] = useState("");
//   const [selectedGP, setSelectedGP] = useState(null);
//   const [blocks, setBlocks] = useState([]);
//   const [gps, setGps] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [conditionData, setConditionData] = useState([]);

//   useEffect(() => {
//     Axios.get("/hoto-to-assets/equipment/dropdown-block").then((response) => {
//       setBlocks(response?.data?.result);
//     });
//   }, []);

//   const handleBlockChange = (_, newValue) => {
//     setSelectedBlock(newValue);
//     setSelectedGP(null);
//     setGps([]);
//     if (!newValue) {
//       Axios.get("/hoto-to-assets/equipment/fetch-block-and-gp-equipments")
//         .then((result) => {
//           const fetchedData = result?.data?.result;

//           // Calculate total and conditionData here
//           const totalCount = fetchedData.reduce(
//             (sum, item) => sum + item.count,
//             0
//           );

//           const computedConditionData = fetchedData.map((item) => ({
//             ...item,
//             value: item.count, // <-- This is important for the Pie to read the value
//             name: item._id.condition, // <-- This is for the label
//             percentage: ((item.count / totalCount) * 100).toFixed(1),
//           }));

//           setOriginalData(fetchedData);
//           setConditionData(computedConditionData);
//         })
//         .catch((err) => {
//           console.log("Error : ", err);
//         });
//     } else {
//       Axios.get(
//         `/hoto-to-assets/equipment/fetch-block-and-gp-equipments?block_name=${newValue}`
//       )
//         .then((result) => {
//           const fetchedData = result?.data?.result;

//           // Calculate total and conditionData here
//           const totalCount = fetchedData.reduce(
//             (sum, item) => sum + item.count,
//             0
//           );

//           const computedConditionData = fetchedData.map((item) => ({
//             ...item,
//             value: item.count,
//             name: item._id.condition,
//             percentage: ((item.count / totalCount) * 100).toFixed(1),
//           }));

//           setOriginalData(fetchedData);
//           setConditionData(computedConditionData);
//         })
//         .catch((err) => {
//           console.log("Error : ", err);
//         });
//     }
//     if (newValue) {
//       Axios.get(
//         `/hoto-to-assets/equipment/dropdown-gp?block_name=${newValue}`
//       ).then((response) => {
       
//         setGps(response.data?.result);
//       });
//     }
//   };

//   const handleGPChange = (_, newValue) => {
//     setSelectedGP(newValue);
//     Axios.get(
//       `/hoto-to-assets/equipment/fetch-block-and-gp-equipments?block_name=${selectedBlock}&gp_name=${newValue?.location_name}`
//     )
//       .then((result) => {
       
//         const fetchedData = result?.data?.result;

//         // Calculate total and conditionData here
//         const totalCount = fetchedData.reduce(
//           (sum, item) => sum + item.count,
//           0
//         );

//         const computedConditionData = fetchedData.map((item) => ({
//           ...item,
//           value: item.count, // <-- This is important for the Pie to read the value
//           name: item._id.condition, // <-- This is for the label
//           percentage: ((item.count / totalCount) * 100).toFixed(1),
//         }));

//         setOriginalData(fetchedData);
//         setConditionData(computedConditionData);
//       })
//       .catch((err) => {
//         console.log("Error : ", err);
//       });
//   };

//   const total = originalData.reduce((sum, item) => sum + item.count, 0);

//   useEffect(() => {
//     Axios.get("/hoto-to-assets/equipment/fetch-block-and-gp-equipments")
//       .then((result) => {
//         const fetchedData = result?.data?.result;

//         // Calculate total and conditionData here
//         const totalCount = fetchedData.reduce(
//           (sum, item) => sum + item.count,
//           0
//         );

//         const computedConditionData = fetchedData.map((item) => ({
//           ...item,
//           value: item.count, // <-- This is important for the Pie to read the value
//           name: item._id.condition, // <-- This is for the label
//           percentage: ((item.count / totalCount) * 100).toFixed(1),
//         }));

//         setOriginalData(fetchedData);
//         setConditionData(computedConditionData);
//       })
//       .catch((err) => {
//         console.log("Error : ", err);
//       });
//   }, []);

//   return (
//     <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
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

//         <ResponsiveContainer width="100%" height={240}>
//           <PieChart>
//             <Pie
//               data={conditionData}
//               dataKey="count"
//               nameKey="_id.condition"
//               cx="50%"
//               cy="50%"
//               innerRadius={55}
//               outerRadius={80}
//               paddingAngle={0}
//             >
//               {conditionData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={
//                     entry?._id?.condition === "Damaged"
//                       ? "#F55757"
//                       : entry?._id?.condition === "Good"
//                       ? "#22CAAD"
//                       : entry?._id?.condition === "Bad"
//                       ? "#FDCF2A"
//                       : entry?._id?.condition === "OK"
//                       ? "#E78F5D"
//                       : ""
//                   }
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value, name) => [`${value}`, `${name}`]}
//               cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
//             />
//           </PieChart>
//         </ResponsiveContainer>

//         <CustomLegend total={total} data={originalData} />
//       </CardContent>
//     </Card>
//   );
// };

// export default ConditionStatusChart2;


// ------------------------------
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
// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// const conditionsList = ["Damaged", "Good", "Bad", "OK"];
// const colorsMap = {
//   Damaged: "#F55757",
//   Good: "#22CAAD",
//   OK: "#FDCF2A",
//   Bad: "#E78F5D",
// };

// const CustomLegend = ({ total, data }) => (
//   <Box display="flex" justifyContent="center" gap={3} mt={1} flexWrap="wrap">
//     <Box display="flex" alignItems="center" gap={1}>
//       <Box
//         sx={{
//           width: 10,
//           height: 10,
//           borderRadius: "50%",
//           backgroundColor: "#53B8CA",
//         }}
//       />
//       <Typography variant="body2" sx={{ color: "#000" }}>
//         {total}
//       </Typography>
//       <Typography variant="body2" sx={{ color: "#000" }}>
//         Total Assets
//       </Typography>
//     </Box>
//     {data.map((item, index) => (
//       <Box key={index} display="flex" alignItems="center" gap={1}>
//         <Box
//           sx={{
//             width: 10,
//             height: 10,
//             borderRadius: "50%",
//             backgroundColor: colorsMap[item.name] || "#ccc",
//           }}
//         />
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {item.value}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#000" }}>
//           {item.name}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// );

// const ConditionStatusChart2 = () => {
//   const [selectedBlock, setSelectedBlock] = useState("");
//   const [selectedGP, setSelectedGP] = useState(null);
//   const [blocks, setBlocks] = useState([]);
//   const [gps, setGps] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [conditionData, setConditionData] = useState([]);

//   // Fetch initial blocks
//   useEffect(() => {
//     Axios.get("/hoto-to-assets/equipment/dropdown-block").then((response) => {
//       setBlocks(response?.data?.result);
//     });
//   }, []);

//   // Helper function to process and fill missing data
//   const processFetchedData = (fetchedData) => {
//     const conditionMap = fetchedData.reduce((acc, item) => {
//       acc[item._id.condition] = item.count;
//       return acc;
//     }, {});

//     const finalData = conditionsList.map((condition) => ({
//       _id: { condition },
//       count: conditionMap[condition] || 0,
//       value: conditionMap[condition] || 0,
//       name: condition,
//       percentage: "0.0",
//     }));

//     setOriginalData(finalData);
//     setConditionData(finalData);
//   };

//   // Handle block change
//   const handleBlockChange = (_, newValue) => {
//     setSelectedBlock(newValue);
//     setSelectedGP(null);
//     setGps([]);

//     const endpoint = newValue
//       ? `/hoto-to-assets/equipment/fetch-block-and-gp-equipments?block_name=${newValue}`
//       : "/hoto-to-assets/equipment/fetch-block-and-gp-equipments";

//     Axios.get(endpoint)
//       .then((result) => processFetchedData(result?.data?.result))
//       .catch((err) => console.log("Error : ", err));

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
//         `/hoto-to-assets/equipment/fetch-block-and-gp-equipments?block_name=${selectedBlock}&gp_name=${newValue?.location_name}`
//       )
//         .then((result) => processFetchedData(result?.data?.result))
//         .catch((err) => console.log("Error : ", err));
//     }
//   };

//   // Initial load of all equipment
//   useEffect(() => {
//     Axios.get("/hoto-to-assets/equipment/fetch-block-and-gp-equipments")
//       .then((result) => processFetchedData(result?.data?.result))
//       .catch((err) => console.log("Error : ", err));
//   }, []);

//   const total = originalData.reduce((sum, item) => sum + item.count, 0);

//   return (
//     <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
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

//         <ResponsiveContainer width="100%" height={240}>
//           <PieChart>
//             <Pie
//               data={conditionData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={55}
//               outerRadius={80}
//               paddingAngle={0}
//             >
//               {conditionData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={colorsMap[entry.name] || "#ccc"}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value, name) => [`${value}`, `${name}`]}
//               cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
//             />
//           </PieChart>
//         </ResponsiveContainer>

//         <CustomLegend total={total} data={conditionData} />
//       </CardContent>
//     </Card>
//   );
// };

// export default ConditionStatusChart2;


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
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const conditionsList = ["Damaged", "Good", "Bad", "OK"];
const colorsMap = {
  Robust: "#22CAAD",
  Damaged: "#F55757",
  "Semi-Damaged": "#FDCF2A",
  Missing: "#E78F5D",
};

const conditionLabelMap = {
  Good: "Robust",
  Damage: "Damaged",
  OK: "Semi-Damaged",
  Bad: "Missing",
};

const CustomLegend = ({ total, data }) => (
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
      <Typography variant="body2" sx={{ color: "#000" }}>
        Total Assets
      </Typography>
    </Box>
    {data.map((item, index) => (
      <Box key={index} display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: colorsMap[item.name] || "#ccc",
          }}
        />
        <Typography variant="body2" sx={{ color: "#000" }}>
          {item.value}
        </Typography>
        <Typography variant="body2" sx={{ color: "#000" }}>
          {item.name}
        </Typography>
      </Box>
    ))}
  </Box>
);

const ConditionStatusChart2 = () => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGP, setSelectedGP] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [conditionData, setConditionData] = useState([]);

  // Fetch initial blocks
  useEffect(() => {
    Axios.get("/hoto-to-assets/equipment/dropdown-block").then((response) => {
      setBlocks(response?.data?.result);
    });
  }, []);

  // Helper function to process and fill missing data
  const processFetchedData = (fetchedData) => {
    const conditionMap = fetchedData.reduce((acc, item) => {
      acc[item._id.condition] = item.count;
      return acc;
    }, {});

    const finalData = conditionsList.map((condition) => ({
      _id: { condition },
      count: conditionMap[condition] || 0,
      value: conditionMap[condition] || 0,
      name: conditionLabelMap[condition] || condition,
      percentage: "0.0",
    }));

    setOriginalData(finalData);
    setConditionData(finalData);
  };

  // Handle block change
  const handleBlockChange = (_, newValue) => {
    setSelectedBlock(newValue);
    setSelectedGP(null);
    setGps([]);

    const endpoint = newValue
      ? `/hoto-to-assets/equipment/fetch-block-and-gp-equipments?block_name=${newValue}`
      : "/hoto-to-assets/equipment/fetch-block-and-gp-equipments";

    Axios.get(endpoint)
      .then((result) => processFetchedData(result?.data?.result))
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
        `/hoto-to-assets/equipment/fetch-block-and-gp-equipments?block_name=${selectedBlock}&gp_name=${newValue?.location_name}`
      )
        .then((result) => processFetchedData(result?.data?.result))
        .catch((err) => console.log("Error : ", err));
    }else{
      Axios.get(
        `/hoto-to-assets/equipment/fetch-block-and-gp-equipments?block_name=${selectedBlock}`
      )
        .then((result) => processFetchedData(result?.data?.result))
        .catch((err) => console.log("Error : ", err));
    }
  };

  // Initial load of all equipment
  useEffect(() => {
    Axios.get("/hoto-to-assets/equipment/fetch-block-and-gp-equipments")
      .then((result) => processFetchedData(result?.data?.result))
      .catch((err) => console.log("Error : ", err));
  }, []);

  const total = originalData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
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
              formatter={(value, name) => [`${value}`, `${name}`]}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>

        <CustomLegend total={total} data={conditionData} />
      </CardContent>
    </Card>
  );
};

export default ConditionStatusChart2;
