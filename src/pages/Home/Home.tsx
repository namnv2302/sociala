import { FC } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Stories from '@components/Stories';
import CreatePost from '@components/CreatePost';
import HomePost from '@components/HomePost';
import { useAppSelector } from 'redux/hooks';
import { NavigateToSignIn } from '@constants/routers';

const cx = classNames.bind(styles);

const HomePage: FC = () => {
    const { user } = useAppSelector((state) => state.user);

    return (
        <>
            {user ? (
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <Row>
                            <Col span={16}>
                                <Stories />
                                <CreatePost />
                                <HomePost />
                            </Col>
                            <Col span={8}></Col>
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
