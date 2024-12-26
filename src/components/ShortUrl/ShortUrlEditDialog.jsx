import { useEffect, useState, useCallback } from 'react';
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


import { createShortUrl, updateShortUrl } from '../../store/shortUrl-action';
import { shortUrlActions } from '../../store/shortUrl-slide';
import { helperErrorPopUp } from '../../utils/validation'
import { 
  validateUrl,
  validateCustomPath,
  validateTitle,
  validateDescription,
  validateExpiresAt,
} from './ShortUrlCreateUtils';

import EditIcon from '@mui/icons-material/Edit';
import { Switch, FormControlLabel , Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Box
 } from '@mui/material';
 import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; // Import DateTimePicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Localization provider
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'; // Adapter for date-fns
import { enUS } from 'date-fns/locale'; // Optional: Change locale to French if needed
import { Visibility } from '@mui/icons-material';

const ShortUrlEditDialog = ({ shortUrlEdit = { url: ''
                              ,original_url: ''
                              ,title: ''
                              ,description: ''
                              ,click_count: ''
                              ,expires_at: '' } }) => 
{
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.googleAuth);
  const controlSuccessPopUp = useSelector((state) => state.shortUrl.manage.controlSuccessPopUp) 
  const status = useSelector((state) => state.shortUrl.manage.success);

  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of DateTimePicker
  // Initial date string
  const initialDateString = shortUrlEdit.expires_at || null;

  // Convert string to dayjs object
  const [selectedDate, setSelectedDate] = useState(dayjs(initialDateString));

  const [formData, setFormData] = useState({
    original_url: '',
    customPath: '',
    currentCustomPath: '',
    title: '',
    description: '',
    expires_at: null, // Initialize to null (or new Date()) to avoid the uncontrolled warning
  });

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState(user);

  useEffect(() => {
    if(shortUrlEdit.expires_at !== undefined && shortUrlEdit.expires_at !== '' && shortUrlEdit.expires_at !== null){
      setShowDatePicker(true);
    }
  }, []);

    useEffect(() => {
      if (status && controlSuccessPopUp) {
        Swal.fire({
          title: 'SUCCESS!',        
          html: `Update successfully for <a href='${import.meta.env.VITE_SELF_URL}/shorturl/${user.short_url_path}/${formData.customPath}'>${import.meta.env.VITE_SELF_URL}/shorturl/${user.short_url_path}/${formData.customPath}</a>`,  
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
          },
        })
      }else if(status !== undefined && status === false && !controlSuccessPopUp){
        helperErrorPopUp({title: 'ERROR!', text: 'Failed to submit ShortURL'})
      }
  
      // reset
      dispatch(
        shortUrlActions.updateShortUrlList({
          controlSuccessPopUp: false,
          success: true,
          action_type: 'SINGLE_RECORD_UPDATE',
        })
      )
  
  
    }, [status, controlSuccessPopUp])

  // Reset form data when dialog opens or shortUrlEdit prop changes
  useEffect(() => {
    let expiresDateTimeInit = shortUrlEdit.expires_at;
    if(typeof(expiresDateTimeInit) === 'string'){
      expiresDateTimeInit = new Date(expiresDateTimeInit);
      // console.log('converted datetime', expiresDateTimeInit);
    }
    setFormData({...shortUrlEdit, customPath:shortUrlEdit.url, currentCustomPath:shortUrlEdit.url , expires_at:expiresDateTimeInit });
  }, [shortUrlEdit, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function formDataValidation(){
    const updatedFormData = {...formData};
    //Validation for URL
    let url = updatedFormData?.original_url;
    const validateUrlResult = validateUrl(url);
    if(!validateUrlResult.success) return {success:false};        
    url = validateUrlResult.url;
    updatedFormData.original_url = url;
    setFormData(prevValues => ({
      ...prevValues,
      original_url: url,
    }));          

    //Validation for CustomPath
    let customPath = updatedFormData?.customPath;
    const validateCustomPathResult = validateCustomPath(customPath, user.short_url_path);
    if(!validateCustomPathResult.success) return {success:false};  
    updatedFormData.customPath = validateCustomPathResult.customPath;
    setFormData(prevValues => ({
      ...prevValues,
      customPath: customPath,
    }));         

    //Validation for Title
    let title = updatedFormData?.title;
    const validateTitleResult = validateTitle(title);
    if(!validateTitleResult.success) return {success:false};   
    updatedFormData.title = validateTitleResult.title;
    setFormData(prevValues => ({
      ...prevValues,
      title: title,
    }));         

    //Validation for Description
    let description = updatedFormData?.description;
    const validateDescriptionResult = validateDescription(description);
    if(!validateDescriptionResult.success) return {success:false};    
    updatedFormData.description = validateDescriptionResult.description;
    setFormData(prevValues => ({
      ...prevValues,
      description: description,
    }));         
    
    //Validation for expiresAt
    let expires_at = updatedFormData?.expires_at;
    if(showDatePicker){          
      const validateExpiresAtResult = validateExpiresAt(expires_at);
      if(!validateExpiresAtResult.success) return {success:false};  
      updatedFormData.expires_at = validateExpiresAtResult.expires_at;
      setFormData(prevValues => ({
        ...prevValues,
        expires_at: expires_at,
      }));          
    }else{
      expires_at = null;
      updatedFormData.expires_at = expires_at;
      setFormData(prevValues => ({
        ...prevValues,
        expires_at: expires_at,
      }));   
    }

    return {...updatedFormData, success:true};
  }

  function handleInputChange(identifier, value) {
    setFormData((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  async function handleSubmit(event){
    try{
      // const submitType = isAuthenticated? USER_SUBMIT_FORM: GUEST_SUBMIT_FORM;
      setIsLoading(true);
      event.preventDefault();

      if(!isAuthenticated){
        helperErrorPopUp({title: 'ERROR!', text: "Please login to continue!"})
      }
      const validationSuccess = await formDataValidation();

      if(validationSuccess.success){
        delete validationSuccess.success; // unset the succcess key inside the json data
        // console.log('validationSuccess', validationSuccess);
        await dispatch(updateShortUrl(validationSuccess));
        handleClose();
      }
      

    }catch(ex){
      console.log(ex);
      helperErrorPopUp({title: 'ERROR!', text: "Something Went Wrong!"})
    
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen} size="small">
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#5A3785', // Set background color for dialog content
            color: '#ede5e5',
            borderRadius: '2rem'
          },
          '& .MuiBackdrop-root': {
            // backgroundColor: '#5A3785', // Modify the backdrop color
          },
        }}>
        <DialogTitle>Edit User</DialogTitle>

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}> {/* Set locale if necessary */}
            <Form   
              method="post" 
              onSubmit={handleSubmit} 
              noValidate
              className='shortUrlCreate-form'
            >
              <div>
                <div className='form-row'>
                  <label className='shortUrlCreate-input-label'>*URL/ Website Link</label> 
                  <input
                    id="url"
                    type="text"
                    name="url"
                    // required
                    value={formData.original_url || ''}
                    onChange={(event) => handleInputChange('original_url', event.target.value)}
                    placeholder='www.teyms.com'
                    disabled={isLoading}
                  //   defaultValue={event ? event.title : ''}
                  />
                </div>

                { isAuthenticated &&     
                  <>          
                    <div className='form-row' style={{ display:'none' }}>
                      <input
                        id="currentCustomPath"
                        type="text"
                        name="currentCustomPath"
                        value={formData.currentCustomPath || ''}
                        disabled

                      />
                    </div>
                    <div className='form-row'>
                      <label className='shortUrlCreate-input-label'>*Custom Path</label> 
                      <input
                        id="customPath"
                        type="text"
                        name="customPath"
                        value={formData.customPath || ''}

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
                        value={formData.title || ''}                        
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
                        value={formData.description || ''}                        
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
                        slotProps={{
                          textField: {
                            // fullWidth: true,
                            // error: false,  // Explicitly set error to false
                            // If you need to handle specific validation:
                            error: !formData.expires_at,
                            // helperText: !formData.expires_at ? "This field is required" : ""
                          },
                        }}
                        value={formData.expires_at}
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
                style={{paddingLeft:'3rem'}}
                >
                <button disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Shorten'}
                </button>
              </div>
            </Form>
          </LocalizationProvider>

      </Dialog>
    </>
  );
};

export default ShortUrlEditDialog;