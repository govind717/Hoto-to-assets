import MasterApis from "app/Apis/master";
import { Axios } from "index";

export const addPackage= async (data)=>{
    const res = await Axios.post(MasterApis?.package?.packageAdd,data);
    return res;
};
export const updatePackage= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.package?.packageUpdate}/${id}`,data);
    return res;
};

export const addDistrict= async (data)=>{
    const res = await Axios.post(MasterApis?.district?.districtAdd,data);
    return res;
};
export const updateDistrict= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.district?.districtUpdate}/${id}`,data);
    return res;
};

export const addBlock= async (data)=>{
    const res = await Axios.post(MasterApis?.block?.blockAdd,data);
    return res;
};
export const updateBlock= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.block?.blockUpdate}/${id}`,data);
    return res;
};

export const addGP= async (data)=>{
    const res = await Axios.post(MasterApis?.gp?.gpAdd,data);
    return res;
};
export const updateGP= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.gp?.gpUpdate}/${id}`,data);
    return res;
};

export const addOrganization= async (data)=>{
    const res = await Axios.post(MasterApis?.organisation?.organisationAdd,data);
    return res;
};
export const updateOrganization= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.organisation?.organisationUpdate}/${id}`,data);
    return res;
};

export const addDepartment= async (data)=>{
    const res = await Axios.post(MasterApis?.department?.departmentAdd,data);
    return res;
};
export const updateDepartment= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.department?.departmentUpdate}/${id}`,data);
    return res;
};

export const addTeam= async (data)=>{
    const res = await Axios.post(MasterApis?.team?.teamAdd,data);
    return res;
};
export const updateTeam= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.team?.teamUpdate}/${id}`,data);
    return res;
};


export const addCategory= async (data)=>{
    const res = await Axios.post(MasterApis?.category?.categoryAdd,data);
    return res;
};
export const updateCategory= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.category?.categoryUpdate}/${id}`,data);
    return res;
};

export const addSubCategory= async (data)=>{
    const res = await Axios.post(MasterApis?.subCategory?.subCategoryAdd,data);
    return res;
};
export const updateSubCategory= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.subCategory?.subCategoryUpdate}/${id}`,data);
    return res;
};


export const addMaterial= async (data)=>{
    const res = await Axios.post(MasterApis?.material?.materialAdd,data);
    return res;
};
export const updateMaterial= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.material?.materialUpdate}/${id}`,data);
    return res;
};
export const addUOM = async (data)=>{
    const res = await Axios.post(MasterApis?.uom?.uomAdd,data);
    return res;
};
export const updateUOM = async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.uom?.uomUpdate}/${id}`,data);
    return res;
};

export const addHSNCode= async (data)=>{
    const res = await Axios.post(MasterApis?.hsnCode?.hsnCodeAdd,data);
    return res;
};
export const updateHSNCode= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.hsnCode?.hsnCodeUpdate}/${id}`,data);
    return res;
};

export const addGST= async (data)=>{
    const res = await Axios.post(MasterApis?.gst?.gstAdd,data);
    return res;
};
export const updateGST= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.gst?.gstUpdate}/${id}`,data);
    return res;
};

export const addWarehouse= async (data)=>{
    const res = await Axios.post(MasterApis?.warehouse?.warehouseAdd,data);
    return res;
};
export const updateWarehouse= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.warehouse?.warehouseUpdate}/${id}`,data);
    return res;
};

export const addSupplier= async (data)=>{
    const res = await Axios.post(MasterApis?.supplier?.supplierAdd,data);
    return res;
};
export const updateSupplier= async (data,id)=>{
    const res = await Axios.patch(`${MasterApis?.supplier?.supplierUpdate}/${id}`,data);
    return res;
};



