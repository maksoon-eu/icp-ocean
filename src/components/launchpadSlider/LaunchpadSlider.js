import Slider from "react-slick";
import { useRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, useAnimation } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";

import loadingImg from '../../resourses/img/loading.svg';
import sliderImg from '../../resourses/img/slider-img.png';
import game from '../../resourses/img/game.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

const LaunchProjectItem = () => {
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);

    useEffect(() => {
        if (onScreen) {
            controls.start({
                x: 0,
                opacity: 1,
                transition: {
                duration: 0.6,
                ease: "easeOut"
                }
            });
        }
    }, [onScreen, controls]);

    return (
        <motion.div
            ref={rootRef}
            initial={{ opacity: 0, x: -20 }}
            animate={controls}
            exit={{ opacity: 0, x: -20 }}
            variants={{
                open: {
                    opacity: 1, x: 0
                },
                closed: {
                    opacity: 0, x: 20
                }
            }}
        >
            <div className="slider__item">
                <div className="slider__item-inner">
                    <div className="slider__item-img">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={sliderImg}
                            alt='img'
                        />
                    </div>
                    <div className="slider__item-block">Elvion NFT Project</div>
                </div>
            </div>
        </motion.div>
    );
};

const LaunchpadSlider = () => {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 2,
        swipeToSlide: true,
        slidesToScroll: 1,
    };
    return (
        <div className="background__slider">
            <div className="slider__title">
                <span>Launchpad Projects</span>
                <img src={game} alt=""/>
            </div>
            <Slider {...settings} className="project__slider">
                <LaunchProjectItem/>
                <LaunchProjectItem/>
                <LaunchProjectItem/>
            </Slider>
        </div>
    );
};

export default LaunchpadSlider;