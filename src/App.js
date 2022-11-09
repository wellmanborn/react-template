import {ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import Aside from "./views/global/Sidebar";
import Dashboard from "./views/dashboard/index"
// import Page1 from "./views/page1/index"
// import Page2 from "./views/page2/index"
// import Page3 from "./views/page3/index"
import {Route, Routes} from "react-router-dom";
//import Grid from "./views/grid";
import MediaCard from "./views/card";
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import PaymentOrderForm from "./views/form";
import RequestTabs from "./views/request";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function App() {

    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <Aside/>
                        <main className="content">
                            <Topbar/>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                {/*<Route path="/form" element={<PaymentOrderForm />} />*/}
                                {/*<Route path="/grid" element={<Grid />} />
                                <Route path="/form" element={<Form />} />
                                <Route path="/link1" element={<Page1 />} />
                                <Route path="/link2" element={<Page2 />} />
                                <Route path="/link3" element={<Page3 />} />*/}
                                <Route path="/accounts" element={<MediaCard />} />
                                <Route path="/account/view/:id" element={<PaymentOrderForm />} />
                                <Route path="/request/view/:id" element={<RequestTabs />} />
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </ColorModeContext.Provider>

    );
}

export default App;
