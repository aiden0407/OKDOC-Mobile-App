import { createContext, useReducer } from "react";

//initial state
const initialState = {
  appStatus: {
    usedHomeShortcut: false,
  },
  userData: {
    loginStatus: false,
    name: undefined,
  },
  telemedicineReservationStatus: {
    category: undefined,
    item: undefined,
    doctorInfo: undefined,
  },
};

//create context
const AppContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: {
          loginStatus: true,
          name: action.userName,
        },
      };
    case 'SHORTCUT':
      return {
        ...state,
        appStatus: {
          ...state.appStatus,
          usedHomeShortcut: true,
        },
      };
     case 'DELETE_SHORTCUT':
      return {
        ...state,
        appStatus: {
          ...state.appStatus,
          usedHomeShortcut: false,
        },
      };
    case 'TELEMEDICINE_RESERVATION_CATEGORY':
      return {
        ...state,
        telemedicineReservationStatus: {
          ...state.telemedicineReservationStatus,
          category: action.category,
          item: action.item,
        },
      };
    case 'TELEMEDICINE_RESERVATION_DOCTOR':
      return {
        ...state,
        telemedicineReservationStatus: {
          ...state.telemedicineReservationStatus,
          doctorInfo: action.doctorInfo,
        },
      };
    default:
      return state;
  }
};

//create Provider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(state);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };