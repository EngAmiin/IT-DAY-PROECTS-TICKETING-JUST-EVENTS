import { createContext, useReducer } from "react";
import { DEV_PRODUCTION } from "../config/url";
import {
  EVENT_REPORT,
  FETCH_STUDENTS_BY_EVENT,
  FETCH_PROJECTS_BY_TYPE,
  FETCH_PROJECTS_FOR_USER,
  ERROR,
  SAVING,
  GET_CURRENT_USER,
  INSERT_USER,
  SET_CURRENT_USER,
  FETCH_TYPES,
  FETCH_ACTIVE_EVENT,
  FETCH_SEMESTERS,
  SET_SAVING,
  FETCH_CURRENT_USER,
  SET_LOAD,
} from "./actions";
import axios from "axios";
const initialState = {
  currentUser: [],
  allProjects: [],
  projectsByUser: [],
  projectTypes: [],
  semesters: [],
  chartProjectsByType : [],
  activeEvent: {},
  currentUserData: {},
  STUDENTS_BY_EVENT: {},
  event_report: {},
  successMessage: "",
  errorMessage: "",
  hasError: false,
  pending: false,
  saving: false,
  load: false,
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
    case FETCH_CURRENT_USER:
      return {
        ...state,
        load: false,
        saving: false,
        currentUserData: { ...action.payload },
      };
    case EVENT_REPORT:
      return {
        ...state,
        load: false,
        saving: false,
        event_report: { ...action.payload },
      };
    case FETCH_STUDENTS_BY_EVENT:
      return {
        ...state,
        load: false,
        saving: false,
        STUDENTS_BY_EVENT: { ...action.payload },
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
    case FETCH_PROJECTS_BY_TYPE:
      return {
        ...state,
        saving: false,
        chartProjectsByType: [...action.payload],
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
    case SET_LOAD:
      return {
        ...state,
        load: action.payload,
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
    localStorage.setItem("user", JSON.stringify(userData));
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
      .post(`${DEV_PRODUCTION}student/registerStudent`, studentData)
      .then((response) => {
        callback(false, response.data.message);
      })
      .catch((error) => {
        callback(true, "Error Occurred During Creation, Please try again");
      });
  };
  const sendMessage = async (data, callback) => {
   
    axios
      .post(`${DEV_PRODUCTION}messages/`, data)
      .then((response) => {
        callback(false, "Your message has been recieved");
      })
      .catch((error) => {
        callback(true, "Error Occurred During Sending, Please try again");
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
      .get(
        `${DEV_PRODUCTION}student/${studentData.id_card}/${studentData.password}`
      )
      .then((response) => {
        if (response.data.data.length > 0) {
          const { id_card, FullName, id } = response.data.data[0];
          setCurrentUser([
            {
              card: id_card,
              name: FullName,
              id: id,
            },
          ]);
          console.log(response.data.data[0]);
          callback(false, response.data.message);
        } else callback(true, "Incorrect Username or Password");
      })
      .catch((error) => {
        callback(
          true,
          "Error Occurred During Authentication, Please try again"
        );
      });
  };
  const readProjects = async (id, callback) => {
    dispatch({
      type: SAVING,
    });
    axios
      .get(`${DEV_PRODUCTION}student/projects/${id}`)
      .then((response) => {
        dispatch({
          type: FETCH_PROJECTS_FOR_USER,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        callback(
          true,
          "Error Occurred During Authentication, Please try again"
        );
        dispatch({
          type: SET_SAVING,
        });
      });
  };
  const removeProject = async (data, callback) => {
    axios
      .delete(
        `${DEV_PRODUCTION}student/remove/${data.projectId}/${data.studentId}`
      )
      .then((response) => {
        callback(false, "Project Has been removed");
      })
      .catch((error) => {
        callback(
          true,
          "Error Occurred During Authentication, Please try again"
        );
      });
  };
 /**
 * @param {fun|null} callback - This can be a function or null, used for error detection.
 */

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

  const getProjectsByType = async (callback) => {
    axios
      .get(`${DEV_PRODUCTION}student/chart/projects/projectTypes`)
      .then((response) => {
        dispatch({
          type: FETCH_PROJECTS_BY_TYPE,
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
  const loadActiveEventReport = async (callback) => {
    axios
      .get(`${DEV_PRODUCTION}student/chart/projects/event-report`)
      .then((response) => {
        dispatch({
          type: EVENT_REPORT,
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
  const getCurrentStudentsByEvent = async (callback) => {
    axios
      .get(`${DEV_PRODUCTION}student/chart/projects/event`)
      .then((response) => {
        dispatch({
          type: FETCH_STUDENTS_BY_EVENT,
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
        const { PredefinedStudents, currentStudents } = response.data.data[0];
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

   const updateProfile = async (data,callback) => {
    axios
      .post(`${DEV_PRODUCTION}student/profile`,data)
      .then((response) => {
        if(response.data.type==="data")
        callback(false,"Your Profile Has been Updated");
      else
       callback(false,"Your Privacy has been updated");
      })
      .catch((error) => {
        callback(
          true,
          "Error Occurred During Authentication, Please try again"
        );
      });
  };
   const getCurrentUserData = async (id,callback) => {
     dispatch({
       type: SET_LOAD,
       payload: true,
     });
        axios
          .get(`${DEV_PRODUCTION}student/current/${id}`)
          .then((response) => {
            dispatch({
              type: FETCH_CURRENT_USER,
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

     const isValidCurrentPassword = async (id,data, callback) => {
       axios
         .get(`${DEV_PRODUCTION}student/checkPass/${id}`)
         .then((response) => {
           const { id,password } =
             response.data.data[0];
           if (password == data.currentPassword) {
             callback(
               false
             );
           } else callback(true, "You Provided Incorrect Password, As You Current password.");
         })
         .catch((error) => {
           callback(
             true,
             "Error Occurred During Authentication, Please try again"
           );
         });
     };
     const checkDueDate = async (callback) => {
       axios
         .get(`${DEV_PRODUCTION}events/checkDueDate`)
         .then((response) => {
         
             callback(
               response.data.hasReachedDueDate,
               "You can't register an account this date, Due To Due Date 😀. "
             );
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
        chartProjectsByType: state.chartProjectsByType,
        saving: state.saving,
        STUDENTS_BY_EVENT: state.STUDENTS_BY_EVENT,
        pending: state.pending,
        load: state.load,
        semesters: state.semesters,
        event_report: state.event_report,
        hasError: state.hasError,
        errorMessage: state.errorMessage,
        successMessage: state.successMessage,
        projectTypes: state.projectTypes,
        activeEvent: state.activeEvent,
        currentUserData: state.currentUserData,
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
        getCurrentUserData,
        checkStudentRange,
        updateProfile,
        isValidCurrentPassword,
        getProjectsByType,
        getCurrentStudentsByEvent,
        loadActiveEventReport,
        sendMessage,
        checkDueDate,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
