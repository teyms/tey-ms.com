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

import './tngFileConvert.css';
import validation from '../../utils/validation'
import { createTngFileConvert } from '../../store/tngFileConvert-action';
import { tngFileConvertActions } from '../../store/tngFileConvert-slide';
import Loading from '../../components/Loader/Loading';

// import { createShortUrl } from '../../store/shortUrl-action';
// import { shortUrlActions } from '../../store/shortUrl-slide';

function TngFileConvert({ method, event }) {
  const name              = useSelector((state) => state.tngFileConvert.name);
  const content           = useSelector((state) => state.tngFileConvert.content);
  const size              = useSelector((state) => state.tngFileConvert.size);
  const type              = useSelector((state) => state.tngFileConvert.type);
  const convertedName     = useSelector((state) => state.tngFileConvert.convertedName);
  const convertedContent  = useSelector((state) => state.tngFileConvert.convertedContent);
  const convertedSize     = useSelector((state) => state.tngFileConvert.convertedSize);
  const convertedType     = useSelector((state) => state.tngFileConvert.convertedType);
  const status            = useSelector((state) => state.tngFileConvert.success);

  const navigate = useNavigate();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // const [validationSuccess, setValidationSuccess] = useState(false);
  const [enteredValues, setEnteredValues] = useState({
      content: '',
      name: '',
      size: '',
      type: ''
      // password: '',
    });
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitting = navigation.state === 'submitting';

  // useEffect(() => {
  //   async function createTngFileConvertFunction(){
  //     if(validationSuccess){
  //       await dispatch(createTngFileConvert(enteredValues));

  //       setValidationSuccess(false);
  //     }
  //   }

  //   createTngFileConvertFunction();
  // }, [validationSuccess])

  useEffect(() => {
    const binaryToActualFile = async() => {
      if (status && convertedContent) {
        //////////////////////METHOD 1//////////////////////////////////////
        // Step 3: Extract binary data from the response and convert it to an ArrayBuffer
        const binaryDataBuffer = atob(convertedContent); //decode base64
        const bufferArray = await Uint8Array.from(binaryDataBuffer, c => c.charCodeAt(0)).buffer;

        // Step 4: Create a Blob from the ArrayBuffer, specifying the file type (MIME type)
        const blob = new Blob([bufferArray], {
          type: convertedType, // Specify the MIME type of the file
        });

        // Step 5: Create a download link for the Blob
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Step 6: Set the download attribute and trigger the download
        a.download = convertedName;
        document.body.appendChild(a);
        a.click();

        // Step 7: Clean up the temporary URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        Swal.fire({
          title: 'SUCCESS!',
          text: `File:${name} converted to .CSV successfully!`,
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
          },
        })
      }else if(status === false && convertedName === 'tngFileConvert_failed'){
        Swal.fire({
          title: 'ERROR!',
          text: `Failed to convert file:${name}!`,
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
        tngFileConvertActions.updateTngFileConverted({
          convertedName     : '',
          convertedContent  : '',
          convertedSize     : '',
          convertedType     : '',
          success           : false,
        })
      )
    }

    binaryToActualFile();

  }, [status, convertedName])


  function formDataValidation(){
    let errorMsg = '';
    for (const key in enteredValues) {
      if (enteredValues.hasOwnProperty(key) && validation.isEmpty(enteredValues[key])) {

        errorMsg = `${key} cannot be empty!`
        Swal.fire({
          title: 'ERROR!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
          },
        });

        return false; // Return the name (key) of the property with the matching value
      }
      if(key == 'type' && !validation.isSelectedFile([enteredValues.type])){
        errorMsg = `Only PDF Accepted!`
        Swal.fire({
          title: 'ERROR!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
          },
        });

        return false; // Return the name (key) of the property with the matching value
      }
    }
    return true;
  }

  function handleInputChange(identifier, event) {
      let selectedFile = event.target.files[0];
      setEnteredValues((prevValues) => ({
        name   : selectedFile.name,
        content: selectedFile,
        size   : selectedFile.size,
        type   : selectedFile.type
      }));
    }

  async function handleSubmit(event){
    try{
      setIsLoading(true);
      event.preventDefault();

      // setValidationSuccess(await formDataValidation());

      const validationSuccess = await formDataValidation();
      if(validationSuccess){
        await dispatch(createTngFileConvert(enteredValues));
      }
    }catch(e){
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

      <div className='tngFileConvert-parent-container'>
        <div className="tngFileConvert-ads-container tngFileConvert-left-container">
          <div className='tngFileConvert-ads-banner'>qwer</div>
        </div>
        <div className="tngFileConvert-container">
          {/* <h1>{shortUrl}</h1> */}
          <h1 className='tngFileConvert-title'><span className='tng_text'>Touch 'n Go</span> Convert</h1>

          <Form   
                  onSubmit={handleSubmit} 
                  className='tngFileConvert-form'
          >
            <div>
              <p>
                Convert TNG transaction's PDF to Excel(.CSV) file
              </p>
              <input 
                id="content"
                type="file"
                name="content" 
                onChange={(event) => handleInputChange('content', event)}
              />
            </div>
            <div 
              className='tngFileConvert-btn'
              >
              {/* <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                Cancel
              </button> */}
              <button disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Convert'}
              </button>
            </div>
          </Form>
        </div>
        <div className="tngFileConvert-ads-container tngFileConvert-right-container">
          <div className='tngFileConvert-ads-banner'>qwer</div>
        </div>
      </div>
    </>
  );
}

export default TngFileConvert;
