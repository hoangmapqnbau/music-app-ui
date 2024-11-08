import SearchHeader from '../../components/SearchHeader/search-header';
import UserHeader from '../../components/UserHeader/UserHeader';

import bcx from '../../utils/bindingClassNames';
import Styles from './headerbar.module.css';
const cls = bcx(Styles);

const HeaderBar = () => {
  return (
    <header>
      <SearchHeader />
      <UserHeader />
    </header>
  );
};

export default HeaderBar;
