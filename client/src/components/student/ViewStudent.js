import React, { useEffect, useState } from 'react';
import studentService from '../../services/student.service';
import { TextField } from '@mui/material';
import Table from '@mui/joy/Table';
import { history } from '../../helpers/history';

const ViewStudent = () => {
    const[students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(async () =>{
        const res = await studentService.getAllStudents();
        setStudents(res.data);
        setFilteredStudents(res.data);
        console.log(res.data);
    }, [])

    const handleNameFilterChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filtered = students.filter((student) =>
          student.name.toLowerCase().includes(searchQuery)
        );
        setFilteredStudents(filtered);
    };

    const handleClick = (id) => {
        history.push(`/student-detail/${id}`);
    }

    return (
        <div style={{width: '80%', margin: 'auto'}}>
            <TextField 
                fullWidth
                // style={{width: '100%'}}
                id="outlined-search" 
                label="Search Student" 
                type="search" 
                onChange={handleNameFilterChange} />
            <Table aria-label="table sizes" style={{marginTop: '30px'}}>
                <thead>
                <tr>
                    <th style={{ width: '20%' }}>Roll Number</th>
                    <th style={{ width: '20%' }}>Name</th>
                    <th style={{ width: '20%' }}>Father's Name</th>
                    <th style={{ width: '20%' }}>Mobile</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.map((student) => (
                    <tr key={student.roll_no} 
                        style={{cursor: 'pointer'}}
                        onClick={() => handleClick(student.roll_no)}>
                        <td>{student.roll_no}</td>
                        <td>{student.name}</td>
                        <td>{student.father_name}</td>
                        <td>{student.mobile}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ViewStudent;