import { useMemo, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
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

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                <div className={cx('story-item', 'add-story')}>
                    <div className={cx('body')} style={{ backgroundColor: '#343a40' }}>
                        <div className={cx('info')} onClick={() => navigate(ROUTE_PATH.STORIES_CREATE)}>
                            <div className={cx('icon')}>
                                <PlusOutlined className={cx('plus-icon')} />
                            </div>
                            <h4 className={cx('add')}>Add Story</h4>
                        </div>
                    </div>
                </div>
                {storiesData &&
                    storiesData.map((story: any) => (
                        <div key={v4()} className={cx('story-item')}>
                            <div className={cx('body')} style={{ backgroundImage: `url(${story.storyImage})` }}>
                                <div className={cx('info')}>
                                    <div className={cx('avatar')}>
                                        <img src={story.createdBy.photoURL || images.defaultAvatar} alt="" />
                                    </div>
                                    <h4 className={cx('name')}>{story.createdBy.displayName}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default Stories;
