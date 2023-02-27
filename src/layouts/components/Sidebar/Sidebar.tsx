import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import SidebarMenuItem from './components/SidebarMenu/SidebarMenuItem';
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

    const onLogout = useCallback(async () => {
        const timer = setTimeout(async () => {
            await logout();
            dispatch(setUser(null));
            navigate(ROUTE_PATH.SIGN_IN);
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch, navigate]);

    return (
        <div className={cx('wrapper')}>
            <SidebarMenu heading="New Feeds">
                <>
                    <SidebarMenuItem icon={<TvIcon width="2rem" height="2rem" />} title="Newsfeed" />
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
                    <SidebarMenuItem icon={<SettingIcon width="2rem" height="2rem" />} title="Settings" />
                    <SidebarMenuItem
                        icon={<LogoutIcon width="2rem" height="2rem" />}
                        title="Logout"
                        onClick={onLogout}
                    />
                </>
            </SidebarMenu>
        </div>
    );
};

export default Sidebar;
