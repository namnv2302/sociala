import { useCallback, useMemo } from 'react';
import moment from 'moment';
import { message, Popover, Popconfirm } from 'antd';
import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './HomePost.module.scss';
import { GlobalIcon } from '@components/Icons';
import { LikeIcon, CommentIcon, SharedIcon, MoreIcon } from '@components/Icons';
import { IPostItem } from './HomePost';
import { updateDocument } from '@helpers/manageData';
import { useAppSelector } from 'redux/hooks';
import MoreOption from '@components/MoreOption';
import MoreOptionItem from '@components/MoreOption/MoreOptionItem';
import { deleteFieldsDoc } from '@helpers/manageData';
import images from '@assets/images';

const cx = classNames.bind(styles);

const HomePostItem = ({ post }: { post: IPostItem }) => {
    const { user } = useAppSelector((state) => state.user);

    const handleLike = useCallback(async () => {
        if (user?.uid && post.liked.includes(user?.uid)) {
            await updateDocument('post', `${post.id}`, {
                liked: post.liked.filter(function (str: any) {
                    return str.indexOf(user?.uid) === -1;
                }),
            });
        } else {
            await updateDocument('post', `${post.id}`, { liked: [user?.uid, ...post.liked] });
        }
    }, [user?.uid, post.id, post.liked]);

    const handleHidePost = useCallback(async () => {
        await deleteFieldsDoc('post', `${post.id}`, 'createdBy');
        message.info('Hided!');
    }, [post.id]);

    return (
        <div className={cx('item')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <img src={post.author.avatar || images.defaultAvatar} alt="" />
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('author')}>{post.author.name}</h4>
                    <div className={cx('timer')}>
                        <span className={cx('time')}>{`${post.createdAt}`}</span>
                        <span className={cx('global-icon')}>
                            <GlobalIcon width="1.2rem" height="1.2rem" />
                        </span>
                    </div>
                </div>
                <Popover
                    placement="bottomRight"
                    content={
                        <MoreOption>
                            <>
                                <Popconfirm
                                    placement="left"
                                    title={'Are you sure to hide this post?'}
                                    description={'Hide the post'}
                                    onConfirm={handleHidePost}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <MoreOptionItem
                                        icon={<ExclamationCircleOutlined style={{ fontSize: '2.2rem' }} />}
                                        title="Hide Post"
                                        des="Save to your saved items"
                                    />
                                </Popconfirm>
                                <MoreOptionItem
                                    icon={<SaveOutlined style={{ fontSize: '2.2rem' }} />}
                                    title="Save Link"
                                    des="Add this to your saved items"
                                    onClick={() => message.info('Chức năng đang phát triển!')}
                                />
                            </>
                        </MoreOption>
                    }
                >
                    <div className={cx('option')}>
                        <MoreIcon width="2rem" height="2rem" />
                    </div>
                </Popover>
            </div>
            <div className={cx('status')}>
                <span className={cx('text')}>{post.status}</span>
            </div>
            <div className={cx('image')}>
                <img src={post.imageUrl} alt="" />
            </div>
            <div className={cx('vote')}>
                <div className={cx('left')}>
                    <div className={cx('count')}>
                        <span
                            className={cx('icon', { active: user?.uid && post.liked.includes(user?.uid) })}
                            onClick={handleLike}
                        >
                            <LikeIcon />
                        </span>
                        <span className={cx('text')}>{post.liked.length} Like</span>
                    </div>
                    <div className={cx('count')} onClick={() => message.info('Chức năng đang phát triển!')}>
                        <span className={cx('icon')}>
                            <CommentIcon />
                        </span>
                        <span className={cx('text')}>{post.comment} Comment</span>
                    </div>
                </div>
                <div className={cx('count')} onClick={() => message.info('Chức năng đang phát triển!')}>
                    <span className={cx('icon')}>
                        <SharedIcon />
                    </span>
                    <span className={cx('text')}>Share</span>
                </div>
            </div>
        </div>
    );
};

export default HomePostItem;
