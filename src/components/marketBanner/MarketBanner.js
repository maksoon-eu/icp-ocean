import { LazyLoadImage } from "react-lazy-load-image-component";

import banner from '../../resourses/img/market-banner.png';
import user from '../../resourses/img/market-user.png';
import loadingImg from '../../resourses/img/loading.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './marketBanner.scss';

const MarketBanner = () => {
    return (
        <div className="market__banner">
            <div className="market__banner-img">
                <LazyLoadImage 
                    width='100%' height='100%'
                    placeholderSrc={loadingImg}
                    effect="blur"
                    src={banner}
                    alt='img'
                />
            </div>
            <div className="market__banner-user">
                <div className="market__banner-photo">
                    <LazyLoadImage 
                    width='100%' height='100%'
                    placeholderSrc={loadingImg}
                    effect="blur"
                    src={user}
                    alt='img'
                    />
                </div>
            </div>
        </div>
    );
};

export default MarketBanner;