import axios from './axiosConfig';

export const postGoogleAuthApi = async (payloadFromGoogle) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_REQUEST_URL}/googleauth/callback`, 
      {      
        token: payloadFromGoogle.access_token,
      }
      ,{
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
          // 'Authorization': `Bearer ${token}`, // Send the Google token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const logoutApi = async (userDetails, token) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_REQUEST_URL}/logout`, 
      {      
        email: userDetails.email,
        token: token,
      }
      ,{
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
          // 'Authorization': `Bearer ${token}`, // Send the Google token
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
