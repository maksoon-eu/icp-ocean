import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "../src/components/theme/Theme";
import { LoginKeyProvider } from './components/loginKey/LoginKey';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';

import App from './components/app/App';
import store from './store';

import './style/style.scss';

WebFont.load({
   google: {
        families: ['Nunito:400,600,700', 'sans-serif']
   }
});

const Root = () => <Router><App /></Router>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <ThemeProvider>
        <LoginKeyProvider>
            <Provider store={store}>
                <Root/>
            </Provider>
        </LoginKeyProvider>
    </ThemeProvider>
    // </React.StrictMode>
);
