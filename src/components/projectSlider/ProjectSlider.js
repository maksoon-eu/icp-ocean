import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, selectAll } from "./projectSlice";
import store from '../../store';
import { Link } from "react-router-dom";

import loadingImg from '../../resourses/img/loading.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './projectSlider.scss';

const ProjectSliderItem = ({item}) => {
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);
    const [fakeLoading, setFakeLoading] = useState(true);
    const {img, name} = item;

   useEffect(() => {
        setTimeout(() => {
            setFakeLoading(false)
        }, 1000)
   }, [])

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
                <Link to="/project" className="slider__item-inner">
                    <div className="slider__item-img">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={fakeLoading ? undefined : img}
                            alt='img'
                        />
                    </div>
                    <div className="slider__item-block">{name}</div>
                </Link>
            </div>
        </motion.div>
    );
};

const ProjectSlider = () => {
    const { projectLoadingStatus } = useSelector(state => state.project);
    const project = selectAll(store.getState());

    const skeletons = ['', '', '']

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjects())
    }, []);

    const projectSliderList = project.map(item => {
        return <ProjectSliderItem key={item.id} item={item}/>
    })

    const skeletonSliderList = skeletons.map((item, i) => {
        return (
            <div key={i} className="skeleton">
                <div className="skeleton-project skeleton--wave"/>
            </div>
            
        )
    })

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 2,
        swipeToSlide: true,
        slidesToScroll: 1,
    };

    return (
        <div style={{minHeight: '250px'}}>
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{opacity: 0}}
                    key={projectLoadingStatus === 'loading'}
                    className="film__flex"
                >
                    <Slider {...settings} className="project__slider">
                        {projectLoadingStatus === 'loading' ? skeletonSliderList : projectSliderList}
                    </Slider>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ProjectSlider;