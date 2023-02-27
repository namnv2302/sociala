import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './MoreOption.module.scss';

const cx = classNames.bind(styles);

type MoreOptionItemProps = {
    title: string;
    icon?: JSX.Element;
    des?: string;
    type?: string;
    onClick?: () => void;
};

const MoreOptionItem = ({ title, des, icon, type = '', onClick }: MoreOptionItemProps) => {
    return (
        <div className={cx('item', { [type]: type })} onClick={onClick}>
            <span className={cx('icon')}>{icon}</span>
            <div className={cx('text')}>
                <span className={cx('title')}>{title}</span>
                <span className={cx('desc')}>{des}</span>
            </div>
        </div>
    );
};

export default memo(MoreOptionItem);
