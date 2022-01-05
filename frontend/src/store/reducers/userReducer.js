import { userConstant } from "../constants/userConstant";



const userReducer = (initialState, action) => {
	switch (action.type) {
		case userConstant.GET_USER_LOADING:
			return {
				...initialState,
				loading: action.payload.loading,
				error: action.payload.error,
			};

		case userConstant.GET_USER_SUCESS:
			return {
				...initialState,
				loading: action.payload.loading,
				error: action.payload.error,
				authTokens: action.payload.authTokens,
                user: action.payload.user
			};

		case userConstant.GET_USER_FAIL:
			return {
				...initialState,
				loading: action.payload.loading,
				error: action.payload.error,
			};

        case userConstant.LOG_OUT_USER:
            return {
                ...initialState,
                loading: action.payload.loading,
				error: action.payload.error,
				authTokens: action.payload.authTokens,
                user: action.payload.user
            }

		default:
			return initialState;
	}
};
export default userReducer;
