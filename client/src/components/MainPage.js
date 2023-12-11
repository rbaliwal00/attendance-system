import {Grid, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    ListItemButton, 
    Box, 
    Tab,
    Typography,
    Tabs
    } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import Logo from "../util/images/clgLogo.jpg";
import SummarizeIcon from '@mui/icons-material/Summarize';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CastForEducationRoundedIcon from '@mui/icons-material/CastForEducationRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { logout } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { history } from '../helpers/history';
import Dashboard from './MainPageComponents/Dashboard';
import Attendance from './attendance/RangeAttendanceDetail';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const currentComponnent = (component) =>{
    if(component === "Dashboard"){
        return (
            <Dashboard />
        )
    }else if(component === "Attendance"){
        return (
            <Attendance />
        )
    }
}

const HomePage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [component, setComponent] = useState('Dashboard');
    console.log(component)

    useEffect(() => {

    }, [component])

    const dispatch = useDispatch();
    const handleLogout = () =>{
        console.log("logout clicked")
        dispatch(logout());
        history.push("/login");
        window.location.reload();
    }
    return (
        <div className="">
            {/* <Grid container spacing={1}>
                <Grid item xs={2} className='border' style={{height: '60vh'}}>
                    <ListItem disablePadding>
                        <img className='' src={Logo} height={"200px"} width={"100%"} alt="{Logo}"/>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <DashboardCustomizeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' 
                            onClick={() => setComponent('Dashboard')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding >
                        <ListItemButton>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary='Attendance' onClick={() => setComponent('Attendance')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <CastForEducationRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Class' onClick={() => setComponent('Class')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <SummarizeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Subject' onClick={() => setComponent('Subject')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <GroupsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Student' onClick={() => setComponent('Student')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <GroupAddIcon />
                        </ListItemIcon>
                        <ListItemText primary='Teacher' onClick={() => setComponent('Teacher')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary='User' onClick={() => setComponent('User')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <LockResetRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Change Password' onClick={() => setComponent('ChangePassword')}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout' onClick={handleLogout}/>
                        </ListItemButton>
                    </ListItem>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ width: '100%' }}>
                        {currentComponnent(component)}
                    </Box>
                </Grid>
            </Grid> */}
           
            
            {/* <RangeAttendance /> */}

            {/* <div className='mt-10 mb-20 text-center'><Button variant='contained'>Sumbit</Button></div> */}
        </div>
    );
};

export default HomePage;