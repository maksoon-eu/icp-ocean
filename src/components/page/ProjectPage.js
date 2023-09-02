import React from 'react';
import ProjectBanner from '../projectBanner/ProjectBanner';
import { motion } from "framer-motion";

const ProjectPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <ProjectBanner/>
        </motion.div>
    );
};

export default ProjectPage;