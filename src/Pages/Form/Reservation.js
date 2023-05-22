import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, IconButton, Stack } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../Host';
import CommonTable from '../../Components/Table/CommonTable';
import {DeleteOutlineOutlined, VisibilityOutlined, EditOutlined, PrintOutlined} from '@mui/icons-material'
import Swal from 'sweetalert2';
import AppBreadcrumbs from '../../Components/Table/Breadcrumbs';
import ReservationForm from '../ReservationForm';

const Reservation = () => {
    const [Ans, setAns] = useState('')
    const navi=useNavigate()

    const listReservation=()=>{
        instance.post('Reservation/view').then((res) => {

            console.log(res.data.message.message.message);
            setAns(res.data.message.message.message)
        })
    }
    useEffect(() => {
        listReservation()
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (Reservation_id) => {
       

        instance.post('Reservation/delete', { Reservation_id }).then((res)=>{
            res.data.message.message.status ?
            Swal.fire({
                            title:"Deleted",
                            text:"deleted successfully",
                            icon: "success",
                            
                        }).then((ress)=>{
                            console.log(res.data);
                            if(res.data.message.message.status == true){
                                listReservation()
                            }
                            if(ress.isConfirmed){
                                navi('/Reservation')
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
        { field: "Reservation_id", headerName: "Id", width: 90, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "RoomName", headerName: "RoomName", width: 140, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "CustomerFirstName", headerName: "CustomerName", width: 170, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "DateIn", headerName: "DateIn", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "DateOut", headerName: "DateOut", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "count", headerName: "Date Range", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },

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
                       
                        <Link to={`/Reservation/ReservationForm/update/${params.row.Reservation_id}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/Reservation/ReservationForm/read/${params.row.Reservation_id}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{Remove(params.row.Reservation_id)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ]



    const rows = [...Ans]
console.log(rows);
    return (
        <>
            <AppBreadcrumbs crntPage='Reservation Table' path='/' />

            <CommonTable header={header} rows={rows} id='Reservation_id' typo="Reservation Table" path="/Reservation/ReservationForm" button="Create Reservation" overflowX='hidden' />
        </>
    )
}

export default Reservation;