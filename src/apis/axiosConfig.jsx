import axios from 'axios';
import Swal from 'sweetalert2';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '../utils/constant';


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_REQUEST_URL,  // Your API base URL
  timeout: 6000, // Adjust timeout as necessary
});

// Axios Request Interceptor to add the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from Redux (state) or localStorage
    const authtoken = getToken();
    if (authtoken) {
      // Attach the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${authtoken}`;
    }
    return config;
  },
  (error) => {
    // Handle the error here
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Do something with response error
    if (error.response) {

      let errorMessage = 'Not Found';
      //handle custom 422 error 
      if(error.response?.data?.msg) errorMessage = error.response?.data?.msg;
      //handle Laravel built-in validation error
      if(error.response?.data?.message) errorMessage = error.response.data.message;

      Swal.fire({
        title: 'ERROR!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-color',
          content: 'custom-swal-color',
          confirmButton: 'custom-swal-color',
        },
      });
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      // for token expired, just remove all the tokens
      if(error.response.status === 401 && error.response.data?.expired === true){
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      }

      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return Promise.reject(error.message);
    }
  }
);

const getToken = () => {
  // This can be modified based on how you store your token
  // const { isAuthenticated, user, token } = useSelector((state) => state.googleAuth);
  const authtoken = localStorage.getItem('authToken') || null;
  // Or if using Redux
  // const token = store.getState().googleAuth.token;
  return authtoken;
};

export default axiosInstance;