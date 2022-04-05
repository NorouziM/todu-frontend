import jwtDecode from 'jwt-decode';
//
import axiosInstance from '@utils/axios';

// ----------------------------------------------------------------------

interface IDecodedToken {
  id: string;
  iat: Number;
  exp: Number;
}

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: IDecodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = async (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('jwt_token', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('jwt_token');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
