import axios from './axiosConfig';


export const createTngFileConvertApi = async (params) => {

  try {
    const response = await axios.post('http://localhost:8000/api/tng', 
      {      
        name    : params.name,
        content : params.content,
        size    : params.size,
        type    : params.type,
        // formData
      }
      ,{
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );
    return response.data;
    // return response.data?.data?.shorten_url;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};