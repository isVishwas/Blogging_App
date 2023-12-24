//Include Both Helper File with needed methods
import { removeToken, setAuthToken } from "../../../helpers/api_helper";
import {
  loadUserDetails,
  postLogin,
  signUp,

} from "../../../helpers/api_method_helper";

import { apiError, reset_login_flag, loginAdmin, loadAdminDetails, logoutAdmin } from './reducer';
export const login_user = (user, history) => async (dispatch) => {

  try {

    const response = await postLogin({
      email: user.email,
      password: user.password
    });

      if (response.success) {
        setAuthToken(response.token)
        dispatch(loginAdmin(response));
        history('/article');
      } else {
        dispatch(apiError(response));
      }

  } catch (error) {
    dispatch(apiError(error));
  }
};

//in used
export const signup_user = (user, history) => async (dispatch) => {

  try {

    const response = await signUp({
      username: user.username,
      email: user.email,
      password: user.password
    });

      if (response.success) {
        // setAuthToken(response.token)
        dispatch(loginAdmin(response));
        history('/');
      } else {
        dispatch(apiError(response));
      }

  } catch (error) {
    dispatch(apiError(error));
  }
};




export const loadUser = () => async (dispatch) => {
  try {

    const response = await loadUserDetails();
    if (response.success) {
      dispatch(loadAdminDetails(response))
    } else {
      dispatch(apiError(response));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};



export const logoutUser = () => async (dispatch) => {
  try {
    removeToken();
    dispatch(logoutAdmin(true));
    // history('/login')
  } catch (error) {
    dispatch(apiError(error));
  }
};


export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};