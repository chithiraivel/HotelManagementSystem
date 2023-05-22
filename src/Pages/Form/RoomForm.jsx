import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../../Components/Table/Breadcrumbs';
import Swal from 'sweetalert2';
import instance from '../Host';

const RoomForm = () => {

    const [RoomName,setRoomName]=useState('')
    const [RoomDescription,setRoomDescription]=useState('')
    const [RoomPrice,setRoomPrice]=useState('')
    const [disabled,setDisabled]=useState(false)

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navi=useNavigate();
    const params=useParams()
    const obj={RoomName,RoomDescription,RoomPrice}

    const [Error, setError] = useState({
        RoomName: false,
        RoomDescription: false,
        RoomPrice: false,
    });
    
    const CreateRoom=()=>{
        instance.post('Room/create',obj).then((res)=>{
            res.data.message.message.status ? 
            <>{
                Swal.fire({
                    title:"Created",
                    text:"Created Successfully",
                    icon:"success",
                }).then((result) =>{
                    if(result.isConfirmed){
                        {navi('/Room')}
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
            RoomName,RoomDescription,RoomPrice,Room_id:parseInt(params.id)
        }

        instance.post('Room/update', data).then((res)=>{
            console.log( res.data.message.status);
            res.data.message.status ?
            Swal.fire({
                            title:"Updated",
                            text:"updated successfully",
                            icon: "success",
                            
                        }).then((res)=>{
                            if(res.isConfirmed){
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
    let NameReg = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
    let phoneNumber=/^(\+\d{1,3}[- ]?)?\d{10}$/

     const handleSubmit=(data)=>{
       
        const GenInvoice = { 
            RoomName: RoomName.trim() === "" ? true : !(NameReg.test(RoomName)) ? "wrongpattern" : false,
            RoomDescription: RoomDescription.trim() === "" ? true : false,
            RoomPrice: RoomPrice.trim() === "" ? true : !(/^[1-9]\d*\.?[0-9]*$/.test(RoomPrice)) ? "wrongpattern" : false,
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

     useEffect(()=>{
        update()
        if(params.action == "read" || params.action == "update" ){
            update()  
        }
        if(params.action == "read"){
            setDisabled(true)   
        }
     },[])

     const update=()=>{
        instance.post('Room/viewbyid',{Room_id:params.id}).then((res)=>{
            setRoomName(res.data.message.message.message[0].RoomName)
            setRoomDescription(res.data.message.message.message[0].RoomDescription)
            setRoomPrice(res.data.message.message.message[0].RoomPrice)
            
        })

        
     }
  return (
    <>

   <AppBreadcrumbs crntPage='RoomForm' path='/RoomForm' />

    <div className='card'>

   <form  style={{ marginTop: '50px' }}>

   <Grid container spacing={3} sx={{ p: 5 }}>

   <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Room"
                            size="small"
                            name="RoomName"
                           
                            value={RoomName}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.RoomName} helperText={Error.RoomName === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.RoomName ?"Field cannot be empty ":""}
                            onChange={(e) => setRoomName(e.target.value)}
                        >
                         
                            </TextField>
                    </Grid>


                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter price"
                            size="small"
                            name="Price"
                            value={RoomPrice}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.RoomPrice} helperText={Error.RoomPrice === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.RoomPrice ?"Field cannot be empty ":""}
                            onChange={(e) => setRoomPrice(e.target.value)}
                        />
                    </Grid>

                    <Grid item sm={6} md={8} xs={12}>
                        <TextField
                            id="date"
                            label="Room Description"
                            size="small"
                            name="LastName"
                            inputProps={{style:{height:80}}}
                            value={RoomDescription}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.RoomDescription} helperText={Error.RoomDescription === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.RoomDescription ?"Field cannot be empty ":""}
                            onChange={(e) => setRoomDescription(e.target.value)}
                        />
                    </Grid>                   
        </Grid>

        <Box sx={{ ml: 4 }}>
        {disabled ? "" : <Button variant="contained" color="primary"  disableRipple disableElevation sx={{ my: 4, mx: 1,width:'90px' }} onClick={handleSubmit}>Save</Button>}

                    
                    <Link to="/Room">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
     </form>

    </div>
    </>
  )
}

export default RoomForm