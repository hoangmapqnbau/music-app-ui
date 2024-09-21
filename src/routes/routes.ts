import { IRoutes } from './routes.model';

import LoginPage from '../pages/Login/Login';

const publicRoutes: IRoutes[] = [
  {
    path: '/',
    element: LoginPage,
  },
];

export { publicRoutes };
