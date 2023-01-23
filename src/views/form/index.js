import {Box, TextField, useTheme, Grid} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import {tokens} from "../../theme";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FormControl from '@mui/material/FormControl';
import {useTranslation} from "react-i18next";
import Button from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { Autocomplete } from "@mui/material";
import axios from "axios";
import {stringTruncate} from "../../components/Functions";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const validationSchema = yup.object().shape({
    accountNumber: yup.string().required("required"),
    price: yup.number().required("required"),
    trackingNumber: "",
});

const Item = styled(Paper)(({ theme }) => (
    {
        backgroundColor: tokens(theme.palette.mode).primary[800],
        ...theme.typography.body2,
        padding: theme.spacing(4)
    }));

const initialValues = {
    attach: [],
    accountNumber: "",
    price: "",
    trackingNumber: "",
    description: "",
    reason: "",
    saveAccount: ""
}

const PaymentOrderForm = (props) => {

    const [accounts, setAccounts] = useState([]);

    const navigate = useNavigate()
    let { id } = useParams();

    useEffect(() => {
        if(id < 11)
            navigate("/accounts");
    });

    const { t } = useTranslation();

    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const { handleSubmit, values, handleChange, touched, errors, handleBlur, setFieldValue } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            let data = new FormData();
            Object.keys(values).forEach(key => data.append(key, values[key]));
            axios
                .post("http://127.0.0.1:8000/api/setPaymentOrder", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                    },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(JSON.stringify(values, null, 2));
        },
        validateOnBlur: true,
        submitForm: values => {
            console.log("submit form")
        }
    });

    useEffect(() => {
        const url = "http://127.0.0.1:8000/api/getAccounts";

        const fetchData = async () => {
            try {
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => setAccounts(json))
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();

    }, []);

    return (
        <Box m="20px" sx={{ flexGrow: 1 }}>
            <Header title={ t("Bill") } subtitle={ t("Create New Bill") } />
            <form onSubmit={handleSubmit} dir="rtl">
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item theme={theme}>
                            <Grid container sx={{ mb: 2 }} spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: "100%"}} size="small">
                                        <Autocomplete
                                            id="combo-box-demo"
                                            sx={{ width: "100%" }}
                                            getOptionLabel={(accounts) => `${accounts.accountNumber}`}
                                            options={accounts}
                                            size="small"
                                            onChange={(e, value) =>
                                                setFieldValue("accountNumber", (value !== null ? value.accountNumber : ""))}
                                            renderInput={ (props, accounts) => (
                                                <TextField {...props}
                                                           sx={{ width: "100%" }}
                                                           fullWidth={true}
                                                           key={accounts}
                                                           name="accountNumber"
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           label={t("Account Number")}
                                                           error={!!touched.accountNumber && !!errors.accountNumber}
                                                           helperText={touched.accountNumber && errors.accountNumber}
                                                />
                                            )} />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mb: 2 }} spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        type="text"
                                        label={t("Label")}
                                        name="label"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.label}
                                        size="small"
                                        error={!!touched.label && !!errors.label}
                                        helperText={touched.label && errors.label}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl size="small">
                                        <input
                                            accept="image/*"
                                            style={{ display: "none"}}
                                            id="contained-button-file"
                                            onChange={(event) => {
                                                setFieldValue("attach", event.currentTarget.files[0]);
                                                document.getElementsByClassName("upload_file_name")[0].innerHTML = stringTruncate(event.currentTarget.files[0].name, 30)
                                            }}
                                            name="file"
                                            type="file"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" component="span">
                                                {t("Upload Attached File")}
                                            </Button>
                                            <span style={{ marginRight: "10px", color: "#EFEFEF", fontSize: "12px" }} className="upload_file_name"> </span>
                                        </label>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mb: 2 }} spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        type="text"
                                        label={t("Price")}
                                        name="price"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.price}
                                        size="small"
                                        error={!!touched.price && !!errors.price}
                                        helperText={touched.price && errors.price}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        type="text"
                                        label={t("Tracking Number")}
                                        name="trackingNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.trackingNumber}
                                        size="small"
                                        error={!!touched.trackingNumber && !!errors.trackingNumber}
                                        helperText={touched.trackingNumber && errors.trackingNumber}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mb: 2 }} spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        type="text"
                                        label={t("Reason")}
                                        name="reason"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.reason}
                                        size="small"
                                        error={!!touched.reason && !!errors.reason}
                                        helperText={touched.reason && errors.reason}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mb: 2 }} spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        type="text"
                                        label={ t("Description") }
                                        name="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        multiline
                                        rows={4}
                                        size="small"
                                        error={!!touched.description && !!errors.description}
                                        helperText={touched.description && errors.description}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mb: 2 }} spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                    >
                                        <FormControl sx={{ m: 1, minWidth: "10vw" }} size="small">
                                            <Button
                                                size="small"
                                                loading={false}
                                                loadingPosition="start"
                                                startIcon={<SendIcon />}
                                                variant="contained"
                                                type="submit"
                                            >
                                                { t("Send") }
                                            </Button>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item theme={theme}>
                            به طور کلی «چندامضایی» یک طرح دیجیتال است که به گروهی از کاربران این امکان را می‌دهد که بتوانند یک سند را امضا کنند. معمولاً، یک الگوریتم چند امضایی، یک امضای مشترک را به وجود می‌آورد. این امضای مشترک، بسیار متراکم‌تر از مجموعه‌ای از امضاهای جداگانه از طرف تمام کاربران است. «چندامضایی» امنیت مضاعفی به روند نقل و انتقال رمزارزها می‌دهد. از این رو طرح دیجیتال چند امضایی عموماً برای کیف‌پول‌های ارزهای دیجیتال به کار می‌رود.
<p>
                            کیف پول ارزدیجیتال چندامضایی سازوکار جالبی دارند. آن‌ها  از تمام کاربرانی که در شکل‌گرفتن این کیف پول دخیل بوده‌اند، می‌خواهند تا پیش از اینکه هرگونه نقل و انتقالی اتفاق بیفتد، با آن تراکنش موافقت کنند. به بیان دیگر، کیف‌پول‌ چند امضایی نوعی از کیف‌پول‌های رمزارزها هستند که برای ورود به آن‌ها و ارسال یک معامله به دو یا بیش از دو کلید خصوصی نیاز است. در روش ذخیره‌سازی «storage method» چندین امضای رمزنگاری شده برای دسترسی به کیف‌پول لازم است.
</p>
</Item>
                    </Grid>
                </Grid>
            </form>

        </Box>
    )
}

export default PaymentOrderForm;