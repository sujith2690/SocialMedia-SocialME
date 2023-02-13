const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  // console.log(action.type,'actiontype')
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAILED":
      return { ...state, loading: false, error: true };

    case "OTP_START":
      return { ...state, loading: true, error: false };
    case "OTP_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        loading: false,
        authData: action.data,
        error: false,
      };

    case "OTP_FAIL":
      return { ...state, loading: false, error: true, otpfail: true };

    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };

    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, error: true };

    case "FOLLOW_USER":
      console.log(action.data, "------------555");
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };

    case "LOADING_FALSE":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    default:
      return state;
  }
};

export default authReducer;
