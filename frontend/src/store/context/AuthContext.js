import { createContext, useEffect, useState, useReducer } from "react";
import { userConstant } from "../constants/userConstant";
import userReducer from "../reducers/userReducer";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

//funcrion shuru
export const AuthProvider = ({ children }) => {
	const initialState = {
		loading: false,
		error: false,
		authTokens: null,
		user: null,
	};

	const [userState, dispatch] = useReducer(userReducer, initialState);
	let navigate = useNavigate();
	const[pageload,setPageload]=useState(true)


	let loginUser = async (e) => {
		dispatch({
			type: userConstant.GET_USER_LOADING,
			payload: { loading: true, error: false },
		});
		try {
			let response = await fetch("http://127.0.0.1:8000/api/token/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: e.target.email.value,
					password: e.target.password.value,
				}),
			});

			let data = await response.json();

			if (response.status === 200) {
				dispatch({
					type: userConstant.GET_USER_SUCESS,
					payload: {
						authTokens: data,
						user: jwt_decode(data.access),
						loading: false,
						error: false,
					},
				});
				localStorage.setItem("authTokens", JSON.stringify(data));
				navigate("/profile", { replace: true });
			} else {
				dispatch({
					type: userConstant.GET_USER_FAIL,
					payload: { loading: false, error: true },
				});
				console.log("something went wrong");
			}
		} catch (e) {
			console.log(e);
			dispatch({
				type: userConstant.GET_USER_FAIL,
				payload: { loading: false, error: true, authTokens: null, user: null },
			});
		}
	};

	let logOutUser = (e) => {
		e.preventDefault();
		dispatch({
			type: userConstant.LOG_OUT_USER,
			payload: { loading: false, error: false },
		});
		localStorage.removeItem("authTokens");
		navigate("/", { replace: true });
	};

	let updateToken = async () => {
		console.log("update token called");
		let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh: userState.authTokens.refresh }),
		});

		let data = await response.json();

		if (response.status === 200) {
			dispatch({
				type: userConstant.GET_USER_SUCESS,
				payload: {
					authTokens: data,
					user: jwt_decode(data.access),
					loading: false,
					error: false,
				},
			});
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			console.log("logout hosse");
			dispatch({
				type: userConstant.LOG_OUT_USER,
				payload: { loading: false, error: false },
			});
			localStorage.removeItem("authTokens");
			navigate("/", { replace: true });
		}

		// if(pageload){
		// 	setPageload(false)
		// }
	};


	useEffect(() => {
         console.log("useEffect 1 called");

		//  if(pageload){
		// 	updateToken() 
		//  }
		//protthekbar 1st page load a cholbe
		const initialAuthTokens = localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null;
		const initialUser = initialAuthTokens
			? jwt_decode(initialAuthTokens.access)
			: null;

		dispatch({
			type: userConstant.GET_USER_SUCESS,
			payload: {
				authTokens: initialAuthTokens,
				user: initialUser,
				loading: false,
				error: false,
			},
		});

	}, []);


	useEffect(()=>{
		console.log("useEffect 2 called");
		let fourMinute = 1000 * 60 * 4;
		let intervel = setInterval(() => {
			console.log("update er block");
			console.log(userState.authTokens);
			if (userState.authTokens) {
				updateToken();
			}
		}, fourMinute);
		return ()=>clearInterval(intervel)
	},[userState.authTokens])


	let contextData = {
		loginUser: loginUser,
		userState: userState,
		logOutUser: logOutUser,
	};

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};
