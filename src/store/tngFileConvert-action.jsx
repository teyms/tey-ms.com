import { tngFileConvertActions } from './tngFileConvert-slide';
import { createTngFileConvertApi } from '../apis/tngFileConvert-api';

export const createTngFileConvert = (tngFileConvert) => {
  return async (dispatch) => {
    console.log('action data');
    console.log(tngFileConvert);

    tngFileConvertActions.updateTngFile({tngFileConvert})

    const sendRequest = async () => {
        const res = await createTngFileConvertApi(tngFileConvert);

        console.log('res12345');
        // console.log(res);

        if (!res?.success) {
          return dispatch(
            tngFileConvertActions.updateTngFileConverted({
              convertedName: 'tngFileConvert_failed',
              success: false,
            })
        );
        }
        // const res = await response.json()
        console.log(res);
        console.log(res?.data);
        // console.log(res?.data.converted_content);

        return dispatch(
            tngFileConvertActions.updateTngFileConverted({
                convertedName     : res?.data?.converted_name,
                convertedContent  : res?.data?.converted_content,
                convertedSize     : res?.data?.converted_size,
                convertedType     : res?.data?.converted_type,
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