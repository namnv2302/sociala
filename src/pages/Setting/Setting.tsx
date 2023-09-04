import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Setting.module.scss';

const cx = classNames.bind(styles);

const SettingPage: FC = () => {
    return (
        <div className={cx('wrapper')}>
            <h2>Setting</h2>
        </div>
    );
};

export default SettingPage;
