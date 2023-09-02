import { useRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";

import loadingImg from '../../resourses/img/loading.svg';
import item from '../../resourses/img/item.png';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './projectList.scss';

const ProjectListItem = () => {
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);

    useEffect(() => {
        if (onScreen) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: {
                duration: 0.6,
                ease: "easeOut"
                }
            });
        }
    }, [onScreen, controls]);

    return (
        <motion.div
            ref={rootRef}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            exit={{ opacity: 0, y: -20 }}
            variants={{
                open: {
                    opacity: 1, y: 0
                },
                closed: {
                    opacity: 0, y: 20
                }
            }}
        >
            <div className="launchpad__item">
                <div className="launchpad__item-photo">
                    <LazyLoadImage 
                        width='100%' height='100%'
                        placeholderSrc={loadingImg}
                        effect="blur"
                        src={item}
                        alt='img'
                    />
                </div>
                <div className="launchpad__group">
                    <div className="launchpad__item-title">Name Project</div>
                    <div className="launchpad__item-text">
                        <p>But even if you buy and you come across a regular one, you will still have advantages over other players who do not have NFT Name Project!</p>
                        <p>But even if you buy and you come across a regular one, you will still have advantages over other players who do not have NFT Name Project!</p>
                    </div>
                    <Link to="/project" className="projects__btn"><span>View</span></Link>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectList = () => {
    return (
        <>
            <div className='launcpad__list'>
                <ProjectListItem/>
                <ProjectListItem/>
                <ProjectListItem/>
                <ProjectListItem/>
                <ProjectListItem/>
                <ProjectListItem/>
            </div>
            <div className="btnLoad">
                <div className="btn"><span>Load more</span></div>
            </div>
        </>
    );
};

export default ProjectList;