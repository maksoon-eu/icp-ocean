import { LazyLoadImage } from "react-lazy-load-image-component";

import banner from '../../resourses/img/project-banner.png';
import loadingImg from '../../resourses/img/loading.svg';
import icon1 from '../../resourses/img/icon1.svg';
import icon2 from '../../resourses/img/icon2.svg';
import icon3 from '../../resourses/img/icon3.svg';
import icon4 from '../../resourses/img/icon4.svg';
import icon5 from '../../resourses/img/icon5.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './projectBanner.scss';

const ProjectBanner = () => {
    return (
        <div className='project__banner'>
            <div className="project__banner-inner">
                <LazyLoadImage 
                    width='100%' height='100%'
                    placeholderSrc={loadingImg}
                    effect="blur"
                    src={banner}
                    alt='img'
                />
            </div>

            <div className="project__banner-icons">
                <a href="" className="project__banner-icon">
                    <img src={icon1} alt=""/>
                </a>
                <a href="" className="project__banner-icon">
                    <img src={icon2} alt=""/>
                </a>
                <a href="" className="project__banner-icon">
                    <img src={icon3} alt=""/>
                </a>
                <a href="" className="project__banner-icon">
                    <img src={icon4} alt=""/>
                </a>
                <a href="" className="project__banner-icon">
                    <img src={icon5} alt=""/>
                </a>
            </div>

            <div className="project__banner-info">
                <div className="project__banner-title">Welcome to the official MoonDogs sale</div>
                <div className="project__banner-text">But even if you buy and you come across a regular one, you will still have advantages over other players who do not have NFT FlokiCyberPunk! But even if you buy and you come across a regular one, you will still have advantages over other players who do not have NFT FlokiCyberPunk!</div>
            </div>
        </div>
    );
};

export default ProjectBanner;