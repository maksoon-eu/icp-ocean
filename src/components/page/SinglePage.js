import Single from '../single/Single';
import { motion } from "framer-motion";

const SinglePage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <Single/>
        </motion.div>
    );
};

export default SinglePage;