import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Divider, Input } from 'antd';
import moment from 'moment';
import { v4 } from 'uuid';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setIsOpen } from '@slices/chatboxSlice';
import { getADocument, addDocument, updateDocument } from '@helpers/manageData';
import images from '@assets/images';
import { useFirestore } from '@hooks/useFirestore';

const cx = classNames.bind(styles);

const ChatBox = () => {
    const dispatch = useAppDispatch();
    const { isOpen, uidChoosed } = useAppSelector((state) => state.chatbox);
    const { user } = useAppSelector((state) => state.user);
    const wrapperElement = useRef<HTMLDivElement>(null);
    const [contact, setContact] = useState<any>();
    const [messageValue, setMessageValue] = useState<string>('');

    const messageDataCondition = useMemo(() => {
        if (user) {
            const combindId = user?.uid > uidChoosed ? `${user?.uid}${uidChoosed}` : `${uidChoosed}${user?.uid}`;
            return {
                fieldName: 'id',
                operator: '==',
                compareValue: `${combindId}`,
            };
        }
    }, [user, uidChoosed]);
    const messageData: any = useFirestore('messages', 'timestamp', messageDataCondition);

    useEffect(() => {
        wrapperElement.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messageData]);

    useEffect(() => {
        const getData = async () => {
            const result = await getADocument('users', `${uidChoosed}`);
            if (result) {
                setContact(result);
            }
        };
        getData();
    }, [uidChoosed]);

    const handleTyping: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setMessageValue(e.target.value);
    }, []);

    const handleSend = useCallback(async () => {
        if (messageValue.trim()) {
            const combindId =
                user && user?.uid > uidChoosed ? `${user?.uid}${uidChoosed}` : `${uidChoosed}${user?.uid}`;
            const messaged = await getADocument('messages', `${combindId}`);
            if (messaged) {
                await updateDocument('messages', `${combindId}`, {
                    message: [
                        ...messaged.message,
                        { text: messageValue, sendBy: user?.uid, sendAt: moment().format() },
                    ],
                });
            } else {
                await addDocument('messages', {
                    id: combindId,
                    message: [{ text: messageValue, sendBy: user?.uid, sendAt: moment().format() }],
                });
            }
            setMessageValue('');
        }
    }, [uidChoosed, user, messageValue]);

    return (
        <div ref={wrapperElement} className={cx('wrapper', { open: isOpen })}>
            <header className={cx('header')}>
                <div className={cx('avatar')}>
                    <img src={contact && contact.photoURL ? contact.photoURL : images.defaultAvatar} alt="" />
                </div>
                <div className={cx('action')}>
                    <p className={cx('name')}>{contact && contact.displayName}</p>
                    <span className={cx('status')}>
                        <span className={cx('dot')}></span>
                        <span className={cx('online')}>Available</span>
                    </span>
                </div>
                <CloseOutlined className={cx('close-icon')} onClick={() => dispatch(setIsOpen(false))} />
            </header>
            <Divider />
            <div className={cx('body')}>
                {messageData &&
                    messageData[0] &&
                    messageData[0].message.map((message: any) => {
                        if (message.sendBy === uidChoosed) {
                            return (
                                <div key={v4()} className={cx('message-fri')}>
                                    <p className={cx('title')}>{message.text}</p>
                                    <span className={cx('timer')}>{moment(message.sendAt).calendar()}</span>
                                </div>
                            );
                        } else {
                            return (
                                <div key={v4()} className={cx('message')}>
                                    <p className={cx('title')}>{message.text}</p>
                                    <span className={cx('timer')}>{moment(message.sendAt).calendar()}</span>
                                </div>
                            );
                        }
                    })}
            </div>
            <Divider />
            <div className={cx('footer')}>
                <div>
                    <Input
                        className={cx('input')}
                        value={messageValue}
                        placeholder="Start typing.."
                        suffix={<SendOutlined className={cx('send-icon')} onClick={handleSend} />}
                        onChange={handleTyping}
                        onPressEnter={handleSend}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
