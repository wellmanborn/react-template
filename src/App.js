import {ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import Aside from "./views/global/Sidebar";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import MediaCard from "./views/card";
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import PaymentOrderForm from "./views/form";
import RequestTabs from "./views/request";
import SignIn from "./views/signin";
import {useEffect, useState} from "react";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [theme, colorMode] = useMode();

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem("login") !== "false";
        if(!login) {
            if(location.pathname !== "/login")
                navigate('/login');
        }
    }, [])

    useEffect(() => {
        let isLoggedIn = localStorage.getItem("login") !== "false";
        setIsLoggedIn(isLoggedIn)
    }, [location]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        { isLoggedIn && <Aside/> }
                        <main className="content">
                            { isLoggedIn && <Topbar/> }
                            <Routes>
                                <Route exact path="/accounts" element={ <MediaCard /> } />
                                <Route exact path="/account/view/:id" element={ <PaymentOrderForm /> } />
                                <Route exact path="/request/view/:id" element={ <RequestTabs /> } />
                                <Route exact path="/login" element={ <SignIn /> } />
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </ColorModeContext.Provider>

    );
}

export default App;
