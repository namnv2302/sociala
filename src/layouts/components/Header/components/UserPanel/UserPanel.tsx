import { Badge } from 'antd';
import classNames from 'classnames/bind';
import styles from './UserPanel.module.scss';
import { NotifiIcon, MessageIcon } from '@components/Icons';
import images from '@assets/images';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const UserPanel = () => {
    const { user } = useAppSelector((state) => state.user);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon')}>
                <Badge count={5}>
                    <NotifiIcon width="2.8rem" height="2.8rem" className={cx('notifi-icon')} />
                </Badge>
            </div>
            <div className={cx('icon')}>
                <MessageIcon width="2.8rem" height="2.8rem" />
            </div>
            <div className={cx('user', { avatar: user?.photoURL })}>
                <img src={user?.photoURL ? user?.photoURL : images.defaultAvatar} alt="" />
            </div>
        </div>
    );
};

export default UserPanel;
