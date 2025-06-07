
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { package_no_data_disptach } from "app/redux/actions/HotoHeader";
import { Axios } from "index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const colorsMap = {
  "100% Robust": "#22CAAD",
  "greater then 50% Robust": "#FDCF2A",
  "less than 50% Robust": "#F55757",
};


const CustomLegend = ({ totalGP, data, selectedChart }) => (
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
        {totalGP}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#000", cursor: "pointer" }}

      >
        Total Assets
      </Typography>
    </Box>
    {data.map((item, index) => {
      const valueDisplay =
        selectedChart === "percentage"
          ? totalGP > 0
            ? `${((item.value / totalGP) * 100).toFixed(2)}%`
            : "0%"
          : item.value;
      return (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          gap={1}
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


const ConditionStatusChart5 = () => {
  const [selectedGP, setSelectedGP] = useState(null);

  const [originalData, setOriginalData] = useState([]);
  const [conditionData, setConditionData] = useState([]);
  const { packageNoDataReducer } = useSelector((state) => state);

  const [selectedChart, setSelectedChart] = useState("number");

  const [greater50, setGreater50] = useState(0);
  const [lessThan50, setLessThan50] = useState(0);
  const [allRobust, setAllRobust] = useState(0);

  const dispatch = useDispatch();
  const [packageList, setPackageList] = useState("");
  const handleChange = (event) => {
    // setSelectedValue(event.target.value);
    dispatch(package_no_data_disptach(event.target.value));
  };



  // Fetch initial blocks
  // useEffect(() => {
  //   Axios.get(
  //     `/overview/gp/gp-name-id/fetch-all-gp-names-and-id?package_name=${packageNoDataReducer?.data}`
  //   ).then((response) => {
  //     console.log('Total Gp', response?.data?.result)
  //     const allGPs = response?.data?.result || [];
  //     const availableGPs = allGPs.filter(gp =>
  //       gp?.equipments?.some(eq => eq.availability === true)
  //     );

  //     console.log("Filtered GPs with availability:true", availableGPs);

  //     setSelectedGP(allGPs);
  //   });
  // }, [packageNoDataReducer?.data]);

  useEffect(() => {
    Axios.get(
      `/overview/gp/gp-name-id/fetch-all-gp-names-and-id?package_name=${packageNoDataReducer?.data}`
    ).then((response) => {
      const allGPs = response?.data?.result || [];
      console.log('allGPs', allGPs)
      let gt50 = 0;
      let lt50 = 0;
      let fullRobust = 0;

      // allGPs.forEach((gp) => {
      //   const equipments = gp.equipments || [];
      //   const totalEquipments = equipments.length;
      //   const robustCount = equipments.filter(
      //     (eq) => eq.availability === true && eq.condition === "robust"
      //   ).length;

      //   if (robustCount === totalEquipments && totalEquipments > 0) {
      //     fullRobust += 1;
      //   } else if (robustCount > totalEquipments / 2) {
      //     gt50 += 1;
      //   } else if (robustCount <= totalEquipments / 2 && robustCount > 0) {
      //     lt50 += 1;
      //   }
      // });

      let notRobust = 0;

      allGPs.forEach((gp) => {
        const equipments = gp.equipments || [];
        const totalEquipments = equipments.length;
        const robustCount = equipments.filter(
          (eq) => eq.availability === true && eq.condition === "robust"
        ).length;

        if (robustCount === totalEquipments && totalEquipments > 0) {
          fullRobust += 1;
        } else if (robustCount > totalEquipments / 2) {
          gt50 += 1;
        } else if (robustCount <= totalEquipments / 2 && robustCount > 0) {
          lt50 += 1;
        } else {
          lt50 += 1;
        }
      });

      console.log("Categorized GPs:", { fullRobust, gt50, lt50, notRobust });


      setAllRobust(fullRobust);
      setGreater50(gt50);
      setLessThan50(lt50);

      setSelectedGP(allGPs);
      console.log("Categorized GPs:", { fullRobust, gt50, lt50 });
    });
  }, [packageNoDataReducer?.data, packageList]);


  useEffect(() => {
    const finalData = [
      {
        name: "100% Robust",
        value: allRobust,
      },
      {
        name: "greater then 50% Robust",
        value: greater50,
      },
      {
        name: "less than 50% Robust",
        value: lessThan50,
      },
    ];

    setOriginalData(finalData);
    setConditionData(finalData);
  }, [greater50, lessThan50, allRobust]);





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
              Total  GP
            </Typography>
            <Typography
              sx={{ fontWeight: 400, cursor: "pointer" }}

            >
              {selectedGP?.length || 0}
            </Typography>
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
            {/* <Tooltip
              formatter={(value, name) => [`${value}`, `${name}`]}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            /> */}
            <Tooltip
              formatter={(value, name) => {
                const total = selectedGP?.length || 0;
                if (selectedChart === "percentage") {
                  const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                  return [`${percent}%`, name];
                }
                return [`${value}`, name];
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>

        <CustomLegend
          data={conditionData}
          selectedChart={selectedChart}
          totalGP={selectedGP?.length || 0}
        />

      </CardContent>
    </Card>
  );
};

export default ConditionStatusChart5;

