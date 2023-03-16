import { createContext, useReducer } from "react";

//initial state
const initialState = {
  bottomTabMenu: 'HOME',
  isHomeShorcutUsed: false,
  telemedicineReservationStatus: {
    category: undefined,
    item: undefined,
    date: undefined,
    time: undefined,
    doctorId: undefined,
    profileId: undefined,
  },
};

//create context
const AppContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {

    case 'BOTTOM_TAP_NAVIGATION':
      return {
        ...state,
        bottomTabMenu: action.menu,
      };

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
          doctorId: action.doctorId,
        },
      };

    case 'TELEMEDICINE_RESERVATION_PROFILE':
      return {
        ...state,
        telemedicineReservationStatus: {
          ...state.telemedicineReservationStatus,
          profileId: action.profileId,
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