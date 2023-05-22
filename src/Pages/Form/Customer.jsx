import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumbs from '../../Components/Table/Breadcrumbs';
import Swal from 'sweetalert2';
import instance from '../Host';

const Customer = () => {

    const [CustomerFirstName,setCustomerFirstName]=useState('')
    const [CustomerLastName,setCustomerLastName]=useState('')
    const [CustomerAddress,setCustomerAddress]=useState('')
    const [CustomerStatus,setCustomerStatus]=useState('')
    const [disabled,setDisabled]=useState(false)

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navi=useNavigate();
    const params=useParams()
    const obj={CustomerFirstName,CustomerLastName,CustomerAddress,CustomerStatus}

    const [Error, setError] = useState({
        CustomerFirstName: false,
        CustomerLastName: false,
        CustomerAddress: false,
        CustomerStatus:false,
    });
    
    const CreateCustomer=()=>{
        instance.post('Customer/create',obj).then((res)=>{
            res.data.message.message.status ? 
            <>{
                Swal.fire({
                    title:"Created",
                    text:"Created Successfully",
                    icon:"success",
                }).then((result) =>{
                    if(result.isConfirmed){
                        {navi('/Customer')}
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

    const updateCustomer=()=>{
        const data={
            CustomerFirstName,CustomerLastName,CustomerAddress,CustomerStatus,Customer_id:parseInt(params.id)
        }

        instance.post('Customer/update', data).then((res)=>{
            console.log( res.data.message.status);
            res.data.message.status ?
            Swal.fire({
                            title:"Updated",
                            text:"updated successfully",
                            icon: "success",
                            
                        }).then((res)=>{
                            if(res.isConfirmed){
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
    let NameReg = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
    let phoneNumber=/^(\+\d{1,3}[- ]?)?\d{10}$/

     const handleSubmit=(data)=>{
       
        const GenInvoice = { 
            CustomerFirstName: CustomerFirstName.trim() === "" ? true : !(NameReg.test(CustomerFirstName)) ? "wrongpattern" : false,
            CustomerLastName: CustomerLastName.trim() === "" ? true : !(NameReg.test(CustomerLastName)) ? "wrongpattern" : false,
            CustomerAddress: CustomerAddress.trim() === "" ? true : false,
            CustomerStatus: CustomerStatus.trim() === "" ? true : false,

        };    
        setError(GenInvoice)
        if (Object.values(GenInvoice).some(val => val == true )){}
        else {
            if(params.action == "update"){
                updateCustomer()
            } else {
                CreateCustomer()
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
        instance.post('Customer/viewbyid',{Customer_id:params.id}).then((res)=>{
            setCustomerFirstName(res.data.message.message.message[0].CustomerFirstName)
            setCustomerLastName(res.data.message.message.message[0].CustomerLastName)
            setCustomerAddress(res.data.message.message.message[0].CustomerAddress)
            setCustomerStatus(res.data.message.message.message[0].CustomerStatus)
        })

        
     }
  return (
    <>

   <AppBreadcrumbs crntPage='CustomerForm' path='/CustomerForm' />

    <div className='card'>

   <form  style={{ marginTop: '50px' }}>

   <Grid container spacing={3} sx={{ p: 5 }}>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter FirstName"
                            size="small"
                            name="FirstName"
                            value={CustomerFirstName}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.CustomerFirstName} helperText={Error.CustomerFirstName === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.CustomerFirstName ?"Field cannot be empty ":""}
                            onChange={(e) => setCustomerFirstName(e.target.value)}
                        />
                    </Grid>

                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter LastName"
                            size="small"
                            name="LastName"
                            value={CustomerLastName}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.CustomerLastName} helperText={Error.CustomerLastName === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.CustomerLastName ?"Field cannot be empty ":""}
                            onChange={(e) => setCustomerLastName(e.target.value)}
                        />
                    </Grid>

                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Status"
                            size="small"
                            name="Status"
                            select
                            value={CustomerStatus}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.CustomerStatus} helperText={Error.CustomerStatus === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.CustomerStatus ?"Field cannot be empty ":""}
                            onChange={(e) => setCustomerStatus(e.target.value)}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                            </TextField>
                    </Grid>

                    <Grid item sm={6} md={8} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Address"
                            size="small"
                            name="Address"
                            value={CustomerAddress}
                            inputProps={{style:{height:80}}}
                            multiline
                            fullWidth

                            disabled={disabled}
                            error={Error.CustomerAddress} helperText={Error.CustomerAddress === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.CustomerAddress ?"Field cannot be empty ":""}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                        />
                    </Grid>
                    
        </Grid>

        <Box sx={{ ml: 4 }}>
        {disabled ? "" : <Button variant="contained" color="primary"  disableRipple disableElevation sx={{ my: 4, mx: 1,width:'90px' }} onClick={handleSubmit}>Save</Button>}

                    
                    <Link to="/Customer">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
     </form>

    </div>
    </>
  )
}

export default Customer