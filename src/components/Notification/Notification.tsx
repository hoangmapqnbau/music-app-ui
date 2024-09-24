import { CSSProperties, FC } from 'react';
import bcx from '../../utils/bindingClassNames';

import Styles from './Notification.module.css';
const cls = bcx(Styles);

export type NotificationProps = {
  type?: 'info' | 'success' | 'error';
  text?: string;
  style?: CSSProperties;
};

const NotificationToast: FC<NotificationProps> = (props) => {
  const { type = 'info', text, style } = props;
  return (
    <>
      <div style={style} className={cls(['notification-wrapper', type])}>
        <div className={cls('notification-content')}>
          <i className={cls(['type-icon', type])}></i>
          <p className={cls('text-content')}>{text}</p>
          <i className={cls(['remove-icon'])}></i>
        </div>
      </div>
    </>
  );
};

export default NotificationToast;
