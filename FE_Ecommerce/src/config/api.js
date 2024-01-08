import axios from "./customAxios";

const f_regiter_api = (name, email, password) => {
  return axios.post("/register", {
    name: name,
    email: email,
    password: password,
  });
};

const f_login_api = (email, password) => {
  return axios.post("/login", { email: email, password: password });
};

const f_getAllUser_api = () => {
  return axios.get("/manager/get-all-user");
};

const f_deleteUser_api = (id) => {
  return axios.delete(`/manager/delete-user/${id}`);
};

const f_updateRole_api = (id) => {
  return axios.post(`/manager/update-role/${id}`);
};

const f_getAllCategory_api = () => {
  return axios.get("/categories/get-all-categories");
};
const f_deleteCategory_api = (id) => {
  return axios.delete(`/manager/delete-categoty/${id}`);
};

const f_getAllBrands_api = () => {
  return axios.get("/brand/get-all-brand");
}

const f_addBrand_api = (nameBrand, slugBrand, status) =>{
  return axios.post("/manager/add-brand", {name: nameBrand, slug: slugBrand, status: status})
}

const f_deleteBrand_api = (id) =>{
  return axios.delete(`/manager/delete-brand/${id}`)
}
const f_updateBrand_api = (id, nameBrand, slugBrand, status) =>{
  return axios.post(`/manager/update-brand/${id}`, {name: nameBrand, slug: slugBrand, status: status})
}

export {
  f_regiter_api,
  f_login_api,
  f_getAllUser_api,
  f_deleteUser_api,
  f_updateRole_api,
  f_getAllCategory_api,
  f_deleteCategory_api,
  f_getAllBrands_api,
  f_addBrand_api,
  f_deleteBrand_api,
  f_updateBrand_api
};
