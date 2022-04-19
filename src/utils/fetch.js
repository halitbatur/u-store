import { API_URLS } from "../constants/apiUrls.js";
import axios from "axios";

export const createProductMutation = (newProduct) => {
  return axios.post(API_URLS.products, newProduct);
};

export const getAllCategories = () => {
  return axios.get(API_URLS.categories).then((res) => res.data);
};

export const fetchProductsWithCategories = async () => {
  const requests = Object.values(API_URLS).map((url) => axios.get(url));
  return Promise.all(requests).then((res) => res.map((r) => r.data));
};

export const fetchSingleProduct = (id) => {
  return axios.get(API_URLS.products + id).then((res) => res.data);
};

export const deleteProduct = (id) => {
  return axios.delete(API_URLS.products + id);
};
