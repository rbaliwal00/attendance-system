import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import SubjectService from '../../services/subject.service';
import classService from '../../services/class.service';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

const color = red[500];

const ViewSubject = () => {
    const[subjects, setSubjects] = useState([]);

    useEffect(async () => {
        const res = await SubjectService.getAllSubjects();
        const response = await classService.getAllClasses();
        
        const ans = [];
        res.data.forEach(subject => {
            response.data.forEach((cl) => {
                if(cl._id === subject.class_number){
                    subject.class_name = cl.class_name;
                    ans.push(subject);
                }
            })
        });
        setSubjects(ans);
    }, []);
 
    return (
        <div>
            <Table aria-label="table sizes">
                <thead>
                <tr>
                    <th>Subject Name</th>
                    <th>Class Name</th>
                    <th style={{width: '10%'}}>Edit</th>
                    <th style={{width: '10%'}}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {subjects?.map((subject) => (
                    <tr key={subject._id}>
                    <td>{subject.name}</td>
                    <td>{subject.class_name}</td>
                    <td style={{color: 'dark-orange', cursor: 'pointer'}}>
                        <EditNoteIcon />
                    </td>
                    <td style={{color: 'red', cursor: 'pointer'}}><DeleteIcon/></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ViewSubject;