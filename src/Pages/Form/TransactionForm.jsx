import { Autocomplete, Box, Button, Grid, TextField,} from '@mui/material'
import React,{useState,useEffect} from 'react'
import instance from '../Host'
import moment from 'moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
const TransactionForm = () => {


    const params=useParams()
    const navi=useNavigate()
  const [Roomlist,setRoomList]=useState([])
  const [Customerlist,setCustomerList]=useState([])
  const [EmployeeList,setEmployeeList]=useState([])
  const [ReservationList,setReservationList]=useState([])

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
    const [Reservation_id,setReservation_id]=useState('')

    const [DateIn,setDateIn]=useState('')
    const [DateOut,setDateOut]=useState('')
    const range=moment(DateIn).date()
    const range2=moment(DateOut).date()
    const count =range2+1-range;
    const [DateRange,setDateRange]=useState('')
    const [PaymentAmount,setPaymentAmount]=useState('')
    const [TransactionName,setTransactionName]=useState('')
    const [Employee_id,setEmployee_id]=useState('')
  console.log(isNaN(count));
    const [ReservationDate, setReservationDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [PaymentDate, setPaymentDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [TransactionDate, setTransactionDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

   const [disabled,setDiabled]=useState(false);

   const obj={TransactionName:CustomerFirstName,PaymentAmount,PaymentDate,TransactionDate,Reservation_id}
   console.log(obj);
   const CreateReservation=()=>{
    instance.post('Transaction/create',obj).then((res)=>{
        console.log(res.data.message.message.status);
        res.data.message.message.status ? 
        <>{
            Swal.fire({
                title:"Created",
                text:"Created Successfully",
                icon:"success",
            }).then((result) =>{
                if(result.isConfirmed){
                    {navi('/Transaction')}
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
        TransactionName,PaymentAmount,PaymentDate,TransactionDate,Transaction_id:parseInt(params.id)
    }

    instance.post('Transaction/update', data).then((res)=>{
        console.log( res.data.message);
        res.data.message.status ?
        Swal.fire({
                        title:"Updated",
                        text:"updated successfully",
                        icon: "success",
                        
                    }).then((res)=>{
                        if(res.isConfirmed){
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
    
   
    const ListReservation = ()=>{
        instance.post('Reservation/view').then((res)=>{
            console.log(res.data.message.message.message);
            setReservationList(res.data.message.message.message);

        })
    };

    
    useEffect(()=>{
        // ListRoom();
        // ListCustomer();
        // ListEmployee();
        ListReservation();
        update()
        if(params.action == "read" || params.action == "update" ){
            update()  
        }
        if(params.action == "read"){
            setDiabled(true)   
        }
    },[])

    
    let NameReg = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
   
    const handleSubmit=()=>{
        
        
            if(params.action == "update"){
                updateReservation()
            } else {
                CreateReservation()
            }
        
    }

    const getRoomDetails=(e,val)=>{
        console.log(val);
        if (val != null     ){
           
            setReservation_id(val.Reservation_id);
            setCustomerFirstName(val.CustomerFirstName)
            setCustomer_id(val.Customer_id)
            setEmployee_id(val.Employee_id)

        } else {
            
            setReservation_id(null)
            setCustomerFirstName("")
            setCustomer_id("")
            setEmployee_id("")
        }
    }
    const update=()=>{
        instance.post('Transaction/viewbyid',{Transaction_id:params.id}).then((res)=>{
            console.log(res.data.message.message.message[0]);
            setTransactionName(res.data.message.message.message[0].TransactionName)
            setCustomerFirstName(res.data.message.message.message[0].TransactionName)
            setPaymentAmount(res.data.message.message.message[0].PaymentAmount)
            setPaymentDate(res.data.message.message.message[0].PaymentDate)
            setTransactionDate(res.data.message.message.message[0].TransactionDate)

            
        })

        
     }
  return (
    <div className='card'>

        
   <form  style={{ marginTop: '50px' }}>
            
                 <Grid container rowGap={3} columnGap={5} paddingLeft={4} paddingTop={3}>
                    
                 <Grid item xs={10} md={3.5}>
                        <Autocomplete disabled={disabled} size='small' value={{CustomerFirstName}} disablePortal options={ReservationList} onChange={getRoomDetails} getOptionLabel={(option) => option.CustomerFirstName
} renderInput={(params) => <TextField {...params}  label="Transaction Details" />} />
                    </Grid>
                    <Grid item sm={6} md={3.5} xs={12}>
                        <TextField
                            id="date"
                            label="PaymentAmount"
                            size="small"
                            name="PaymentAmount"
                            value={PaymentAmount}
                            multiline
                            fullWidth

                            disabled={disabled}
                            
                            onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                    <TextField
                            id="date"
                            label="Payment Date"
                            size="small"
                            name="PaymentDate"
                            value={PaymentDate}
                            multiline
                            fullWidth

                            disabled={true}
                            
                            onChange={(e) => setPaymentDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={10} md={3.5}>
                    <TextField
                            id="date"
                            label="Transaction Date"
                            size="small"
                            name="TransactionDate"
                            value={TransactionDate}
                            multiline
                            fullWidth

                            disabled={true}
                           
                            onChange={(e) => setTransactionDate(e.target.value)}
                        />
                    </Grid>
                    

                    </Grid>

                    <Box sx={{ ml: 4 }}>
        {disabled ? "" : <Button variant="contained" color="primary"  disableRipple disableElevation sx={{ my: 4, mx: 1,width:'90px' }} onClick={handleSubmit}>Save</Button>}

                    
                    <Link to="/Transaction">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
</form>
    </div>
  )
}

export default TransactionForm