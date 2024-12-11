import axiosInstance from './axiosConfig';

export const postGoogleAuthApi = async (payloadFromGoogle) => {
  try {
    const response = await axiosInstance.post(`/googleauth/callback`, 
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
    const response = await axiosInstance.post(`/logout`, 
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
