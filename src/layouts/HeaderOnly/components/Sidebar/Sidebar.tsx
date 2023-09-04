import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarMenu from '@layouts/components/Sidebar/components/SidebarMenu/SidebarMenu';
import SidebarMenuItem from '@layouts/components/Sidebar/components/SidebarMenu/SidebarMenuItem';
import { HomeIcon, KeyIcon } from '@components/Icons';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <SidebarMenu heading="Settings">
                <>
                    <SidebarMenuItem icon={<HomeIcon width="2rem" height="2rem" />} title="Account" />
                    <SidebarMenuItem icon={<KeyIcon width="2rem" height="2rem" />} title="Password" />
                </>
            </SidebarMenu>
        </div>
    );
};

export default Sidebar;
