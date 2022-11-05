import { useState } from 'react';
import { Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { Sidebar, Menu, MenuItem/*, SubMenu*/, useProSidebar } from 'react-pro-sidebar';
import { Link, Outlet } from "react-router-dom";
import noorLogo from "../../assets/noor-logo.png";
import {
    CardMembershipOutlined,
    // DashboardOutlined,
    // GridOnOutlined,
    // HomeOutlined, Image,
    MenuOutlined,
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

const Item = ({title, to, icon, selected, setSelected}) => {
    const { t } = useTranslation();
    return (<MenuItem
                active={selected === title}
                icon={icon}
                onClick={() => setSelected(title)}
                routerLink={<Link to={to} />}
            >
        {t(title)}
    </MenuItem>);
}

const Aside = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { collapseSidebar, collapsed } = useProSidebar();
    const [selected, setSelected] = useState("Accounts")

    return (<Box sx={{
        "& .sidebar-inner": { background: `${colors.primary[800]} !important` },
        "& .menu-anchor:hover": { background: `${colors.primary[700]} !important` },
        "& ul ul .menu-item .menu-anchor": { paddingRight: `30px !important`, background: `${colors.primary[750]} !important` },
        "& ul .menu-item .menu-anchor": { background: `${colors.primary[800]} !important`,
                                             color:  `${colors.primary[100]} !important` },
        "& ul .menu-item.active .menu-anchor": { background: `${colors.primary[700]} !important` },
        "& ul ul .menu-item .menu-anchor:hover": { background: `${colors.primary[700]} !important` },
    }} style={{ display: 'flex', height: '100%'}}>
        <Sidebar width="250px" rtl={true}>
            <Box display="flex" justifyContent="space-between"
                 alignItems="center" m="8px 20px">
                {!collapsed && (
                    <img width="35px" src={noorLogo} alt="fireSpot"/>
                )}
                <IconButton onClick={() => collapseSidebar()}>
                    <MenuOutlined />
                </IconButton>
            </Box>
            <Box>
                <Menu>
                    <Item title="Accounts" icon={<CardMembershipOutlined />} to="/accounts"
                          selected={selected} setSelected={setSelected} />
                    {/*<SubMenu icon={<DashboardOutlined />} label="Submenu">
                        <Item title="Dashboard" icon="" to="/"
                              selected={selected} setSelected={setSelected} />
                        <Item title="Link 1" icon="" to="/link1"
                              selected={selected} setSelected={setSelected} />
                        <Item title="Link 2" icon="" to="/link2"
                              selected={selected} setSelected={setSelected} />
                    </SubMenu>
                    <Item title="Link 3" icon={<HomeOutlined />} to="/link3"
                          selected={selected} setSelected={setSelected} />
                    <Item title="Grid" icon={<GridOnOutlined />} to="/grid"
                          selected={selected} setSelected={setSelected} />

                    <Item title="Form" icon={<CardMembershipOutlined />} to="/form"
                          selected={selected} setSelected={setSelected} />*/}
                    <Outlet />
                </Menu>
            </Box>
        </Sidebar>
    </Box>)
}

export default Aside;