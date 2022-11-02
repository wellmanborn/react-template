import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from '../theme';
import {useTranslation} from "react-i18next";


const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { t } = useTranslation();

    return <Box mb="30px">
        <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px"}}>
            {t(title)}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>{t(subtitle)}</Typography>
    </Box>
}

export default Header;