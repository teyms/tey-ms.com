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

function ShortUrlCreate({ method, event }) {

    // const createdShortUrl = useSelector((state) => state.shortUrl.shorten_url) 
    const shortUrl = useSelector((state) => state.shortUrl.shorten_url) 
    // const oriUrl = useSelector((state) => state.shortUrl.ori_url) 
    const status = useSelector((state) => state.shortUrl.success)
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [validationSuccess, setValidationSuccess] = useState(false);
    const [enteredValues, setEnteredValues] = useState({
        ori_url: '',
        // password: '',
      });

    const isSubmitting = navigation.state === 'submitting';

    useEffect(() => {
      async function createShortUrlFunction(){
        if(validationSuccess){
          await dispatch(createShortUrl(enteredValues));

          setValidationSuccess(false);
        }
      }

      createShortUrlFunction();
    }, [validationSuccess])

    useEffect(() => {
      console.log(shortUrl);
      console.log(status);

      if (status && shortUrl) {
        Swal.fire({
          title: 'SUCCESS!',
          html: `your shortURL is: <a href='http://localhost:5173/shorturl/${shortUrl}'>http://localhost:5173/shorturl/${shortUrl}</a>`,
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

      dispatch(
        shortUrlActions.updateShortUrl({
          shorten_url: '',
          success: false,
        })
      )


    }, [status, shortUrl])
  
    function cancelHandler() {
      navigate('..');
    }

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

        return false;
      }
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
        console.log('url add https://', url);
        setEnteredValues(prevValues => ({
          ...prevValues,
          ori_url: url,
        }));
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

      return true;
    }

    function handleInputChange(identifier, value) {
        setEnteredValues((prevValues) => ({
          ...prevValues,
          [identifier]: value,
        }));
      }

    async function handleSubmit(event){
        event.preventDefault();
        console.log(shortUrl);

        // const validationSuccess = await formDataValidation();

        setValidationSuccess(await formDataValidation());
        // if(validationSuccess){
        //   await dispatch(createShortUrl(enteredValues));
        // }
    }

    return (
      <>
        <div className='.shortUrlCreate-parent-container'>
          <div className="ads-container left-container">
            <div className='ads-banner'>qwer</div>
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
                https:// <input
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
          <div className="ads-container right-container">
            <div className='ads-banner'>qwer</div>
          </div>
        </div>
      </>
    );
    // return (
    //   <>
    //     <div className="shortUrlCreate-container">
    //       {/* <h1>{shortUrl}</h1> */}
    //       <h1 className='shortUrlCreate-title'>Short URL</h1>

    //       <Form   
    //               onSubmit={handleSubmit} 
    //               className='shortUrlCreate-form'
    //       >
    //         <div>
    //           <p>
    //             Make lengthy URLs into short links with a click. Share seamlessly on social media, texts, and more. 
    //             Simply your sharing with short URLs service 
    //           </p>
    //           {/* <label htmlFor="url">Url</label> */}
    //           <input
    //             id="url"
    //             type="text"
    //             name="url"
    //             required
    //             onChange={(event) => handleInputChange('ori_url', event.target.value)}
    //             placeholder='Enter link/url here'
    //           //   defaultValue={event ? event.title : ''}
    //           />
    //         </div>
    //         <div 
    //           className='shortUrl-btn'
    //           >
    //           {/* <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
    //             Cancel
    //           </button> */}
    //           <button disabled={isSubmitting}>
    //             {isSubmitting ? 'Submitting...' : 'Shorten'}
    //           </button>
    //         </div>
    //       </Form>
    //     </div>
    //   </>
    // );
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
