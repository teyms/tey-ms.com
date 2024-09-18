
import { blogPostActions } from './blogPost-slide';
import { getBlogPostApi } from '../apis/blogPost-api';


export const getBlogPost = (slug) => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'pending',
    //     title: 'Sending...',
    //     message: 'Sending cart data!',
    //   })
    // );

    const sendRequest = async () => {
        const res = await getBlogPostApi(slug);

        if(!res?.success){
          return dispatch(
            blogPostActions.updateBlogPost({
                msg: res.msg || 'failed',
                success: false,
                content: 'blogPost_notFound'
            })
          );
        }
        return dispatch(
            blogPostActions.updateBlogPost({
                title: res.data?.title,
                content: res.data?.content,
                status: res.data?.status,
                msg: res.msg || 'success',
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
