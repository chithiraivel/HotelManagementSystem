import { Autocomplete, Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../../Components/Table/Breadcrumbs';
import Swal from 'sweetalert2';
import instance from '../Host';
import moment from 'moment';

const Reports = () => {

    const [Information,setInformation]=useState('')
    const [ReservationDate,setReservationDate]=useState(moment(new Date()).format("YYYY-MM-DD"))
    const [disabled,setDisabled]=useState(false)
    const [ReservationList,setReservationList]=useState([])
const [Reservation_id,setReservation_id]=useState('')
console.log(Reservation_id);
const [CustomerFirstName,setCustomerFirstName]=useState('')
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navi=useNavigate();
    const params=useParams()
    const obj={CustomerFirstName,Information,ReservationDate,Reservation_id}
console.log(obj);
    const [Error, setError] = useState({
        Information: false,
        ReservationDate:false,
    });
    
    const CreateRoom=()=>{
        instance.post('Reports/create',obj).then((res)=>{
            res.data.message.message.status ? 
            <>{
                Swal.fire({
                    title:"Created",
                    text:"Created Successfully",
                    icon:"success",
                }).then((result) =>{
                    if(result.isConfirmed){
                        {navi('/Reports')}
                    }
                    console.log(result);
                })
                }
                </>
                : 
                Swal.fire({title: "Some Error!!",
                text: res.data.result,
                icon: "error",
                confirmButtonText:"ok"
            });
        })
    }

    const updateRoom=()=>{
        const data={
            CustomerFirstName,ReservationDate,Information,Reports_id:parseInt(params.id)
        }

        instance.post('Reports/update', data).then((res)=>{
            console.log( res.data.message.status);
            res.data.message.status ?
            Swal.fire({
                            title:"Updated",
                            text:"updated successfully",
                            icon: "success",
                            
                        }).then((res)=>{
                            if(res.isConfirmed){
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
    let NameReg = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
    let phoneNumber=/^(\+\d{1,3}[- ]?)?\d{10}$/

     const handleSubmit=(data)=>{
       
        const GenInvoice = { 
            Information: Information.trim() === "" ? true : !(NameReg.test(Information)) ? "wrongpattern" : false,
           
        };    
        setError(GenInvoice)
        if (Object.values(GenInvoice).some(val => val == true )){}
        else {
            if(params.action == "update"){
                updateRoom()
            } else {
                CreateRoom()
            }
        }
     }
     const ListReservation = ()=>{
        instance.post('Reservation/view').then((res)=>{
            console.log(res.data.message.message.message);
            setReservationList(res.data.message.message.message);
            

        })
    };
     useEffect(()=>{
        update()
        ListReservation()
        if(params.action == "read" || params.action == "update" ){
            update()  
        }
        if(params.action == "read"){
            setDisabled(true)   
        }
     },[])

     const update=()=>{
        instance.post('Reports/viewbyid',{Reports_id:params.id}).then((res)=>{
            setInformation(res.data.message.message.message[0].Information)
            setCustomerFirstName(res.data.message.message.message[0].CustomerFirstName)
            
        })

        
     }
     
     const getRoomDetails=(e,val)=>{
        console.log(val);
        if (val != null     ){
           
            setReservation_id(val.Reservation_id);
            setCustomerFirstName(val.CustomerFirstName)

        } else {
            
            setReservation_id(null)
            setCustomerFirstName("")

           
        }
    }
  return (
    <>

   <AppBreadcrumbs crntPage='ReportsForm' path='/ReportsForm' />

    <div className='card'>

   <form  style={{ marginTop: '50px' }}>

   <Grid container spacing={3} sx={{ p: 5 }}>
   <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={disabled} size='small' value={{CustomerFirstName}} disablePortal options={ReservationList} onChange={getRoomDetails} getOptionLabel={(option) => option.CustomerFirstName
} renderInput={(params) => <TextField {...params}  label="Transaction Details" />} />
                    </Grid>
   <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Information"
                            size="small"
                            name="Information"
                           
                            value={Information}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.Information} helperText={Error.Information === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.Information ?"Field cannot be empty ":""}
                            onChange={(e) => setInformation(e.target.value)}
                        >
                         
                            </TextField>
                    </Grid>


                    <Grid item xs={10} md={3.5}>
                    <TextField
                            id="date"
                            label="Reservation Date"
                            size="small"
                            name="ReservationDate"
                            value={ReservationDate}
                            multiline
                            fullWidth

                            disabled={true}
                            error={Error.ReservationDate} helperText={Error.ReservationDate === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.ReservationDate ?"Field cannot be empty ":""}
                            onChange={(e) => setReservationDate(e.target.value)}
                        />
                    </Grid>

                                     
        </Grid>

        <Box sx={{ ml: 4 }}>
        {disabled ? "" : <Button variant="contained" color="primary"  disableRipple disableElevation sx={{ my: 4, mx: 1,width:'90px' }} onClick={handleSubmit}>Save</Button>}

                    
                    <Link to="/Reports">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
     </form>

    </div>
    </>
  )
}

export default Reports