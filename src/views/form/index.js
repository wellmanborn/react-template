import {Box, TextField, useTheme} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import {tokens} from "../../theme";

const validationSchema = yup.object().shape({
    accountNumber: yup.string().required("required"),
    amount: yup.number().required("required"),
    description: yup.string(),
    reason: yup.string()
})

const initialValues = {
    attach: "",
    accountNumber: "",
    amount: "",
    description: "",
    reason: "",
    saveAccount: ""
}

const Form = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const { handleSubmit, values, handleChange, touched, errors, handleBlur  } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Box m="20px">
            <Header title="Form" subtitle="Create account" />
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                backgroundColor={colors.primary[700]}
                p={2}
                borderRadius={1}
                noValidate
                autoComplete="off"
            >
                <form onSubmit={handleSubmit} dir="rtl">
                    <Box>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            type="text"
                            label="Account Number"
                            name="accountNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.accountNumber}
                            size="small"
                            error={!!touched.accountNumber && !!errors.accountNumber}
                            helperText={touched.accountNumber && errors.accountNumber}
                        />
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            type="text"
                            label="Account Number"
                            name="accountNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.accountNumber}
                            size="small"
                            error={!!touched.accountNumber && !!errors.accountNumber}
                            helperText={touched.accountNumber && errors.accountNumber}
                        />
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            type="text"
                            label="Account Number"
                            name="accountNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.accountNumber}
                            size="small"
                            error={!!touched.accountNumber && !!errors.accountNumber}
                            helperText={touched.accountNumber && errors.accountNumber}
                        />
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            type="text"
                            label="Account Number"
                            name="accountNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.accountNumber}
                            size="small"
                            error={!!touched.accountNumber && !!errors.accountNumber}
                            helperText={touched.accountNumber && errors.accountNumber}
                        />
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            type="text"
                            label="Account Number"
                            name="accountNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.accountNumber}
                            size="small"
                            error={!!touched.accountNumber && !!errors.accountNumber}
                            helperText={touched.accountNumber && errors.accountNumber}
                        />
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Form;