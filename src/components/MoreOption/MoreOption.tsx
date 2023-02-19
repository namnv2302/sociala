import classNames from 'classnames/bind';
import styles from './MoreOption.module.scss';

const cx = classNames.bind(styles);

type MoreOptionProps = {
    children: JSX.Element;
};

const MoreOption = ({ children }: MoreOptionProps) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default MoreOption;
