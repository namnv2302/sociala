import { useMemo, useCallback } from 'react';
import { Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { MoreIcon } from '@components/Icons';
import About from '@pages/Profile/components/About/About';
import { setTabActive } from '@slices/tabSlice';

const cx = classNames.bind(styles);

const ProfileInfo = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);
    const { tabActive } = useAppSelector((state) => state.tab);

    const tabsList = useMemo(() => {
        return [
            {
                key: 1,
                title: 'About',
            },
            {
                key: 2,
                title: 'Photos',
            },
            {
                key: 3,
                title: 'Video',
            },
            {
                key: 4,
                title: 'Group',
            },
        ];
    }, []);

    const changeTab = useCallback(
        (key: number) => {
            dispatch(setTabActive(key));
        },
        [dispatch],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cover')}>
                <div
                    className={cx('cover-img')}
                    style={{ backgroundImage: `url(http://uitheme.net/sociala/images/bb-9.jpg)` }}
                ></div>
            </div>
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <div className={cx('social-count')}>
                        <h5 className={cx('count')}>23</h5>
                        <span className={cx('title')}>Posts</span>
                    </div>
                    <div className={cx('social-count')}>
                        <h5 className={cx('count')}>12.3K</h5>
                        <span className={cx('title')}>Followers</span>
                    </div>
                    <div className={cx('social-count')}>
                        <h5 className={cx('count')}>10</h5>
                        <span className={cx('title')}>Follow</span>
                    </div>
                </div>
                <div className={cx('center')}>
                    <div className={cx('avatar')}>
                        <img src={user?.photoURL} alt="" />
                    </div>
                    <div className={cx('name')}>
                        <h4 className={cx('display-name')}>{user?.displayName}</h4>
                        <p className={cx('alias')}>{'@surfiyazakir22'}</p>
                    </div>
                </div>
                <div className={cx('right')}>
                    {/* <Button className={cx('add-fri')}>Add friend</Button> */}
                    <span className={cx('icon')}>
                        <MailOutlined style={{ fontSize: '22px' }} />
                    </span>
                    <span className={cx('icon')}>
                        <MoreIcon />
                    </span>
                </div>
            </div>
            <Divider />
            <div className={cx('tabs')}>
                <ul className={cx('list')}>
                    {tabsList.map((tab) => (
                        <li
                            key={tab.key}
                            className={cx('item', { active: tab.key === tabActive })}
                            onClick={() => changeTab(tab.key)}
                        >
                            {tab.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileInfo;
