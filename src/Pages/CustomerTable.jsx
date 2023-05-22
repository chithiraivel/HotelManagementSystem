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

const CustomerTable = () => {
    const [Ans, setAns] = useState('')
    const navi=useNavigate()

    const listCustomer=()=>{
        instance.post('Customer/view').then((res) => {

            setAns(res.data.message.message.message)
        })
    }
    useEffect(() => {
        listCustomer()
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (Customer_id) => {
       

        instance.post('Customer/delete', { Customer_id }).then((res)=>{
            res.data.message.message.status ?
            Swal.fire({
                            title:"Deleted",
                            text:"deleted successfully",
                            icon: "success",
                            
                        }).then((ress)=>{
                            console.log(res.data);
                            if(res.data.message.message.status == true){
                                listCustomer()
                            }
                            if(ress.isConfirmed){
                                navi('/Customer')
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
        { field: "Customer_id", headerName: "Id", width: 90, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "CustomerFirstName", headerName: "CustomerFirstName", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "CustomerLastName", headerName: "CustomerLastName", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "CustomerAddress", headerName: "CustomerAddress", width: 240, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "CustomerStatus", headerName: "CustomerStatus", width: 200, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        
        {
            field: "none",
            headerName: "Action",
            headerClassName: "super-app-theme--header",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={2}>
                       
                        <Link to={`/Customer/CustomerForm/update/${params.row.Customer_id}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/Customer/CustomerForm/read/${params.row.Customer_id}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{Remove(params.row.Customer_id)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ]



    const rows = [...Ans]

    return (
        <>
            <AppBreadcrumbs crntPage='Customer Table' path='/' />

            <CommonTable header={header} rows={rows} id='Customer_id' typo="Customer Table" path="/Customer/CustomerForm" button="Create Customer" overflowX='hidden' />
        </>
    )
}

export default CustomerTable;