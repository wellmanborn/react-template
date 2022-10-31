import {Box, useTheme} from "@mui/material";
import Header from "../../components/Header";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import { rows } from "../../data/mockData";
import {Man, Woman} from "@mui/icons-material";

const Grid = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {field: "id", headerName: "ID"},
        {field: "first_name", headerName: "First Name", width: 160, minWidth: 150, maxWidth: 250},
        {field: "last_name", headerName: "Last Name", width: 160, minWidth: 150, maxWidth: 250},
        {field: "email", headerName: "Email", width: 250, minWidth: 200, maxWidth: 300},
        {field: "ip_address", headerName: "IP Address", width: 250, minWidth: 200, maxWidth: 300},
        {field: "gender", headerName: "Gender", renderCell: ({row: {gender}}) => {
                return (
                    (gender === "Male") ? <Man color={colors.blueAccent[300]} /> : <Woman color={colors.redAccent[300]} />
                    /*<Box width="60px" m="0 auto" p="5px" backgroundColor={colors.greenAccent[500]}>
                        {gender}
                    </Box>*/
                )
            }
        }
    ]

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Grid" subtitle="List of teams" />
            </Box>
            <Box m="0" height="75vh"
                 sx={{
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
        </Box>
    )
}

export default Grid;