import { useRef, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { fetchProjectList, selectAll } from "./projectListSlice";

import loadingImg from '../../resourses/img/loading.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './projectList.scss';
import '../../style/style.scss';

const ProjectListItem = ({item}) => {
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);
    const [fakeLoading, setFakeLoading] = useState(true);
    const {img, name, text} = item;

   useEffect(() => {
        setTimeout(() => {
            setFakeLoading(false)
        }, 1000)
   }, [])

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
                        src={fakeLoading ? undefined : img}
                        alt='img'
                    />
                </div>
                <div className="launchpad__group">
                    <div className="launchpad__item-title">{name}</div>
                    <div className="launchpad__item-text">{text}</div>
                    <Link to="/project" className="projects__btn"><span>View</span></Link>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectList = () => {
    const {projectListLoadingStatus, totalCount} = useSelector(state => state.projectList);
    const projectList = selectAll(store.getState());

    const skeletons = ['', '', '', '', '', ''];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjectList());
    }, [])

    const projectItemsList = projectList.map(item => {
        return <ProjectListItem key={item.id} item={item}/>
    })

    const skeletonList = skeletons.map((item, i) => {
        return (
            <div key={i} className="skeleton">
                <div className="skeleton-project skeleton-project--list skeleton--wave"/>
            </div>
            
        )
    })

    return (
        <>
            <div style={{minHeight: '845px'}}>
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        key={projectListLoadingStatus === 'loading'}
                        className="launchpad__list"
                    >
                        {projectListLoadingStatus === 'loading' ? skeletonList : projectItemsList}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div style={{minHeight: '50px', display: totalCount < 6 ? 'none' : 'block'}}>
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        key={projectListLoadingStatus}
                    >
                        {projectListLoadingStatus === 'loading' || projectListLoadingStatus === 'updateLoading' ? <span className="loader"></span> : 
                        totalCount < 6 ? '' : 
                        <div className="btnLoad" onClick={() => {dispatch(fetchProjectList())}}>
                            <div className="btn"><span>Load more</span></div>
                        </div>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
};

export default ProjectList;