import { createContext, useReducer } from "react";
import { DEV_PRODUCTION } from "../config/url";
import { ERROR, GET_CURRENT_USER, INSERT_USER, SET_CURRENT_USER } from "./actions";
import axios from 'axios'
const initialState = {
  currentUser: [],
  successMessage: "",
  errorMessage: "",
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: [...action.payload],
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        successMessage: action.payload,
      };
    case INSERT_USER:
      
      return {
        ...state,
        hasError: false,
        successMessage: action.payload,
      };
    case ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        hasError: true,
      };

    default:
      break;
  }
};

export const ContextAPI = createContext();

export const ContextAPIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCurrentUser = async () => {
    var localUser = JSON.parse(localStorage.getItem("user" || []));
    if (localUser) dispatch({ type: GET_CURRENT_USER, payload: localUser });
    else
      dispatch({
        type: GET_CURRENT_USER,
        payload: [],
      });
  };
  const setCurrentUser = async (userData) => {
    localStorage.setItem("user",JSON.stringify(userData));
     getCurrentUser();
  };
  const logout = async () => {
    localStorage.clear();
    getCurrentUser();
  };

  const registerStudent =(studentData)=>{
      axios
        .post(`${DEV_PRODUCTION}student`, studentData)
        .then((response) => {
          dispatch({
            type: INSERT_USER,
            payload: response.data.message,
          });
        })
        .catch((error) => {
          dispatch({
            type: ERROR,
            payload: "Error Occurred During Creation 😪, Please try again ",
          });
        });
        
    
  }

  return (
    <ContextAPI.Provider
      value={{
        user: state.currentUser,
        hasError: state.hasError,
        errorMessage: state.errorMessage,
        successMessage: state.successMessage,
        getCurrentUser,
        setCurrentUser,
        logout,
        registerStudent,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
