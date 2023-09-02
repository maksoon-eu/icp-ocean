import { useRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";

import market from '../../resourses/img/market.png';
import user from '../../resourses/img/user.png';
import loadingImg from '../../resourses/img/loading.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './marketList.scss';

const MarketListItem = () => {
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);

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
            <div className="market__catalog-list">
                <div className="market__catalog-item">
                    <Link to='/itemId' className="market__catalog-link">
                        <div className="market__catalog-photo">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                placeholderSrc={loadingImg}
                                effect="blur"
                                src={market}
                                alt='img'
                            />
                            <div className="market__catalog-hover"/>
                            <div className="market__catalog-btn">
                                <div className="banner__btn banner__btn--mini"><span>Buy now</span></div>
                            </div>
                        </div>
                        <div className="market__catalog-purple">0.034 ICP</div>
                        <div className="market__catalog-user">
                            <img src={user} alt=""/>
                            <div className="market__catalog-conect">
                                <span>@artstudio</span>
                                <span>Abstract 3D...</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

const MarketList = () => {
    return (
        <div className='market'>
            <div className="market__catalog">
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
                <MarketListItem/>
            </div>
            <div className="btnLoad btnLoad--absolute">
                <div className="btn"><span>Load more</span></div>
            </div>
        </div>
    );
};

export default MarketList;