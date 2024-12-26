import axiosInstance from './axiosConfig';
// import { shortUrlActions } from './shortUrl-slide';
const authtoken = localStorage.getItem('authToken') || null;

// to get the original url based on the shorturl path
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

// to create new shorturl
export const createShortUrlApi = async (params) => {
  try {
    // console.log('params params', params);
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

// to update existing shorturl
export const updateShortUrlApi = async (params) => {
  try {
    // console.log('params params', params);
    const response = await axiosInstance.put(`${authtoken? 'auth': ''}/shorturl`, 
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

// to delete existing shorturl
export const deleteShortUrlApi = async (params) => {
  try {
    // console.log('params params', params);
    const response = await axiosInstance.delete(`${authtoken? 'auth': ''}/shorturl/${params}`, 
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

//to get a list of shorturl that are created/owned by the user
export const getShortUrlListApi = async (params) => {
  try {
    const response = await axiosInstance.get(`${authtoken? 'auth': ''}/shorturl/list?page=${params}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    // throw error;
    return error;
  }
};