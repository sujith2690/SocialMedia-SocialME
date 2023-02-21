import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    if(!data.success){
      dispatch({type:"LOADING_FALSE"})
    }else{
      await dispatch({type:"AUTH_SUCCESS", data: data })
    }
    return {message:data.message,success:data.success}
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};
export const googleUser = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.googleUser(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    if(!data.success){
      dispatch({type:"LOADING_FALSE"})
    }else{
      await dispatch({type:"AUTH_SUCCESS", data: data })
    }
    return {message:data.message,success:data.success}
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};



export const otpVerification = (userId,otp) => async (dispatch)=>{
  dispatch({type:"OTP_START"})
  try {
      const { data } = await AuthApi.otpVerify(userId, otp)
      dispatch({ type: "OTP_SUCCESS", data: data })
  } catch (error) {
      console.log(error)
      dispatch({ type: "OTP_FAIL" })
  }
}
export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

export const AdminLogIn = (formData) => async (dispatch) => {

  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.AdminLogIn(formData);
    if(!data.success){
      dispatch({type:"LOADING_FALSE"})
    }else{
      await dispatch({type:"AUTH_SUCCESS", data: data })
    }
    return {message:data.message,success:data.success}
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};

export const AdminSignUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.AdminSignUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};
