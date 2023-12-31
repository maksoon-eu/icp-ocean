import PersonBanner from '../personBanner/PersonBanner';
import { motion } from "framer-motion";
import PersonTabs from '../personTabs/PersonTabs';

const PersonPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <PersonBanner/>
            <PersonTabs/>
        </motion.div>
    );
};

export default PersonPage;