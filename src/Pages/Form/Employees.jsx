import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import instance from '../Host';
import Swal from 'sweetalert2';
import AppBreadcrumbs from '../../Components/Table/Breadcrumbs';
const Employees = () => {

    const params=useParams()
    console.log(params);
    const [FirstName,setFirstName]=useState('')
    const [Address,setAddress]=useState('')
    console.log(Address);
    const [LastName,setLastName]=useState('')
    const [JobDepartment,setJobDepartment]=useState('')
    const [Contact,setContact]=useState('')
    const [Username,setUserName]=useState('')
    const [Password,setPassword]=useState('')
    const [disabled,setDisabled]=useState(false)
    const navi=useNavigate();
    const obj={FirstName,LastName,Address,JobDepartment,Contact,Username,Password}

    const [Error, setError] = useState({
        FirstName: false,
        LastName: false,
        Address: false,
        JobDepartment: false,
        Contact:false,
        Username:false,
        Password:false
    });
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const CreateEmployee=()=>{
        instance.post('Employee/create',obj).then((res)=>{
            res.data.message.message.status ? 
            <>{
                Swal.fire({
                    title:"Created",
                    text:"Created Successfully",
                    icon:"success",
                }).then((result) =>{
                    if(result.isConfirmed){
                        {navi('/Employee')}
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

    const updateEmployee=()=>{
        const data={
            FirstName,LastName,Address,Username,Password,JobDepartment,Contact,Employee_id:parseInt(params.id)
        }

        instance.post('Employee/update', data).then((res)=>{
            console.log( res.data.message.status);
            res.data.message.status ?
            Swal.fire({
                            title:"Updated",
                            text:"updated successfully",
                            icon: "success",
                            
                        }).then((res)=>{
                            if(res.isConfirmed){
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
    let NameReg = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
    let phoneNumber=/^(\+\d{1,3}[- ]?)?\d{10}$/

     const handleSubmit=(data)=>{
       
        const GenInvoice = { 
            FirstName: FirstName.trim() === "" ? true : !(NameReg.test(FirstName)) ? "wrongpattern" : false,
            LastName: LastName.trim() === "" ? true : !(NameReg.test(LastName)) ? "wrongpattern" : false,
            JobDepartment: JobDepartment.trim() === "" ? true : !(NameReg.test(JobDepartment)) ? "wrongpattern" : false,
            Username: Username.trim() === "" ? true : !(NameReg.test(Username)) ? "wrongpattern" : false,
            Password: Password.trim() === "" ? true : !(NameReg.test(Password)) ? "wrongpattern" : false,
            Contact: Contact.trim() === "" ? true : !(phoneNumber.test(Contact)) ? "wrongpattern" : false,
            Address: Address.trim() === "" ? true : false,
        };    
        setError(GenInvoice)
        if (Object.values(GenInvoice).some(val => val == true )){}
        else {
            if(params.action == "update"){
                updateEmployee()
            } else {
                CreateEmployee()
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
        instance.post('Employee/viewbyid',{Employee_id:params.id}).then((res)=>{
            setAddress(res.data.message.message.message[0].Address)
            setFirstName(res.data.message.message.message[0].FirstName)
            setLastName(res.data.message.message.message[0].LastName)
            setContact(res.data.message.message.message[0].Contact)
            setUserName(res.data.message.message.message[0].Username)
            setPassword(res.data.message.message.message[0].Password)
            setJobDepartment(res.data.message.message.message[0].JobDepartment)



        })

        
     }
  return (

    <>

   <AppBreadcrumbs crntPage='Employee Form' path='/Employee' prevPage='Employee'/>

    <div className='card'>
        <h5>Employees Details</h5>
        <form  style={{ marginTop: '0px' }}>

        <Grid container spacing={3} sx={{ p: 5 }}>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter FirstName"
                            size="small"
                            name="FirstName"
                            value={FirstName}
                            multiline
                            fullWidth
                            disabled={disabled}
                            error={Error.FirstName} helperText={Error.FirstName === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.FirstName ?"Field cannot be empty ":""}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter LastName"
                            size="small"
                            name="LastName"
                            value={LastName}
                            multiline
                            disabled={disabled}
                            fullWidth

                            error={Error.LastName} helperText={Error.LastName === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.LastName ?"Field cannot be empty ":""}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter  JobDepartment"
                            size="small"
                            name="jobDepartment"
                            value={JobDepartment}
                            multiline
                            disabled={disabled}
                            fullWidth

                            error={Error.JobDepartment} helperText={Error.JobDepartment === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.JobDepartment ?"Field cannot be empty ":""}
                            onChange={(e) => setJobDepartment(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Contact"
                            size="small"
                            name="Contact"
                            value={Contact}
                            multiline
                            disabled={disabled}
                            fullWidth

                            error={Error.Contact} helperText={Error.Contact === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.Contact ?"Field cannot be empty ":""}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter UserName"
                            size="small"
                            name="UserName"
                            value={Username}
                            multiline
                            disabled={disabled}
                            fullWidth

                            error={Error.Username} helperText={Error.Username === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.Username ?"Field cannot be empty ":""}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Grid>
                    
                    <Grid item sm={6} md={4} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Password"
                            size="small"
                            name="Password"
                            value={Password}
                            multiline
                            disabled={disabled}
                            fullWidth

                            error={Error.Password} helperText={Error.Password === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.Password ?"Field cannot be empty ":""}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={6} md={8} xs={12}>
                        <TextField
                            id="date"
                            label="Enter Address"
                            size="small"
                            name="Address"
                            value={Address}
                            disabled={disabled}
                            multiline
                            fullWidth
                            inputProps={{style:{height:80}}}
                            error={Error.Address} helperText={Error.Address === "wrongpattern" ? "Starting and space,letter zero not allowed" : Error.Address ?"Field cannot be empty ":""}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
        </Grid> 

        <Box sx={{ ml: 4 }}>
                    {disabled ? "" : <Button variant="contained" color="primary"  disableRipple disableElevation sx={{ my: 4, mx: 1,width:'90px' }} onClick={handleSubmit}>Save</Button>}

                    
                    <Link to="/Employee">
                        <Button variant='contained' color='secondary' disableRipple disableElevation sx={{ my: 4, mx: 1, }}>cancel</Button>
                    </Link>
                </Box>
        </form>



    </div>
    </>
  )
}

export default Employees