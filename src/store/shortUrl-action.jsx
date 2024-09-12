// import { uiActions } from './ui-slice';
// import { cartActions } from './cart-slice';
import { shortUrlActions } from './shortUrl-slide';
import { getShortUrlApi, createShortUrlApi } from '../apis/shortUrl-api';

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         'https://react-http-6b4a6.firebaseio.com/cart.json'
//       );

//       if (!response.ok) {
//         throw new Error('Could not fetch cart data!');
//       }

//       const data = await response.json();

//       return data;
//     };

//     try {
//       const cartData = await fetchData();
//       dispatch(
//         cartActions.replaceCart({
//           items: cartData.items || [],
//           totalQuantity: cartData.totalQuantity,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Error!',
//           message: 'Fetching cart data failed!',
//         })
//       );
//     }
//   };
// };

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
        //     //     ori_url: shortUrl.ori_url,
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
        //         ori_url: res?.data?.ori_url,
        //     })
        // );
        const res = await getShortUrlApi(shortUrl);

        if(!res?.success){
          return dispatch(
            shortUrlActions.updateShortUrl({
              ori_url: 'shortUrl_failed', 
              success: false,
            })
          );
        }

        return dispatch(
            shortUrlActions.updateShortUrl({
              ori_url: res?.data?.ori_url,
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
        // const response = await fetch(
        //     'http://localhost:8000/api/shorturl',
        //     {
        //     headers: {
        //       'content-type': 'application/json',
        //       'X-Requested-With': 'XMLHttpRequest'
        //     },
        //     method: 'POST',
        //     // body: shortUrl,
        //     body: JSON.stringify({
        //         ori_url: shortUrl.ori_url,
        //         // totalQuantity: cart.totalQuantity,
        //     }),
        //     }
        // );

        const res = await createShortUrlApi(shortUrl);

        if (!res?.success) {
          return dispatch(
            shortUrlActions.updateShortUrl({
              shorten_url: 'shortUrl_failed',
              success: false,
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