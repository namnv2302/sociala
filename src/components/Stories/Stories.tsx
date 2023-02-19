import { useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './Stories.module.scss';
import { stories } from 'data/stories';
import { LeftIcon, RightIcon } from '@components/Icons';

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
                        <div className={cx('info')}>
                            <div className={cx('icon')}>
                                <PlusOutlined className={cx('plus-icon')} />
                            </div>
                            <h4 className={cx('add')}>Add Story</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[0].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[0].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[0].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[1].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[1].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[1].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[2].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[2].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[2].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[3].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[3].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[3].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[4].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[4].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[4].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[5].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[5].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[5].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[6].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[6].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[6].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[7].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[7].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[7].name}</h4>
                        </div>
                    </div>
                </div>
                <div className={cx('story-item')}>
                    <div className={cx('body')} style={{ backgroundImage: `url(${stories[8].imageUrl})` }}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <img src={stories[8].avatarUser} alt="" />
                            </div>
                            <h4 className={cx('name')}>{stories[8].name}</h4>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Stories;
