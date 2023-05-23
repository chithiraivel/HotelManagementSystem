import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HMS from '../../assets/images/resort.webp'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AccountMenu from '../TopNav/AccountIcon';
import '../Sidebar/sidebar.css'
import { Link, useLocation } from 'react-router-dom';
import { sidebar_routes } from '../../assets/jsonData/sidebar_routes';
import { Badge, Card, CardContent, Icon, Typography } from '@mui/material';
import Routes1 from '../Routes1';
import '../../Components/Layout/layout.css'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f5f7fd',
    marginTop: '20px',
    alignItems: 'center',

    marginLeft: 0,
    borderRadius: '50px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '480px',
        height: '55px'
    },

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 4),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {
        padding: theme.spacing(1.8, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(6)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            color: '#000',
            // '&:focus': {
            //     width: '20ch',
            // },
        },
    },
}));

const drawerWidth = 260;

function SideBarNew(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  const location=useLocation()
  console.log(location.pathname);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleclick=(index)=>{
        setIndex(index)
    }
    const active = props.active ? 'active' : ''
    const [index1,setIndex]=React.useState('')
    const drawer = (
        <div style={{ marginTop: '30px' }}>
            <Toolbar>
                <img src={HMS} height="100%" width="100%"/>
            </Toolbar>

            <List >
                {sidebar_routes.map((text, index) => (
                    <ListItem key={text} disablePadding className={`sidebar_module ${active}`} style={{backgroundColor:location.pathname==text.route || location.pathname==text.route2 ? '#2daab8':"",color:index==index1 ? '#fff':""}} onClick={()=>handleclick(index)}>
                        <Link to={text.route} style={{ textDecoration: 'none',width:'250px' }} >
                            <ListItemButton className='sidebar_module' sx={{ '.MuiButtonBase-root': { '&:active': { color: '#2daab8' } }, '&:hover': { color: '#fff', textDecoration: 'none' } }} >
                                <ListItemIcon className={`sidebar__item-inner `} >
                                    <Icon sx={{ overflow: 'visible', position: 'relative', top: '-6px' }}>{text.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={text.display_name} sx={{ '.MuiTypography-root': { '&:hover': { color: '#2daab8' }, fontFamily: 'poppins', fontSize: '16px', }, color: '#676b84', textDecoration: 'none', fontWeight: 400 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', mt: 2 }}>
            <CssBaseline />
            <AppBar elevation={0}
                position="fixed"
                sx={{
                    background: '#fff',
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    height: '100px',
                }}
            >

                <Box sx={{ flexGrow: 1, }}>
                    <Toolbar sx={{ alignItems: 'end', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        <IconButton
                            color="black"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'block', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Search sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}>
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: '#acb2b8' }} />
                            </SearchIconWrapper>

                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-evenly', width: '23%', alignItems: 'center' }}>
                            <Badge badgeContent={3}color='primary'>
                            <NotificationsOutlinedIcon   sx={{ display: { md: 'block', sm: 'none', xs: 'none' }, color: '#929bb5', fontWeight: '100', fontSize: '35px', cursor: 'pointer' }} />
                            </Badge>
                            <Badge badgeContent={10}color='primary'>
                            <MessageOutlinedIcon sx={{ display: { md: 'block', sm: 'none', xs: 'none' }, color: '#929bb5', fontWeight: '100', fontSize: '35px', cursor: 'pointer' }} />
                            </Badge>
                            <AccountMenu />
                        </div>

                    </Toolbar>
                </Box>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, mt: 5, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {/* <Dashboardpage /> */}
                <Routes1 />

                 <Card sx={{ mt: 5, pt: 2, borderRadius: '10px', height: '80px',ml:0 }}>
                    <CardContent sx={{ background: '#fff' }}>
                        <Typography sx={{ mb: 0, textAlign: 'center', fontFamily: 'poppins', fontSize: '14px',color:'gray' }} >
                           2020 © Influence - Designed by  Chithirai vel S
                        </Typography>
                    </CardContent>
                </Card> 
            </Box>
        </Box>
    );
}

SideBarNew.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SideBarNew;