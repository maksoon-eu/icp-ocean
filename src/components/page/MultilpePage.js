import Multiple from '../multiple/Multiple';
import { motion } from "framer-motion";

const MultilpePage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <Multiple/>
        </motion.div>
    );
};

export default MultilpePage;