import { useMemo, useEffect, useState, useCallback } from 'react';
import { Input } from 'antd';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './Stories.module.scss';
import { LeftIcon, RightIcon } from '@components/Icons';
import ROUTE_PATH from '@constants/routes';
import { getAllDocuments } from '@helpers/manageData';
import images from '@assets/images';

const cx = classNames.bind(styles);

const ArrowPrev = ({ currentSlide, slideCount, onClick }: any) => {
    return (
        <div className={cx('arrow', 'prev', { disable: currentSlide === 0 })} onClick={onClick}>
            <LeftIcon width="1.2rem" height="1.2rem" />
        </div>
    );
};

const ArrowNext = ({ currentSlide, slideCount, onClick }: any) => {
    return (
        <div className={cx('arrow', 'next', { disable: currentSlide === slideCount - 1 })} onClick={onClick}>
            <RightIcon width="1.2rem" height="1.2rem" />
        </div>
    );
};

const Stories = () => {
    const navigate = useNavigate();
    const [storiesData, setStoriesData] = useState<any>();
    const [previewStories, setPreviewStories] = useState<string>('');

    useEffect(() => {
        const getData = async () => {
            const result = await getAllDocuments('stories');
            if (result) {
                setStoriesData(result);
            }
        };
        getData();
    }, []);

    const settings = useMemo(() => {
        return {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 2,
            nextArrow: <ArrowNext />,
            prevArrow: <ArrowPrev />,
        };
    }, []);

    const handleNextStories = useCallback(() => {
        if (storiesData) {
            const currentStoriesIndex = storiesData.findIndex((story: any) => story.storyImage === previewStories);
            let nextStoriesIndex = currentStoriesIndex + 1;
            if (nextStoriesIndex >= storiesData.length) {
                nextStoriesIndex = 0;
            }
            setPreviewStories(storiesData[nextStoriesIndex].storyImage);
        }
    }, [previewStories, storiesData]);

    const handleBackStories = useCallback(() => {
        if (storiesData) {
            const currentStoriesIndex = storiesData.findIndex((story: any) => story.storyImage === previewStories);
            let backStoriesIndex = currentStoriesIndex - 1;
            if (backStoriesIndex < 0) {
                backStoriesIndex = storiesData.length - 1;
            }
            setPreviewStories(storiesData[backStoriesIndex].storyImage);
        }
    }, [previewStories, storiesData]);

    if (storiesData || storiesData === undefined) {
        return (
            <div className={cx('empty-story')}>
                <div className={cx('body')} onClick={() => navigate(ROUTE_PATH.STORIES_CREATE)}>
                    <div className={cx('icon')}>
                        <PlusOutlined className={cx('plus-icon')} />
                    </div>
                    <div className={cx('text')}>
                        <h4>Create story</h4>
                        <p>Share a photo or write something</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                <div className={cx('story-item', 'add-story')}>
                    <div className={cx('body')} style={{ backgroundColor: '#343a40' }}>
                        <div className={cx('info')} onClick={() => navigate(ROUTE_PATH.STORIES_CREATE)}>
                            <div className={cx('icon')}>
                                <PlusOutlined className={cx('plus-icon')} />
                            </div>
                            <h4 className={cx('add')}>Create story</h4>
                        </div>
                    </div>
                </div>
                {storiesData &&
                    storiesData.map((story: any) => (
                        <div
                            key={v4()}
                            className={cx('story-item')}
                            onClick={() => setPreviewStories(story.storyImage)}
                        >
                            <div className={cx('body')} style={{ backgroundImage: `url(${story.storyImage})` }}>
                                <div className={cx('avatar')}>
                                    <img src={story.createdBy.photoURL || images.defaultAvatar} alt="" />
                                </div>
                                <div className={cx('info')}>
                                    <h4 className={cx('name')}>{story.createdBy.displayName}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
            </Slider>
            {previewStories && (
                <div className={cx('overlay')}>
                    <div className={cx('inner')}>
                        <img src={previewStories} alt="" />
                        <div className={cx('comment')}>
                            <Input className={cx('comment-input')} placeholder="Write Comments" />
                            <span className={cx('send-icon')}>
                                <SendOutlined style={{ fontSize: '1.8rem', color: '#fff' }} />
                            </span>
                        </div>
                    </div>
                    <span className={cx('close', 'btn')} onClick={() => setPreviewStories('')}>
                        <CloseOutlined style={{ fontSize: '2rem', padding: '10px', cursor: 'pointer' }} />
                    </span>
                    <span className={cx('next', 'btn')} onClick={handleNextStories}>
                        <RightIcon width="2rem" height="2rem" className={cx('right')} />
                    </span>
                    <span className={cx('back', 'btn')} onClick={handleBackStories}>
                        <LeftIcon width="2rem" height="2rem" className={cx('left')} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default Stories;
