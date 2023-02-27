import classNames from 'classnames/bind';
import styles from './SidebarMenu.module.scss';

const cx = classNames.bind(styles);

type SidebarMenuItemProps = {
    icon?: JSX.Element;
    title: string;
    onClick?: () => void;
};

const SidebarMenuItem = ({ icon, title, onClick }: SidebarMenuItemProps) => {
    return (
        <div className={cx('item')} onClick={onClick}>
            <div className={cx('icon')}>{icon}</div>
            <span className={cx('title')}>{title}</span>
        </div>
    );
};

export default SidebarMenuItem;
