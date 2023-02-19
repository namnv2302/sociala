import classNames from 'classnames/bind';
import styles from './BackgroudEffect.module.scss';
import { LogoIcon } from '@components/Icons';

const cx = classNames.bind(styles);

const BackgroudEffect = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <LogoIcon className={cx('icon')} width="4rem" height="4rem" />
                <h3 className={cx('title')}>Sociala</h3>
            </div>
        </div>
    );
};

export default BackgroudEffect;
