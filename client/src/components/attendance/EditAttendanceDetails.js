import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import ClassService from '../../services/class.service';
import Button from 'react-bootstrap/Button';
import SubjectService from '../../services/subject.service';
import { history } from '../../helpers/history';


export default function EditAttendanceDetails() {
  const [selected, setSelected] = React.useState([]);
  const [students, setStudents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const location = useLocation();
  console.log(location.state.state.id);
  console.log(location.state.state.date);

//   // to check if the attendance have been already marked
//   const [marked,setMarked] = useState(true);

//   const onSelected = (roll_no) => {
//     const newSelected = [...selected];
    
//     if (newSelected.includes(roll_no)) {
//       // If roll_no is in the selected array, remove it
//       newSelected.splice(newSelected.indexOf(roll_no), 1);
//     } else {
//       // Otherwise, add it to the selected array
//       newSelected.push(roll_no);
//     }

//     setSelected(newSelected);
//   };

// // call from frontend
// const handleSubmit = async () => {
//   try{
//     let absent = [];
//     students.forEach((student) => {
//         if (selected.indexOf(student.roll_no) === -1) {
//             absent.push(student.roll_no);
//         }
//     });
  
//     const subjectId = location.state.state.id;
  
//     const res = await SubjectService.getSubjectById(subjectId);
//     const subject = res.data;
//     const updatedAttendance = {
//         date: new Date(),
//         present: selected,
//         absent,
//     };

//     const data = await SubjectService.
//       addAttendance(res.data[0]._id, { attendance: updatedAttendance });
//     console.log("Not working Test");
//       history.push('/dashboard');

//   }catch(error){
//     console.log(error);
//   }

// };


//   useEffect(() => {
//     // You can perform actions here when 'selected' changes
//   }, [selected]);

//   const location = useLocation();

//   useEffect(() => {
//     const fetchSubject = async () => {
//       try {
//         const subjectId = location.state.state.id;
//         const res = await SubjectService.getSubjectById(subjectId);
//         const test = res.data[0].attendance.find((el) => 
//           el.date.includes(currentYear+"-"+(currentMonth+1)+"-"+currentDate));

//         if(test){
//           setMarked(true);
//         }else{
//           setMarked(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     const fetchStudents = async () => {
//       try {
//         const class_number = location.state.state.class_number;
//         const response = await ClassService.getClassById(class_number);

//         setStudents(response.data.students);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSubject();
//     fetchStudents();
//   }, [location.state]);

  return (
    <div>
    <h3 style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>
      Attendance for the Date - {currentDate + "/" + (currentMonth+1) + "/" + currentYear}
    </h3>
    <TableContainer component={Paper} style={{marginBottom: '20px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='border bg-slate-200' 
              style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Roll Number
            </TableCell>
            <TableCell align="right" className='border bg-slate-50' 
              style={{ textAlign: 'center', fontWeight: 'bold' }}>Student Name</TableCell>
            <TableCell align="right" className='border bg-slate-200' 
            style={{ textAlign: 'center', fontWeight: 'bold' }}>Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.map((student) => (
            <TableRow key={student.roll_no}>
              <TableCell component="th" scope="row" align="center">
                {student.roll_no}
              </TableCell>
              <TableCell align="center" className='border'>{student.name}</TableCell>
              <TableCell align="center" className='border'>
                {selected.includes(student.roll_no) ?
                  <Button variant="success"
                    value="check"
                    
                    // onClick={() => onSelected(student.roll_no)}
                    style={{padding: '6px 30px 6px 30px', maxWidth: '110px'}}>
                      Present
                  </Button> :
                  <Button variant="danger"
                    value="check"
                    // onClick={() => onSelected(student.roll_no)}
                    style={{padding: '6px 30px 6px 30px', maxWidth: '110px'}}>
                      Absent
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="primary" 
    // onClick={handleSubmit} 
      style={{padding: '6px 30px 6px 30px  '}}>
      Submit
    </Button>
    </div>
  );
}
