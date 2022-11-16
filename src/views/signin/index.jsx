import React, {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {useNavigate} from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

const validationSchema = yup.object().shape({
    email: yup.string().email().required("required"),
    password: yup.string().required("required")
})

const initialValues = {
    email: "",
    password: ""
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn(){

    const { t } = useTranslation();

    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate()

    useEffect(() => {
        loadCaptchaEnginge(6, "red", "yellow", "special_characters");
    }, [])

    const { handleSubmit, values, handleChange, touched, errors, handleBlur, setErrors } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            let data = new FormData();
            Object.keys(values).forEach(key => data.append(key, values[key]));
            axios
                .post("http://mahta.local/api/login", data)
                .then((response) => {
                    if(response.data.authorisation.token !== undefined) {
                        window.localStorage.setItem("login", true)
                        window.localStorage.setItem("token", response.data.authorisation.token)
                        navigate("/accounts")
                    }
                    console.log(response.data.authorisation.token);
                })
                .catch((err) => {
                    if(err.response.data.message !== undefined)
                        setErrors({email: err.response.data.message})
                    else
                        setErrors({email: "A problem occurred, please try again later!"})
                });
            console.log(JSON.stringify(values, null, 2));
        },
        validateOnBlur: true,
        submitForm: values => {
            console.log("submit form")
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form onSubmit={handleSubmit} dir="rtl">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        { t("Sign in") }
                    </Typography>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        type="email"
                        label={t("Email Address")}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        size="small"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                    />
                    <LoadCanvasTemplate />
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        type="password"
                        label={t("Password")}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        size="small"
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={ t("Remember me") }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        { t("Sign in") }
                    </Button>
                    {/*<Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                { t("Forgot Password?") }
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                { t("Don't have an account? Sign Up") }
                            </Link>
                        </Grid>
                    </Grid>*/}
                </form>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}