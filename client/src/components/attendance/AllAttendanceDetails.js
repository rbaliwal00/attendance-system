import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import classService from '../../services/class.service';
import subjectService from '../../services/subject.service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { history } from '../../helpers/history';

const AllAttendanceDetails = () => {
    const location = useLocation();

    const[attendance, setAttendance] = useState([]);
    const[students, setStudents] = useState([]);
    const[subject, setSubject] = useState();

    const handleEditClck = () => {
      history.push('/edit-attendance');
    } 
  
    useEffect(async () => {
    
      const studentsInClass = await classService.getClassById(location.state.data.classId);
      setStudents(studentsInClass.data.students);
      
      const res = await subjectService
        .getSubjectById(location.state.data.subjectId);
        setSubject(res.data[0].name);
        setAttendance(res.data[0]?.attendance);
        console.log(res.data);
    }, [])

    return (
      <div style={{marginTop:'30px', textAlign: 'center'}}>
      <h3 style={{marginBottom: '20px'}}>Attendance Record for Subject: {subject}</h3>
      <TableContainer component={Paper} style={{overflow: 'auto'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='border bg-slate-200' style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Roll Number
              </TableCell>
              <TableCell 
                align="right" 
                className='border bg-slate-50' 
                
                style={{ textAlign: 'center', fontWeight: 'bold', 
                }}>Student Name</TableCell>
           {attendance?.map((att) => (
  <TableCell align="right" className='border bg-slate-200' 
    style={{ textAlign: 'center',
     fontWeight: 'bold',
     minWidth: '150px' }}>
    <div>
      {att.date.substring(0, 10).split("-").reverse().join("-")}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between',
       borderTop: '1px solid gray' }}>
      <div >
        <EditNoteRoundedIcon  />
      </div>
      <div>
        <DeleteIcon />
      </div>
    </div>
  </TableCell>
))}
              
            </TableRow>
          </TableHead>
          <TableBody>
            
              {students.map((student) => (
                <TableRow >
                <TableCell component="th" className='border bg-slate-50' scope="row" align="center">{student.roll_no}</TableCell>
                <TableCell component="th" className='border bg-slate-50' scope="row" align="center">{student.name}</TableCell>
                {attendance.map((att) => {
                  if(att.present.includes(student.roll_no)){
                    return (<TableCell component="th" className='border bg-slate-50' scope="row" align="center">Present</TableCell>)
                  }
                  return (
                    <TableCell component="th" className='border bg-slate-50' scope="row" align="center">Absent</TableCell>
                  )
                })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
};

export default AllAttendanceDetails;