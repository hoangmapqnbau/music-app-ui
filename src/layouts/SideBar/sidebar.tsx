import { Link, NavLink } from 'react-router-dom';

import bcx from '../../utils/bindingClassNames';
import Styles from './sidebar.module.css';
import { mainItems } from './SideNavConfig';

const cls = bcx(Styles);

const SideBar = () => {
  return (
    <aside>
      <div className={cls('side-nav')}>
        <div className={cls('brand')}>
          <span className={cls('circle')}></span>
          <Link to={'/'} className={cls('brand-text')}>
            Chordify Music
          </Link>
        </div>
        <div className={cls('scroll-visible')}>
          <div className={cls('main-nav')}>
            {mainItems.map((item) => {
              const { id, link, label, icon: Icon, separate, title } = item;
              if (separate) return <div key={id} className={cls('separate')}></div>;
              if (title) return <p key={id} className={cls('title-text')}>{title}</p>;

              return (
                <div key={id} className={cls('side-nav-item')}>
                  <NavLink
                    to={link}
                    className={({ isActive }) => (isActive ? cls('item-label', 'active') : cls('item-label'))}
                  >
                    <div className={cls('item-icon')}>
                      <Icon sx={{ fontSize: 30, color: 'hsl(215, 15%, 75%)' }} />
                    </div>
                    <div className={cls('label-text')}>{label}</div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
