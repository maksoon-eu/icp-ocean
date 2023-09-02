import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { ThemeContext } from "../theme/Theme";
import { LoginKeyContext } from "../loginKey/LoginKey";

import logo from '../../resourses/img/logo.svg';
import metamask from '../../resourses/img/metamask.png';
import trust from '../../resourses/img/trust.svg';
import loadingImg from '../../resourses/img/loading.svg';
import ethereum from '../../resourses/img/eth.svg';
import bsc from '../../resourses/img/bsc.svg';
import polygon from '../../resourses/img/polygon.svg';

import './header.scss';
import '../../style/btn.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';

const WalletModal = ({walletOpened, setWalletOpened}) => {
    const [activeWallet, setActiveWallet] = useState(localStorage.getItem('wallet'));
    const [error, setError] = useState(false);

    const { loginKey, toggleLoginKey } = useContext(LoginKeyContext);

    const onActiveWallet = (wallet) => {
        setActiveWallet(activeWallet === wallet ? 'null' : wallet)
    }

    useEffect(() => {
        localStorage.setItem('wallet', activeWallet)
        if (loginKey !== 'registr' && activeWallet !== 'null') {
            toggleLoginKey('choose')
        }
        if (activeWallet === 'null') {
            toggleLoginKey('null')
        }
    }, [activeWallet])

    return (
        <motion.div
            className="blockchain"
            variants={{
                open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.4
                    }
                },
                closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.4
                    }
                }
            }}
            style={{ pointerEvents: walletOpened ? "auto" : "none" }}
            initial={false}
            animate={walletOpened ? "open" : "closed"}
        >
            <div className="blockchain__title">Connect Wallet</div>
            <div className="blockchain__inner">
                <div>
                    <div className="blockchain__inner-item" onClick={() => {onActiveWallet('trust'); setError(false)}} style={{borderColor: activeWallet === 'trust' ? '#A029F4' : 'transparent'}}>
                        <div className="blockchain__inner-img">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                placeholderSrc={loadingImg}
                                effect="blur"
                                src={trust}
                                alt='trust'
                            />
                        </div>
                    </div>
                    <div className="blockchain__inner-text">TrustWallet</div>
                </div>
                <div>
                    <div className="blockchain__inner-item" onClick={() => {onActiveWallet('metamask'); setError(false)}} style={{borderColor: activeWallet === 'metamask' ? '#A029F4' : 'transparent'}}>
                        <div className="blockchain__inner-img">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                placeholderSrc={loadingImg}
                                effect="blur"
                                src={metamask}
                                alt='metamask'
                            />
                        </div>
                    </div>
                    <div className="blockchain__inner-text">MetaMask</div>
                </div>
            </div>
            <div className="blockchain__btn">
                <div className="error-modal" style={{color: error ? '#E84D4D' : 'transparent'}}>Сhoose a wallet</div>
                <div className="wallet1">
                    <button className="btn" onClick={activeWallet !== '' ? () => setWalletOpened(false) : () => setError(true)}><span>Confirm</span></button>
                </div>
            </div>
        </motion.div>
    )
}

