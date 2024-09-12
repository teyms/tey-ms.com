import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect,
    useParams
} from 'react-router-dom';
import Swal from 'sweetalert2';
// import '../App.css';

import { getShortUrl } from '../../store/shortUrl-action';
import Loading from '../../components/Loader/Loading';

function ShortUrl() {
    const shortUrl = useSelector((state) => state.shortUrl) 
    const oriUrl = useSelector((state) => state.shortUrl.ori_url) 
    const status = useSelector((state) => state.shortUrl.success) 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getShortUrlString = useParams();

    const [isLoading, setIsLoading] = useState(true);// default as loading, since it will redirect

    // get shortUrl code from URL
    useEffect(() => {
      async function getFullUrl(){
          await dispatch(getShortUrl(getShortUrlString['*']));
      }

      try{
        getFullUrl();

      }catch{
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
        }).then((result) => {
          if (result.isConfirmed) {
            // If the user clicks "OK", redirect to "/home"
            return navigate('/shortUrl');
          } else {
            // If the user dismisses the dialog by clicking outside,
            // also redirect to "/home"
            return navigate('/shortUrl');
          }
        });        
      }
    }, [dispatch, getShortUrlString]);

    useEffect(() => {
      if (status && oriUrl) {
        return window.location.href = oriUrl; // Perform the action after 5 seconds
      }else if(status === false && oriUrl === 'shortUrl_failed'){
        Swal.fire({
          title: 'ERROR!',
          text: 'Short URL Not Found',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // If the user clicks "OK", redirect to "/home"
            return navigate('/shortUrl');
          } else {
            // If the user dismisses the dialog by clicking outside,
            // also redirect to "/home"
            return navigate('/shortUrl');
          }
        });

      }
    }, [status, oriUrl]);

  return (
    <>
      { isLoading && <Loading/> }
    </>
  ); // No need to render anything since we're redirecting
}

export default ShortUrl;