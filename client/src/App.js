import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link, withRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import EventBus from "./common/EventBus";
import HomePage from "./components/MainPage";

import {Grid, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton, 
  } from '@mui/material';
import Logo from "./util/images/clgLogo.jpg";
import SummarizeIcon from '@mui/icons-material/Summarize';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CastForEducationRoundedIcon from '@mui/icons-material/CastForEducationRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Dashboard from "./components/MainPageComponents/Dashboard";
import Attendance from "./components/attendance/Attendance";
import CreateSubject from "./components/subject/CreateSubject";
import CreateClass from "./components/class/CreateClass";
import CreateStudent from "./components/student/CreateStudent";
import RangeAttendanceDetail from "./components/attendance/RangeAttendanceDetail";
import RangeAttendance from "./components/attendance/RangeAttendance";
import ViewAttendance from "./components/MainPageComponents/ViewAttendance";
import AllAttendanceDetails from "./components/attendance/AllAttendanceDetails";
import Student from "./components/student/Student";
import Class from "./components/class/Class";
import Subject from "./components/subject/Subject";
import StudentDetails from "./components/student/StudentDetails";
import EditStudent from "./components/student/EditStudent";
import Report from "./components/report/Report";
import SubjectReport from "./components/report/SubjectReport";
import OverallReport from "./components/report/OverallReport";
import EditAttendance from "./components/attendance/EditAttendance";
import EditAttendanceDetails from "./components/attendance/EditAttendanceDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      path: ""
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });

    this.setActivePath = this.setActivePath.bind(this);
  }

  componentDidMount() {
    console.log(window.location.pathname);
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
    history.push('/login');
  }

  setActivePath(path) {
    this.setState({ path });
  }

  
  render() {
    const { currentUser } = this.state;
    // const { location } = this.props;
    console.log(this.state.path);
    return (
      <Router history={history}>
        <div>

          <Grid container spacing={1}>
                <Grid item xs={2} className='' style={{height: '100vh', 
                borderRight: '1px solid #e5e7eb'}}>
                  { currentUser ? 
                    <div style={{ width:"80%",margin: 'auto'}}>
                    <ListItem disablePadding style={{
                        marginTop: '10px',
                        marginBottom: '10px',

                        }}>
                          <img 
                            className='' 
                            src={Logo}height={"200px"} 
                            
                            style={{textAlign: 'auto'}}
                            alt="{Logo}"/>
                    </ListItem>
                      {this.state.path === '/dashboard' ? <Link to={"/dashboard"} 
                      onClick={() => this.setActivePath(window.location.pathname)}
                        style={{
                          color: 'black',
                          textDecoration: 'none',
                          }}>
                      <ListItem disablePadding
                       
                       style={{
                        backgroundColor: this.state.path === '/dashboard' ? '#d3d3d3' : 'none',
                      }}
                        >
                          <ListItemButton>
                          <div style={{marginRight: '10px'}}><DashboardCustomizeIcon /></div>
                          <ListItemText primary='Dashboard' />
                          </ListItemButton>
                      </ListItem>
                    </Link>: <Link to={"/dashboard"} 
                       onClick={() => this.setState({ path: '/dashboard' })}
                        style={{
                          color: 'black',
                          textDecoration: 'none',
                          }}>
                      <ListItem disablePadding
                        >
                          <ListItemButton>
                          <div style={{marginRight: '10px'}}><DashboardCustomizeIcon /></div>
                          <ListItemText primary='Dashboard' />
                          </ListItemButton>
                      </ListItem>
                    </Link>
                    
                    }
                    { this.state.path === '/view-attendance' ?
                      <Link to={"/view-attendance"} 
                       onClick={() => this.setState({ path: '/view-attendance' })}
                        style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding 
                        style={{
                          backgroundColor: this.state.path === '/view-attendance' ? '#d3d3d3' : 'none',
                        }}>
                            <ListItemButton>
                            <div style={{marginRight: '10px'}}><ListAltIcon /></div>
                            <ListItemText primary='Attendance'/>
                            </ListItemButton>
                        </ListItem>
                      </Link>:
                      <Link to={"/view-attendance"} 
                      onClick={() => this.setState({ path: '/view-attendance' })}
                       style={{color: 'black', textDecoration: 'none'}}>
                       <ListItem disablePadding >
                           <ListItemButton>
                           <div style={{marginRight: '10px'}}><ListAltIcon /></div>
                           <ListItemText primary='Attendance'/>
                           </ListItemButton>
                       </ListItem>
                     </Link>
                    }
                    {this.state.path === '/class' ?
                     <Link to={"/class"} 
                      style={{color: 'black', textDecoration: 'none'}}
                      onClick={() => this.setState({ path: '/class' })}
                      >
                      <ListItem disablePadding
                        style={{
                          backgroundColor: this.state.path === '/class' ? '#d3d3d3' : 'none',
                        }}>
                          <ListItemButton>
                          <div style={{marginRight: '10px'}}>
                              <CastForEducationRoundedIcon />
                          </div>
                          <ListItemText primary='Class'/>
                          </ListItemButton>
                      </ListItem>
                    </Link>:
                    <Link to={"/class"} style={{color: 'black', textDecoration: 'none'}}>
                    <ListItem disablePadding
                    onClick={() => this.setState({ path: '/class' })}>
                        <ListItemButton>
                        <div style={{marginRight: '10px'}}>
                            <CastForEducationRoundedIcon />
                        </div>
                        <ListItemText primary='Class'/>
                        </ListItemButton>
                    </ListItem>
                  </Link>
                    
                  }
                    {this.state.path === '/subject' ?
                    <Link to={"/subject"} style={{color: 'black', textDecoration: 'none'}}
                      onClick={() => this.setState({ path: '/subject' })}>
                      <ListItem disablePadding
                        style={{
                          backgroundColor: this.state.path === '/subject' ? '#d3d3d3' : 'none',
                        }}
                      >
                          <ListItemButton>
                          <div style={{marginRight: '10px'}}>
                              <SummarizeIcon />
                          </div>  
                          <ListItemText primary='Subject'/>
                          </ListItemButton>
                      </ListItem>
                    </Link>:
                    <Link to={"/subject"} style={{color: 'black', textDecoration: 'none'}}
                    onClick={() => this.setState({ path: '/subject' })}>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <div style={{marginRight: '10px'}}>
                            <SummarizeIcon />
                        </div>  
                        <ListItemText primary='Subject'/>
                        </ListItemButton>
                    </ListItem>
                  </Link>
                    }
                    {this.state.path === '/student' ?
                     <Link to={"/student"} style={{color: 'black', textDecoration: 'none'}}
                      onClick={() => this.setState({ path: '/student' })}>
                      <ListItem disablePadding
                        style={{
                          backgroundColor: this.state.path === '/student' ? '#d3d3d3' : 'none',
                        }}
                      >
                          <ListItemButton>
                          <div style={{marginRight: '10px'}}>
                              <GroupsRoundedIcon />
                          </div>
                          <ListItemText primary='Student'/>
                          </ListItemButton>
                      </ListItem>
                    </Link>:
                    <Link to={"/student"} style={{color: 'black', textDecoration: 'none'}}
                    onClick={() => this.setState({ path: '/student' })}>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <div style={{marginRight: '10px'}}>
                            <GroupsRoundedIcon />
                        </div>
                        <ListItemText primary='Student'/>
                        </ListItemButton>
                    </ListItem>
                  </Link>
                  } 
                  { this.state.path === '/subject-report' ? 
                    <Link to={"/subject-report"} 
                      style={{color: 'black', textDecoration: 'none'}}
                      onClick={() => this.setState({ path: '/subject-report' })}
                        >
                      <ListItem disablePadding
                      style={{
                        backgroundColor: this.state.path === '/subject-report' ? '#d3d3d3' : 'none',
                      }}>
                          <ListItemButton>
                          <div style={{marginRight: '10px'}}>
                              <LockResetRoundedIcon />
                          </div>
                          <ListItemText primary='Report' />
                          </ListItemButton>
                      </ListItem>
                    </Link>:
                    <Link to={"/subject-report"} 
                    style={{color: 'black', textDecoration: 'none'}}
                    onClick={() => this.setState({ path: '/subject-report' })}
                      >
                    <ListItem disablePadding>
                        <ListItemButton>
                        <div style={{marginRight: '10px'}}>
                            <LockResetRoundedIcon />
                        </div>
                        <ListItemText primary='Report' />
                        </ListItemButton>
                    </ListItem>
                  </Link>
                    }
                    {/* <ListItem disablePadding>
                        <ListItemButton>
                        <div style={{marginRight: '10px'}}>
                            <LockResetRoundedIcon />
                        </div>
                        <ListItemText primary='Profile'/>
                        </ListItemButton>
                    </ListItem> */}
                    <ListItem disablePadding>
                        <ListItemButton>
                        <div style={{marginRight: '10px'}}>
                            <LogoutIcon />
                        </div>
                        <ListItemText primary='Logout' onClick={this.logOut}/>
                        </ListItemButton>
                    </ListItem>
                    </div> : 
                    <div>
                    </div>}
                </Grid>
                <Grid item xs={10}>
                  <div className="" style={{width: '90%', margin: 'auto'}}>
                    <Switch>
                      <Route exact path={["/", "/home"]} component={Dashboard} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/dashboard" component={Dashboard} />
                      <Route exact path="/attendance" component={Attendance} />
                      <Route exact path="/class" component={Class} />
                      <Route exact path="/subject" component={Subject} />
                      <Route exact path="/student" component={Student} />
                      <Route exact path="/edit-attendance" component={EditAttendanceDetails} />
                      <Route exact path="/subject-report" component={SubjectReport} />
                      <Route exact path="/overall-report" component={OverallReport} />
                      <Route exact path="/edit-student/:id" component={EditStudent} />
                      <Route exact path="/student-detail/:id" component={StudentDetails} />
                      <Route exact path="/create-student" component={CreateStudent} />
                      <Route exact path="/create-subject" component={CreateSubject} />
                      <Route exact path="/range-attendance" component={RangeAttendance} />
                      <Route exact path="/view-attendance" component={ViewAttendance} />
                      <Route exact path="/view-attendance-detail" component={AllAttendanceDetails} />
                      <Route exact path="/range-attendance-detail" component={RangeAttendanceDetail} />
                      <Route path="/main" component={HomePage} />
                      <Route path="/report" component={Report} />
                      <Route path="/user" component={BoardUser} />
                      <Route path="/mod" component={BoardModerator} />
                      <Route path="/admin" component={BoardAdmin} />
                      <Route path="/create-student" component={CreateStudent} />
                      <Route path="/create-class" component={CreateClass} />
                    </Switch>
                  </div>
                </Grid>
            </Grid>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
