import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, Grid, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {AddOutlined, TrendingUpOutlined, VisibilityOutlined} from "@mui/icons-material";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {numberFormat} from "../../components/Functions";
import axios from "axios";
import ReactLoading from 'react-loading';

export default function MediaCard() {

    const [data, setData] = useState([]);

    const [showLoading, setShowLoading] = useState(true);

    const {t} = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const url = "http://mahta.local/api/getAccounts";

        let token = localStorage.getItem("token")

        try {
            axios.post(url, {}, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }).then((response) => {
                console.log( )
                if(response.data.code === "0") {
                    setData(response.data.result.accounts);
                    setShowLoading(false);
                }
                //setData(response.data);

            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log("error", error);
        }

    }, []);

    return (
        <Box m="20px" sx={{ height: "calc(100% - 100px)" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Accounts" subtitle="All Active Accounts"/>
            </Box>
            <Box sx={{ display: showLoading ? "flex" : "none", height: "calc(100% - 100px)",
                justifyContent: "center", alignItems: "center" }}>
                <ReactLoading type="bars" color={ colors.primary[400] } />
            </Box>
            <Box display="flex">
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {data.map(elem => (
                        <Grid item xs={12} sm={6} md={4} key={data.indexOf(elem)}>
                            <Card sx={{backgroundColor: colors.primary[800], p: 1}}>
                                <CardContent>
                                    <Typography variant="h4" sx={{mt: 1, mb: 2}} gutterBottom>
                                        {elem.accountTitle.toString()}
                                    </Typography>
                                    <Typography variant="h5" sx={{color: colors.orangeAccent[400]}}>
                                        {t("Account Number")}: {elem.accountNumber.toString()}
                                    </Typography>
                                    <Typography sx={{mt: 1, color: colors.orangeAccent[400]}}>
                                        {elem.accountType.toString()}
                                    </Typography>
                                    <Typography sx={{mt: 1, color: colors.orangeAccent[400]}}>
                                        {t("Balance")}: {numberFormat(parseInt(elem.accountBalance ? elem.accountBalance : 0))} {t("Rls.")}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                                    <Link to={"/account/view/" + elem.accountNumber}>
                                        <Button variant="outlined" sx={{p: 1, pr: 2, color: colors.orangeAccent[400]}}>
                                            <AddOutlined sx={{color: colors.blueAccent[400], mr: 1}}/>
                                            {t("Payment Order")}
                                        </Button>
                                    </Link>
                                    <Box>
                                        <Link to={"/request/view/" + elem.accountNumber}>
                                            <Button variant="outlined"
                                                    sx={{p: 1, pr: 2, mr: 1, color: colors.blueAccent[400]}}>
                                                <VisibilityOutlined sx={{color: colors.orangeAccent[400], mr: 1}}/>
                                                {t("View")}
                                            </Button>
                                        </Link>
                                        <Button variant="outlined" sx={{p: 1, pr: 2, color: colors.blueAccent[400]}}>
                                            <TrendingUpOutlined sx={{color: colors.orangeAccent[400], mr: 1}}/>
                                            {t("Bill")}
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}