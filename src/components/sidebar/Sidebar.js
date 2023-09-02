import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import downArror from '../../resourses/img/down-arrow.svg';
import ethereum from '../../resourses/img/eth.svg';
import bsc from '../../resourses/img/bsc.svg';
import polygon from '../../resourses/img/polygon.svg';

import common from '../../resourses/img/common.svg';
import rare from '../../resourses/img/rare.svg';
import epic from '../../resourses/img/epic.svg';
import legendary from '../../resourses/img/legend.svg';

import art from '../../resourses/img/art.png';
import contr from '../../resourses/img/contr.png';

import './sidebar.scss'

const LiItems = ({filter, i, expanded, setExpanded, arr = 'price'}) => {
    const isOpen = i === expanded;
    const [activeItem, setActiveItem] = useState(null);
    const [priceInputs, setPriceInputs] = useState(['', '']);
    const [inputError, setInputError] = useState(false);

    const onPriceInputs = (e) => {
        if (e.target.value.charAt(0) === ' ') {
            e.target.value = ''
        }
        setPriceInputs(priceInputs.map((item, i) => i === +e.target.name ? e.target.value : item))
        setInputError(false)
    }

    const onSubmit = () => {
        if (priceInputs.some(item => item === '') || +priceInputs[0] > +priceInputs[1]) {
            setInputError(true)
        } else {
            setInputError(false)
        }
    }

    return (
        <motion.li
            variants={variantsLi}
            className="market__li"
        >
            <motion.div className="market__slide-item" onClick={() => setExpanded(isOpen ? false : i)}>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 1 }} className="market__item">
                    <div className="market__slide-name">{filter}</div>
                    <div className={`market__slide-icon ${isOpen ? 'rotate' : ''}`}>
                        <img src={downArror} alt=""/>
                    </div>
                </motion.div>
            </motion.div>
            <AnimatePresence initial={false}>
                {isOpen && (
                <motion.section
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    className="market__section"
                    variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.32, 0.23, 1] }}
                >
                    {arr !== 'price' ? arr.map((item, i) => {
                        return (
                            <div className="market__list-item" key={i} onClick={activeItem === i ? () => setActiveItem(null) : () => setActiveItem(i)} style={{background: activeItem === i ? 'rgb(143 41 245 / 37%)' : 'rgb(35 25 34)'}}>
                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 1 }} className="market__list-text">
                                    {filter === 'Blockchain' ? <img className="icon" src={item === 'BSC' ? bsc : item === 'Ethereum' ? ethereum : item === 'Polygon' ? polygon : null} alt=""/> : null}
                                    {filter === 'Raraity' ? <img className="icon" src={item === 'Common' ? common : item === 'Rare' ? rare : item === 'Epic' ? epic : item === 'Legendary' ? legendary : null} alt=""/> : null}
                                    {filter === 'Categories' ? <img className="icon" src={item === 'Art' ? art : item === 'Game' ? contr : null} alt=""/> : null}
                                    <div className="market__list-name">{item}</div>
                                </motion.div>
                            </div>
                        )
                    }) : <>
                        <div className="search__group">
                            <div className="search__inputs">
                                <input 
                                    className="search__input search__input-price" 
                                    onInput={onPriceInputs} 
                                    type="number" name='0' 
                                    value={priceInputs[0]} 
                                    placeholder="Min"/>
                                <span className="to">to</span>
                                <input
                                    value={priceInputs[1]} 
                                    className="search__input search__input-price" 
                                    onInput={onPriceInputs} 
                                    type="number" name='1' 
                                    placeholder="Max"/>
                            </div>
                            <div className="search__error" style={{color: inputError ? '#E84D4D' : 'transparent'}}>Enter the correct value</div>
                            <div className="banner__btn banner__btn--action" onClick={onSubmit}>
                                <span>Apply</span>
                            </div>
                        </div>
                        </>
                    }
                </motion.section>
                )}
            </AnimatePresence>
        </motion.li>
    )
}

const sidebar = {
    open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
    }
    }),
    closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 400,
        damping: 40
    }
    }
};

const variantsUl = {
    open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const variantsLi = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
};

const Path = props => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="#8F29F5"
      strokeLinecap="round"
      {...props}
    />
);

const Sidebar = () => {
    const [sideOpened, setSideOpened] = useState(false);
    const ref = useRef(null);
    const refBtn = useRef(null);
    const height = useRef({ width: 0, height: 0 });
    const [expanded, setExpanded] = useState(false);
    
    useEffect(() => {
        height.current.width = ref.current.offsetWidth;
        height.current.height = ref.current.offsetHeight;
    }, []);

    useEffect(() => {
        const clickOutElement = (e) => {
            if (sideOpened && ref.current && !ref.current.contains(e.target) && refBtn.current && !refBtn.current.contains(e.target)) {
                setSideOpened(false)
            }
        }
    
        document.addEventListener("mousedown", clickOutElement)
    
        return function() {
          document.removeEventListener("mousedown", clickOutElement)
        }
    }, [sideOpened])
  
    return (
        <>
        <motion.button ref={refBtn} className="market__button" onClick={() => setSideOpened(sideOpened => !sideOpened)} animate={sideOpened ? "open" : "closed"}>
                <svg width="27" height="27" viewBox="0 0 23 23">
                <Path
                    variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                    }}
                />
                <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                    }}
                    transition={{ duration: 0.1 }}
                />
                <Path
                    variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                    }}
                />
                </svg>
        </motion.button>
        <motion.aside
            className="market__nav"
            initial={false}
            variants={{
                closed: { transition: {
                    delay: 0.7
                },zIndex:-1 },
                open: { zIndex:10 }
            }}
            animate={sideOpened ? "open" : "closed"}
            custom={height.current}
            ref={ref}
        >
            <motion.div className="background" variants={sidebar} />
            <motion.ul variants={variantsUl} className="market__ul">
                <LiItems filter={'Categories'} i={0} expanded={expanded} setExpanded={setExpanded} arr={['Art', 'Game']}/>
                <LiItems filter={'Price'} i={1} expanded={expanded} setExpanded={setExpanded}/>
                <LiItems filter={'Raraity'} i={2} expanded={expanded} setExpanded={setExpanded} arr={['Common', 'Rare', 'Epic', 'Legendary']}/>
                <LiItems filter={'Collections'} i={3} expanded={expanded} setExpanded={setExpanded} arr={['main', 'support', 'second']}/>
                <LiItems filter={'Blockchain'} i={4} expanded={expanded} setExpanded={setExpanded} arr={['BSC', 'Ethereum', 'Polygon']}/>
            </motion.ul>
        </motion.aside>
        </>
    );
};

export default Sidebar;
  