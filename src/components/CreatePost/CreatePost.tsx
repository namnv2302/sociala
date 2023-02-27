import { useState, useCallback, useEffect } from 'react';
import { v4 } from 'uuid';
import { Input, Upload, message, Spin } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { EditIcon } from '@components/Icons';
import { useAppSelector } from 'redux/hooks';
import { VideoIcon, CameraIcon, ImageIcon } from '@components/Icons';
import { upload } from '@utils/upload';
import { addDocument } from '@helpers/manageData';
import images from '@assets/images';

const cx = classNames.bind(styles);

const CreatePost = () => {
    const { user } = useAppSelector((state) => state.user);
    const [postImg, setPostImg] = useState<any>(null);
    const [status, setStatus] = useState<string>('');
    const [creating, setCreating] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            return postImg && URL.revokeObjectURL(postImg.preview);
        };
    }, [postImg]);

    const handleUploadImage = useCallback((file: any) => {
        file.preview = URL.createObjectURL(file);
        setPostImg(file);
    }, []);

    const handleCreatePost = useCallback(async () => {
        if (status.trim() || postImg) {
            setCreating(true);
            let data;
            if (status.trim() && !postImg) {
                data = {
                    id: v4(),
                    createdBy: user?.uid,
                    author: {
                        uid: user?.uid,
                        avatar: user?.photoURL,
                        name: user?.displayName,
                    },
                    liked: [],
                    comment: 0,
                    shared: 0,
                    status: status,
                };
            } else if (status.trim() && postImg) {
                data = {
                    id: v4(),
                    createdBy: user?.uid,
                    author: {
                        uid: user?.uid,
                        avatar: user?.photoURL,
                        name: user?.displayName,
                    },
                    liked: [],
                    comment: 0,
                    shared: 0,
                    status: status,
                    imageUrl: await upload(postImg),
                };
            } else {
                data = {
                    id: v4(),
                    createdBy: user?.uid,
                    author: {
                        uid: user?.uid,
                        avatar: user?.photoURL,
                        name: user?.displayName,
                    },
                    liked: [],
                    comment: 0,
                    shared: 0,
                    status: status,
                    imageUrl: await upload(postImg),
                };
            }
            console.log(data);
            setStatus('');
            setPostImg(null);
            await addDocument('post', data);
            setCreating(false);
        } else {
            message.info('Vui lòng nhập cảm xúc của bạn!');
        }
    }, [postImg, status, user]);

    const handleCancelImage = useCallback(() => {
        if (postImg) {
            URL.revokeObjectURL(postImg.preview);
            setPostImg(null);
        }
    }, [postImg]);

    return (
        <div className={cx('wrapper')}>
            {(status || postImg) && (
                <div className={cx('header')} onClick={handleCreatePost}>
                    <span className={cx('icon')}>
                        <EditIcon width="1.8rem" height="1.8rem" />
                    </span>
                    <span className={cx('heading')}>Create post</span>
                    <Spin spinning={creating}></Spin>
                </div>
            )}
            <div className={cx('body')}>
                <div className={cx('img')}>
                    <img src={user?.photoURL || images.defaultAvatar} alt="" />
                </div>
                <Input.TextArea
                    className={cx('input')}
                    placeholder="What's on your mind?"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
            </div>
            {postImg && (
                <div className={cx('content-img')}>
                    <div className={cx('image')}>
                        <img src={postImg && postImg?.preview} alt="" />
                        <span className={cx('cancel')} onClick={handleCancelImage}>
                            <CloseCircleOutlined />
                        </span>
                    </div>
                </div>
            )}
            <div className={cx('footer')}>
                <div
                    className={cx('item')}
                    style={{ opacity: 0.8 }}
                    onClick={() => message.info('Chức năng đang phát triển, vui lòng thử lại sau!')}
                >
                    <VideoIcon className={cx('icon')} width="2.2rem" height="2.2rem" />
                    <span className={cx('text')}>Live Video</span>
                </div>
                <div className={cx('item')}>
                    <label id="post-img">
                        <ImageIcon className={cx('icon')} width="2.2rem" height="2.2rem" />
                        <span className={cx('text')}>Photo/Video</span>
                        <ImgCrop rotate>
                            <Upload
                                id="post-img"
                                style={{
                                    position: 'absolute',
                                    opacity: 0,
                                    cursor: 'pointer',
                                    zIndex: -1,
                                }}
                                accept="image/jpg, image/jpeg, image/png"
                                beforeUpload={handleUploadImage}
                            />
                        </ImgCrop>
                    </label>
                </div>
                <div
                    className={cx('item')}
                    style={{ opacity: 0.8 }}
                    onClick={() => message.info('Chức năng đang phát triển, vui lòng thử lại sau!')}
                >
                    <CameraIcon className={cx('icon')} width="2.2rem" height="2.2rem" />
                    <span className={cx('text')}>Feeling/Activity</span>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
