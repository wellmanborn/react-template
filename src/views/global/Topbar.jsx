import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import { LightModeOutlined } from "@mui/icons-material";
import {DarkModeOutlined} from "@mui/icons-material";
import {NotificationsOutlined} from "@mui/icons-material";
import {SettingsOutlined} from "@mui/icons-material";
import {PersonOutlined} from "@mui/icons-material";
import {Search} from "@mui/icons-material";

const Topbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext)

    return (<Box backgroundColor={colors.primary[800]} display="flex" justifyContent="space-between" p={1}>
        <Box display="flex"
             backgroundColor={colors.primary[700]}
             borderRadius="3px"
        >
            <InputBase sx={{ mr: 2, flex:1 }} placeholder="Search" />
            <IconButton type="button" sx={{p:1}}>
                <Search sx={{ color: colors.orangeAccent[500] }} />
            </IconButton>
        </Box>

        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined sx={{ color: colors.orangeAccent[500] }} />
                ) : (
                    <LightModeOutlined sx={{ color: colors.orangeAccent[500] }} />
                )}
            </IconButton>
            <IconButton>
                <NotificationsOutlined sx={{ color: colors.orangeAccent[500] }} />
            </IconButton>
            <IconButton>
                <SettingsOutlined sx={{ color: colors.orangeAccent[500] }} />
            </IconButton>
            <IconButton>
                <PersonOutlined sx={{ color: colors.orangeAccent[500] }} />
            </IconButton>
        </Box>

    </Box>)
}

export default Topbar;