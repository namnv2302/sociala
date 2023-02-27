import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';

const cx = classNames.bind(styles);

const ContactItem = () => {
    return (
        <div className={cx('contact-item')}>
            <div className={cx('avatar')}>
                <img
                    src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/271238764_1082336779007513_612547518841305846_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=RvqYo1qsh8kAX9G9amN&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCZCJkW0zHX6r5WLGrWYjX6PqNtgXp61Zyd79fEIcu7Mg&oe=63FF1A77"
                    alt=""
                />
            </div>
            <div className={cx('info')}>
                <p className={cx('name')}>Nguyễn Ngọc Linh</p>
            </div>
        </div>
    );
};

export default ContactItem;
