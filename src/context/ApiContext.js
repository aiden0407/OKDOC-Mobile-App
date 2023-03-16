import { createContext, useReducer } from "react";

//initial state
const initialState = {
  userData: {
    loginStatus: false,
    name: undefined,
  },
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
  console.log(`ApiContext: ${JSON.stringify(state)}`);
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };