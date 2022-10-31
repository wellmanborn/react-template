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

export default function MediaCard() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ]

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Card" subtitle="List of accounts" />
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
                            <Card sx={{backgroundColor: colors.primary[800]}}>
                                {/*<CardHeader
                            title={`quarter : ${elem.quarter}`}
                            subheader={`earnings : ${elem.earnings}`}
                        />*/}
                                <CardContent>
                                    <Typography variant="h4" sx={{ mt: 2, mb: 1 }} gutterBottom>
                                        Hello World
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: colors.orangeAccent[400] }}>
                                        0078954553215
                                    </Typography>
                                    <Typography sx={{ mt:3, color: colors.orangeAccent[500] }}>
                                        127,000,000 $
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: "space-between"}}>
                                    <Button variant="outlined" sx={{ p: 1, color: colors.orangeAccent[400] }}>
                                        <TrendingUpOutlined sx={{ color: colors.blueAccent[400], ml: 1 }} />
                                        Sign
                                    </Button>
                                    <Button variant="outlined" sx={{ p: 1, color: colors.blueAccent[400] }}>
                                        <AddOutlined sx={{ color: colors.orangeAccent[400], ml: 1 }} />
                                        Account
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