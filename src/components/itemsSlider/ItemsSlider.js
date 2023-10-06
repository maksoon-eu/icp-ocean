import Slider from "react-slick";
import { useState, useRef, useEffect, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";
import { useSelector, useDispatch } from "react-redux";
import store from '../../store';
import { CurrentContext } from "../current/Current";

import { fetchItems, selectAll } from "./itemsSlice";

import loadingImg from '../../resourses/img/loading.svg';
import user from '../../resourses/img/user.png';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './itemsSlider.scss';
import '../../style/btn.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/skeleton.scss';

export const ItemsSliderItem = ({item}) => {
    const [liked, setLiked] = useState(false);
    const [fakeLoading, setFakeLoading] = useState(true);
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);
    const {img, name, price, owner, likes} = item;

    const { current } = useContext(CurrentContext);

   useEffect(() => {
        setTimeout(() => {
            setFakeLoading(false)
        }, 1000)
   }, [])

    useEffect(() => {
        if (onScreen) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: {
                duration: 0.6,
                ease: "easeOut"
                }
            });
        }
    }, [onScreen, controls]);

    const onLicked = () => {
        setLiked(liked => liked ? false : true)
    }

    return (
        <motion.div
            ref={rootRef}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            exit={{ opacity: 0, y: -20 }}
            variants={{
                open: {
                    opacity: 1, y: 0
                },
                closed: {
                    opacity: 0, y: 20
                }
            }}
        >
            <div className="items__slider-item">
                <div className="items__slider-inner">
                    <div className="items__slider-group">
                        <div>
                            <div className="items__slider-title">{name}</div>
                            <div className="items__slider-text">Owner: {owner}</div>
                        </div>
                        <div className="items__slider-hurt" onClick={onLicked}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.99998 16.9986C8.74373 16.9986 8.49667 16.9058 8.30414 16.7371C7.57698 16.1013 6.87592 15.5038 6.25739 14.9767L6.25423 14.974C4.4408 13.4286 2.87484 12.094 1.78527 10.7794C0.567305 9.30968 0 7.9162 0 6.39391C0 4.91487 0.507155 3.55037 1.42795 2.55157C2.35972 1.54097 3.63825 0.984375 5.02843 0.984375C6.06746 0.984375 7.01901 1.31287 7.85658 1.96065C8.27928 2.28763 8.66243 2.68781 8.99998 3.15459C9.33767 2.68781 9.72069 2.28763 10.1435 1.96065C10.9811 1.31287 11.9326 0.984375 12.9717 0.984375C14.3617 0.984375 15.6404 1.54097 16.5722 2.55157C17.4929 3.55037 18 4.91487 18 6.39391C18 7.9162 17.4328 9.30968 16.2148 10.7792C15.1253 12.094 13.5594 13.4285 11.7463 14.9737C11.1267 15.5016 10.4245 16.1001 9.69569 16.7374C9.50329 16.9058 9.2561 16.9986 8.99998 16.9986ZM5.02843 2.03879C3.93626 2.03879 2.93293 2.47467 2.20303 3.26624C1.46228 4.06975 1.05427 5.18047 1.05427 6.39391C1.05427 7.67422 1.53012 8.81927 2.59703 10.1066C3.62823 11.3509 5.16205 12.658 6.93799 14.1715L6.94129 14.1743C7.56215 14.7034 8.26596 15.3033 8.99847 15.9438C9.73538 15.302 10.4403 14.7012 11.0624 14.1713C12.8382 12.6578 14.3719 11.3509 15.4031 10.1066C16.4698 8.81927 16.9457 7.67422 16.9457 6.39391C16.9457 5.18047 16.5377 4.06975 15.7969 3.26624C15.0672 2.47467 14.0637 2.03879 12.9717 2.03879C12.1716 2.03879 11.437 2.29312 10.7884 2.79465C10.2104 3.24179 9.80775 3.80704 9.57168 4.20255C9.45028 4.40593 9.2366 4.52733 8.99998 4.52733C8.76336 4.52733 8.54968 4.40593 8.42828 4.20255C8.19235 3.80704 7.7897 3.24179 7.21155 2.79465C6.56295 2.29312 5.82837 2.03879 5.02843 2.03879Z" fill={liked ? '#DB4D4D' : '#C0C0C0'}/>
                            </svg>
                            <div className="items__slider-text">{likes + +liked}</div>
                        </div>
                    </div>
                    <Link to='/itemId' className="items__slider-photo">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={fakeLoading ? undefined : img}
                            alt='img'
                        />
                        <div className="items__slider-hover"/>
                        <div className="items__slider-btn">
                            <div className="banner__btn banner__btn--mini"><span>Buy now</span></div>
                        </div>
                    </Link>
                    <div className="items__slider-group">
                        <div>
                            <div className="items__slider-text">Current bid:</div>
                            <div className="items__slider-purple">{`${price} ${current}`}</div>
                        </div>
                        <div className="items__slider-user">
                            <img src={user} alt=""/>
                            <Link to="/artstudio" className="items__slider-name">{`@${owner}`}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ItemsSlider = ({title, img}) => {
    const { itemsLoadingStatus } = useSelector(state => state.items);
    const items = selectAll(store.getState());

    const dispatch = useDispatch();

    const skeletons = ['', '', '', '', '', ''];

    useEffect(() => {
        dispatch(fetchItems());

        // eslint-disable-next-line
    }, [])
    
    const itemsSliderList = items.map(item => {
        return <ItemsSliderItem key={item.id} item={item}/>
    })

    const skeletonSliderList = skeletons.map((item, i) => {
        return (
            <div key={i} className="skeleton">
                <div className="skeleton-items skeleton--wave"/>
            </div>
            
        )
    })

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        swipeToSlide: true,
        slidesToScroll: 1,
    };

    return (
        <div className="background__slider">
            <div className="slider__title">
                <span>{title}</span>
                <img src={img} alt=""/>
            </div>
            <div style={{minHeight: '406px'}}>
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        key={itemsLoadingStatus === 'loading'}
                        className="film__flex"
                    >
                        <Slider {...settings} className="items__slider">
                            {itemsLoadingStatus === 'loading' ? skeletonSliderList : itemsSliderList}
                        </Slider>
                    </motion.div>
                </AnimatePresence> 
            </div>
        </div>
    );
};

export default ItemsSlider;