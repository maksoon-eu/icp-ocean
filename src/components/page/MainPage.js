import ItemsSlider from "../itemsSlider/ItemsSlider";
import MainBanner from "../mainBanner/MainBanner";
import ProjectSlider from "../projectSlider/ProjectSlider";
import { motion } from "framer-motion";

import fire from '../../resourses/img/fire.svg';
import money from '../../resourses/img/money.png';
import strange from '../../resourses/img/strange.png';
import creativ from '../../resourses/img/creativ.png';


const MainPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <MainBanner/>
            <ProjectSlider/>
            <ItemsSlider img={fire} title={'The hottest products of this week'}/>
            <ItemsSlider img={strange} title={'The most mysterious products of the week'}/>
            <ItemsSlider img={creativ} title={'The most creative products of the week'}/>
            <ItemsSlider img={money} title={'The most expensive products of the week'}/>
        </motion.div>
    );
};

export default MainPage;