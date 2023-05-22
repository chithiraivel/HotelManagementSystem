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


const TransactionTable = () => {
    const [Ans, setAns] = useState('')
    const navi=useNavigate()

    const listTransaction=()=>{
        instance.post('Transaction/view').then((res) => {

            console.log(res.data.message.message.message);
            setAns(res.data.message.message.message)
        })
    }
    useEffect(() => {
        listTransaction()
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (Transaction_id) => {
       

        instance.post('Transaction/delete', { Transaction_id }).then((res)=>{
            res.data.message.message.status ?
            Swal.fire({
                            title:"Deleted",
                            text:"deleted successfully",
                            icon: "success",
                            
                        }).then((ress)=>{
                            console.log(res.data);
                            if(res.data.message.message.status == true){
                                listTransaction()
                            }
                            if(ress.isConfirmed){
                                navi('/Transaction')
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
        { field: "Transaction_id", headerName: "Id", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "PaymentDate", headerName: "PaymentDate", width: 240, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "TransactionDate", headerName: "TransactionDate", width: 240, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "PaymentAmount", headerName: "PaymentAmount", width: 250, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        

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
                       
                        <Link to={`/Transaction/TransactionForm/update/${params.row.Transaction_id}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/Transaction/TransactionForm/read/${params.row.Transaction_id}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{Remove(params.row.Transaction_id)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ]



    const rows = [...Ans]
console.log(rows);
    return (
        <>
            <AppBreadcrumbs crntPage='Transaction Table' path='/' />

            <CommonTable header={header} rows={rows} id='Transaction_id' typo="Transaction Table" path="/Transaction/TransactionForm" button="Create Transaction" overflowX='hidden' />
        </>
    )
}

export default TransactionTable;