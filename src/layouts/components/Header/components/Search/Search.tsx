import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Input
                    className={cx('input')}
                    placeholder="Start typing to search.."
                    prefix={<SearchOutlined className={cx('search-icon')} />}
                />
            </div>
        </div>
    );
};

export default Search;
