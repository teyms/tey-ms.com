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

import './shortUrl.css';
import validation from '../../utils/validation'

import { createShortUrl } from '../../store/shortUrl-action';
import { shortUrlActions } from '../../store/shortUrl-slide';
import Loading from '../../components/Loader/Loading';

function ShortUrlCreate({ method, event }) {

  // const createdShortUrl = useSelector((state) => state.shortUrl.shorten_url) 
  const shortUrl = useSelector((state) => state.shortUrl.shorten_url) 
  // const oriUrl = useSelector((state) => state.shortUrl.ori_url) 
  const status = useSelector((state) => state.shortUrl.success)
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  // const [validationSuccess, setValidationSuccess] = useState(false);
  const [enteredValues, setEnteredValues] = useState({
      ori_url: '',
      // password: '',
    });

  const isSubmitting = navigation.state === 'submitting';

  // useEffect(() => {
  //   async function createShortUrlFunction(){
  //     if(validationSuccess){
  //       await dispatch(createShortUrl(enteredValues));

  //       setValidationSuccess(false);
  //     }
  //   }

  //   createShortUrlFunction();
  // }, [validationSuccess])

  useEffect(() => {
    if (status && shortUrl) {
      Swal.fire({
        title: 'SUCCESS!',
        // html: `your shortURL is: <a href='http://localhost:5173/shorturl/${shortUrl}'>http://localhost:5173/shorturl/${shortUrl}</a>`,
        html: `your shortURL is: <a href='${import.meta.env.VITE_SELF_URL}/shorturl/${shortUrl}'>${import.meta.env.VITE_SELF_URL}/shorturl/${shortUrl}</a>`,
        // html: `your shortURL is: <a href='https://www.tey-ms.com/shorturl/${shortUrl}'>https://www.tey-ms.com/shorturl/${shortUrl}</a>`,
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-color',
          content: 'custom-swal-color',
          confirmButton: 'custom-swal-color',
        },
      })
    }else if(status === false && shortUrl === 'shortUrl_failed'){
      Swal.fire({
        title: 'ERROR!',
        text: 'Failed to submit ShortURL',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-color',
          content: 'custom-swal-color',
          confirmButton: 'custom-swal-color',
        },
      })
    }

    // reset
    dispatch(
      shortUrlActions.updateShortUrl({
        shorten_url: '',
        success: false,
      })
    )


  }, [status, shortUrl])

  function formDataValidation(){
    let url = enteredValues.ori_url;
    if(validation.isEmpty(url)){
      Swal.fire({
        title: 'ERROR!',
        text: "URL/LINK cannot be empty!",
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-color',
          content: 'custom-swal-color',
          confirmButton: 'custom-swal-color',
        },
      });

      return {
        success: false,
        ori_url: '',
        // password: '',
      };
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
      setEnteredValues(prevValues => ({
        ...prevValues,
        ori_url: url,
      }));
      //some action immediately

      // setEnteredValues(() => ({
      //   ori_url: url,
      // }));
    }
    // if(validation.isURLValid(url)){
    //   Swal.fire({
    //     title: 'ERROR!',
    //     text: "URL/LINK is invalid!",
    //     icon: 'error',
    //     confirmButtonText: 'OK',
    //     customClass: {
    //       popup: 'custom-swal-color',
    //       content: 'custom-swal-color',
    //       confirmButton: 'custom-swal-color',
    //     },
    //   });

    //   return false;
    // }

    return {
      success: true,
      ori_url: url,
    };
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  async function handleSubmit(event){
    try{
      setIsLoading(true);
      event.preventDefault();
      
      // await setValidationSuccess(await formDataValidation());

      const validationSuccess = await formDataValidation();

      if(validationSuccess.success){
        await dispatch(createShortUrl({
          ori_url: validationSuccess.ori_url,
        }));
      }
      

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
      });
    
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading/>}
      <div className='shortUrlCreate-parent-container'>
        <div className="shortUrl-ads-container shortUrl-left-container">
          <div className='shortUrl-ads-banner'>qwer</div>
        </div>
        <div className="shortUrlCreate-container">
          {/* <h1>{shortUrl}</h1> */}
          <h1 className='shortUrlCreate-title'>Short URL</h1>

          <Form   
                  onSubmit={handleSubmit} 
                  className='shortUrlCreate-form'
          >
            <div>
              <p>
                Make lengthy URLs into short links with a click. Share seamlessly on social media, texts, and more. 
                Simply your sharing with short URLs service 
              </p>
              {/* <label htmlFor="url">Url</label> */}
              <label className='shortUrl-input-label'>https://</label> <input
                id="url"
                type="text"
                name="url"
                // required
                onChange={(event) => handleInputChange('ori_url', event.target.value)}
                // placeholder='Enter link/url here'
                placeholder='www.teyms.com'
              //   defaultValue={event ? event.title : ''}
              />
            </div>
            <div 
              className='shortUrl-btn'
              >
              {/* <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                Cancel
              </button> */}
              <button disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Shorten'}
              </button>
            </div>
          </Form>
        </div>
        <div className="shortUrl-ads-container shortUrl-right-container">
          <div className='shortUrl-ads-banner'>qwer</div>
        </div>
      </div>
    </>
  );
}

export default ShortUrlCreate;
// export { ShortUrl as default, action};


export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const dispatch = useDispatch();


    dispatch(createShortUrl.createShortUrl(data));
  
    // const eventData = {
    //   title: data.get('title'),
    //   image: data.get('image'),
    //   date: data.get('date'),
    //   description: data.get('description'),
    // };
  
    // let url = 'http://localhost:8080/events';
  
    // if (method === 'PATCH') {
    //   const eventId = params.eventId;
    //   url = 'http://localhost:8080/events/' + eventId;
    // }
  
    // const response = await fetch(url, {
    //   method: method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(eventData),
    // });
  
    // if (response.status === 422) {
    //   return response;
    // }
  
    // if (!response.ok) {
    //   throw json({ message: 'Could not save event.' }, { status: 500 });
    // }
  
    // return redirect('/events');
}
