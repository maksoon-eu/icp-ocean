import LaunchpadSlider from "../launchpadSlider/LaunchpadSlider";
import ProjectList from "../projectList/ProjectList";
import { motion } from "framer-motion";

const LaunchpadPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <LaunchpadSlider/>
            <ProjectList/>
        </motion.div>
    );
};

export default LaunchpadPage;