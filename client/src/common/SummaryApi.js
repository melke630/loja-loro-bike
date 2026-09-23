export const baseURL = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  resetPassword: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refreshToken: {
    url: "/api/user/refreshToken",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  logout: {
    url: "/api/user/logout",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "put",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put",
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
  createSubCategory: {
    url: "/api/subcategory/create",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subcategory/get",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/subcategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete",
    method: "post",
  },
  createProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "post",
  },
  getProductByCategory: {
    url: "/api/product/get-product-by-category",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "post",
  },
  getProductDetails: {
    url: "/api/product/get-product-details",
    method: "post",
  },
  updateProductDetails: {
    url: "/api/product/update-product", // Confirme se a URL no seu backend é essa ou /api/product/update
    method: "put", // ou "patch", dependendo de como seu backend foi construído
  },
  deleteProduct: {
    url: "/api/product/delete",
    method: "delete",
  },
  addCartItem: {
    url: "/api/cart/create",
    method: "post",
  },
  getCartItem: {
    url: "/api/cart/get",
    method: "get",
  },
  updateCartItemQty: {
    url: "/api/cart/update-qty",
    method: "put",
  },
  deleteCartItem: {
    url: "/api/cart/delete",
    method: "delete",
  },
  createOrder: {
    url: "/api/order/create-order",
    method: "post",
  },
  getOrder: {
    url: '/api/order/get-order',
    method: 'get'
},
  createAddress: {
        url: '/api/address/create', // Verifique se a URL do seu backend é essa mesma
        method: 'post'
},
  searchProduct: {
    url: '/api/product/search-product', // ou o caminho da sua rota no backend
    method: 'post' // ou 'get'
},
  getBanner: {
    url: "/api/banner/get",
    method: "get"
  },
  addBanner: {
    url: "/api/banner/add",
    method: "post"
  },
 
  deleteBanner: {
    url: "/api/banner/delete",
    method: "delete"
  }
};

export default SummaryApi;

