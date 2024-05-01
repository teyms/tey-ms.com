import axios from 'axios';
import Swal from 'sweetalert2';

// Add a response interceptor
axios.interceptors.response.use(
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
      console.error('Response error:', error.response.data);
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

export default axios;