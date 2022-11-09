import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useTranslation} from "react-i18next";
import Header from "../../components/Header";
import { VisibilityOutlined} from "@mui/icons-material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3, px: 3, pb: 5, minHeight: "50vh" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function RequestTabs() {
    const [value, setValue] = React.useState(0);

    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const { t } = useTranslation();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const rows = [{"id":1,"to":"Nanci","amount":"Wasling","type":"nwasling0@mediafire.com","date":"Female"},
        {"id":1,"to":"Nanci","amount":"Wasling","type":"nwasling0@mediafire.com","date":"Female"}];

    const columns = [
        {field: "id", headerName: t("ID")},
        {field: "to", headerName:  t("To Account"), width: 160, minWidth: 150, maxWidth: 250},
        {field: "amount", headerName: t("Amount"), width: 160, minWidth: 150, maxWidth: 250},
        {field: "type", headerName: t("Payment Order"), width: 250, minWidth: 200, maxWidth: 300},
        {field: "date", headerName: t("Date and Time"), width: 250, minWidth: 200, maxWidth: 300},
        {field: "view", headerName: t("View"), renderCell: ({row: {id}}) => {
                return (
                    <Link to={ "/request/view/" + id }>
                        <Button variant="outlined" sx={{ p: 1, pr: 2, mr: 1, color: colors.blueAccent[400] }}>
                            <VisibilityOutlined sx={{ color: colors.orangeAccent[400], mr: 1 }} />
                            { t("View") }
                        </Button>
                    </Link>
                )
            }
        }
        ];

    return (
        <Box m="20px" >
            <Header title={ t("Requests") } subtitle={ t("All Requests") } />
            <Box sx={{ backgroundColor: colors.primary[800], p: 1, borderRadius: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: colors.primary[800], "& .MuiTab-root.MuiTab-textColorPrimary": { fontSize: ".85rem" } }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={ t("Wait for Sign") } {...a11yProps(0)} />
                        <Tab label={ t("Ready to Payment") } {...a11yProps(1)} />
                        <Tab label={ t("Finished")} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} sx={{ p: 5 }} index={0}>
                    <Box  m="0" height="50vh" sx={{
                        "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[500],
                            minHeight: "35px !important",
                            maxHeight: "45px !important"},
                        "& .MuiButton-startIcon": { marginRight: "10px", marginLeft: "3px", color: colors.orangeAccent[400] },
                        "& .MuiButton-text": {  color: colors.blueAccent[400] },
                        "& .MuiDataGrid-columnSeparator": {  color: colors.blueAccent[500] },
                        "& .MuiDataGrid-columnHeader": {  minHeight: "35px !important", maxHeight: "45px !important" },
                        "& .MuiDataGrid-columnHeader:focus": {  outline: "none" },
                        "& .MuiDataGrid-row": {  minHeight: "40px !important",
                            maxHeight: "50px !important" },
                        "& .MuiDataGrid-cell": {  borderBottomColor: colors.primary[750],
                            minHeight: "40px !important",
                            maxHeight: "50px !important" },
                    }}>
                        <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </Box>
    );
}