import { IRoutes } from './routes.model';

import LoginPage from '../pages/Login/Login';

const publicRoutes: IRoutes[] = [
  {
    path: '/login',
    element: LoginPage,
  },
  {
    path: '/',
    element: LoginPage,
  },
];

export { publicRoutes };
