import classNames from 'classnames/bind';
import styles from './FriendRequest.module.scss';

const cx = classNames.bind(styles);

const FriendRequestItem = () => {
    return (
        <div className={cx('friend-item')}>
            <div className={cx('friend-info')}>
                <div className={cx('avatar')}>
                    <img
                        src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/313328338_1269375336970322_8342016683138990462_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=zn-FUhaDRGoAX-w1bp0&_nc_ht=scontent.fhan14-2.fna&oh=00_AfDKarmgkfvSnO4zW8HuYgVkka2e2I0wdowp8sDgpMDIfA&oe=63FF6D2B"
                        alt=""
                    />
                </div>
                <div className={cx('desc')}>
                    <h4 className={cx('name')}>Nguyễn Ngọc Linh</h4>
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
