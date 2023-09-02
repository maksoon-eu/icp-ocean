import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import './personTabs.scss';

const FirstTab = () => {
    return (
        <div>ddsdsdsdsdsd</div>
    )
}

const SecondTab = () => {
    return (
        <div>eseseseseseses</div>
    )
}

const ThirdTab = () => {
    return (
        <div>eseseseseseses</div>
    )
}

const PersonTabs = () => {
    const [activeTab, setActiveTab] = useState ( "tab1" );

    return (
        <>
            <div className="personTabs__title">ArtStudio_nft Account</div>
            <div className="personTabs__subtitle">Look at the other person's aitems and collections</div>
            <div className="personTabs__tabs">
                <div onClick={() => setActiveTab('tab1')} className="btn btn--tab"><span>All NFT</span></div>
                <div onClick={() => setActiveTab('tab2')} className="btn btn--tab"><span>Collections</span></div>
                <div onClick={() => setActiveTab('tab3')} className="btn btn--tab"><span>On sale</span></div>
            </div>
            <div className="personTabs__content">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'tab1' ? <FirstTab/> : activeTab === 'tab2' ? <SecondTab/> : <ThirdTab/>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
};

export default PersonTabs;