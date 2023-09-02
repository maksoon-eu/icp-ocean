import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import banner from '../../resourses/img/register-banner.png';
import loadingImg from '../../resourses/img/loading.svg';

import './connectWallet.scss';

const ConnectWallet = ({setWalletOpened}) => {
    return (
        <div className='connectWallet'>
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
            <div className="connectWallet__inner">
                <div className="connectWallet__title">My Account</div>
                <div className="connectWallet__subtitle">Manage your account, profile details and view your collections</div>
                <div className="connectWallet__btn">
                    <button className="btn btn-login" onClick={() => setWalletOpened(true)}><span>Connect wallet</span></button>
                </div>
            </div>
        </div>
    );
};

export default ConnectWallet;