import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { card_content, Doctorcard } from '../assets/jsonData/Dashboard';
import { Divider } from '@mui/material/node';
import '../Components/Layout/layout.css'
import { useEffect } from 'react';
import instance from './Host';
import { useState } from 'react';
import man from '../assets/images/man.png'
import cap from '../assets/images/cap.png'
import wheel from '../assets/images/wheel.png'
import pharma from '../assets/images/pharma.png'
import Doc1 from '../assets/images/Doc1.png'
import Doc2 from '../assets/images/Doc2.png'
import Doc3 from '../assets/images/Doc3.png'
import Doc4 from '../assets/images/Doc4.png'
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Chart from 'react-apexcharts';
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const chartOptions = {
    series: [{
        name: 'Online Customers',
        data: [40, 50, 10, 90, 36, 80, 30, 91, 60]
    }, {
        name: 'Online Transaction',
        data: [50, 40, 70, 70, 40, 36, 20, 10, 51, 10]
    },
    {
        name: 'Online Feedbacks',
        data: [40, 70, 20, 90, 56, 40, 70, 71, 60]
    }
],
    options: {
        color: ['#6ab04c', '#2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
};

export default function Dashboardpage() {
    const [TotalPatient, setTotalPatient] = useState('')
    const [TotalDoctor, setTotalDoctor] = useState('')

    const card_content = ([
        {
            img: man,
            num: 2000,
            typo: 'Customer'
        },
        {
            img: wheel,
            num: 50,
            typo: 'Employee'
        },
        {
            img: wheel,
            num: 1000,
            typo: 'Reservation'
        },
        {
            img: pharma,
            num: 30,
            typo: 'Room'
        },
    ])
    useEffect(() => {
        instance.post('patient/view').then((res) => {
            setTotalPatient(res.data.message.message.message.length)

        })
        instance.post('Doctor/view').then((res) => {
            setTotalDoctor(res.data.message.message.message.length)

        })

    }, [])
    return (
        <>
            <Grid container sx={{ pb: 4 }}>
                {card_content.map((c) => {
                    return (
                        
                        <Grid xs={12} md={6} lg={6} sm={6} sx={{ p: 2 }}>
                            <Card sx={{ minWidth: 155, minHeight: 120, boxShadow: 'rgba(140, 140, 150, 0.1) 0px 3px 5px', borderRadius: '10px' }} className='diamond'>
                                <CardContent sx={{ columnGap: '30px', alignItems: 'center', marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                                    <img src={c.img}></img>
                                    <div>
                                        <Typography sx={{ textAlign: 'left', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '45px', color: '#2e4765' }}>{parseInt(`${c.num}`)}</Typography>
                                        <Typography sx={{ textAlign: 'left', fontSize: '19px', color: '#b2b5c0', fontFamily: 'Rajdhani', fontWeight: 500, }}>{c.typo}</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                       
                    )

                })}
            </Grid>
            
            <Card sx={{ml:2,borderRadius:'15px',mr:2}}>

            <div style={{ padding: '30px' }}>
                    <Typography sx={{ textAlign: 'left', pb: 3, fontSize: '22px', fontWeight:'600', fontFamily: 'Rajdhani', color: '#2e4765' }}>Hotel Survey</Typography>
                    <Divider />
                </div>
            <Grid container className="col-6" >
                    <Grid item className="card full-height" md={12} sm={12} lg={12} style={{height:'450px',marginLeft:'20px',marginRight:'20px'}}>
                        {/* chart */}
                        <Chart
                            options={
                                chartOptions.options
                            }
                            
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                            width='900px'
                        />
                    </Grid>
                </Grid>
           </Card>
            <Card sx={{ m: 1,mt:4, borderRadius: '10px',ml:2 }}>
                <div style={{ padding: '30px' }}>
                    <Typography sx={{ textAlign: 'left', pb: 3, fontSize: '22px', fontWeight: 'Bold', fontFamily: 'Rajdhani', color: '#2e4765' }}>Hotel Staff</Typography>
                    <Divider />
                </div>


                <Grid container >
                    {Doctorcard.map((c) => {
                        return (
                            
                            <Grid xs={12} md={3} lg={3} sm={6} sx={{ py: 4, px: 2 }}>
                                <Card sx={{ minWidth: 165, minHeight: 300, boxShadow: '0px 3px 7px rgba(30,80,100,.14)' }}>
                                    <CardContent sx={{ columnGap: '50px', alignItems: 'center', marginTop: '28px', textAlign: 'center' }}>
                                        <img src={c.Doc_img}></img>
                                        <Box sx={{ pt: 3 }}>
                                            <Typography sx={{ fontFamily: 'Rajdhani', fontSize: '22px', fontWeight: 600, color: '#2e4765' }}>{c.Doc_Name}</Typography>
                                            <Typography sx={{ fontFamily: 'poppins', fontSize: '14px', color: '#818e94', fontWeight: 500 }}>{c.Role}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                        )

                    })}
                </Grid>
            </Card>
        </>


    );
}