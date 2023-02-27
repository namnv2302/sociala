import { useMemo } from 'react';
import { v4 } from 'uuid';
import classNames from 'classnames/bind';
import styles from './HomePost.module.scss';
import HomePostItem from './HomePostItem';
import { useFirestore } from '@hooks/useFirestore';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

export interface IPostItem {
    id: string;
    uid: string;
    author: {
        uid: string;
        avatar: string;
        name: string;
    };
    liked: string[];
    comment: number;
    shared: number;
    imageUrl: string;
    status: string;
    timestamp: Date;
    createdAt: Date;
}

const HomePost = () => {
    const { user } = useAppSelector((state) => state.user);

    const homePostCondition = useMemo(() => {
        if (user) {
            return {
                fieldName: 'createdBy',
                operator: '==',
                compareValue: `${user.uid}`,
            };
        }
    }, [user]);
    const homePostList = useFirestore('post', homePostCondition);

    return (
        <div className={cx('wrapper')}>
            {homePostList.length > 0 ? (
                homePostList.map((post: IPostItem) => <HomePostItem key={v4()} post={post} />)
            ) : (
                <div className={cx('empty-data')}>
                    <h3 className={cx('des')}>Không có bài viết</h3>
                </div>
            )}
        </div>
    );
};

export default HomePost;
