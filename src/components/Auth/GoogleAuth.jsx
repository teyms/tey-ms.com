import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect
} from 'react-router-dom';
import Swal from 'sweetalert2';
import './googleAuth.css';

import { postGoogleAuth } from '../../store/googleAuth-action';
import Loading from '../../components/Loader/Loading';

function GoogleAuth(props) {
  const token = useSelector((state) => state.googleAuth.token) 
  const status = useSelector((state) => state.googleAuth.success)

  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (status && token) {
      // Swal.fire({
      //   title: 'SUCCESS!',
      //   text: 'Google Auth Successsfully!',
      //   icon: 'success',
      //   confirmButtonText: 'OK',
      //   customClass: {
      //     popup: 'custom-swal-color',
      //     content: 'custom-swal-color',
      //     confirmButton: 'custom-swal-color',
      //   },
      // })
      return navigate('/shortUrl');
    }else if(status === false && token === 'token_notFound'){
      Swal.fire({
        title: 'ERROR!',
        text: 'Google Auth Failed',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-color',
          content: 'custom-swal-color',
          confirmButton: 'custom-swal-color',
        },
      })
    }
  }, [status, token])

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await dispatch(postGoogleAuth(response));
      } catch (err) {
        console.error('Error during authentication:', err);
        Swal.fire({
          title: 'ERROR!',
          text: "Something Went Wrong!",
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
          },
        });
      }finally{
        setIsLoading(false);
      }
    },
    onError: () => {
      console.error('Login Failed');
      setIsLoading(false);
    },
  });

  return (
    <>
      {isLoading && <Loading/>}
      <div className='login-container'>
        <button 
          onClick={() => { setIsLoading(true); login(); }}
        >

          Login with Google
        </button>
      </div>
    </>
  );
};

export default GoogleAuth;
