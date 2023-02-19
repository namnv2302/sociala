import classNames from 'classnames/bind';
import styles from './SidebarMenu.module.scss';

const cx = classNames.bind(styles);

type SidebarMenuItemProps = {
    icon?: JSX.Element;
    title: string;
    logout?: () => void;
};

const SidebarMenuItem = ({ icon, title, logout }: SidebarMenuItemProps) => {
    return (
        <div className={cx('item')} onClick={logout}>
            <div className={cx('icon')}>{icon}</div>
            <span className={cx('title')}>{title}</span>
        </div>
    );
};

export default SidebarMenuItem;
