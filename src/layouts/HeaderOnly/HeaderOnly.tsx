import { FC } from 'react';
import { Space, Layout } from 'antd';
import classNames from 'classnames/bind';
import Header from '@layouts/components/Header/Header';
import styles from './HeaderOnly.module.scss';
import Sidebar from './components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

type HeaderOnlyProps = {
    children: JSX.Element;
};

const HeaderOnly: FC<HeaderOnlyProps> = ({ children }) => {
    return (
        <Space className={cx('wrapper')} direction="vertical" style={{ width: '100%' }}>
            <Layout>
                <Layout.Header className={cx('header')}>
                    <Header />
                </Layout.Header>
                <Layout>
                    <Layout.Sider className={cx('sidebar')}>
                        <Sidebar />
                    </Layout.Sider>
                    <Layout.Content className={cx('content')}>{children}</Layout.Content>
                </Layout>
            </Layout>
        </Space>
    );
};

export default HeaderOnly;
