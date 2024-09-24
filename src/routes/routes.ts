import { IRoutes } from './routes.model';

import LoginPage from '../pages/Login/Login';
import Home from '../pages/Home/Home';

const publicRoutes: IRoutes[] = [
  {
    path: '/login',
    element: LoginPage,
  },
  {
    path: '/',
    element: Home,
  },
];

export { publicRoutes };
