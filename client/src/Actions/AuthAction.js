import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    console.log(data,'----------login data...')
    if(!data.success){
      console.log('----login false')
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

export const otpVerification = (userId,otp)=> async(dispatch)=>{
  console.log(userId,otp,'-------------userid and otp authentication')

  dispatch({type:"OTP_START"})
  try{
    const {data} = await AuthApi.otpVerify(userId,otp)
    console.log(data,'----data at opt verification')
    dispatch({type:"OTP_SUCCESS", data:data})
    
  }catch(error){
    console.log(error)
    dispatch({type:"OTP_FAIL"})
  }
}


export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

export const AdminLogIn = (formData) => async (dispatch) => {

  dispatch({ type: "AUTH_START" });
  try {
    console.log(formData,'------formData')
    const { data } = await AuthApi.AdminLogIn(formData);
    console.log(data,"llllllllllllllllllllllllllllllllllllllll");
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};

export const AdminSignUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    console.log('---AUTH_START')
    const { data } = await AuthApi.AdminSignUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};
