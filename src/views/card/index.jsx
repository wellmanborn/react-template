import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Box, Grid, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {AddOutlined, TrendingUpOutlined} from "@mui/icons-material";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export default function MediaCard() {

    const [data, setData] = useState([]);

    const { t } = useTranslation();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const url = "http://127.0.0.1:8000/api/accounts";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();

    }, []);

    function addCommas(nStr)
    {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1,$2');
        }
        return x1 + x2;
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Accounts" subtitle="All Active Accounts" />
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
                                    <Typography variant="h4" sx={{ mt: 1, mb: 2 }} gutterBottom>
                                        {elem.first_name + " " + elem.last_name}
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: colors.orangeAccent[400] }}>
                                        { t("Account Number") }: {elem.accountNumber.toString()}
                                    </Typography>
                                    <Typography sx={{ mt:2, color: colors.orangeAccent[500] }}>
                                        { t("Balance") }: {addCommas(elem.amount)} {t("Rls.")}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: "space-between"}}>
                                    <Button href="/account/view/10" variant="outlined" sx={{ p: 1, pr: 2, color: colors.orangeAccent[400] }}>
                                        <AddOutlined sx={{ color: colors.blueAccent[400], mr: 1 }} />
                                        { t("Payment Order") }
                                    </Button>
                                    <Button variant="outlined" sx={{ p: 1, pr: 2, color: colors.blueAccent[400] }}>
                                        <TrendingUpOutlined sx={{ color: colors.orangeAccent[400], mr: 1 }} />
                                        { t("Bill") }
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}