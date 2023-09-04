import classNames from 'classnames/bind';
import styles from './FriendRequest.module.scss';
import images from '@assets/images';

const cx = classNames.bind(styles);

const FriendRequestItem = () => {
    return (
        <div className={cx('friend-item')}>
            <div className={cx('friend-info')}>
                <div className={cx('avatar')}>
                    <img src={images.avatar} alt="" />
                </div>
                <div className={cx('desc')}>
                    <h4 className={cx('name')}>Nguyễn Trà My</h4>
                    <p className={cx('friend-mutual')}>10 mutual friends</p>
                </div>
            </div>
            <div className={cx('actions')}>
                <div className={cx('confirm')}>Confirm</div>
                <div className={cx('delete')}>Delete</div>
            </div>
        </div>
    );
};

export default FriendRequestItem;
