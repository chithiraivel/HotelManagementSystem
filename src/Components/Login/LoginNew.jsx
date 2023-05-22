import React, { useState } from 'react';

import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import HMS from '../../assets/images/resort.webp'
import '../Login/Login.css'
import { loginContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginNew() {
    const { login, setLogin } = useContext(loginContext);
    const navi=useNavigate()
    const users = [
        {
            username: 'admin',
            password: 'admin'
        }
    ];
    const [username, setUserName] = useState('');
    const [password, setPasword] = useState('');

    const checkUser = () => {
        const usercheck = users.find((user) => (user.username === username && user.password === password))
        console.log(usercheck)
        localStorage.setItem("login", true)
        if (usercheck) {
            setLogin(true)
            navi('/')
        } else {
            alert("Wrong username or password")
        }


    }

    // const changeHandler = (e) => {
    //     console.log(e);
    //     setData({ ...data, [e.target.name]: [e.target.value] })
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        checkUser();
    }

    return (
        <div className='login'>
            <Grid container sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', margin: 0, }}>
                <Grid sm={12} md={12} lg={12} sx={{ position: 'relative', overflow: 'hidden' }}>
                    <div>
                        <img className='login' src={HMS}></img>
                    </div>
                </Grid>
                <Grid sm={6} md={6} lg={6} sx={{ position: 'absolute' }}>
                    <form className='loginForm'
                        onSubmit={handleSubmit}
                    >
                        <Card sx={{ minWidth: 475, minHeight: 370, p: 3 }}>
                            <CardContent sx={{ alignContent: 'center', display: 'flex', rowGap: '30px', flexDirection: 'column' }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    value={username}
                                    size='small'
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend2" required
                                    onChange={(e) => setUserName(e.target.value)} />
                                {/*                                 
                                {errors.email && <span style={{ color: "red" }}>
                                    *Email* is mandatory </span>} */}

                                <TextField
                                    type="password"
                                    name="password"
                                    size='small'
                                    value={password}
                                    placeholder="Password"
                                    aria-describedby="inputGroupPrepend2" required
                                    onChange={(e) => setPasword(e.target.value)} />
                                <Button type='submit' sx={{ background: '#2daab8', color: '#fff', "&:hover": { backgroundColor: "#2daab8" } }} fullWidth size="small">LogIn</Button>

                            </CardContent>
                            <Typography sx={{ textAlign: 'center', p: 1 }}>Need an account?  <span style={{ color: '#2e4765', wordSpacing: '10px', fontWeight: 'bold' }}>SignUp</span></Typography>
                            <Typography sx={{ textAlign: 'center' }}>Forgot Password</Typography>
                        </Card>
                    </form>
                </Grid>

            </Grid>
        </div>
    )
}
export default LoginNew;