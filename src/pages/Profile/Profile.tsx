import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useAppSelector } from 'redux/hooks';
import { NavigateToSignIn } from '@constants/routers';
import ProfileInfo from '@pages/Profile/components/ProfileInfo/ProfileInfo';
import About from '@pages/Profile/components/About/About';

const cx = classNames.bind(styles);

const ProfilePage: FC = () => {
    const { user } = useAppSelector((state) => state.user);
    const { tabActive } = useAppSelector((state) => state.tab);

    return (
        <>
            {user ? (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <ProfileInfo />
                        {tabActive === 1 && <About />}
                    </div>
                </div>
            ) : (
                <NavigateToSignIn />
            )}
        </>
    );
};

export default ProfilePage;
