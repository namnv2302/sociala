import { Divider } from 'antd';
import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';
import ContactItem from '@pages/Home/components/Contacts/ContactItem';

const cx = classNames.bind(styles);

const Contacts = () => {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h4 className={cx('heading')}>Contacts</h4>
                <span className={cx('see-all')}>See all</span>
            </header>
            <Divider />
            <div className={cx('content')}>
                <ContactItem />
                <ContactItem />
                <ContactItem />
                <ContactItem />
            </div>
        </div>
    );
};

export default Contacts;
