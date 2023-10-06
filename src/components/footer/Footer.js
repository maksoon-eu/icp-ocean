import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import logo from '../../resourses/img/logo.svg';
import instagram from '../../resourses/img/instagram.svg';
import twitter from '../../resourses/img/twitter.svg';
import telegram from '../../resourses/img/telegram.svg';

import './footer.scss';

const Footer = () => {
    const [footerInput, setFooterInput] = useState('');
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__inner">
                        <div className="footer__head">
                            <div className="footer__logo">
                                <Link to='/'><img src={logo} alt='logo'/></Link>
                                <p>Nft marketplace with the ability to create cases with a random prize.</p>
                            </div>
                            <div className="footer__links">
                                <div className="footer__links-item footer__links-item--main">Links</div>
                                <Link to="/market" className="footer__links-item" href="#">Explore</Link>
                                <a className="footer__links-item" href="#">How it works</a>
                                <a className="footer__links-item" href="#">Help Center</a>
                            </div>

                            <div className="footer__links">
                                <div className="footer__links-item footer__links-item--main">My account</div>
                                <Link to='/login' className='footer__links-item'>My Profile</Link>
                                <Link to='/login' className='footer__links-item'>My Collections</Link>
                                <Link to='/login' className='footer__links-item'>My Account Settings</Link>
                            </div>

                            <div className="footer__form">
                                <div className="footer__form-title">Get the latest news to your email.</div>
                                <div className="footer__form-form">
                                    <form className="search" action="/" method="post">
                                        <input className="search__input more" type="text" placeholder="Your e-mail"
                                        value={footerInput}
                                        onInput={(e) => setFooterInput(e.target.value)}/>
                                        <motion.div
                                            className="banner__btn banner__btn--footer"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <span>Send</span>
                                        </motion.div>
                                    </form>
                                </div>
                                <div className="footer__form-icon">
                                    <a href="#"><img src={instagram} alt="instagram"/></a>
                                    <a href="#"><img src={twitter} alt="twitter"/></a>
                                    <a href="#"><img src={telegram} alt="telegram"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="under">
                <div className="footer__under-text">&copy; OnlineOcean, All rights reserved.</div>
            </div>
        </>
    );
};

export default Footer;