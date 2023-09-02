import React, { useLayoutEffect, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeContext } from "../theme/Theme";

import Header from "../header/Header";
import MainPage from "../page/MainPage";
import LaunchpadPage from "../page/LaunchpadPage";
import CreatePage from "../page/CreatePage";
import MarketPage from "../page/MarketPage";
import SingupPage from "../page/SingupPage";
import LoginPage from "../page/LoginPage";
import Footer from "../footer/Footer";
import MarketItemPage from "../page/MarketItemPage";
import ProjectPage from "../page/ProjectPage";
import MultilpePage from "../page/MultilpePage";
import SinglePage from "../page/SinglePage";
import PersonPage from "../page/PersonPage";

import '../../style/style.scss';

const Wrapper = ({children}) => {
    const location = useLocation();

    useLayoutEffect(() => {
        document.body.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, [location.pathname]);

    return children
} 

const App = () => {
    const [walletOpened, setWalletOpened] = useState(false);

    const location = useLocation();

    const { theme } = useContext(ThemeContext);
    document.querySelector('html').className = theme;

    return (
        <div className={`app ${theme}`}>
            <Header walletOpened={walletOpened} setWalletOpened={setWalletOpened}/>
            <Wrapper>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/launchpad" element={<LaunchpadPage/>}/>
                        <Route path="/create" element={<CreatePage/>}/>
                        <Route path="/market" element={<MarketPage/>}/>
                        <Route path="/login" element={<LoginPage setWalletOpened={setWalletOpened} />}/>
                        <Route path="/singup" element={<SingupPage/>}/>
                        <Route path="/itemId" element={<MarketItemPage/>}/>
                        <Route path="/project" element={<ProjectPage/>}/>
                        <Route path="/artstudio" element={<PersonPage/>}/>
                        <Route path="/create/single" element={<SinglePage/>}/>
                        <Route path="/create/multiple" element={<MultilpePage/>}/>
                    </Routes>
                </AnimatePresence>
            </Wrapper>
            <Footer/>
        </div>
    );
};

export default App;