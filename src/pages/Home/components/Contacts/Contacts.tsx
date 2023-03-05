import { useMemo } from 'react';
import { Divider } from 'antd';
import { v4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';
import ContactItem from '@pages/Home/components/Contacts/ContactItem';
import { useFirestore } from '@hooks/useFirestore';
import { UserType } from '@slices/userSlice';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const Contacts = () => {
    const { user } = useAppSelector((state) => state.user);
    const condition = useMemo(() => {
        if (user) {
            return {
                fieldName: 'uid',
                operator: '!=',
                compareValue: `${user.uid}`,
            };
        }
    }, [user]);
    const contactList = useFirestore('users', 'uid', condition);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h4 className={cx('heading')}>Contacts</h4>
                <span className={cx('see-all')}>See all</span>
            </header>
            <Divider />
            <div className={cx('content')}>
                {contactList && contactList.map((contact: UserType) => <ContactItem key={v4()} contact={contact} />)}
            </div>
        </div>
    );
};

export default Contacts;
