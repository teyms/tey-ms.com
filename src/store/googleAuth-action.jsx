import { googleAuthActions } from './googleAuth-slide';
import { postGoogleAuthApi, logoutApi } from '../apis/googleAuth-api';

// Cache keys
const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

export const postGoogleAuth = (response) => {
  return async (dispatch) => {
    const sendRequest = async () => {
        const res = await postGoogleAuthApi(response);

        if(!res?.success){
          return dispatch(
            googleAuthActions.updateGoogleAuth({
                msg: res.msg || 'failed',
                success: false,
                token: 'token_notFound',
                isAuthenticated: false,
            })
          );
        }

        localStorage.setItem(AUTH_TOKEN_KEY, res.data?.token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.data?.user));
    
        return dispatch(
            googleAuthActions.updateGoogleAuth({
                // token: response?.access_token,
                token: res.data?.token,
                user: res.data?.user,
                isAuthenticated: true,

                msg: res.msg || 'success',
                success: true,
            })
        );
    };

    try {       
        await sendRequest();
    } catch (error) {
        console.log('error Detected', error);
    }
  };
};

// Hydrate State on App Load
export const hydrateAuthState = () => {
    return (dispatch) => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const user = JSON.parse(localStorage.getItem(USER_DATA_KEY));

        if (token && user) {
            return dispatch(
                googleAuthActions.updateGoogleAuth({
                    token: token,
                    user: user,
                    isAuthenticated: true,
    
                    msg: 'success',
                    success: true,
                })
            );
        }
    };
};


// Logout
export const logout = (userDetails, token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const res = await logoutApi(userDetails, token);
    
            // if(!res?.success){

            // }
    
            console.log(res);
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(USER_DATA_KEY);
        
            return dispatch(
                googleAuthActions.updateGoogleAuth({
                    token: null,
                    user: null,
                    isAuthenticated: false,
    
                    // msg: res.msg || 'success',
                    // success: true,
                })
            );
        };
    
        try {
            // dispatch(
            //     googleAuthActions.updateGoogleAuth({
            //         token: response?.access_token
            //     })
            // );        
            await sendRequest();
        } catch (error) {
            console.log('error Detected', error);
        }
      };
};



