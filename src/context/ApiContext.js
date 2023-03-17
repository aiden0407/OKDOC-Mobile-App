import { createContext, useReducer } from "react";

//initial state
const initialState = {
  userData: {
    loginStatus: true,
    name: '이준범',
  },
  profileData: [
    {
      name: '이준범',
      relationship: '본인',
      birth: '19980407',
      gender: 'male',
      height: '170.0',
      weight: '68.0',
      // height: undefined,
      // weight: undefined,
      dringkingStatus: 'none',
      smokingStatus: true,
      medicalHistory: '없음',
      medicalHistoryFamily: '고혈압',
      medication: '없음',
      allergyStatus: false,
      allergyDetail: '',
      allergicReaction: {
        sneeze: false,
        tear: false,
        itchy: false,
        rash: false,
        etc: false,
      },
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
        userData: {
          loginStatus: true,
          name: action.userName,
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