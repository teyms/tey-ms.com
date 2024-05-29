import axios from './axiosConfig';
// import { shortUrlActions } from './shortUrl-slide';

export const getShortUrlApi = async (params) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/shorturl/${params}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    // throw error;
    return error;
  }
};

export const createShortUrlApi = async (params) => {
  try {
    const response = await axios.post('http://localhost:8000/api/shorturl', 
    { 
      ori_url: params.ori_url
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