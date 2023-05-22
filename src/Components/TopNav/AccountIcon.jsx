import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AC from '../../assets/images/pic1.png'
import { useContext } from 'react';
import { loginContext } from '../../App';
import { Person } from '@mui/icons-material';
import '../../Components/Layout/layout.css'

export default function AccountMenu() {
    const { login, setLogin } = useContext(loginContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        setLogin(false);
        localStorage.clear();
    }
    return (
        <div >
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 62, height: 62 }}><img src={AC}></img></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu 
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            backgroundColor:'#2e4765'
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                           
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    Chithirai vel
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem> */}
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem> */}
                <MenuItem onClick={handleClose}>
                    <Person /> My Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    
                        <Settings/>
                    
                    Settings
                </MenuItem>
                <MenuItem onClick={logOut}>
                   
                        <Logout />
                    
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}