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

const RoomTable = () => {
    const [Ans, setAns] = useState('')
    const navi=useNavigate()

    const listRoom=()=>{
        instance.post('Room/view').then((res) => {

            setAns(res.data.message.message.message)
        })
    }
    useEffect(() => {
        listRoom()
    }, [])

    const view = (id) => {
        localStorage.setItem('viewbtn', true)
    }
    const Edit = (id) => {
        localStorage.setItem('viewbtn', false)
    }
    const Remove = (Room_id) => {
       

        instance.post('Room/delete', { Room_id }).then((res)=>{
            res.data.message.message.status ?
            Swal.fire({
                            title:"Deleted",
                            text:"deleted successfully",
                            icon: "success",
                            
                        }).then((ress)=>{
                            console.log(res.data);
                            if(res.data.message.message.status == true){
                                listRoom()
                            }
                            if(ress.isConfirmed){
                                navi('/Room')
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
        { field: "Room_id", headerName: "Id", width: 120, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "RoomName", headerName: "RoomName", width: 200, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "RoomDescription", headerName: "RoomDescription", width: 300, headerClassName: "super-app-theme--header", headerAlign: 'start' },
        { field: "RoomPrice", headerName: "RoomPrice", width: 180, headerClassName: "super-app-theme--header", headerAlign: 'start' },
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
                       
                        <Link to={`/Room/RoomForm/update/${params.row.Room_id}`}> <IconButton disableRipple sx={{p:0, color:"gray"}}><EditOutlined/></IconButton></Link>
                        <Link to={`/Room/RoomForm/read/${params.row.Room_id}`}><IconButton  disableRipple sx={{p:0, color:"orange"}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{Remove(params.row.Room_id)}} sx={{p:0, color:"red"}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ]



    const rows = [...Ans]

    return (
        <>
            <AppBreadcrumbs crntPage='Room Table' path='/' />

            <CommonTable header={header} rows={rows} id='Room_id' typo="Room Table" path="/Room/RoomForm" button="Create Room" overflowX='hidden' />
        </>
    )
}

export default RoomTable;