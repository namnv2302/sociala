import { Row, Col, Divider } from 'antd';
import { LockOutlined, EnvironmentOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './About.module.scss';
import MoreOption from '@components/MoreOption';
import MoreOptionItem from '@components/MoreOption/MoreOptionItem';
import CreatePost from '@components/CreatePost';
import HomePost from '@components/HomePost';

const cx = classNames.bind(styles);

const About = () => {
    return (
        <div className={cx('wrapper')}>
            <Row gutter={16}>
                <Col span={8}>
                    <div className={cx('info')}>
                        <div className={cx('head')}>
                            <h2 className={cx('heading')}>About</h2>
                            <p className={cx('description')}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at
                                commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac
                                massa sed rhoncus
                            </p>
                        </div>
                        <Divider />
                        <div className={cx('footer')}>
                            <MoreOption>
                                <>
                                    <MoreOptionItem
                                        icon={<LockOutlined style={{ fontSize: '2.2rem' }} />}
                                        title="Private"
                                        des="What's up, how are you?"
                                        type="large"
                                    />
                                    <MoreOptionItem
                                        icon={<EnvironmentOutlined style={{ fontSize: '2.2rem' }} />}
                                        title="Flodia, Austia"
                                        type="large"
                                    />
                                </>
                            </MoreOption>
                        </div>
                    </div>
                </Col>
                <Col span={16}>
                    <CreatePost />
                    <HomePost />
                </Col>
            </Row>
        </div>
    );
};

export default About;
