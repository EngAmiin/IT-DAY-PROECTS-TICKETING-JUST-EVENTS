import { createContext, useReducer } from "react";
import { DEV_PRODUCTION } from "../config/url";
import {
  FETCH_PROJECTS_FOR_USER,ERROR,
  SAVING,
  GET_CURRENT_USER,
  INSERT_USER,
  SET_CURRENT_USER,
} from "./actions";
import axios from 'axios'
const initialState = {
  currentUser: [],
  allProjects: [],
  projectsByUser: [],
  successMessage: "",
  errorMessage: "",
  hasError: false,
  saving: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: [...action.payload],
      };
    case FETCH_PROJECTS_FOR_USER:
      return {
        ...state,
        projectsByUser: [...action.payload],
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        successMessage: action.payload,
      };
    case INSERT_USER:
      return {
        ...state,
        saving: false,
        hasError: false,
        successMessage: action.payload,
      };
    case ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        hasError: true,
      };
    case SAVING:
      return {
        ...state,
        saving: true,
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

  const registerStudent = async (studentData, callback) => {
    dispatch({
      type: SAVING,
    });
    axios
      .post(`${DEV_PRODUCTION}student`, studentData)
      .then((response) => {
        callback(false,response.data.message);
      })
      .catch((error) => {
          callback(true,"Error Occurred During Creation, Please try again")
      });
  };
   const registerProject = async (data, callback) => {
     dispatch({
       type: SAVING,
     });
     axios
       .post(`${DEV_PRODUCTION}student/submitProject`, data)
       .then((response) => {
         callback(false, "Project Has Been Created");
       })
       .catch((error) => {
         callback(true, "Error Occurred During Creation, Please try again");
       });
   };
  const authLogin = async (studentData, callback) => {
    dispatch({
      type: SAVING,
    });
    axios
      .get(`${DEV_PRODUCTION}student/${studentData.id_card}/${studentData.password}`)
      .then((response) => {
        if(response.data.data.length>0)
        {
          const {id_card,FullName,id}= response.data.data[0];
          setCurrentUser([{
            card: id_card,
            name : FullName,
            id: id
          }])
          console.log(response.data.data[0])
          callback(false,response.data.message);
        }
        else
          callback(true, "Incorrect Username or Password")
      })
      .catch((error) => {
          callback(true,"Error Occurred During Authentication, Please try again")
      });
  };
  const readProjects = async (id, callback) => {
    axios
      .get(`${DEV_PRODUCTION}student/projects/${id}`)
      .then((response) => {
       
       dispatch({
        type: FETCH_PROJECTS_FOR_USER,
        payload: response.data.data
       })
      })
      .catch((error) => {
          callback(true,"Error Occurred During Authentication, Please try again")
      });
   
  };

  return (
    <ContextAPI.Provider
      value={{
        user: state.currentUser,
        projectsByUser: state.projectsByUser,
        saving: state.saving,
        hasError: state.hasError,
        errorMessage: state.errorMessage,
        successMessage: state.successMessage,
        getCurrentUser,
        setCurrentUser,
        logout,
        registerStudent,
        authLogin,
        readProjects,
        registerProject,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
