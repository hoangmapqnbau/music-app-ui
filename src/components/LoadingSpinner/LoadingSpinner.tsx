import bcx from '../../utils/bindingClassNames';

import Styles from './LoadingSpinner.module.css';
const cls = bcx(Styles);

const Spinner = () => <span className={cls('loader')}></span>;

export default Spinner;
