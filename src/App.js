import {ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./views/global/Topbar";
import Aside from "./views/global/Sidebar";
import Dashboard from "./views/dashboard/index"
import Page1 from "./views/page1/index"
import Page2 from "./views/page2/index"
import Page3 from "./views/page3/index"
import {Route, Routes} from "react-router-dom";
import Grid from "./views/grid";
import MediaCard from "./views/card";


function App() {

  const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                  <Aside></Aside>
                  <main className="content">
                      <Topbar></Topbar>
                      <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/grid" element={<Grid />} />
                          <Route path="/link1" element={<Page1 />} />
                          <Route path="/link2" element={<Page2 />} />
                          <Route path="/link3" element={<Page3 />} />
                          <Route path="/card" element={<MediaCard />} />
                      </Routes>
                  </main>
              </div>
          </ThemeProvider>
      </ColorModeContext.Provider>

  );
}

export default App;
