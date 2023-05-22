import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLogicOperator,
} from '@mui/x-data-grid';
import { Button } from '@mui/material/node';
import { Link, } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/node/Typography';
import AppBreadcrumbs from './Breadcrumbs';
import { useDemoData } from '@mui/x-data-grid-generator';
import '../../Components/Layout/layout.css'


export default function CommonTable(props) {
    // console.log(props.rows[0])

    const [apiData] = React.useState(props['rows'])
    // console.log(apiData)

    const [page, setPage] = React.useState(1)
    let row = 5;
    const count = Math.ceil(props['rows'].length / row);
    // console.log("count", count);
    row = row * page
    const list = props['rows'].slice((page - 1) * 5, row);
    // console.log(list);
    const handleChange = (event, value) => {
        setPage(value);

    }

    const { data } = useDemoData({
        dataSet: 'HMS',
        // visibleFields: `${props.header}`,
        rowLength: 100,
    });

    // Otherwise filter will be applied on fields such as the hidden column id
    // const columns = React.useMemo(
    //     () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    //     [data.columns],
    // );
    function QuickSearchToolbar() {
        return (

            <Box
                sx={{
                    p: 1,
                    pb: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography sx={{ mx: 1, mt: 3, color: '#455560', fontSize: '24px', fontWeight: '500' }}>{props.typo}</Typography>
                <div style={{ display: '', flexDirection: '', paddingTop: '15px' }}>

                    <Link to={props.path}>
                        <Button sx={{ background: '#2daab8', textTransform: 'none', color: '#fff', float: '', ":hover": { background: '#fff', color: '#2daab8', border: '1px solid black' } }}>{props.button}</Button>
                    </Link>

                    <GridToolbarQuickFilter sx={{ float: 'left', mx: 2, py: 1, '& .MuiInput-input:active': { border: 'none' } }}
                        quickFilterParser={(searchInput) =>
                            searchInput
                                .split(',')
                                .map((value) => value.trim())
                                .filter((value) => value !== '')
                        }
                    />
                </div>
            </Box >

        );
    }

    return (
        <>
            {/* <AppBreadcrumbs /> */}


            <Box sx={{

                my: 5, width: '100%', '& .super-app-theme--header': {
                    color: '#455560', fontSize: '16px', fontFamily: 'Rajdhani'
                },
            }}>

                <DataGrid
                    sx={{
                        px: 1,
                        border: "none",
                        ".MuiDataGrid-cell": { ':focus': { outline: 'none' }, overflow: 'visible', fontfamily: 'poppins', fontSize: '14px', maxWidth: 0, justifyContent: 'start', border: "none", color: '#888' },
                        "& .MuiDataGrid-columnHeaders": { ':focus': { outline: 'none' }, borderBottom: "none", borderRadius: '50px', },
                        "& .super-app-theme--header": { ':focus-within': { outline: 'none' }, backgroundColor: "#2daab8", color: '#fff', pl: 3 },
                        ".&  .MuiDataGrid-iconButtonContainer css-ltf0zy-MuiDataGrid-iconButtonContainer ": { visibility: "hidden" },
                        '.MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },

                        '&.MuiDataGrid-root': {
                            border: 'none',
                            background: '#fff',
                            borderRadius: '10px',
                            boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        }, '.MuiDataGrid-iconButtonContainer': {
                            visibility: 'hidden',
                        },
                        '.MuiDataGrid-sortIcon': {
                            opacity: 0,
                            visibility: 'hidden',
                        },
                        // '.MuiDataGrid-virtualScroller': {
                        //     overflowX: `${props.overflowX}`
                        // },
                        '.MuiDataGrid-row': {
                            ':hover': { background: 'none' },
                            pl: 2
                        }
                        // '.MuiDataGrid-row': {
                        //     ":hover": { background: '#349eff', color: '#fff' }
                        // }

                    }}

                    disableColumnFilter
                    disableColumnSelector
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableVirtualization
                    disableDensitySelector
                    // {...data}
                    hideFooterPagination
                    rows={list}
                    autoHeight
                    getRowId={(row) => row[props.id]}
                    columns={props?.header}
                    initialState={{
                        ...data?.initialState,
                        filter: {
                            ...data?.initialState?.filter,
                            filterModel: {
                                items: [],
                                quickFilterLogicOperator: GridLogicOperator.Or,
                            },
                        },
                    }}


                    slots={{ toolbar: QuickSearchToolbar, }}

                />
                <div>
                    <Stack spacing={2} sx={{ float: 'right', position: 'relative', bottom: '42px' }}>
                        <Pagination sx={{
                            '& .MuiSvgIcon-root': { display: 'none' },
                            '& .MuiPaginationItem-root.Mui-selected ': { background: '#16bbe5' },
                            '& .MuiButtonBase-root': { ":hover": { background: '#16bbe5', color: '#fff' } }
                        }}
                            className="pagi" count={count} page={page}
                            onChange={handleChange}
                            color='primary' />
                    </Stack>
                </div>



            </Box>

        </>
    );
}


