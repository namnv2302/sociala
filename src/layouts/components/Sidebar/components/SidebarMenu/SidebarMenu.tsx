import classNames from 'classnames/bind';
import styles from './SidebarMenu.module.scss';

const cx = classNames.bind(styles);

type SidebarMenuProps = {
    heading?: string;
    children: JSX.Element;
};

const SidebarMenu = ({ heading, children }: SidebarMenuProps) => {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('heading')}>{heading}</h4>
            {children}
        </div>
    );
};

export default SidebarMenu;
