import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Grid, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useTranslation} from "react-i18next";
import Header from "../../components/Header";
import {AddOutlined, TrendingUpOutlined, VisibilityOutlined} from "@mui/icons-material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import noorLogo from "../../assets/noor-logo.png";
import {numberFormat} from "../../components/Functions";
import {useEffect} from "react";
import axios from "axios";

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
                    {children}
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
    const [requests, setRequests] = React.useState([]);

    useEffect(() => {
        const url = "http://127.0.0.1:8000/api/waitForSign";

        const fetchData = async () => {
            try {
                let data = {};
                axios
                    .post(url, data, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                    .then((response) => {
                        setRequests(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();

    }, []);

    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const { t } = useTranslation();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {setValue(newValue);};

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
                    <Box display="flex">
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            {requests.map(elem => (
                                <Grid item xs={12} sm={6} md={3} key={requests.indexOf(elem)}>
                                    <Card sx={{backgroundColor: colors.primary[800], p: 1}}>
                                        <CardContent>
                                            <Box sx={{ display: "flex", justifyContent: "flex-start"}}>
                                                <Box sx={{ display: "flex-item",
                                                    borderColor: colors.primary[500],
                                                    borderStyle: "solid",
                                                    borderWidth: "2px",
                                                    width: "50px",
                                                    height: "50px",
                                                    pl: "5px",
                                                    pt: "5px",
                                                    mr: "20px",
                                                    mt: "15px",
                                                    borderRadius: "25px"}}>
                                                    <img width="35px" src={noorLogo} alt="NoorBank"/>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h4" sx={{ mt: 1, mb: 2 }} gutterBottom>
                                                        { t("To") } {elem.name}
                                                    </Typography>
                                                    <Typography variant="h5" sx={{ color: colors.orangeAccent[400] }}>
                                                        { elem.type }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography sx={{ mt:2, color: colors.orangeAccent[500] }}>
                                                { t("Price") }: {numberFormat(elem.price)} {t("Rls.")}
                                            </Typography>
                                            <Typography sx={{ mt:2, color: colors.orangeAccent[500] }}>
                                                { t("Date and Time") }: {elem.date}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
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