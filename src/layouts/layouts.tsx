import { ReactNode } from 'react';

import HeaderBar from './HeaderBar/header';
import SideBar from './SideBar/sidebar';

import bcx from '../utils/bindingClassNames';
import Styles from './layout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}
const cls = bcx(Styles);

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={cls('main-wrapper')}>
      <div id={cls('content')}>
        <SideBar />
        <main>
          <HeaderBar />
          <div className={cls('main-content')}>{children}</div>
          <footer></footer>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
