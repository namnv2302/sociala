import { FC } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Stories from '@components/Stories';
import CreatePost from '@components/CreatePost';
import HomePost from '@components/HomePost';
import { useAppSelector } from 'redux/hooks';
import { NavigateToSignIn } from '@constants/routers';
import FriendRequest from '@components/FriendRequest';
import Contacts from '@pages/Home/components/Contacts/Contacts';
import ChatBox from '@pages/Home/components/ChatBox/ChatBox';

const cx = classNames.bind(styles);

const HomePage: FC = () => {
    const { user } = useAppSelector((state) => state.user);

    return (
        <>
            {user ? (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <Col span={17} style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className={cx('body')}>
                                    <Stories />
                                    <CreatePost />
                                    <HomePost />
                                </div>
                            </Col>
                            <Col span={7} style={{ display: 'flex', justifyContent: 'end' }}>
                                <div className={cx('right')}>
                                    <FriendRequest />
                                    <Contacts />
                                    <ChatBox />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <NavigateToSignIn />
            )}
        </>
    );
};

export default HomePage;
