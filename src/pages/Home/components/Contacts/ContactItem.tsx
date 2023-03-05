import { useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';
import { UserType } from '@slices/userSlice';
import images from '@assets/images';
import { useAppDispatch } from 'redux/hooks';
import { setIsOpen, setUidChoosed } from '@slices/chatboxSlice';

const cx = classNames.bind(styles);

type ContactItemType = {
    contact: UserType;
};

const ContactItem = ({ contact }: ContactItemType) => {
    const dispatch = useAppDispatch();

    const handleOpenChatbox = useCallback(() => {
        dispatch(setIsOpen(true));
        dispatch(setUidChoosed(contact.uid));
    }, [dispatch, contact.uid]);

    return (
        <div className={cx('contact-item')} onClick={handleOpenChatbox}>
            <div className={cx('avatar')}>
                <img src={contact.photoURL || images.defaultAvatar} alt="" />
            </div>
            <div className={cx('info')}>
                <p className={cx('name')}>{contact.displayName}</p>
            </div>
        </div>
    );
};

export default ContactItem;
