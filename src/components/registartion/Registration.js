import { useState, useRef, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { LoginKeyContext } from "../loginKey/LoginKey";

import banner from '../../resourses/img/registr-done.png';
import loadingImg from '../../resourses/img/loading.svg';
import plus from '../../resourses/img/plus.svg';
import instagram from '../../resourses/img/instagram.svg';
import twitter from '../../resourses/img/twitter.svg';
import facebook from '../../resourses/img/facebook.svg';

import './registration.scss';
import '../../components/header/header.scss';

const Registration = () => {
    const [inputs, setInputs] = useState(['', '', '', '', '', '']);
    const [inputError, setInputError] = useState(false);
    const refPhoto = useRef(null);
    const refBanner = useRef(null);

    const { toggleLoginKey } = useContext(LoginKeyContext);

    const onInputsChange = (e) => {
        setInputError(false)

        if (e.target.value.charAt(0) === ' ') {
            e.target.value = ''
        }

        setInputs(inputs => inputs.map((item, i) => i === +e.target.name ? e.target.value : item))
    }

    const onSubmit = () => {
        if (inputs[0] === '' || inputs[1] === '' || !inputs[1].includes('@')) {
            setInputError(true)
        } else {
            setInputError(false)
            toggleLoginKey('registr')
            localStorage.setItem('user', JSON.stringify([inputs[0], refBanner.current.src, refPhoto.current.src]))
        } 
    }

    const previewFile = (e, inputImg) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
        
            reader.onload = function() {
                inputImg.current.setAttribute("src", reader.result);
            }
        
            reader.readAsDataURL(file);
            inputImg.current.style.opacity = 1;
        }
    }

    return (
        <div className="registrAccount">
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
            <div className="registrAccount__inner">
                <div className="registrAccount__title">Registration Account</div>
                <div className="registrAccount__subtitle">Enter all the necessary data to continue using our service.</div>
                <div className="registrAccount__block">
                    <div className="registrAccount__left">
                        <div className="registrAccount__left-title">Account Name<span> *</span></div>
                        <div className="registrAccount__left-input">
                            <input className="search__input search__input-registr" type="text" placeholder="Enter the account name" name='0' value={inputs[0]} onChange={onInputsChange}/>
                        </div>
                        <div className="registrAccount__left-title">Email Adress<span> *</span></div>
                        <div className="registrAccount__left-input">
                            <input className="search__input search__input-registr" type="text" placeholder="Enter the email address" name='1' value={inputs[1]} onChange={onInputsChange}/>
                        </div>
                        <div className="registrAccount__left-title">Account Description</div>
                        <div className="registrAccount__left-input">
                            <textarea className="search__input search__input-text" type="text" placeholder="Enter the account description" name='2' value={inputs[2]} onChange={onInputsChange}></textarea>
                        </div>
                        <div className="registrAccount__error" style={{color: inputError ? '#E84D4D' : 'transparent'}}>Fill in the required fields correctly</div>
                        <div className="registrAccount__left-btn">
                            <button className="btn btn-registrAccount" onClick={onSubmit}><span>Registration</span></button>
                        </div>
                    </div>
                    <div className="registrAccount__right">
                        <div className="registrAccount__left-title">Design of your profile</div>
                        <div className="registrAccount__right-group">
                            <div className="registrAccount__right-photo" onClick={() => document.querySelector('.input__turn').click()}>
                                <img ref={refPhoto} src="" alt="" className="input__img"/>
                                <div className="registrAccount__right-text">avatar</div>
                                <img className="register__plus" src={plus} alt=""/>
                                <div className="registrAccount__right-text">512x512</div>
                                <input className="input__turn" type="file" onInput={(e) => previewFile(e, refPhoto)}/>
                            </div>
                            <div className="registrAccount__right-photo registrAccount__right-photo-banner" onClick={() => document.querySelector('.input__turn2').click()}>
                                <img ref={refBanner} src="" alt="" className="input__img2"/>
                                <div className="registrAccount__right-text">banner</div>
                                <img className="register__plus" src={plus} alt=""/>
                                <div className="registrAccount__right-text">1920x300</div>
                                <input className="input__turn2" type="file" onInput={(e) => previewFile(e, refBanner)}/>
                            </div>
                        </div>
                        <div className="registrAccount__left-title">Social Media</div>
                        <div className="registrAccount__right-social">
                            <div className="social__block">
                                <input className="search__input search__input-registr search__input-social" type="text" placeholder="Enter the link to your twitter account" name='3' value={inputs[3]} onChange={onInputsChange}/>
                                <img src={twitter} alt=""/>
                            </div>
                            <div className="social__block">
                                <input className="search__input search__input-registr search__input-social" type="text" placeholder="Enter the link to your instagram account" name='4' value={inputs[4]} onChange={onInputsChange}/>
                                <img src={instagram} alt=""/>
                            </div>
                            <div className="social__block">
                                <input className="search__input search__input-registr search__input-social" type="text" placeholder="Enter the link to your facebook account" name='5' value={inputs[5]} onChange={onInputsChange}/>
                                <img src={facebook} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;