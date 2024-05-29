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

    // const tngFileData = useSelector((state) => ({
    //   name              : state.tngFileConvert.name,
    //   content           : state.tngFileConvert.content,
    //   size              : state.tngFileConvert.size,
    //   type              : state.tngFileConvert.type,
    //   convertedName     : state.tngFileConvert.convertedName,
    //   convertedContent  : state.tngFileConvert.convertedContent,
    //   convertedSize     : state.tngFileConvert.convertedSize,
    //   convertedType     : state.tngFileConvert.convertedType,
    //   status            : state.tngFileConvert.success,
    // }));
    
    // const { 
    //   name,
    //   content,
    //   size,
    //   type,
    //   convertedName,
    //   convertedContent,
    //   convertedSize,
    //   convertedType,
    //   status,
    // } = tngFileData;


    // const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [validationSuccess, setValidationSuccess] = useState(false);
    const [enteredValues, setEnteredValues] = useState({
        content: '',
        name: '',
        size: '',
        type: ''
        // password: '',
      });

    const isSubmitting = navigation.state === 'submitting';

    useEffect(() => {
      async function createTngFileConvertFunction(){
        if(validationSuccess){
          await dispatch(createTngFileConvert(enteredValues));

          setValidationSuccess(false);
        }
      }

      createTngFileConvertFunction();
    }, [validationSuccess])

    useEffect(() => {
      const test = async() => {
        console.log('useeffect convertedName');
        console.log('useeffect status');
        console.log(status);
        console.log(convertedContent);
  
        if (status && convertedContent) {
          //////////////////////METHOD 1//////////////////////////////////////
          // Step 3: Extract binary data from the response and convert it to an ArrayBuffer
          const binaryDataBuffer = atob(convertedContent); //decode base64
          const bufferArray = await Uint8Array.from(binaryDataBuffer, c => c.charCodeAt(0)).buffer;
          // const bufferArray = await new Uint8Array(binaryDataBuffer).buffer;
  
          console.log('bufferArray');
          console.log(binaryDataBuffer);
          console.log(await new Uint8Array(binaryDataBuffer));
          console.log(bufferArray);
  
          // Step 4: Create a Blob from the ArrayBuffer, specifying the file type (MIME type)
          const blob = new Blob([bufferArray], {
            type: convertedType, // Specify the MIME type of the file
          });
  
          console.log('blob.arrayBuffer()');
          console.log(blob);
          console.log(await blob.arrayBuffer());
  
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
  
  
          // // ///////////////////////////////Method 2//////////////////////////////////
          // // // Create a Blob from the response data
          // // const pdfBlob = new Blob([atob(convertedContent)], { type: convertedType });
  
          // // // Create a temporary URL for the Blob
          // // const url = window.URL.createObjectURL(pdfBlob);
  
          // // // Create a temporary <a> element to trigger the download
          // // const tempLink = document.createElement("a");
          // // tempLink.href = url;
          // // tempLink.setAttribute(
          // //   "download",
          // //   convertedName
          // // ); // Set the desired filename for the downloaded file
  
          // // // Append the <a> element to the body and click it to trigger the download
          // // document.body.appendChild(tempLink);
          // // tempLink.click();
  
          // // // Clean up the temporary elements and URL
          // // document.body.removeChild(tempLink);
          // // window.URL.revokeObjectURL(url);
  
  
  
  
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

      test();

    }, [status, convertedName])
  
    function cancelHandler() {
      navigate('..');
    }

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

        console.log('value');
        console.log(event.target.value);
        console.log(selectedFile);

        setEnteredValues((prevValues) => ({
          name   : selectedFile.name,
          content: selectedFile,
          size   : selectedFile.size,
          type   : selectedFile.type
        }));
      }

    async function handleSubmit(event){
        event.preventDefault();
        console.log(event);

        // const validationSuccess = await formDataValidation();
        console.log('validationSuccess');
        console.log(validationSuccess);

        setValidationSuccess(await formDataValidation());


    }

    return (
      <>
        <div className='tngFileConvert-parent-container'>
          <div className="ads-container left-container">
            <div className='ads-banner'>qwer</div>
          </div>
          <div className="tngFileConvert-container">
            {/* <h1>{shortUrl}</h1> */}
            <h1 className='tngFileConvert-title'><span className='tng_text'>TNG</span> Convert</h1>

            <Form   
                    onSubmit={handleSubmit} 
                    className='tngFileConvert-form'
            >
              <div>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                </p>
                <input 
                  id="content"
                  type="file"
                  name="content" 
                  onChange={(event) => handleInputChange('content', event)}
                />
              </div>
              <div 
                className='shortUrl-btn'
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
          <div className="ads-container right-container">
            <div className='ads-banner'>qwer</div>
          </div>
        </div>
      </>
    );
}

export default TngFileConvert;
