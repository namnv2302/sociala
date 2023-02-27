import { Divider } from 'antd';
import classNames from 'classnames/bind';
import styles from './FriendRequest.module.scss';
import FriendRequestItem from '@components/FriendRequest/FriendRequestItem';

const cx = classNames.bind(styles);

const FriendRequest = () => {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h4 className={cx('heading')}>Friend request</h4>
                <span className={cx('see-all')}>See all</span>
            </header>
            <Divider />
            <div className={cx('content')}>
                <FriendRequestItem />
                <FriendRequestItem />
            </div>
        </div>
    );
};
export default FriendRequest;
