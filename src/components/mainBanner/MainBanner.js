import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import banner from '../../resourses/img/banner-img.png';
import loadingImg from '../../resourses/img/loading.svg';

import './mainBanner.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../../style/btn.scss';

const MainBanner = () => {
    return (
        <div className="banner">
            <div className="banner__inner">
                <div className="banner__photo">
                    <LazyLoadImage 
                        width='100%' height='100%'
                        placeholderSrc={loadingImg}
                        effect="blur"
                        src={banner}
                        alt='img'
                    />
                </div>
                <div className="banner__title">The Larget NFT Marketplace</div>
                <div className="banner__subtitle">Discover & Collect<br/>rate Digital Artwork</div>
                <div className="banner__group">
                    <Link to='/market' className="banner__btn"><span>Explore</span></Link>
                    <Link to='/launchpad' className="banner__btn"><span>Launchpad</span></Link>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;