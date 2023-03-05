import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import SidebarMenuItem from './components/SidebarMenu/SidebarMenuItem';
import { Switch, Modal, Spin } from 'antd';
import {
    TvIcon,
    GlobeIcon,
    UserIcon,
    SettingIcon,
    GroupIcon,
    VideoIcon,
    ShoppingIcon,
    LogoutIcon,
} from '@components/Icons';
import { logout } from '@utils/authen';
import { setUser } from '@slices/userSlice';
import { useAppDispatch } from 'redux/hooks';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [logouting, setLogouting] = useState<boolean>(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const onLogout = useCallback(async () => {
        setLogouting(true);
        const timer = setTimeout(async () => {
            await logout();
            dispatch(setUser(null));
            navigate(ROUTE_PATH.SIGN_IN);
        }, 1000);

        return () => {
            clearTimeout(timer);
            setLogouting(false);
        };
    }, [dispatch, navigate]);

    return (
        <div className={cx('wrapper')}>
            <SidebarMenu heading="New Feeds">
                <>
                    <SidebarMenuItem
                        icon={<TvIcon width="2rem" height="2rem" />}
                        title="Newsfeed"
                        onClick={() => navigate(ROUTE_PATH.HOME)}
                    />
                    <SidebarMenuItem icon={<GlobeIcon width="2rem" height="2rem" />} title="Stories" />
                    <SidebarMenuItem icon={<GroupIcon width="2rem" height="2rem" />} title="Groups" />
                    <SidebarMenuItem
                        icon={<UserIcon width="2rem" height="2rem" />}
                        title="User Profile"
                        onClick={() => navigate(ROUTE_PATH.PROFILE)}
                    />
                </>
            </SidebarMenu>
            <SidebarMenu heading="Media">
                <>
                    <SidebarMenuItem icon={<VideoIcon width="2rem" height="2rem" />} title="Live" />
                    <SidebarMenuItem icon={<ShoppingIcon width="2rem" height="2rem" />} title="Shopping" />
                </>
            </SidebarMenu>
            <SidebarMenu heading="General">
                <>
                    <SidebarMenuItem icon={<Switch size="small" />} title="Dark mode" />
                    <SidebarMenuItem icon={<SettingIcon width="2rem" height="2rem" />} title="Settings" />
                    <SidebarMenuItem
                        icon={<LogoutIcon width="2rem" height="2rem" />}
                        title="Logout"
                        onClick={showModal}
                    />
                </>
            </SidebarMenu>
            <Modal
                title="You are sure want to logout?"
                width={400}
                open={open}
                onOk={onLogout}
                onCancel={hideModal}
                okText="Confirm"
                cancelText="Cancel"
                confirmLoading={logouting}
            >
                <p>Enter your email and password to login again</p>
            </Modal>
        </div>
    );
};

export default Sidebar;
