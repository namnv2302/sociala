import { Divider, Input } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';

const cx = classNames.bind(styles);

const ChatBox = () => {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('avatar')}>
                    <img
                        src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/271238764_1082336779007513_612547518841305846_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=RvqYo1qsh8kAX9G9amN&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCZCJkW0zHX6r5WLGrWYjX6PqNtgXp61Zyd79fEIcu7Mg&oe=63FF1A77"
                        alt=""
                    />
                </div>
                <div className={cx('action')}>
                    <p className={cx('name')}>Nguyễn Ngọc Linh</p>
                    <span className={cx('status')}>
                        <span className={cx('dot')}></span>
                        <span className={cx('online')}>Available</span>
                    </span>
                </div>
                <CloseOutlined className={cx('close-icon')} />
            </header>
            <Divider />
            <div className={cx('body')}>
                <div className={cx('message-fri')}>
                    <p className={cx('title')}>Hi, how can I help you?</p>
                    <span className={cx('timer')}>Mon 10:20am</span>
                </div>
                <div className={cx('message')}>
                    <p className={cx('title')}>
                        I want those files for you. I want you to send 1 PDF and 1 image file.
                    </p>
                    <span className={cx('timer')}>Mon 10:21am</span>
                </div>
            </div>
            <Divider />
            <div className={cx('footer')}>
                <div>
                    <Input
                        className={cx('input')}
                        placeholder="Start typing.."
                        suffix={<SendOutlined className={cx('send-icon')} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
