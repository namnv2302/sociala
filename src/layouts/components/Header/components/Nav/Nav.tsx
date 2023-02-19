import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
import { HomeIcon, LogoIcon, VideoIcon, GroupIcon, ShoppingIcon } from '@components/Icons';

const cx = classNames.bind(styles);

const Nav = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon', 'active')}>
                <HomeIcon />
            </div>
            <div className={cx('icon')}>
                <LogoIcon />
            </div>
            <div className={cx('icon')}>
                <VideoIcon />
            </div>
            <div className={cx('icon')}>
                <GroupIcon />
            </div>
            <div className={cx('icon')}>
                <ShoppingIcon />
            </div>
        </div>
    );
};

export default Nav;
