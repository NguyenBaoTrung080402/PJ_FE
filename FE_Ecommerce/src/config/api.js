import axios from "./customAxios";

const f_regiter_api = (name, email, password) => {
  return axios.post("account/register", {
    name: name,
    email: email,
    password: password,
  });
};

const f_login_api = (email, password) => {
  return axios.post("account/login", { email: email, password: password });
};

const f_getAllUser_api = () => {
  return axios.get("/account/get-all-user");
};

const f_deleteUser_api = (id) => {
  return axios.delete(`/account/delete-user/${id}`);
};


const f_updateRole_api = (id) => {
  return axios.post(`/account/update-admin/${id}`);
};

const f_changePassword_api = (oldPass, newPass, rePass) =>{
  return axios.post("account/change-password", { oldPass: oldPass, newPass: newPass, rePass: rePass})
}


const f_getAllCategory_api = () => {
  return axios.get("/categories/get-all-category");
};

const f_deleteCategory_api = (id) => {
  return axios.delete(`/categories/delete-category/${id}`);
};

const f_getAllBrands_api = () => {
  return axios.get("/brands/get-all-brands");
}

const f_addBrand_api = (nameBrand, slugBrand, status) =>{
  return axios.post("/brands/create-brands", {nameBrand: nameBrand, slugBrand: slugBrand, status: status})
}

const f_deleteBrand_api = (id) =>{
  return axios.delete(`/brands/delete-brands/${id}`)
}
const f_updateBrand_api = (id, nameBrand, slugBrand, status) =>{
  return axios.put(`/brands/update-brands/${id}`, {nameBrand: nameBrand, slugBrand: slugBrand, status: status})
}

const f_getAllProduct_api = (page=1) => {
  return axios.get(`/product/get-all-product?size=8*page=` +(page-1))
}
const f_getAllProductId_api = (id) => {
  return axios.get(`/product/get-product-id/${id}`)
}

const f_deleteProduct_api = (id) =>{
  return axios.delete(`/product/delete-product/${id}`)
}

const f_getCartItem_api = () =>{
  return axios.get("/wish-list/get-wish-list")
}
const f_deleteCartItem_api = (id) =>{
  return axios.delete(`/wish-list/delete-wish-list/${id}`)
}

const f_getCartItemByUser_api = () =>{
  return axios.get("/wish-list/get-wish-list")
}
const f_updateStatus_api = (id, status) =>{
  return axios.put(`/order/update-status/${id}`, {status: status})
}

const f_getCartItemPurchased_api = () =>{
  return axios.get("/order/get-order-delivered")
}
const f_getCartItemCancel_api = () =>{
  return axios.get("/order/get-order-canceled")
}
const f_getCartItemShipping_api = () =>{
  return axios.get("/order/get-order-shipping")
}
const f_getCartItemComfirmed_api = () =>{
  return axios.get("/order/get-order-confirmed")
}
const f_getCartItempProcessing_api = () =>{
  return axios.get("/order/get-order-processing")
}
const f_getAllOrder_api = () =>{
  return axios.get(`/order/get-all-order`)
}
const f_getAllSize_api = () =>{
  return axios.get(`/sizes/get-all-size`)
}
const f_getAllColor_api = () =>{
  return axios.get(`/colors/get-all-colors`)
}

const f_order_api = (user_id, product_id, wishListID, quantity) =>{
  return axios.post("/order/create-order", {user_id: user_id, products_id: product_id, wishlist_id: wishListID, quantity: quantity})
}

export {
  f_regiter_api,
  f_login_api,
  f_getAllUser_api,
  f_deleteUser_api,
  f_updateRole_api,
  f_changePassword_api,
  f_getAllCategory_api,
  f_deleteCategory_api,
  f_getAllBrands_api,
  f_addBrand_api,
  f_deleteBrand_api,
  f_updateBrand_api,
  f_getAllProduct_api,
  f_getAllProductId_api,
  f_deleteProduct_api,
  f_getCartItem_api,
  f_deleteCartItem_api,
  f_getCartItemByUser_api,
  f_getAllOrder_api,
  f_updateStatus_api,
  f_order_api,
  f_getCartItemPurchased_api,
  f_getCartItemCancel_api,
  f_getCartItemShipping_api,
  f_getAllSize_api,
  f_getAllColor_api,
  f_getCartItemComfirmed_api,
  f_getCartItempProcessing_api
};
