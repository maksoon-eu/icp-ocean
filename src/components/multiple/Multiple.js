import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginKeyContext } from "../loginKey/LoginKey";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import ModalWindow from "../modalWindow/ModalWindow";
import { itemCreated } from "../myTabs/collectionSlice";

import multiple from '../../resourses/img/multiple.svg';
import user from '../../resourses/img/user.png'

import '../../components/registartion/registration.scss';
import '../../components/single/single.scss';
import './multiple.scss';

const Multiple = () => {
    const [licked, setLicked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [inputs, setInputs] = useState(['', '', '', '']);
    const [inputError, setInputError] = useState(false);
    const refPhoto = useRef(null);

    const {loginKey} = useContext(LoginKeyContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        if (loginKey !== 'registr') {
            navigate("/login");
        }
    }, [loginKey])

    const onInputsChange = (e) => {
        setInputError(false)

        if (e.target.value.charAt(0) === ' ') {
            e.target.value = ''
        }

        setInputs(inputs => inputs.map((item, i) => i === +e.target.name ? e.target.value : item))
    }

    const onLicked = () => {
        setLicked(licked => licked ? false : true)
    }

    const onSubmit = () => {
        if (inputs[0] === '' || inputs[1] === '' || inputs[2] === '' || refPhoto.current.currentSrc === '' || +inputs[3] < 2) {
            setInputError(true)
        } else {
            setInputError(false)
            sendingCollection()
            setOpenModal(true)
            setTimeout(() => {
                document.body.style.position = 'fixed';
                document.body.style.overflowY = 'scroll';
                document.body.style.width = '100%';
            }, 700)
            document.body.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setTimeout(() => {
                setOpenModal(false);
                document.body.style.position = 'relative';
                navigate("/");
            }, 2500)
        }
    }

    const sendingCollection = () => {
        // const newCollection = {
        //     id: uuidv4(),
        //     img: refPhoto.current.src,
        //     name: inputs[0],
        //     describe: inputs[1],
        //     copies: inputs[3],
        //     price: inputs[2]
        // }

        // request("https://icp-ocean-api.vercel.app/userCollection", "POST", JSON.stringify(newCollection))
        //     .then(dispatch(itemCreated(newCollection)))
        //     .catch(err => console.log(err))
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
            setInputError(false)
        }
    }

    return (
        <div className="single">
            <ModalWindow openModal={openModal} type={'collection'}/>
            <div className="single__inner">
                <div className="single__inner-top">
                    <img style={{minHeight: '80px'}} src={multiple} alt=""/>
                    <div className="single__inner-title">Collection <span className="input-title"></span> NFT</div>
                </div>
                <div className="single__inner-flex">
                    <div className="single__inner-descr">
                        <div className="single__inner-title">
                            The name of your collection
                        </div>
                        <input className="line" type="text" placeholder="Enter the name of your nft" name='0' value={inputs[0]} onChange={onInputsChange}/>
        
                        <div className="single__inner-title">
                            Description
                        </div>
                        <input className="line line-chek" type="text" placeholder="Write a description of your nft" name='1' value={inputs[1]} onChange={onInputsChange}/>
        
                        <div className="single__inner-title">
                            Price
                        </div>
                        <input className="line" type="number" placeholder="Write the price of your offer" name='2' value={inputs[2]} onChange={onInputsChange}/>
                        <div className="single__inner-desc">Service fee <span>2.5%</span></div>
                        <div className="single__inner-desc">You will receive <span><span className="procent">0</span> ICP</span></div>
                        <div className="multiple">
                            <div className="create__box-title">
                                Number of copies
                            </div>
                            <input className="line multip-input" type="text" placeholder="Write the number of copies" name='3' value={inputs[3]} onChange={onInputsChange}/>
                        </div>
                    </div>
        
                    <div className="single__inner-photo">
                        <div className="single__photo-group">
                            <div>
                                <div className="single__photo-title name__work">{inputs[0] === '' ? '...' : inputs[0]}</div>
                                <div className="single__photo-subtitle">Owner: artstudio</div>
                            </div>
                            <div>
                                <div className="single__photo-text">Preview</div>
                                <div className="items__slider-hurt single__photo-like" onClick={onLicked}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.99998 16.9986C8.74373 16.9986 8.49667 16.9058 8.30414 16.7371C7.57698 16.1013 6.87592 15.5038 6.25739 14.9767L6.25423 14.974C4.4408 13.4286 2.87484 12.094 1.78527 10.7794C0.567305 9.30968 0 7.9162 0 6.39391C0 4.91487 0.507155 3.55037 1.42795 2.55157C2.35972 1.54097 3.63825 0.984375 5.02843 0.984375C6.06746 0.984375 7.01901 1.31287 7.85658 1.96065C8.27928 2.28763 8.66243 2.68781 8.99998 3.15459C9.33767 2.68781 9.72069 2.28763 10.1435 1.96065C10.9811 1.31287 11.9326 0.984375 12.9717 0.984375C14.3617 0.984375 15.6404 1.54097 16.5722 2.55157C17.4929 3.55037 18 4.91487 18 6.39391C18 7.9162 17.4328 9.30968 16.2148 10.7792C15.1253 12.094 13.5594 13.4285 11.7463 14.9737C11.1267 15.5016 10.4245 16.1001 9.69569 16.7374C9.50329 16.9058 9.2561 16.9986 8.99998 16.9986ZM5.02843 2.03879C3.93626 2.03879 2.93293 2.47467 2.20303 3.26624C1.46228 4.06975 1.05427 5.18047 1.05427 6.39391C1.05427 7.67422 1.53012 8.81927 2.59703 10.1066C3.62823 11.3509 5.16205 12.658 6.93799 14.1715L6.94129 14.1743C7.56215 14.7034 8.26596 15.3033 8.99847 15.9438C9.73538 15.302 10.4403 14.7012 11.0624 14.1713C12.8382 12.6578 14.3719 11.3509 15.4031 10.1066C16.4698 8.81927 16.9457 7.67422 16.9457 6.39391C16.9457 5.18047 16.5377 4.06975 15.7969 3.26624C15.0672 2.47467 14.0637 2.03879 12.9717 2.03879C12.1716 2.03879 11.437 2.29312 10.7884 2.79465C10.2104 3.24179 9.80775 3.80704 9.57168 4.20255C9.45028 4.40593 9.2366 4.52733 8.99998 4.52733C8.76336 4.52733 8.54968 4.40593 8.42828 4.20255C8.19235 3.80704 7.7897 3.24179 7.21155 2.79465C6.56295 2.29312 5.82837 2.03879 5.02843 2.03879Z" fill={licked ? '#DB4D4D' : '#C0C0C0'}/>
                                    </svg>
                                    <div className="items__slider-text">{+licked}</div>
                                </div>
                            </div>
                        </div>
                        <div className="single__photo-block" onClick={() => document.querySelector('.input__turn').click()}>
                            <img ref={refPhoto} src="" alt="" className="input__img"/>
                            <div className="single__photo-rashir">
                                PNG, GIF, WEBP, MP4.<br/>Max 100 MB.
                            </div>
                            <div className="wallet1">
                                <button className="btn"><span>Upload</span></button>
                            </div>
                            <div>
                                <input className="input__turn" type="file" onInput={(e) => previewFile(e, refPhoto)}/>
                            </div>
                        </div>
                        <div className="single__photo-group">
                            <div>
                                <div className="single__photo-subtitle">Current bid:</div>
                                <div className="single__photo-price">{inputs[2].length > 5 ? inputs[2].slice(0, 5)+ '...' : inputs[2]} ETH</div>
                            </div>
                            <div className="single__photo-photo">
                                <img src={user} alt=""/>
                                <div className="single__photo-text">@myprofile</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="single__error" style={{color: inputError ? '#E84D4D' : 'transparent'}}>Fill in the required fields correctly</div>
                <div className="wallet1 wallet1--single">
                    <button className="btn" onClick={onSubmit}><span>Create collection</span></button>
                </div>
            </div>
        </div>
    );
};

export default Multiple;