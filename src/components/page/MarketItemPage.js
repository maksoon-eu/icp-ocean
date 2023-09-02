import ItemsSlider from '../itemsSlider/ItemsSlider';
import ChooseItem from '../chooseItem/ChooseItem';
import MarketBanner from '../marketBanner/MarketBanner';
import { motion } from "framer-motion";

import ghost from '../../resourses/img/ghost.png';

const MarketItemPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <MarketBanner/>
            <ChooseItem/>
            <ItemsSlider img={ghost} title={'We recommend products for you'}/>
        </motion.div>
    );
};

export default MarketItemPage;