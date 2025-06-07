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
  Button,
  Card,
  CardContent,
  CircularProgress,
  Slide,
  Snackbar,
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
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import Swal from "sweetalert2";
// CustomLegend component with click handler
// const CustomLegend = ({ data, onLegendClick }) => {
//   const legendItems = [
//     { name: "Robust", color: "#22CAAD" },
//     { name: "Damaged", color: "#F55757" },
//     { name: "Not Defined", color: "#E78F5D" },
//     // Add more conditions here if needed
//   ];

//   const latestData = data[0] || {};
//   let total = 0;
//   legendItems.forEach((item) => {
//     total += latestData[item.name] || 0;
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
//         <Typography
//           variant="body2"
//           sx={{ color: "#000", cursor: 'pointer' }}
//           onClick={() => onLegendClick?.('total')}
//         >
//           Total Assets
//         </Typography>
//       </Box>
//       {legendItems.map((item, index) => (
//         <Box
//           key={index}
//           display="flex"
//           alignItems="center"
//           gap={1}
//           sx={{ cursor: "pointer" }}
//           onClick={() => onLegendClick?.(item.name)}
//         >
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

const CustomLegend = ({ data, onLegendClick, selectedChart }) => {
  const legendItems = [
    { name: "Robust", color: "#22CAAD" },
    { name: "Damaged", color: "#F55757" },
    { name: "Not Defined", color: "#E78F5D" },
  ];

  const latestData = data[0] || {};
  let total = 0;
  legendItems.forEach((item) => {
    total += latestData[item.name] || 0;
  });

  return (
    <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
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
        <Typography
          variant="body2"
          sx={{ color: "#000", cursor: "pointer" }}
          onClick={() => onLegendClick?.("total")}
        >
          Total Assets
        </Typography>
      </Box>

      {legendItems.map((item, index) => {
        const rawValue = latestData[item.name] ?? 0;
        const valueDisplay =
          selectedChart === "percentage"
            ? `${total > 0 ? ((rawValue / total) * 100).toFixed(2) : 0}%`
            : rawValue;

        return (
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
              {valueDisplay} {item.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};



const AssetConditionByTypeChart4 = () => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGP, setSelectedGP] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { packageNoDataReducer } = useSelector((state) => state);
  const [notFoundCount, setNotFoundCount] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [selectedChart, setSelectedChart] = useState("number");

  const chartModes = [
    { label: "Number", value: "number" },
    { label: "Percentage", value: "percentage" },
  ];



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
            "Not Defined":
              responseData.find((item) => item._id === "not_defined")?.count ||
              0,
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
    if (packageNoDataReducer?.data) {
      setSelectedBlock("");
    }
  }, [packageNoDataReducer?.data]);

  const handleEquipmentChange = (_, newValue) => {
    if (newValue && selectedBlock && selectedGP) {
      setSelectedEquipment(newValue);
      fetchData(newValue, selectedBlock, selectedGP?.location_name);
    } else if (newValue && selectedBlock) {
      setSelectedEquipment(newValue);
      fetchData(newValue, selectedBlock);
    } else if (newValue) {
      setSelectedEquipment(newValue);
      fetchData(newValue);
    }
  };

  const handleBlockChange = (_, newValue) => {
    setSelectedBlock(newValue);
    setSelectedGP(null);
    setGps([]);
    if (newValue) {
      fetchData(selectedEquipment, newValue);
    } else {
      fetchData(selectedEquipment);
    }
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
          equipment_name: selectedEquipment,
          // "equipment_details.location_name": selectedGP?.location_name,
          // "equipment_details.block.name": selectedBlock,
          availability: false,
          // condition: conditionName?.toLowerCase(),
        },
      });
    } else if (conditionName === 'total') {
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
          availability: true,
          equipment_name: selectedEquipment,
          // "equipment_details.location_name": selectedGP?.location_name,
          // "equipment_details.block.name": selectedBlock,
          // condition: conditionName?.toLowerCase(),
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
      if (conditionName === "Not Defined") {
        navigate("/dashboards/hoto-survey-gp-data", {
          state: {
            ...state,
            condition: { $eq: null },
            availability: true,
            equipment_name: selectedEquipment,
          },
        });
        return;
      } else {

        navigate("/dashboards/hoto-survey-gp-data", {
          state: {
            ...state,
            availability: true,
            equipment_name: selectedEquipment,
            // "equipment_details.location_name": selectedGP?.location_name,
            // "equipment_details.block.name": selectedBlock,
            condition: conditionName?.toLowerCase(),
          },
        });
      }
    }
  };

  
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      container: "popupImportant",
    },
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const handleExportCSV = async () => {
    try {
      setLoading(true);
      setSnackbarOpen(true);
      const res = await Axios.post(
        `/overview/gp/gp-equipment-wise-condition/download-excel?package_name=${packageNoDataReducer?.data}`
      );

      if (res.data.success) {
        window.open(res?.data?.result);

        Toast.fire({
          timer: 3000,
          icon: "success",
          title: "CSV  Downloaded Successfully...",
          position: "top-right",
          // background: theme.palette.background.paper,
        });
        setLoading(false);
        setSnackbarOpen(false);
      } else {
        Toast.fire({
          timer: 3000,
          icon: "error",
          title: "CSV  Downloading failed..",
          position: "top-right",
          // background: theme.palette.background.paper,
        });
        setLoading(false);
        setSnackbarOpen(false);
      }
    } catch (error) {
      setLoading(false);
      setSnackbarOpen(false);
      Toast.fire({
        timer: 3000,
        icon: "error",
        title:
          error.response?.data.message ||
          "An error occured while downloading csv",
        position: "top-right",
        // background: theme.palette.background.paper,
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
              GP Asset Condition
            </Typography>
            <Typography
              sx={{ fontWeight: 400, cursor: "pointer" }}
              onClick={() => handleLegendClick("Not Found")}
            >
              {notFoundCount || 0} Not Found
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Autocomplete
              sx={{ minWidth: "200px" }}
              options={chartModes}
              getOptionLabel={(option) => option.label}
              value={chartModes.find((mode) => mode.value === selectedChart)}
              onChange={(_, newValue) => {
                if (newValue) {
                  setSelectedChart(newValue.value);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Type" size="small" />
              )}
            />
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
            <Button
              variant="outlined"
              sx={{
                borderColor: "#B0BAC9",
                padding: "6px 20px",
                color: "#000",
                borderRadius: "5px",
              }}
              onClick={handleExportCSV}
            >
              <CloudDownloadOutlinedIcon sx={{ mr: "10px" }} /> Export
            </Button>
            <Snackbar
              TransitionComponent={Slide}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={snackbarOpen}
              message=" CSV Downloading in progress..."
              action={loading && <CircularProgress color="info" size={24} />}
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
            {/* <Tooltip cursor={{ fill: "transparent" }} /> */}
            <Tooltip
              formatter={(value, name) => {
                const total = Object.values(chartData?.[0] || {}).reduce(
                  (acc, val) => (typeof val === "number" ? acc + val : acc),
                  0
                );
                if (selectedChart === "percentage") {
                  const percent = total
                    ? ((value / total) * 100).toFixed(1)
                    : 0;
                  return [`${percent}%`, name];
                }
                return [value, name];
              }}
              cursor={{ fill: "transparent" }}
            />

            <Legend
              content={
                // <CustomLegend
                //   data={chartData}
                //   onLegendClick={handleLegendClick}
                // />
                <CustomLegend
                  data={chartData}
                  onLegendClick={handleLegendClick}
                  selectedChart={selectedChart}
                />
              }
            />
            <Bar dataKey="Robust" fill="#22CAAD" barSize={30} />
            <Bar dataKey="Damaged" fill="#F55757" barSize={30} />
            <Bar dataKey="Not Defined" fill="#E78F5D" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart4;
