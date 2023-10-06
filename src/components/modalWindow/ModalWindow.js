import { motion } from 'framer-motion';

import './modalWindow.scss';

const ModalWindow = ({openModal, type}) => {
    return (
            <motion.div 
                variants={{
                    open: {
                        opacity: 1,
                        y: 0,
                        zIndex: 50
                    },
                    closed: {
                        opacity: 0,
                        y: -100,
                        zIndex: -1
                    }
                }}
                initial={{opacity: 0, y: -100, zIndex: -1}}
                animate={openModal ? "open" : "closed"}
                className="modal__thanks"
            >
                <div className="modal__thanks-content">
                    <div className="modal__thanks-title">Success!</div>
                    <div className="modal__thanks-text">{`Your ${type} will appear on the site after moderation`}</div>
                </div>
            </motion.div>
    );
};

export default ModalWindow;