const BlockchainModal = ({blockchainOpened, setBlockchainOpened}) => {
    const [activeBlockchain, setActiveBlockchain] = useState('ethereum');
    const [error, setError] = useState(false);

    const onActiveWallet = (blockchain) => {
        setActiveBlockchain(blockchain)
    }

    return (
        <motion.div
            className="blockchain blockchain--position"
            variants={{
                open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.4
                    }
                },
                closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.4
                    }
                }
            }}
            style={{ pointerEvents: blockchainOpened ? "auto" : "none" }}
            initial={false}
            animate={blockchainOpened ? "open" : "closed"}
        >
            <div className="blockchain__title">Choosing a Blockchain</div>
            <div className="blockchain__inner">
                <div>
                    <div className="blockchain__inner-item" onClick={() => {onActiveWallet('ethereum'); setError(false)}} style={{borderColor: activeBlockchain === 'ethereum' ? '#A029F4' : 'transparent'}}>
                        <div className="blockchain__inner-img">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                placeholderSrc={loadingImg}
                                effect="blur"
                                src={ethereum}
                                alt='ethereum'
                            />
                        </div>
                    </div>
                    <div className="blockchain__inner-text">Ethereum</div>
                </div>
                <div>
                    <div className="blockchain__inner-item" onClick={() => {onActiveWallet('bsc'); setError(false)}} style={{borderColor: activeBlockchain === 'bsc' ? '#A029F4' : 'transparent'}}>
                        <div className="blockchain__inner-img">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                placeholderSrc={loadingImg}
                                effect="blur"
                                src={bsc}
                                alt='bsc'
                            />
                        </div>
                    </div>
                    <div className="blockchain__inner-text">BSC</div>
                </div>
                <div>
                    <div className="blockchain__inner-item" onClick={() => {onActiveWallet('polygon'); setError(false)}} style={{borderColor: activeBlockchain === 'polygon' ? '#A029F4' : 'transparent'}}>
                        <div className="blockchain__inner-img">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                placeholderSrc={loadingImg}
                                effect="blur"
                                src={polygon}
                                alt='polygon'
                            />
                        </div>
                    </div>
                    <div className="blockchain__inner-text">Polygon</div>
                </div>
            </div>
            <div className="blockchain__btn">
                <div className="error-modal" style={{color: error ? '#E84D4D' : 'transparent'}}>Сhoose a blockchain</div>
                <div className="wallet1">
                    <button className="btn" onClick={activeBlockchain !== '' ? () => setBlockchainOpened(false) : () => setError(true)}><span>Apply</span></button>
                </div>
            </div>
        </motion.div>
    )
}

