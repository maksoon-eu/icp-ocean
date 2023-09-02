import Sidebar from "../sidebar/Sidebar";
import MarketList from "../marketList/MarketList";
import { motion } from "framer-motion";

const MarketPage = () => {
    return (
        <motion.div
        className="marketPage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <Sidebar/>
            <MarketList/>
        </motion.div>
    );
};

export default MarketPage;