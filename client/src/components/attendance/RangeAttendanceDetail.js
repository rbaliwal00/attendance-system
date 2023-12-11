import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import subjectService from '../../services/subject.service';
import classService from '../../services/class.service';

export default function RangeAttendanceDetail() {

  const location = useLocation();

  const[attendance, setAttendance] = useState([]);
  const[students, setStudents] = useState([]);

  useEffect(async () => {
    const startDate = {
      day: location.state.state.st[0],
      month: location.state.state.st[1]+1,
      year: location.state.state.st[2]
    }
    const endDate = {
      day: location.state.state.en[0],
      month: location.state.state.en[1]+1,
      year: location.state.state.en[2]
    }

    const studentsInClass = await classService.getClassById(location.state.state.classId);
    setStudents(studentsInClass.data.students);

    const res = await subjectService
      .getRangeAttendance(location.state.state.subjectId, startDate, endDate);
    
      setAttendance(res.data);
    console.log(res.data);
  }, [])

  return (
    <div style={{marginTop:'30px', textAlign: 'center'}}>
      <h3>Attendance from date
        <span style={{paddingLeft: '10px', paddingRight: '10px'}}>{location.state.state.st[0]+"/"+(location.state.state.st[1]+1)+"/"+location.state.state.st[2]}</span>
          to 
        <span style={{paddingLeft: '10px'}}>{location.state.state.en[0]+"/"+(location.state.state.en[1]+1)+"/"+location.state.state.en[2]}</span>
      </h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='border bg-slate-200' style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Roll Number
            </TableCell>
            <TableCell align="right" className='border bg-slate-50' style={{ textAlign: 'center', fontWeight: 'bold' }}>Student Name</TableCell>
            {attendance?.map((att) => (
                <TableCell align="right" className='border bg-slate-200' style={{ textAlign: 'center', fontWeight: 'bold' }}>{att.date.substring(0,10).split("-").reverse().join("-")}</TableCell>
            ))
            }
            
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
}