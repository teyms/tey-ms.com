import axiosInstance from './axiosConfig';
// import { shortUrlActions } from './shortUrl-slide';
const authtoken = localStorage.getItem('authToken') || null;

export const getShortUrlApi = async (params) => {
  try {
    // const response = await axios.get(`http://localhost:8000/api/shorturl/${params}`);
    const response = await axiosInstance.get(`/shorturl/${params}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    // throw error;
    return error;
  }
};

export const createShortUrlApi = async (params) => {
  try {
    console.log('params params', params);
    // const response = await axios.post('http://localhost:8000/api/shorturl', 
    // const response = await axios.post(`${import.meta.env.VITE_API_REQUEST_URL}/shorturl`, 
    const response = await axiosInstance.post(`${authtoken? 'auth': ''}/shorturl`, 
    { 
      ...params
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    return response.data;
    // return response.data?.data?.shorten_url;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};