import { useState, useRef } from "react";
import { motion } from "framer-motion";

import banner from '../../resourses/img/banner-artstudio.png';
import user from '../../resourses/img/peroson-user.svg';
import copy from '../../resourses/img/copy.svg';
import tick from '../../resourses/img/tick.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import '../../components/personBanner/personBanner.scss';

const MyBanner = ({collectionLength, nftLength}) => {
    const domain = window.location.href;
    const addres = '0x7374er74r7or4y956';
    const [copySuccess, setCopySuccess] = useState(false);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

    const refBanner = useRef(null);
    const refPhoto = useRef(null);

    const onCopyText = () => {
        navigator.clipboard.writeText(addres)
        setCopySuccess(true)

        setTimeout(() => setCopySuccess(false), 1500);
    }
    
    const previewFile = (e, inputImg) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
        
            reader.onload = function() {
                inputImg.current.setAttribute("src", reader.result);
                
                if (inputImg.current.alt === 'user') {
                    localStorage.setItem('user', JSON.stringify([userData[0], userData[1], reader.result]))
                } else {
                    localStorage.setItem('user', JSON.stringify([userData[0], reader.result, userData[2]]))
                }

                setUserData(JSON.parse(localStorage.getItem('user')))
            }
        
            reader.readAsDataURL(file);

        }
    }

    return (
        <div className='personBanner'>
            <div className="personBanner__block">
                <input className="personBanner__input personBanner__input-banner" type="file" title='' onInput={(e) => previewFile(e, refBanner)}/>
                <input className="personBanner__input personBanner__input-photo" type="file" title='' onInput={(e) => previewFile(e, refPhoto)}/>
                <motion.div
                    className="personBanner__change"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={() => document.querySelector('.personBanner__input-banner').click()}
                >
                    Change background
                </motion.div>
                <div className="personBanner__inner">
                    <div className="personBanner__inner-photo">
                        <img src={userData[1] === domain ? banner : userData[1]} alt="banner" ref={refBanner}/>
                    </div>
                </div>
                <div className="personBanner__user">
                    <div className="personBanner__user-img" onClick={() => document.querySelector('.personBanner__input-photo').click()}>
                        <div className="personBanner__user-img-bg">
                            <motion.img
                                src={userData[2] === domain ? user : userData[2]}
                                whileHover={{ scale: 1.07 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                alt="user" ref={refPhoto}
                            />
                        </div>
                    </div>
                    <div className="personBanner__user-text">
                        <div className="personBanner__user-title">{userData[0].length > 9 ? userData[0].slice(0, 5)+ '...' : userData[0]}</div>
                        <div className="personBanner__user-flex">
                            <div className="personBanner__user-left">
                                <div className="personBanner__user-gray">Items:</div>
                                <div className="personBanner__user-white">{nftLength}</div>
                            </div>
                            <div className="personBanner__user-right">
                                <div className="personBanner__user-gray">Collections:</div>
                                <div className="personBanner__user-white">{collectionLength}</div>
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

export default MyBanner;