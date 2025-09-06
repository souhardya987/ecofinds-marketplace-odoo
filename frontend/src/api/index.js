import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  return req;
});

export const fetchProducts = (keyword = '') => API.get(`/api/products?keyword=${keyword}`);
export const fetchProductById = (id) => API.get(`/api/products/${id}`);
export const createProduct = (productData) => API.post('/api/products', productData);
export const fetchMyProducts = () => API.get('/api/products/myproducts');
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);

export const login = (formData) => API.post('/api/auth/login', formData);
export const register = (formData) => API.post('/api/auth/register', formData);

export const createOrder = (orderData) => API.post('/api/orders', orderData);
export const fetchMyOrders = () => API.get('/api/orders/myorders');