import { Box, Breadcrumbs, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const AppBreadcrumbs = ({ prevPage, crntPage, path }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: "20px", height: "30px", "@media print":{
      visibility : "hidden"
    } }}>
      <Typography sx={{ fontWeight: "700", mr: "10px", color: 'gray' }}>{crntPage}</Typography>
      {/* <Divider orientation="vertical" sx={{ mr: "10px", borderRightWidth: 3 }} variant="middle" flexItem /> */}
      <NavigateNextIcon />
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon />} sx={{ fontWeight: "700" }}>
        <Link to="/">
          Home
        </Link>
        {prevPage ? (<Link to={path}>{prevPage}</Link>) : ""}
        <h5> {crntPage} </h5>
      </Breadcrumbs>
    </Box>
  )
};

export default AppBreadcrumbs;