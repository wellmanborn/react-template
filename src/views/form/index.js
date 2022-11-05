import {Box, InputLabel, MenuItem, TextField, Select, useTheme} from "@mui/material";
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

const validationSchema = yup.object().shape({
    accountNumber: yup.string().required("required"),
    price: yup.number().required("required")
})

const initialValues = {
    attach: "",
    accountNumber: "",
    price: "",
    trackingNumber: "",
    description: "",
    reason: "",
    saveAccount: ""
}

const PaymentOrderForm = (props) => {

    const [accounts, setAccounts] = useState([{"accountNumber" : "123123123"}]);

    const navigate = useNavigate()
    let { id } = useParams();

    useEffect(() => {
        if(id < 11)
            navigate("/accounts");
    });

    const { t } = useTranslation();

    const theme = useTheme();

    const colors = tokens(theme.palette.mode)

    const { handleSubmit, values, handleChange, touched, errors, handleBlur  } = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: value => {
          console.log("on change")
        },
        onSubmit: values => {
            console.log("here")
            alert(JSON.stringify(values, null, 2));
        },
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
        <Box m="20px">
            <Header title="Form" subtitle="Create account" />
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '20vw' },
                }}
                backgroundColor={colors.primary[700]}
                p={2}
                borderRadius={1}
                noValidate
                autoComplete="off"
            >
                <form onSubmit={handleSubmit} dir="rtl">
                    <Box>
                        <FormControl sx={{ m: 0, minWidth: "20vw" }} size="small">
                            {/*<InputLabel id="demo-select-small">{t("Account Number")}</InputLabel>*/}
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                getOptionLabel={(accounts) => `${accounts.accountNumber}`}
                                options={accounts}
                                size="small"
                                onChange={(event, value) => console.log(value)}
                                renderInput={ (props, accounts) => (
                                    <TextField {...props}
                                        required
                                               key={accounts}
                                               name="accountNumber"
                                               label={t("Account Number")}
                                               error={!!touched.accountNumber && !!errors.accountNumber}
                                               helperText={touched.accountNumber && errors.accountNumber}
                                    />
                                )} />
                            {/*<Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label={t("Account Number")}
                                onChange={handleChange}
                                size="small"
                                name="accountNumber"
                            >
                                <MenuItem value="">Please Select ... </MenuItem>
                                { accounts.map((elem) => {
                                    return <MenuItem key={accounts.indexOf(elem)} value={elem.accountNumber}>{elem.accountNumber}</MenuItem>
                                }) }
                            </Select>*/}
                        </FormControl>
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
                    </Box>
                    <Box>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            type="text"
                            sx={{ minWidth: "41vw" }}
                            label={t("Reason")}
                            name="reason"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.reason}
                            size="small"
                            error={!!touched.reason && !!errors.reason}
                            helperText={touched.reason && errors.reason}
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            type="text"
                            label="Description"
                            name="description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            sx={{ minWidth: "41vw" }}
                            multiline
                            rows={4}
                            size="small"
                            error={!!touched.description && !!errors.description}
                            helperText={touched.description && errors.description}
                        />
                    </Box>
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
                </form>
            </Box>

        </Box>
    )
}

export default PaymentOrderForm;