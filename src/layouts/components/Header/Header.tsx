import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { LogoIcon } from '@components/Icons';
import ROUTE_PATH from '@constants/routes';
import Search from '@layouts/components/Header/components/Search/Search';
// import Nav from '@layouts/components/Header/components/Nav/Nav';
import UserPanel from '@layouts/components/Header/components/UserPanel/UserPanel';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('logo')}>
                    <Link className={cx('link')} to={ROUTE_PATH.HOME}>
                        <LogoIcon className={cx('icon')} width="3.6rem" height="3.6rem" />
                        <h3 className={cx('title')}>Sociala.</h3>
                    </Link>
                </div>
                <div className={cx('search')}>
                    <Search />
                </div>
                {/* <div className={cx('nav')}>
                    <Nav />
                </div> */}
            </div>
            <div className={cx('user-panel')}>
                <UserPanel />
            </div>
        </div>
    );
};

export default Header;
