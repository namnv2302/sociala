import { FC, useEffect, useState } from 'react';
import { Space, Layout } from 'antd';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '@layouts/components/Header/Header';
import Sidebar from '@layouts/components/Sidebar/Sidebar';
import BackgroudEffect from '@components/BackgroudEffect';

const cx = classNames.bind(styles);

type DefaultLayoutProps = {
    children: JSX.Element;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <BackgroudEffect />
            ) : (
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
            )}
        </>
    );
};

export default DefaultLayout;
