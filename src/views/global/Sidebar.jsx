import { useState } from 'react';
import { Box, useTheme, IconButton, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import {
    CardMembershipOutlined,
    DashboardOutlined,
    GridOnOutlined,
    HomeOutlined,
    MenuOutlined
} from "@mui/icons-material";

const Item = ({title, to, icon, selected, setSelected}) => {
    return (<MenuItem
                active={selected === title}
                icon={icon}
                onClick={() => setSelected(title)}
                routerLink={<Link to={to} />}
            >
        {title}
    </MenuItem>);
}

const Aside = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const { collapseSidebar, collapsed } = useProSidebar();
    const [selected, setSelected] = useState("Dashboard")

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
                 alignItems="center" mt="10px" mr="20px">
                {!collapsed && (
                    <Typography variant="h4" color={colors.grey[100]}>Mahta</Typography>
                )}
                <IconButton onClick={() => collapseSidebar()}>
                    <MenuOutlined />
                </IconButton>
            </Box>
            <Box>
                <Menu>
                    <SubMenu icon={<DashboardOutlined />} label="Submenu">
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
                    <Item title="Card" icon={<CardMembershipOutlined />} to="/card"
                          selected={selected} setSelected={setSelected} />
                    <Item title="Form" icon={<CardMembershipOutlined />} to="/form"
                          selected={selected} setSelected={setSelected} />
                </Menu>
            </Box>
        </Sidebar>
    </Box>)
}

export default Aside;