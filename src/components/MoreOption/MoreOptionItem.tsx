import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './MoreOption.module.scss';

const cx = classNames.bind(styles);

type MoreOptionItemProps = {
    title: string;
    icon?: JSX.Element;
    des?: string;
    onClick?: () => void;
};

const MoreOptionItem = ({ title, des, icon, onClick }: MoreOptionItemProps) => {
    return (
        <div className={cx('item')} onClick={onClick}>
            <span className={cx('icon')}>{icon}</span>
            <div className={cx('text')}>
                <span className={cx('title')}>{title}</span>
                <span className={cx('desc')}>{des}</span>
            </div>
        </div>
    );
};

export default memo(MoreOptionItem);
