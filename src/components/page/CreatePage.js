import Create from "../create/Create";
import { motion } from "framer-motion";

const CreatePage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <Create/>
        </motion.div>
    );
};

export default CreatePage;