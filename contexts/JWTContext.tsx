import { Context, createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

interface IState {
  isAuthenticated: boolean;
  user: any;
  isInitialized: boolean;
}

enum EActionTypes {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
}

interface IAction {
  type: EActionTypes;
  payload: {
    user ?: any;
    isAuthenticated : boolean;
  };
}

interface IHandlers {
  INITIALIZE: (state: IState, action: IAction) => IState;
  LOGIN: (state: IState, action: IAction) => IState;
  LOGOUT: (state: IState, action: IAction) => IState;
  REGISTER: (state: IState, action: IAction) => IState;
}

const initialState: IState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext: Context<any> = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

const handlers:IHandlers = {
  INITIALIZE: (state: IState, action: IAction) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: IState, action: IAction) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state:IState) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: IState, action: IAction ) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: IState, action: IAction) => (handlers[action.type] ? handlers[action.type](state, action) : state);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: EActionTypes.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: EActionTypes.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: EActionTypes.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/account/login', {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: EActionTypes.LOGIN,
      payload: {
        user,
        isAuthenticated: true,
      },
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: EActionTypes.REGISTER,
      payload: {
        user,
        isAuthenticated: true,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: EActionTypes.LOGOUT, payload: {isAuthenticated: false} });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
