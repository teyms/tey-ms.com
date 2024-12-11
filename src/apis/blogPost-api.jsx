import axiosInstance from './axiosConfig';
// import { shortUrlActions } from './shortUrl-slide';

export const getBlogPostApi = async (slug) => {
  try {
    // const response = await axios.get(`http://localhost:8000/api/shorturl/${params}`);
    // const response = await axios.get(`${import.meta.env.VITE_API_REQUEST_URL}/blog/${slug}`);
    const response = await axiosInstance.get(`/blog/${slug}`);
    return response.data;
  } catch (error) {
    // throw error;
    return error;
  }
};
