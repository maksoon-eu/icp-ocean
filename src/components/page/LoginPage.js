import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useContext } from "react";
import { LoginKeyContext } from "../loginKey/LoginKey";

import ConnectWallet from "../connectWallet/ConnectWallet";
import Registration from "../registartion/Registration";
import MyAccount from "../myAccount/MyAccount";

const LoginPage = ({setWalletOpened}) => {
    const { loginKey, toggleLoginKey } = useContext(LoginKeyContext);

    useEffect(() => {
        if (localStorage.getItem('wallet') === 'trust' || localStorage.getItem('wallet') === 'metamask') {
            if (loginKey !== 'registr') {
                toggleLoginKey('choose')
            }
        } else {
            toggleLoginKey('null')
            localStorage.removeItem('user')
        }
    }, [localStorage.getItem('wallet')])

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    key={loginKey}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {loginKey === 'null' ? <ConnectWallet setWalletOpened={setWalletOpened}/> : loginKey === 'registr' ? <MyAccount/> : <Registration/>}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default LoginPage;