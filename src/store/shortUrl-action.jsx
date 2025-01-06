import Swal from 'sweetalert2';
import { shortUrlActions } from './shortUrl-slide';
import { googleAuthActions } from './googleAuth-slide';
import { getShortUrlApi, createShortUrlApi, updateShortUrlApi, deleteShortUrlApi, getShortUrlListApi } from '../apis/shortUrl-api';

export const getShortUrl = (shortUrl) => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'pending',
    //     title: 'Sending...',
    //     message: 'Sending cart data!',
    //   })
    // );

    const sendRequest = async () => {
        // const response = await fetch(
        //     `http://localhost:8000/api/shorturl/${shortUrl}`,
        //     {
        //     headers: {'content-type': 'application/json'},
        //     method: 'GET',
        //     // body: shortUrl,
        //     // body: JSON.stringify({
        //     //     original_url: shortUrl.original_url,
        //     //     // totalQuantity: cart.totalQuantity,
        //     // }),
        //     }
        // );

        // if (!response.ok) {
        //     throw new Error('Sending cart data failed.');
        // }
        // const res = await response.json()

        // dispatch(
        //     shortUrlActions.updateShortUrl({
        //         original_url: res?.data?.original_url,
        //     })
        // );
        const res = await getShortUrlApi(shortUrl);

        if(!res?.success){
          return dispatch(
            shortUrlActions.updateShortUrl({
              original_url: 'shortUrl_failed', 
              success: false,
            })
          );
        }

        return dispatch(
            shortUrlActions.updateShortUrl({
              original_url: res?.data?.original_url,
              success: true,
            })
        );
    };

    try {
      await sendRequest();


    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!',
    //     })
    //   );
    } catch (error) {
      console.log('erro Detected');
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sending cart data failed!',
    //     })
    //   );
    }
  };
};

export const createShortUrl = (shortUrl) => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'pending',
    //     title: 'Sending...',
    //     message: 'Sending cart data!',
    //   })
    // );

    const sendRequest = async () => {
        const res = await createShortUrlApi(shortUrl);

        if (!res?.success) {
          return dispatch(
            shortUrlActions.updateShortUrl({
              shorten_url: 'shortUrl_failed',
              success: false,
            })
          );
        }

        if(res?.data?.short_url_path){ // update the shortUrlPath, only if its a login user
          dispatch(
            googleAuthActions.updateUserShortUrlPath({
              short_url_path: res?.data?.short_url_path,
            })
          );
        }

        return dispatch(
            shortUrlActions.updateShortUrl({
              shorten_url: res?.data?.shorten_url,
              success: true,
            })
        );
    };

    try {
      await sendRequest();


    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!',
    //     })
    //   );
    } catch (error) {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sending cart data failed!',
    //     })
    //   );
    }
  };
};

export const updateShortUrl = (params) => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'pending',
    //     title: 'Sending...',
    //     message: 'Sending cart data!',
    //   })
    // );
    const sendRequest = async () => {
      const res = await updateShortUrlApi(params);

        if (!res?.success) {
          return dispatch(
            shortUrlActions.updateShortUrlList({
              // shorten_url: 'shortUrl_failed',
              success: false,
              controlSuccessPopUp: false,
              action_type: 'SINGLE_RECORD_UPDATE',
            })
          );
        }
        const res_data = {
          id: res?.data?.id,
          url: res?.data?.url,
          original_url: res?.data?.original_url,
          title: res?.data?.title,
          description: res?.data?.description,
          click_count: res?.data?.click_count,
          expires_at: res?.data?.expires_at,
          short_url_path: res?.data?.short_url_path,
      }
        return dispatch(
            shortUrlActions.updateShortUrlList({
              res_data,
              success: true,
              controlSuccessPopUp: true,
              action_type: 'SINGLE_RECORD_UPDATE',
            })
        );
    };

    try {
      await sendRequest();


    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!',
    //     })
    //   );
    } catch (error) {
        console.log(error);
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sending cart data failed!',
    //     })
    //   );
    }
  };
};

export const deleteShortUrl = (params) => {
  return async (dispatch) => {

    const sendRequest = async () => {
      const res = await deleteShortUrlApi(params);

        if (!res?.success) {
          return dispatch(
            shortUrlActions.updateShortUrlList({
              // shorten_url: 'shortUrl_failed',
              success: false,
              // controlSuccessPopUp: false,
              action_type: 'SINGLE_RECORD_DELETE',
            })
          );
        }

        const res_data = {
          id: res?.data?.id,
          url: res?.data?.url,
          original_url: res?.data?.original_url,
          title: res?.data?.title,
          description: res?.data?.description,
          click_count: res?.data?.click_count,
          expires_at: res?.data?.expires_at,
          short_url_path: res?.data?.short_url_path,
        }

        Swal.fire({
          title: 'SUCCESS!',        
          html: `deleted shortURL <p >${res_data.url}</p>`,  
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'custom-swal-color',
            content: 'custom-swal-color',
            confirmButton: 'custom-swal-color',
          },
        })

        return dispatch(
            shortUrlActions.updateShortUrlList({
              res_data,
              // success: true,
              // controlSuccessPopUp: true,
              action_type: 'SINGLE_RECORD_DELETE',
            })
        );


    };

    try {
      await sendRequest();


    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       title: 'Success!',
    //       message: 'Sent cart data successfully!',
    //     })
    //   );
    } catch (error) {
        console.log(error);
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error!',
    //       message: 'Sending cart data failed!',
    //     })
    //   );
    }
  };
};

export const getShortUrlList = (shortUrl) => {
  return async (dispatch) => {
    const sendRequest = async () => {

        const res = await getShortUrlListApi(shortUrl);

        if(!res?.success){
          return dispatch(
            shortUrlActions.updateShortUrlList({
              original_url: 'shortUrlList_failed', 
              success: false,
              action_type: 'BATCH_RECORDS_FROM_API',
            })
          );
        }

        return dispatch(
            shortUrlActions.updateShortUrlList({
              res,
              success: true,
              action_type: 'BATCH_RECORDS_FROM_API'
            })
        );
    };

    try {
      await sendRequest();

    } catch (error) {
      console.log('error Detected');
    }
  };
};