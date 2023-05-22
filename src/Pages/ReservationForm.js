import { Autocomplete, Box, Button, Grid, TextField,} from '@mui/material'
import React,{useState,useEffect} from 'react'
import instance from './Host'
import moment from 'moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
const ReservationForm = () => {


    const params=useParams()
    const navi=useNavigate()
  const [Roomlist,setRoomList]=useState([])
  const [Customerlist,setCustomerList]=useState([])
  const [RoomName,setRoomName]=useState('')
    const [RoomDescription,setRoomDescription]=useState('')
    const [RoomPrice,setRoomPrice]=useState('')
    const [Room_id,setRoom_id]=useState('')
  console.log(Room_id);

    const [CustomerFirstName,setCustomerFirstName]=useState('')
    const [CustomerLastName,setCustomerLastName]=useState('')
    const [CustomerAddress,setCustomerAddress]=useState('')
    const [CustomerStatus,setCustomerStatus]=useState('')
    const [Customer_id,setCustomer_id]=useState('')
    const [DateIn,setDateIn]=useState('')
    const [DateOut,setDateOut]=useState('')
    const range=moment(DateIn).date()
    const range2=moment(DateOut).date()
    const count =range2+1-range;
    const [DateRange,setDateRange]=useState('')
  console.log(isNaN(count));
    const [ReservationDate, setReservationDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

   const [disabled,setDiabled]=useState(false);

   const obj={Room_id,Customer_id,DateIn,DateOut,count,ReservationDate}
   console.log(obj);
   const CreateReservation=()=>{
    instance.post('Reservation/create',obj).then((res)=>{
        console.log(res.data.message.message.status);
        res.data.message.message.status ? 
        <>{
            Swal.fire({
                title:"Created",
                text:"Created Successfully",
                icon:"success",
            }).then((result) =>{
                if(result.isConfirmed){
                    {navi('/Reservation')}
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

const updateReservation=()=>{
    const data={
        CustomerFirstName,RoomName,DateIn,DateOut,count,ReservationDate,Reservation_id:parseInt(params.id)
    }

    instance.post('Reservation/update', data).then((res)=>{
        console.log( res.data.message);
        res.data.message.status ?
        Swal.fire({
                        title:"Updated",
                        text:"updated successfully",
                        icon: "success",
                        
                    }).then((res)=>{
                        if(res.isConfirmed){
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
    const ListRoom = ()=>{
        instance.post('Room/view').then((res)=>{
            setRoomList(res.data.message.message.message);

        })
    };
    const ListCustomer = ()=>{
        instance.post('Customer/view').then((res)=>{
            setCustomerList(res.data.message.message.message);

        })
    };

    
    useEffect(()=>{
        ListRoom();
        ListCustomer();
        update()
        if(params.action == "read" || params.action == "update" ){
            update()  
        }
        if(params.action == "read"){
            setDiabled(true)   
        }
    },[])

    const [Error, setError] = useState({
        RoomName: false,
        RoomDescription: false,
        RoomPrice: false,
        CustomerFirstName: false,
        CustomerLastName: false,
        CustomerAddress: false,
        CustomerStatus:false,
        ReservationDate:false,
        DateIn:false,
        DateOut:false,
    });
    const getRoomDetails=(e,val)=>{
        if (val != null && val.RoomName != null){
            setRoomName(val.RoomName)
            setRoom_id(val.Room_id);
            setRoomPrice(val.RoomPrice)
            setRoomDescription(val.RoomDescription);

        } else {
            setRoomName("")
            setRoomDescription("");
            setRoomPrice("")
            setRoom_id(null)     
        }
    }
    const getCustomerDetails=(e,val)=>{
        if (val != null && val.CustomerFirstName != null){
           setCustomerFirstName(val.CustomerFirstName);
           setCustomerLastName(val.CustomerLastName);
           setCustomerAddress(val.CustomerAddress);
           setCustomerStatus(val.CustomerStatus)
           setCustomer_id(val.Customer_id)

        } else {
            setCustomerFirstName("");
           setCustomerLastName("");
           setCustomerAddress("");
           setCustomerStatus("")
           setCustomer_id(null)    
        }
    }
  console.log(range<range2);
    const handleSubmit=()=>{
        const GenInvoice = { 
            RoomName: RoomName.trim() === "" ? true : false,
            CustomerFirstName: CustomerFirstName.trim() === "" ? true : false,
            DateIn: DateIn.trim() === "" ? true : (DateIn < moment(new Date()).format("YYYY-MM-DD"))  ? "wrongpattern"  : false,
            DateOut: DateOut.trim() === "" ? true : (DateOut < moment(new Date()).format("YYYY-MM-DD")) ? "wrongpattern"  : false,

        };    
        setError(GenInvoice)
        if (Object.values(GenInvoice).some(val => val == true )){}
        else {
            if(params.action == "update"){
                updateReservation()
            } else {
                CreateReservation()
            }
        }
    }

    const update=()=>{
        instance.post('Reservation/viewbyid',{Reservation_id:params.id}).then((res)=>{
            console.log(res.data.message.message.message[0]);
            setRoomName(res.data.message.message.message[0].RoomName)
            setCustomerFirstName(res.data.message.message.message[0].CustomerFirstName)
            setReservationDate(res.data.message.message.message[0].ReservationDate)
            setDateIn(res.data.message.message.message[0].DateIn)
            setDateOut(res.data.message.message.message[0].DateOut)
            setDateRange(res.data.message.message.message[0].DateRange)

            
        })

        
     }
  return (
    <div className='card'>
   <form  style={{ marginTop: '50px' }}>
            
                 <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={disabled} size='small' value={{RoomName}} disablePortal options={Roomlist} onChange={getRoomDetails} getOptionLabel={(option) => option.RoomName} renderInput={(params) => <TextField {...params} error={Error.RoomName} helperText={Error.RoomName ? "Room Name is required" : ""} label="Room Details" />} />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={disabled} size='small' value={{CustomerFirstName}} disablePortal options={Customerlist} onChange={getCustomerDetails} getOptionLabel={(option) => option.CustomerFirstName} renderInput={(params) => <TextField {...params} error={Error.CustomerFirstName} helperText={Error.CustomerFirstName ? "Customer Name is required" : ""} label="Customer Details" />} />
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
                    <Grid item xs={10} md={3.5}>
                    <TextField disabled={disabled} value={DateIn} error={Error.DateIn} InputLabelProps={{shrink:true}} helperText={ Error.DateIn == "wrongpattern" ? "Registration date must be present date" : Error.DateIn ? "Registration Date is required" : ""} type='date' fullWidth onChange={(e) => setDateIn(e.target.value)} size='small' label="Date In" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                    <TextField disabled={disabled} value={DateOut} InputLabelProps={{shrink:true}} error={Error.DateOut} helperText={ Error.DateOut == "wrongpattern" ? "Registration date must be present date" : Error.DateOut ? "Registration Date is required" : ""} type='date' fullWidth onChange={(e) => setDateOut(e.target.value)} size='small' label="Date Out" />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                    <TextField disabled={true} value={isNaN(count)==true?'0':count} error={Error.count} helperText={ Error.count == "wrongpattern" ? "Registration date must be present date" : Error.count ? "Registration Date is required" : ""} multiline fullWidth size='small' label="Date Range" />
                    </Grid>

                    </Grid>

                    <Box sx={{ ml: 4 }}>
        {disabled ? "" : <Button variant="contained" color="primary"  disableRipple disableElevation sx={{ my: 4, mx: 1,width:'90px' }} onClick={handleSubmit}>Save</Button>}

                    
                    <Link to="/Reservation">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
</form>
    </div>
  )
}

export default ReservationForm