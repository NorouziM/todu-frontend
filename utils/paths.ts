// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const AFTER_LOGIN_ROUTE = path(ROOTS_DASHBOARD, '/');

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  overview: path(ROOTS_DASHBOARD, '/overview'),
  collections: '/collections',
};
