import { Axios } from "index";

export const addPackage= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updatePackage= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addDistrict= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateDistrict= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addBlock= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateBlock= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addGP= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateGP= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addOrganization= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateOrganization= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addDepartment= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateDepartment= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addTeam= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateTeam= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};


export const addCategory= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateCategory= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addSubCategory= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateSubCategory= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};


export const addMaterial= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateMaterial= async (data,id)=>{
    const res = await Axios.patch(`${id}`,data);
    return res;
};
export const addUOM = async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateUOM = async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addHSNCode= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateHSNCode= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};

export const addGST= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateGST= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};


export const addWarehouse= async (data)=>{
    const res = await Axios.post('',data);
    return res;
};
export const updateWarehouse= async (data,id)=>{
    const res = await Axios.patch( `${id}`,data);
    return res;
};



