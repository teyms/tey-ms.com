import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    NavLink,
    json,
    redirect
} from 'react-router-dom';
import Swal from 'sweetalert2';

import './shortUrl.css';
import { helperErrorPopUp } from '../../utils/validation';

import { createShortUrl } from '../../store/shortUrl-action';
import { shortUrlActions } from '../../store/shortUrl-slide';
import Loading from '../../components/Loader/Loading';
import { GUEST_SUBMIT_FORM, USER_SUBMIT_FORM } from '../../utils/constant';
import { 
  validateUrl,
  validateCustomPath,
  validateTitle,
  validateDescription,
  validateExpiresAt,
} from './ShortUrlCreateUtils';

import { TextField, Switch, FormControlLabel , Typography, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; // Import DateTimePicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Localization provider
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'; // Adapter for date-fns
import { enUS } from 'date-fns/locale'; // Optional: Change locale to French if needed

function ShortUrlCreate({ method, event }) {
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of DateTimePicker
  const [enteredValues, setEnteredValues] = useState({
    original_url: '',
    customPath: '',
    title: '',
    description: '',
    expires_at: null, // Initialize to null (or new Date()) to avoid the uncontrolled warning
  });

  const { isAuthenticated, user } = useSelector((state) => state.googleAuth);
  const shortUrl = useSelector((state) => state.shortUrl.data.shorten_url) 
  const status = useSelector((state) => state.shortUrl.data.success)
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (status && shortUrl) {
      Swal.fire({
        title: 'SUCCESS!',        
        html: `your shortURL is: <a href='${import.meta.env.VITE_SELF_URL}/shorturl/${shortUrl}'>${import.meta.env.VITE_SELF_URL}/shorturl/${shortUrl}</a>`,  
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-color',
          content: 'custom-swal-color',
          confirmButton: 'custom-swal-color',
        },
      })
    }else if(status === false && shortUrl === 'shortUrl_failed'){
      helperErrorPopUp({title: 'ERROR!', text: 'Failed to submit ShortURL'})
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
    const submitType = isAuthenticated? USER_SUBMIT_FORM: GUEST_SUBMIT_FORM;
    const formData = {...enteredValues};

    switch(submitType){
      case USER_SUBMIT_FORM:{
        //Validation for URL
        let url = formData?.original_url;
        const validateUrlResult = validateUrl(url);
        if(!validateUrlResult.success) return {success:false};        
        url = validateUrlResult.url;
        formData.original_url = url;
        setEnteredValues(prevValues => ({
          ...prevValues,
          original_url: url,
        }));          

        //Validation for CustomPath
        let customPath = formData?.customPath;
        const validateCustomPathResult = validateCustomPath(customPath, user.short_url_path);
        if(!validateCustomPathResult.success) return {success:false};  
        formData.customPath = validateCustomPathResult.customPath;
        setEnteredValues(prevValues => ({
          ...prevValues,
          customPath: customPath,
        }));         

        //Validation for Title
        let title = formData?.title;
        const validateTitleResult = validateTitle(title);
        if(!validateTitleResult.success) return {success:false};   
        formData.title = validateTitleResult.title;
        setEnteredValues(prevValues => ({
          ...prevValues,
          title: title,
        }));         

        //Validation for Description
        let description = formData?.description;
        const validateDescriptionResult = validateDescription(description);
        if(!validateDescriptionResult.success) return {success:false};    
        formData.description = validateDescriptionResult.description;
        setEnteredValues(prevValues => ({
          ...prevValues,
          description: description,
        }));         
        
        //Validation for expiresAt
        let expires_at = formData?.expires_at;
        if(showDatePicker){          
          const validateExpiresAtResult = validateExpiresAt(expires_at);
          if(!validateExpiresAtResult.success) return {success:false};  
          formData.expires_at = validateExpiresAtResult.expires_at;
          setEnteredValues(prevValues => ({
            ...prevValues,
            expires_at: expires_at,
          }));          
        }else{
          expires_at = null;
          formData.expires_at = expires_at;
          setEnteredValues(prevValues => ({
            ...prevValues,
            expires_at: expires_at,
          }));   
        }

        return {...formData, success:true};
      }
      case GUEST_SUBMIT_FORM:{
        
        let url = formData?.original_url;
        const validateUrlResult = validateUrl(url);
        if(!validateUrlResult.success) return {success:false};
        
        url = validateUrlResult.url;
        formData.original_url = url;
        setEnteredValues(prevValues => ({
          ...prevValues,
          original_url: url,
        }));          
        return {...formData, success:true};
      }
      default:{
        return {
          success: false,
          original_url: '',
        };
      }
    }
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  async function handleSubmit(event){
    try{
      const submitType = isAuthenticated? USER_SUBMIT_FORM: GUEST_SUBMIT_FORM;
      setIsLoading(true);
      event.preventDefault();

      const validationSuccess = await formDataValidation();

      if(validationSuccess.success){
        switch(submitType){
          case USER_SUBMIT_FORM:{
            delete validationSuccess.success; // unset the succcess key inside the json data
            await dispatch(createShortUrl(validationSuccess));
            break;
          }
          case GUEST_SUBMIT_FORM:{
            await dispatch(createShortUrl({
              original_url: validationSuccess.original_url,
            }));
            break;            
          }
          default:{    
          }
        }
      }
      

    }catch(ex){
      // console.log(ex);
      helperErrorPopUp({title: 'ERROR!', text: "Something Went Wrong!"})
    
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading/>}
      {isAuthenticated && <div className='shortUrl-nav-container'>        
        <div className='shortUrl-nav-btn'>
            <NavLink className="shortUrl-nav-navlink"  to="/shorturl/manage"> Manage </NavLink>
            <NavLink className="shortUrl-nav-navlink"  to="/shorturl"> Create </NavLink>
        </div>
      </div>}  

      <div className='shortUrlCreate-parent-container'>
        <div className="shortUrl-ads-container shortUrl-left-container" style={{visibility:'hidden'}}>
          <div className='shortUrl-ads-banner'>qwer</div>
        </div>
        <div className="shortUrlCreate-container">
          <h1 className='shortUrlCreate-title'>Short URL</h1>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}> {/* Set locale if necessary */}
            <Form   
              method="post" 
              onSubmit={handleSubmit} 
              noValidate
              className='shortUrlCreate-form'
            >
              <div>
                <p>
                  Make lengthy URLs into short links with a click. Share seamlessly on social media, texts, and more. 
                  Simply your sharing with short URLs service 
                </p>
                {/* <label htmlFor="url">Url</label> */}
                <div className='form-row'>
                  {/* <label className='shortUrlCreate-input-label'>*https://</label>  */}
                  <label className='shortUrlCreate-input-label'>*URL/ Website Link</label> 
                  <input
                    id="url"
                    type="text"
                    name="url"
                    // required
                    onChange={(event) => handleInputChange('original_url', event.target.value)}
                    placeholder='www.teyms.com'
                    disabled={isLoading}
                  //   defaultValue={event ? event.title : ''}
                  />
                </div>

                { isAuthenticated &&     
                  <>          
                    <div className='form-row'>
                      <label className='shortUrlCreate-input-label'>*Custom Path</label> 
                      <input
                        id="customPath"
                        type="text"
                        name="customPath"
                        // required
                        onChange={(event) => handleInputChange('customPath', event.target.value)}
                        placeholder='Custom Path'
                        disabled={isLoading}

                      />
                    </div>
                    <div className='form-row'>
                      <label className='shortUrlCreate-input-label'>Title</label> 
                      <input
                        id="title"
                        type="text"
                        name="title"
                        // required
                        onChange={(event) => handleInputChange('title', event.target.value)}
                        placeholder='Title'
                        disabled={isLoading}
                      />
                    </div>
                    <div className='form-row'>
                      <label className='shortUrlCreate-input-label'>Description</label> 
                      <input
                        id="description"
                        type="text"
                        name="description"
                        onChange={(event) => handleInputChange('description', event.target.value)}
                        placeholder='Description'
                        disabled={isLoading}
                      />
                    </div>
                    <div className='form-row'>
                      <label className='shortUrlCreate-input-label'>Expires DateTime</label> 

                      {/* Switch to toggle DateTimePicker visibility */}
                      <FormControlLabel
                        control={
                          <Switch
                          checked={showDatePicker}
                          onChange={(e) => setShowDatePicker(e.target.checked)}
                          name="showDatePicker"
                          />
                        }
                        label={showDatePicker ? "": "Never Expired"}
                      />

                      {showDatePicker && <DateTimePicker
                        label="Select Date and Time"
                        sx={{
                          '& .MuiInputLabel-root': {
                            color: 'white', // Change label color
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            // color: 'blue', // Color when focused
                          }
                        }}
                        value={enteredValues.expires_at}
                        // onChange={(newDate) => setStartDate(newDate)}
                        onChange={(newValue) => handleInputChange('expires_at', newValue)}

                        renderInput={(props) => <TextField 
                          {...props}                         
                        />}  // Render input as TextField
                        minDate={new Date()}  // Set minimum date to today
                        // format="MM/dd/yyyy hh:mm a"  // Custom format
                        format="MM/dd/yyyy HH:mm"  // Custom format
                        ampm={false}  // Use AM/PM format
                        // showTimeSelect={true}  // Show time select
                        // timeIntervals={15}  // Time intervals in minutes
                        // placeholder="Never Expired"  // Set placeholder text
                      />}
                    </div>
                  </>
                }

              </div>
              <div 
                className='shortUrl-btn'
                >
                <button disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Shorten'}
                </button>
              </div>
            </Form>
          </LocalizationProvider>

        </div>
        <div className="shortUrl-ads-container shortUrl-right-container" style={{visibility:'hidden'}}>
          <div className='shortUrl-ads-banner'>qwer</div>
        </div>
      </div>
    </>
  );
}

export default ShortUrlCreate;

// case USER_SUBMIT_FORM: {
//   // Helper function to validate and update state
//   const validateAndSet = (field, validator, ...extraArgs) => {
//     const value = formData?.[field];
//     const validationResult = validator(value, ...extraArgs); // Pass extra arguments to the validator
//     if (!validationResult.success) return { success: false };

//     // Update formData and enteredValues
//     formData[field] = validationResult.value || value;
//     setEnteredValues(prevValues => ({
//       ...prevValues,
//       [field]: validationResult.value || value,
//     }));

//     return true; // Return true if validation is successful
//   };

//   // Validate fields using the helper function
//   if (
//     !validateAndSet('original_url', validateUrl) ||
//     !validateAndSet('customPath', validateCustomPath, user.short_url_path) ||
//     !validateAndSet('title', validateTitle) ||
//     !validateAndSet('description', validateDescription) ||
//     !validateAndSet('expires_at', validateExpiresAt)
//   ) {
//     return { success: false }; // If any validation fails, return false
//   }

//   return { ...formData, success: true }; // Return the updated formData with success
// }

