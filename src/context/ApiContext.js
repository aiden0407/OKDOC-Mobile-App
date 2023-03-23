import { createContext, useReducer } from "react";

//initial state
const initialState = {
  accountData: {
    loginStatus: true,
    name: '이준범',
    phoneNumber: '+82 10-2427-8139'
  },
  profileData: [
    {
      name: '이준범',
      relationship: '본인',
      birth: '19980407',
      gender: 'male',
      height: '170.0',
      weight: '68.0',
      dringkingStatus: 'none',
      smokingStatus: true,
      medicalHistory: '',
      medicalHistoryFamily: '고혈압',
      medication: '',
      allergicReaction: '',
      etcConsideration: '없음'
    }
  ],
};

//create context
const ApiContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {

    case 'LOGIN':
      return {
        ...state,
        accountData: {
          ...state.accountData,
          loginStatus: true,
          name: action.name,
          phoneNumber: action.phoneNumber,
        },
      };

    case 'LOGOUT':
      return {
        ...state,
        accountData: {
          ...state.accountData,
          loginStatus: false,
        },
      };

    default:
      return state;
  }
};

//create Provider component
const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  //console.log(`ApiContext: ${JSON.stringify(state)}`);
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };