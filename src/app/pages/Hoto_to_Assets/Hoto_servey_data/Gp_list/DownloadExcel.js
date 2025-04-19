import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from '@mui/material';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
const DownloadFullEquipmentExcel = ({ data }) => {
  const handleDownload = () => {
    const rows = [];

    // 1️⃣ Group Header Row: 68 elements in total.
    rows.push([
      // GP Details – 8 columns (indexes 0 to 7)
      "GP Details",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // Racks – 5 columns (indexes 8 to 12)
      "Racks",
      "",
      "",
      "",
      "",
      // SMPS – 6 columns (indexes 13 to 18)
      "SMPS",
      "",
      "",
      "",
      "",
      "",
      // CCU – 5 columns (indexes 19 to 23)
      "CCU",
      "",
      "",
      "",
      "",
      // Splitter – 6 columns (indexes 24 to 29)
      "Splitter",
      "",
      "",
      "",
      "",
      "",
      // ONT – 6 columns (indexes 30 to 35)
      "ONT",
      "",
      "",
      "",
      "",
      "",
      // SFP – 5 columns (indexes 36 to 40)
      "SFP",
      "",
      "",
      "",
      "",
      // FDMS – 12 columns
      "FDMS",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // Cable – 2 columns (INSERT THIS)
      "Cable",
      "",
      // Solar – 8 columns
      "Solar",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // UPS – 7 columns
      "UPS",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    // 2️⃣ Detailed Header Row: 68 column headers
    rows.push([
      "GP Code",
      "GP Name",
      "Block Code",
      "Block Name",
      "District Code",
      "District Name",
      "Latitude",
      "Longitude",

      "Racks Availability",
      "Number Of Racks",
      "Unit Size",
      "Racks Connectivity",
      "Socket Availability",

      "SMPS Availability",
      "SMPS Condition",
      "SMPS Make",
      "SMPS Serial No",
      "SMPS Capacity",
      "SMPS Warranty",

      "CCU Availability",
      "CCU Condition",
      "CCU Make",
      "CCU Serial No",
      "CCU Warranty",

      "Splitter Availability",
      "Splitter Condition",
      "Splitter Make",
      "Splitter Serial No",
      "Splitter Warranty",
      "Splitter Split Ratio",

      "ONT Availability",
      "ONT Status",
      "ONT Unique ID",
      "ONT Condition",
      "ONT Make",
      "ONT Type",

      "SFP Availability",
      "SFP Count",
      "Cord Details",
      "No. of Quantity",
      "Working Status",

      "FDMS Availability",
      "FDMS Status",
      "FDMS Type",
      "No. of FDMS",
      "FDMS Port",
      "FDMS Serial No",
      "FDMS Connectivity",
      "No. Pathcords Connected",
      "Termination OFC Type",
      "Spare Fibre Available",
      "Cable OFC Type",
      "Cable Fibre No.",

      "Solar Panel Avail",
      "Panel Count",
      "Terrace Access",
      "Panel Condition",
      "Panel Make",
      "Panel Serial No",
      "Panel Capacity",
      "Panel Warranty",

      "UPS Avail",
      "UPS Condition",
      "UPS Make",
      "UPS Serial No",
      "UPS Capacity",
      "UPS Warranty",
      "Battery No",
    ]);

    // 3️⃣ Add actual data rows from your data prop.
    data?.forEach((ele) => {
      const gp = ele?.gp || {};
      const eq = ele?.equipment || {};
      const el = ele?.electrical || {};

      rows.push([
        gp?.code,
        gp?.name,
        gp?.block?.code,
        gp?.block?.name,
        gp?.district?.code,
        gp?.district?.name,
        gp?.latitude,
        gp?.longitude,

        eq?.racks,
        eq?.no_of_racks,
        eq?.racks_unit_size,
        eq?.racks_connectivity,
        eq?.racks_socket_avail,

        eq?.smps,
        eq?.smps_condition,
        eq?.smps_make,
        eq?.smps_serial_no,
        eq?.smps_capacity,
        eq?.smps_warranty,

        eq?.ccu,
        eq?.ccu_condition,
        eq?.ccu_make,
        eq?.ccu_serial_no,
        eq?.ccu_warranty,

        eq?.splitter,
        eq?.splitter_condition,
        eq?.splitter_make,
        eq?.splitter_serial_no,
        eq?.splitter_warranty,
        eq?.spliter_split_ratio,

        eq?.ont,
        eq?.ont_status,
        eq?.ont_unique_id,
        eq?.ont_condition,
        eq?.ont_make,
        eq?.ont_type,

        eq?.sfp,
        eq?.sfp_count,
        eq?.cord_details,
        eq?.no_of_quantity,
        eq?.working_status,

        eq?.fdms,
        eq?.fdms_status,
        eq?.fdms_type,
        eq?.no_fdms,
        eq?.no_fdms_port,
        eq?.fdms_serial_no,
        eq?.fdms_connectivity,
        eq?.no_of_pathcords_connected,
        eq?.termination_ofc_type,
        eq?.no_of_spare_fibre_avail,
        eq?.cable_ofc_type,
        eq?.cable_fibre_no,

        el?.solar_panel_avail,
        el?.solar_panel_count,
        el?.terrace_access,
        el?.solar_panel_condition,
        el?.solar_panel_make,
        el?.solar_panel_serial_no,
        el?.solar_panel_capacity,
        el?.solar_panel_warranty,

        el?.ups_avail,
        el?.ups_condition,
        el?.ups_make,
        el?.ups_serial_no,
        el?.ups_capacity,
        el?.ups_warranty,
        el?.ups_battery_no,
      ]);
    });

    // 4️⃣ Create the worksheet from the array
    const ws = XLSX.utils.aoa_to_sheet(rows);

    // 5️⃣ Configure merged cells according to our groupings.
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }, // GP Details (8 columns)
      { s: { r: 0, c: 8 }, e: { r: 0, c: 12 } }, // Racks (5 columns)
      { s: { r: 0, c: 13 }, e: { r: 0, c: 18 } }, // SMPS (6 columns)
      { s: { r: 0, c: 19 }, e: { r: 0, c: 23 } }, // CCU (5 columns)
      { s: { r: 0, c: 24 }, e: { r: 0, c: 29 } }, // Splitter (6 columns)
      { s: { r: 0, c: 30 }, e: { r: 0, c: 35 } }, // ONT (6 columns)
      { s: { r: 0, c: 36 }, e: { r: 0, c: 40 } }, // SFP (5 columns)
      { s: { r: 0, c: 41 }, e: { r: 0, c: 50 } }, // FDMS (12 columns)
      { s: { r: 0, c: 51 }, e: { r: 0, c: 52 } }, // Cable (2 columns)
      { s: { r: 0, c: 53 }, e: { r: 0, c: 60 } }, // Solar (8 columns)
      { s: { r: 0, c: 61 }, e: { r: 0, c: 67 } }, // UPS (7 columns)
    ];

    // 6️⃣ Create workbook and trigger download.
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Equipment Details");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "HOTO_Equipment_Details.xlsx");
  };

  return<Button variant="outlined" sx={{borderColor : "#B0BAC9", padding : "6px 20px" , color : "#000" , borderRadius : "5px"}} onClick={handleDownload}>
  <CloudDownloadOutlinedIcon sx={{mr:'10px'}}/> Export
</Button>
};

export default DownloadFullEquipmentExcel;
