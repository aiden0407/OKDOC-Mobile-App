import { createContext, useReducer } from "react";

//initial state
const initialState = {
  isHomeShorcutUsed: false,
  telemedicineReservationStatus: {
    category: undefined,
    item: undefined,
    date: undefined,
    time: undefined,
    doctorInfo: undefined,
    profileType: undefined,
    profileInfo: undefined,
    symptom: undefined,
  },
};

//create context
const AppContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {

    case 'USE_SHORTCUT':
      return {
        ...state,
        isHomeShorcutUsed: true,
      };

    case 'DELETE_SHORTCUT':
      return {
        ...state,
        isHomeShorcutUsed: false,
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
          date: action.date,
          time: action.time,
          doctorInfo: action.doctorInfo,
        },
      };

    case 'TELEMEDICINE_RESERVATION_PROFILE':
      return {
        ...state,
        telemedicineReservationStatus: {
          ...state.telemedicineReservationStatus,
          profileType: action.profileType,
          profileInfo: action.profileInfo,
        },
      };

    case 'TELEMEDICINE_RESERVATION_SYMPTOM':
      return {
        ...state,
        telemedicineReservationStatus: {
          ...state.telemedicineReservationStatus,
          symptom: action.symptom,
        },
      };

    case 'TELEMEDICINE_RESERVATION_CONFIRMED':
      return {
        ...state,
        telemedicineReservationStatus: {
          category: undefined,
          item: undefined,
          date: undefined,
          time: undefined,
          doctorInfo: undefined,
          profileType: undefined,
          profileInfo: undefined,
          symptom: undefined,
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
  console.log(`AppContext: ${JSON.stringify(state)}`);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };