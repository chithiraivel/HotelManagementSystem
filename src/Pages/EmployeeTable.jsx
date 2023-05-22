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

const EmployeeTable = () => {
    const [Ans, setAns] = useState('')
    const navi=useNavigate()

    const listEmployee=()=>{
        instance.post('Employee/view').then((res) => {

            setAns(res.data.message.message.message)
        })
    }
    useEffect(() => {
        listEmployee()
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (Employee_id) => {
       

        instance.post('Employee/delete', { Employee_id }).then((res)=>{
            res.data.message.message.status ?
            Swal.fire({
                            title:"Deleted",
                            text:"deleted successfully",
                            icon: "success",
                            
                        }).then((ress)=>{
                            console.log(res.data);
                            if(res.data.message.message.status == true){
                                listEmployee()
                            }
                            if(ress.isConfirmed){
                                navi('/Employee')
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
        { field: "Employee_id", headerName: "Id", width: 90, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "FirstName", headerName: "FirstName", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "LastName", headerName: "LastName", width: 170, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Address", headerName: "Address", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "Contact", headerName: "Contact", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "JobDepartment", headerName: "JobDepartment", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },

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
                       
                        <Link to={`/Employee/EmployeeForm/update/${params.row.Employee_id}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/Employee/EmployeeForm/read/${params.row.Employee_id}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{Remove(params.row.Employee_id)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ]



    const rows = [...Ans]

    return (
        <>
            <AppBreadcrumbs crntPage='Employee Table' path='/' />

            <CommonTable header={header} rows={rows} id='Employee_id' typo="Employee Table" path="/Employee/EmployeeForm" button="Create Employee" overflowX='hidden' />
        </>
    )
}

export default EmployeeTable;