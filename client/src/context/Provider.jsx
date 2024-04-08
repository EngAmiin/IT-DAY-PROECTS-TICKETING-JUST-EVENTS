import { createContext, useReducer } from "react";
import { DEV_PRODUCTION } from "../config/url";
import {
  FETCH_PROJECTS_FOR_USER,ERROR,
  SAVING,
  GET_CURRENT_USER,
  INSERT_USER,
  SET_CURRENT_USER,
  FETCH_TYPES,
  FETCH_ACTIVE_EVENT,
  FETCH_SEMESTERS,
  SET_SAVING,
} from "./actions";
import axios from 'axios'
const initialState = {
  currentUser: [],
  allProjects: [],
  projectsByUser: [],
  projectTypes: [],
  semesters: [],
  activeEvent: {},
  successMessage: "",
  errorMessage: "",
  hasError: false,
  pending: false,
  saving: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        saving: false,
        currentUser: [...action.payload],
      };
    case FETCH_PROJECTS_FOR_USER:
      return {
        ...state,
        saving: false,
        pending: false,
        projectsByUser: [...action.payload],
      };
    case FETCH_ACTIVE_EVENT:
      return {
        ...state,
        saving: false,
        activeEvent: { ...action.payload },
      };
    case FETCH_TYPES:
      return {
        ...state,
        saving: false,
        projectTypes: [...action.payload],
      };
    case FETCH_SEMESTERS:
      return {
        ...state,
        saving: false,
        semesters: [...action.payload],
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        saving: false,
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
        saving: false,
        errorMessage: action.payload,
        hasError: true,
      };
    case SAVING:
      return {
        ...state,
        pending: true,
        saving: true,
      };
    case SET_SAVING:
      return {
        ...state,
        saving: false,
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
    dispatch({
      type: SAVING
    })
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
            dispatch({
      type: SET_SAVING
    })
      });
   
  };
  const removeProject = async (data, callback) => {
    axios
      .delete(`${DEV_PRODUCTION}student/remove/${data.projectId}/${data.studentId}`)
      .then((response) => {
        callback(false,"Project Has been removed");
      })
      .catch((error) => {
        callback(
          true,
          "Error Occurred During Authentication, Please try again"
        );
      });
  };

  const readProjectTypes = async (callback) => {
      axios
        .get(`${DEV_PRODUCTION}student/readTypes`)
        .then((response) => {
          dispatch({
            type: FETCH_TYPES,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          callback(
            true,
            "Error Occurred During Authentication, Please try again"
          );
        });
    };

      const readSemesters = async (callback) => {
        axios
          .get(`${DEV_PRODUCTION}student/semesters`)
          .then((response) => {
            dispatch({
              type: FETCH_SEMESTERS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            callback(
              true,
              "Error Occurred During Authentication, Please try again"
            );
          });
      };

      const readActiveEvent = async (callback) => {
        axios
          .get(`${DEV_PRODUCTION}student/active-event`)
          .then((response) => {
            dispatch({
              type: FETCH_ACTIVE_EVENT,
              payload: response.data.data[0],
            });
          })
          .catch((error) => {
            callback(
              true,
              "Error Occurred During Authentication, Please try again"
            );
          });
      };

       const checkStudentRange = async (eventId, callback) => {
         axios
           .get(`${DEV_PRODUCTION}student/eventRange/${eventId}`)
           .then((response) => {
             const { PredefinedStudents, currentStudents } =
               response.data.data[0];
             if (currentStudents >= PredefinedStudents) {
               callback(
                 true,
                 "The maximum number of students for this event has been reached. Kindly make arrangements for the upcoming IT-DAY 🤗."
               );
             } else callback(false, null);
           })
           .catch((error) => {
             callback(
               true,
               "Error Occurred During Authentication, Please try again"
             );
           });
       };

  return (
    <ContextAPI.Provider
      value={{
        user: state.currentUser,
        projectsByUser: state.projectsByUser,
        saving: state.saving,
        pending: state.pending,
        semesters: state.semesters,
        hasError: state.hasError,
        errorMessage: state.errorMessage,
        successMessage: state.successMessage,
        projectTypes: state.projectTypes,
        activeEvent: state.activeEvent,
        getCurrentUser,
        readProjectTypes,
        setCurrentUser,
        logout,
        registerStudent,
        authLogin,
        readSemesters,
        readActiveEvent,
        readProjects,
        registerProject,
        removeProject,
        checkStudentRange,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
