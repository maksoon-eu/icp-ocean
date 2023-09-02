import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

import loadingImg from '../../resourses/img/loading.svg';
import banner from '../../resourses/img/banner-artstudio.png';
import user from '../../resourses/img/peroson-user.svg';
import copy from '../../resourses/img/copy.svg';
import tick from '../../resourses/img/tick.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './personBanner.scss';

const PersonBanner = () => {
    const addres = '0x7374er74r7or4y956';
    const [copySuccess, setCopySuccess] = useState(false);

    const onCopyText = () => {
        navigator.clipboard.writeText(addres)
        setCopySuccess(true)

        setTimeout(() => setCopySuccess(false), 1500);
    }

    return (
        <div className='personBanner'>
            <div className="personBanner__block">
                <div className="personBanner__inner">
                    <div className="personBanner__inner-photo">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={banner}
                            alt='img'
                        />
                    </div>
                </div>
                <div className="personBanner__user">
                    <div className="personBanner__user-img">
                        <LazyLoadImage 
                            width='117px' height='117px'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={user}
                            alt='img'
                        />
                    </div>
                    <div className="personBanner__user-text">
                        <div className="personBanner__user-title">ArtStudio_nft</div>
                        <div className="personBanner__user-flex">
                            <div className="personBanner__user-left">
                                <div className="personBanner__user-gray">Items:</div>
                                <div className="personBanner__user-white">134</div>
                            </div>
                            <div className="personBanner__user-right">
                                <div className="personBanner__user-gray">Collections:</div>
                                <div className="personBanner__user-white">134</div>
                            </div>
                        </div>
                    </div>
                    <div className="personBanner__user-addres" onClick={onCopyText}>
                        <motion.div
                            className="personBanner__user-tick"
                            initial={{ opacity: 0, y: -10 }}
                            variants={{open: { opacity: 1, y: 0, transition: {opacity: {delay: .15}, y: {delay: .15}}}, closed: { opacity: 0, y: -10 }}}
                            animate={copySuccess ? "open" : "closed"}
                        >
                            <img src={tick} alt="" />
                        </motion.div>
                        <div className="personBanner__user-copyText">{`${addres.slice(0, 4)}...${addres.slice(15, 19)}`}</div>
                        <motion.div 
                            className="personBanner__user-copyImg"
                            initial={{ opacity: 0, y: 0 }}
                            variants={{close: {opacity: 0, y: 10}, open: {opacity: 1, y: 0, transition: {opacity: {delay: .15}, y: {delay: .15}}}}}
                            animate={copySuccess ? "close" : "open"}
                        >
                            <img src={copy} alt="" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonBanner;