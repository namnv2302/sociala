import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import classNames from 'classnames/bind';
import styles from './CreateStories.module.scss';
import { ImageIcon } from '@components/Icons';
import { upload } from '@utils/upload';
import { addDocument, getADocument } from '@helpers/manageData';
import { useAppSelector } from 'redux/hooks';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const CreateStoriesPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.user);
    const [storyImage, setStoryImage] = useState<any>(null);
    const [creating, setCreating] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            return storyImage && URL.revokeObjectURL(storyImage.preview);
        };
    }, [storyImage]);

    const handleUploadStoriesImage = useCallback((file: any) => {
        file.preview = URL.createObjectURL(file);
        setStoryImage(file);
    }, []);

    const handleCancel = useCallback(() => {
        if (storyImage) {
            URL.revokeObjectURL(storyImage.preview);
            setStoryImage(null);
        }
    }, [storyImage]);

    const handleCreateStories = useCallback(async () => {
        if (storyImage && user) {
            setCreating(true);
            addDocument('stories', {
                id: v4(),
                createdBy: await getADocument('users', `${user.uid}`),
                storyImage: await upload(storyImage),
            });
            setStoryImage(null);
            setCreating(false);
            navigate(ROUTE_PATH.HOME);
        }
    }, [storyImage, user, navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <label
                    id="create-stories"
                    style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
                >
                    <div className={cx('create')}>
                        <div className={cx('icon')}>
                            <ImageIcon width="2.2rem" height="2.2rem" />
                        </div>
                        <p className={cx('title')}>Create story</p>
                    </div>
                    <ImgCrop rotate aspect={3 / 4}>
                        <Upload
                            id="create-stories"
                            style={{
                                position: 'absolute',
                                opacity: 0,
                                cursor: 'pointer',
                                zIndex: -1,
                            }}
                            accept="image/jpg, image/jpeg, image/png"
                            beforeUpload={handleUploadStoriesImage}
                        />
                    </ImgCrop>
                </label>
            </div>
            {storyImage && (
                <div className={cx('preview')}>
                    <div className={cx('preview-img')}>
                        <img src={storyImage && storyImage.preview} alt="" />
                    </div>
                    <div className={cx('control')}>
                        <Button className={cx('cancel')} onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button loading={creating} className={cx('create')} onClick={handleCreateStories}>
                            Create
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateStoriesPage;
