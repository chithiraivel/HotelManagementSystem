import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, IconButton, Stack } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import instance from './Host';
import CommonTable from '../Components/Table/CommonTable';
import {DeleteOutlineOutlined, VisibilityOutlined, EditOutlined, PrintOutlined} from '@mui/icons-material'
import Swal from 'sweetalert2';
import AppBreadcrumbs from '../Components/Table/Breadcrumbs';

const ReportsTable = () => {
    const [Ans, setAns] = useState('')
    const navi=useNavigate()

    const listReports=()=>{
        instance.post('Reports/view').then((res) => {

            setAns(res.data.message.message.message)
        })
    }
    useEffect(() => {
        listReports()
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (Reports_id) => {
       

        instance.post('Reports/delete', { Reports_id }).then((res)=>{
            res.data.message.message.status ?
            Swal.fire({
                            title:"Deleted",
                            text:"deleted successfully",
                            icon: "success",
                            
                        }).then((ress)=>{
                            console.log(res.data);
                            if(res.data.message.message.status == true){
                                listReports()
                            }
                            if(ress.isConfirmed){
                                navi('/Reports')
                            }
                            
                        })
            
            : 
            Swal.fire({title: "Some Error!!",
            text: res.data.result,
            icon: "error",
            confirmButtonText:"ok"
        });
        })


    }

    const header = [
        { field: "Reports_id", headerName: "Id", width: 120, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "CustomerFirstName", headerName: "ReportsName", width: 200, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Information", headerName: "Information", width: 300, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "ReservationDate", headerName: "ReservationDate", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        {
            field: "none",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            width: 240,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={2}>
                       
                        <Link to={`/Reports/ReportsForm/update/${params.row.Reports_id}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/Reports/ReportsForm/read/${params.row.Reports_id}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{Remove(params.row.Reports_id)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ]



    const rows = [...Ans]

    return (
        <>
            <AppBreadcrumbs crntPage='Reports Table' path='/' />

            <CommonTable header={header} rows={rows} id='Reports_id' typo="Reports Table" path="/Reports/ReportsForm" button="Create Reports" overflowX='hidden' />
        </>
    )
}

export default ReportsTable;