const Header = ({walletOpened, setWalletOpened}) => {
    const [blockchainOpened, setBlockchainOpened] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const refWallet = useRef();
    const refBlockchain = useRef();
    const { toggleTheme, theme } = useContext(ThemeContext);

    useEffect(() => {
        const clickOutElement = (e) => {
            if (walletOpened && refWallet.current && !refWallet.current.contains(e.target)) {
                setWalletOpened(false)
            } else if (blockchainOpened && refBlockchain.current && !refBlockchain.current.contains(e.target)) {
                setBlockchainOpened(false)
            }
        }
    
        document.addEventListener("mousedown", clickOutElement)
    
        return function() {
          document.removeEventListener("mousedown", clickOutElement)
        }
    }, [walletOpened, blockchainOpened])

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <Link to='/' className="search__menu-item"><img src={logo} alt='logo'/></Link>
                </div>
                <div className="header__search">
                    <div className="form">
                        <form className="search" action="/" method="post">
                            <input 
                                className="search__input" type="text" value={searchInput}
                                placeholder="Search for art" onInput={(e) => setSearchInput(e.target.value)}/>
                            <svg className="search__photo" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3566 2.28876C10.3056 -0.762268 5.33978 -0.762268 2.28875 2.28876C-0.761615 5.34045 -0.761615 10.3056 2.28875 13.3572C5.00577 16.0736 9.23739 16.3646 12.2864 14.2435C12.3506 14.5471 12.4974 14.8368 12.7335 15.0729L17.1768 19.5162C17.8243 20.1624 18.8706 20.1624 19.5148 19.5162C20.1617 18.8693 20.1617 17.823 19.5148 17.1781L15.0716 12.7335C14.8368 12.4994 14.5464 12.3519 14.2429 12.2878C16.3653 9.23806 16.0743 5.0071 13.3566 2.28876ZM11.9538 11.9544C9.6759 14.2323 5.96877 14.2323 3.69157 11.9544C1.41504 9.67657 1.41504 5.9701 3.69157 3.69224C5.96877 1.41505 9.6759 1.41505 11.9538 3.69224C14.2316 5.9701 14.2316 9.67657 11.9538 11.9544Z" fill="#5B5762"/>
                            </svg>
                        </form>
                    </div>
                </div>
                <div className="wallet1">
                    <Link to='/market' className="btn"><span>Explore</span></Link>
                </div>
                <div className="wallet1">
                    <Link to='/create' className="btn"><span>Create</span></Link>
                </div>
                <div ref={refWallet} className="wallet">
                    <WalletModal walletOpened={walletOpened} setWalletOpened={setWalletOpened}/>
                    <div className="wallet1">
                        <button className="btn" onClick={() => setWalletOpened(walletOpened => !walletOpened)}><span>Connect wallet</span></button>
                    </div>
                </div>
                <div className="header__icon">
                    <div className="header__icon-item1" onClick={() => toggleTheme()}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill={theme === 'dark-theme' ? "url(#paint0_linear_1_5512)" : '#D7D7D7'}/>
                            <path d="M21.4992 20C21.4992 15.2967 24.2054 11.2261 28.1453 9.25855C26.5336 8.45363 24.7156 8 22.7915 8C16.1641 8 10.7915 13.3726 10.7915 20C10.7915 26.6274 16.1641 32 22.7915 32C24.7156 32 26.5336 31.5464 28.1453 30.7415C24.2054 28.7739 21.4992 24.7033 21.4992 20Z" fill={theme === 'dark-theme' ? '#fff' : '#5F5F5F'}/>
                        </svg>
                    </div>
                    <div ref={refBlockchain} className="header__icon-item">
                        <div className="header__icon-item1">
                            <svg onClick={() => setBlockchainOpened(blockchainOpened => !blockchainOpened)} fill="#fff" height="40px" width="40px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-102.4 -102.4 716.80 716.80">
                                <circle cx="50" cy="100" r="1000" fill={theme === 'dark-theme' ? "url(#paint0_linear_1_5512)" : '#EA4C89'}/>
                                <path d="M42.667,273.067c4.713,0,8.533-3.82,8.533-8.533v-25.6c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.82-8.533,8.533v25.6 C34.133,269.246,37.954,273.067,42.667,273.067z"></path> <path d="M173.087,436.947l-23.163-10.9c-4.264-2.007-9.348-0.177-11.355,4.088c-2.007,4.264-0.177,9.348,4.088,11.355 l23.163,10.9c4.264,2.007,9.348,0.177,11.355-4.088C179.181,444.038,177.351,438.954,173.087,436.947z"></path> <path d="M477.867,213.333c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.821-8.533,8.533v25.6c0,4.713,3.82,8.533,8.533,8.533 s8.533-3.82,8.533-8.533V213.333z"></path> <path d="M469.333,264.533c-4.713,0-8.533,3.821-8.533,8.533v25.6c0,4.713,3.82,8.533,8.533,8.533s8.533-3.82,8.533-8.533v-25.6 C477.867,268.354,474.046,264.533,469.333,264.533z"></path> <path d="M477.867,342.189v-17.922c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.82-8.533,8.533v17.922 c-7.515,1.526-14.309,5.032-19.824,9.943c-0.323-0.297-0.666-0.58-1.043-0.832l-51.2-34.133 c-3.921-2.614-9.219-1.555-11.834,2.367c-2.614,3.921-1.555,9.219,2.367,11.834l51.2,34.133c0.105,0.07,0.215,0.127,0.322,0.192 c-2.64,5.548-4.122,11.755-4.122,18.308c0,3.796,0.502,7.474,1.433,10.977l-27.417,12.902c-4.264,2.007-6.094,7.09-4.088,11.355 c2.007,4.264,7.09,6.094,11.355,4.088l27.766-13.066c7.81,9.985,19.96,16.411,33.618,16.411C492.896,426.667,512,407.563,512,384 C512,363.36,497.341,346.142,477.867,342.189z M469.333,409.6c-14.137,0-25.6-11.463-25.6-25.6c0-14.137,11.463-25.6,25.6-25.6 c14.137,0,25.6,11.463,25.6,25.6C494.933,398.137,483.471,409.6,469.333,409.6z"></path> <path d="M362.076,426.047l-23.163,10.9c-4.264,2.007-6.094,7.09-4.088,11.355c2.007,4.264,7.09,6.094,11.355,4.088l23.163-10.9 c4.264-2.007,6.094-7.09,4.088-11.355C371.424,425.87,366.341,424.04,362.076,426.047z"></path> <path d="M308.029,451.481l-11.244,5.292c-5.363-17.432-21.593-30.106-40.784-30.106c-19.191,0-35.421,12.673-40.784,30.106 l-11.244-5.292c-4.264-2.007-9.348-0.177-11.355,4.088c-2.007,4.264-0.177,9.348,4.088,11.355l17.006,8.003 C216.451,495.844,234.334,512,256,512c21.666,0,39.549-16.156,42.29-37.074l17.005-8.003c4.264-2.007,6.094-7.09,4.088-11.355 C317.377,451.304,312.293,449.474,308.029,451.481z M256,494.933c-14.137,0-25.6-11.463-25.6-25.6 c0-14.137,11.463-25.6,25.6-25.6c14.137,0,25.6,11.463,25.6,25.6C281.6,483.471,270.137,494.933,256,494.933z"></path> <path d="M337.264,62.768l23.672,9.747c4.358,1.794,9.345-0.284,11.14-4.642s-0.284-9.345-4.641-11.14l-23.672-9.747 c-4.358-1.794-9.345,0.284-11.14,4.642C330.828,55.987,332.906,60.974,337.264,62.768z"></path> <path d="M151.064,72.516l23.672-9.747c4.358-1.794,6.436-6.782,4.642-11.14c-1.794-4.358-6.782-6.436-11.14-4.642l-23.672,9.747 c-4.358,1.794-6.436,6.782-4.642,11.14C141.719,72.232,146.706,74.31,151.064,72.516z"></path> <path d="M206.298,49.772l7.237-2.98c2.076,21.627,20.294,38.541,42.464,38.541c22.171,0,40.388-16.914,42.464-38.541l7.237,2.98 c4.358,1.794,9.345-0.284,11.14-4.642c1.794-4.358-0.284-9.345-4.642-11.14l-16.426-6.763C289.585,11.298,274.116,0,256,0 c-18.116,0-33.585,11.298-39.774,27.228L199.8,33.991c-4.358,1.794-6.436,6.782-4.642,11.14S201.941,51.567,206.298,49.772z M256,17.067c14.137,0,25.6,11.463,25.6,25.6c0,14.137-11.463,25.6-25.6,25.6c-14.137,0-25.6-11.463-25.6-25.6 C230.4,28.529,241.863,17.067,256,17.067z"></path> <path d="M349.71,203.239c-0.032-0.18-0.059-0.359-0.103-0.537c-0.038-0.153-0.091-0.299-0.137-0.448 c-0.345-1.129-0.928-2.19-1.751-3.111c-0.046-0.052-0.091-0.104-0.138-0.154c-0.179-0.19-0.366-0.373-0.567-0.55 c-0.112-0.099-0.229-0.191-0.345-0.284c-0.16-0.127-0.316-0.256-0.488-0.374c-0.318-0.22-0.65-0.418-0.995-0.593 c-0.013-0.006-0.023-0.015-0.035-0.021l-85.333-42.667c-2.402-1.201-5.23-1.201-7.632,0l-85.333,42.667 c-0.013,0.006-0.023,0.015-0.035,0.021c-0.345,0.175-0.677,0.373-0.995,0.593c-0.173,0.118-0.328,0.247-0.489,0.374 c-0.116,0.093-0.233,0.184-0.345,0.283c-0.2,0.176-0.388,0.359-0.567,0.55c-0.047,0.05-0.092,0.102-0.138,0.153 c-0.823,0.922-1.406,1.982-1.751,3.111c-0.046,0.149-0.099,0.295-0.137,0.448c-0.044,0.177-0.071,0.357-0.103,0.537 c-0.036,0.196-0.073,0.391-0.096,0.593c-0.019,0.177-0.025,0.354-0.034,0.533c-0.007,0.146-0.027,0.287-0.027,0.436v93.867 c0,3.232,1.826,6.187,4.717,7.632l85.333,42.667c0.038,0.019,0.077,0.03,0.115,0.048c0.219,0.106,0.445,0.195,0.672,0.283 c0.12,0.046,0.24,0.1,0.36,0.141c0.215,0.072,0.436,0.124,0.656,0.178c0.136,0.034,0.271,0.077,0.408,0.104 c0.194,0.038,0.392,0.055,0.588,0.079c0.161,0.02,0.322,0.05,0.482,0.06c0.177,0.011,0.356,0.002,0.535,0.002 c0.179,0,0.358,0.01,0.535-0.002c0.16-0.01,0.321-0.041,0.482-0.06c0.197-0.024,0.395-0.041,0.588-0.079 c0.136-0.027,0.271-0.07,0.408-0.104c0.221-0.054,0.441-0.107,0.656-0.178c0.121-0.04,0.24-0.094,0.36-0.141 c0.228-0.087,0.453-0.177,0.672-0.283c0.038-0.018,0.077-0.029,0.115-0.048l85.333-42.667c2.891-1.445,4.717-4.4,4.717-7.632 V204.8c0-0.148-0.02-0.29-0.027-0.436c-0.009-0.178-0.014-0.355-0.034-0.533C349.783,203.63,349.746,203.435,349.71,203.239z M256,171.674l64.521,32.26l-10.801,4.32L256,229.743l-64.521-25.808L256,171.674z M179.2,217.404l68.267,27.307v82.815 L179.2,293.393V217.404z M332.8,293.393l-68.267,34.133v-82.815l68.267-27.307V293.393z"></path> <path d="M132.733,172.1l-51.2-34.133c-0.105-0.07-0.215-0.127-0.322-0.192c2.64-5.548,4.122-11.755,4.122-18.308 c0-6.514-1.466-12.684-4.076-18.207l30.354-12.499c4.358-1.794,6.436-6.782,4.642-11.14s-6.782-6.436-11.14-4.642L73.551,85.976 c-0.962,0.396-1.805,0.955-2.528,1.621C63.484,80.885,53.554,76.8,42.667,76.8C19.104,76.8,0,95.904,0,119.467 c0,20.64,14.659,37.858,34.133,41.811v26.455c0,4.713,3.82,8.533,8.533,8.533s8.533-3.82,8.533-8.533v-26.455 c7.515-1.526,14.309-5.032,19.824-9.943c0.323,0.297,0.666,0.58,1.043,0.832l51.2,34.133c3.921,2.614,9.219,1.555,11.834-2.367 C137.714,180.012,136.655,174.714,132.733,172.1z M42.667,145.067c-14.137,0-25.6-11.463-25.6-25.6s11.463-25.6,25.6-25.6 c14.137,0,25.6,11.463,25.6,25.6S56.804,145.067,42.667,145.067z"></path> <path d="M388.733,186.3l51.2-34.133c0.377-0.251,0.719-0.534,1.043-0.832c5.515,4.911,12.309,8.417,19.824,9.943v26.455 c0,4.713,3.82,8.533,8.533,8.533s8.533-3.82,8.533-8.533v-26.455C497.341,157.324,512,140.107,512,119.467 c0-23.563-19.104-42.667-42.667-42.667c-10.887,0-20.817,4.085-28.356,10.797c-0.723-0.666-1.566-1.225-2.528-1.621 L406.887,72.98c-4.358-1.794-9.345,0.284-11.14,4.642c-1.794,4.358,0.284,9.345,4.642,11.14l30.354,12.499 c-2.611,5.523-4.076,11.693-4.076,18.207c0,6.553,1.482,12.759,4.122,18.308c-0.107,0.065-0.217,0.122-0.322,0.192l-51.2,34.133 c-3.921,2.614-4.981,7.912-2.367,11.834C379.514,187.855,384.812,188.914,388.733,186.3z M469.333,93.867 c14.137,0,25.6,11.463,25.6,25.6s-11.463,25.6-25.6,25.6c-14.137,0-25.6-11.463-25.6-25.6S455.196,93.867,469.333,93.867z"></path> <path d="M123.267,317.167l-51.2,34.133c-0.377,0.251-0.719,0.534-1.043,0.832c-5.515-4.911-12.309-8.417-19.824-9.943v-43.522 c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.82-8.533,8.533v43.522C14.659,346.142,0,363.36,0,384 c0,23.563,19.104,42.667,42.667,42.667c13.658,0,25.809-6.426,33.618-16.411l27.766,13.066c4.264,2.007,9.348,0.177,11.355-4.088 c2.007-4.264,0.177-9.348-4.088-11.355l-27.417-12.902c0.93-3.503,1.433-7.181,1.433-10.977c0-6.553-1.482-12.759-4.122-18.308 c0.107-0.065,0.217-0.122,0.322-0.192l51.2-34.133c3.921-2.614,4.981-7.912,2.367-11.834 C132.486,315.612,127.188,314.552,123.267,317.167z M42.667,409.6c-14.137,0-25.6-11.463-25.6-25.6 c0-14.137,11.463-25.6,25.6-25.6c14.137,0,25.6,11.463,25.6,25.6C68.267,398.137,56.804,409.6,42.667,409.6z"></path>
                            </svg>
                        </div>
                        <BlockchainModal blockchainOpened={blockchainOpened} setBlockchainOpened={setBlockchainOpened}/>
                    </div>
                    <div className="header__icon-item1">
                        <Link to='/login'>
                            <svg width="40" height="40" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="58.9997" cy="58.9997" r="58.7097" fill="transparent"></circle><path d="M59.0006 30C49.3909 30 41.6006 39.7382 41.6006 51.75C41.6006 63.7618 49.3909 73.5 59.0006 73.5C68.6102 73.5 76.4006 63.7618 76.4006 51.75C76.4006 39.7382 68.6102 30 59.0006 30ZM59.0006 70.6C51.0053 70.6 44.5006 62.1436 44.5006 51.75C44.5006 41.3564 51.0053 32.9 59.0006 32.9C66.9959 32.9 73.5006 41.3564 73.5006 51.75C73.5006 62.1436 66.9959 70.6 59.0006 70.6Z" fill="white"></path><path d="M71.6662 70.9805C70.8881 71.7374 70.0597 72.4179 69.1944 73.0307C71.9571 74.3144 74.3805 75.3817 76.4502 76.2855C84.1303 79.637 85.0999 80.3001 85.0999 82.1996C85.0999 83.5133 83.8064 85.0996 82.1999 85.0996H35.8C34.1934 85.0996 32.9 83.5133 32.9 82.1996C32.9 80.3001 33.8696 79.637 41.5488 76.2855C43.6194 75.3817 46.0428 74.3146 48.8046 73.0307C47.9394 72.4179 47.111 71.7373 46.3328 70.9805C34.2591 76.506 30 77.2464 30 82.1996C30 85.0996 32.5965 87.9996 35.8 87.9996H82.2C85.4035 87.9996 88 85.0996 88 82.1996C88 77.2464 83.7409 76.506 71.6662 70.9805Z" fill="white"></path></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;