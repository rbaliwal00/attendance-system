import React, { useEffect, useState } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import ClassService from '../../services/class.service';
import StudentService from '../../services/student.service';
import Table from '@mui/joy/Table';

const ViewClass = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const studentsToRender = [];

    useEffect(() => {
        const fetchClasses = async () => {
          try {
            const response = await ClassService.getAllClasses();
            setClasses(response.data);
            
            const res = await StudentService.getAllStudents();
            setStudents(res.data);

            console.log(response.data);
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchClasses();
    }, []);

    if(selectedClass){
        classes.forEach(c => {
            if(c.class_name === selectedClass){
                students.forEach(student => {
                    if(c.students.includes(student.roll_no)){
                        studentsToRender.push(student);
                    }
                })
                console.log(studentsToRender)
            }
        })
    }

    const formLabelStyle = {
        fontSize: '1.2rem', // Adjust the font size
        fontWeight: 'bold', // Make the text bold
        color: '#333', // Set text color
        marginBottom: '10px', // Add margin at the bottom
      };

      const selectStyle = {
        fontSize: '1rem', // Adjust the font size
        padding: '8px', // Add padding around the text
        borderRadius: '5px', // Add border-radius for rounded corners
        border: '1px solid #ccc', // Add a border
        backgroundColor: '#fff', // Set background color
        color: '#333', // Set text color
        width: '200px', // Set width as needed
        marginBottom: '10px', // Add margin at the bottom
      };

      
    return (
        <div style={{width: '60%', margin: 'auto'}}>
            <FormLabel id="select-field-demo-label" 
                htmlFor="select-field-demo-button"
                style={formLabelStyle}>
                Choose Class
            </FormLabel>
            <select 
                id="selectedClass" 
                value={selectedClass} 
                onChange={e=> {
                    setSelectedClass(e.target.value)
                }}
                style={selectStyle} 
                // onBlur={e=> setSelectedClass(e.target.value)}
                >
                    <option />
                {classes.map(classItem => (
                    <option 
                        value={classItem.class_name}
                        key={classItem._id}
                        
                    >
                        {classItem.class_name}
                    </option>
                ))}
            </select>
            {selectedClass && 
                <div style={{marginTop: '50px'}}>
                    <Table aria-label="table sizes">
                        <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Roll Number</th>
                            <th style={{ width: '40%' }}>Name</th>
                            <th style={{ width: '40%' }}>Father's Name</th>
                            <th style={{ width: '40%' }}>Mobile</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentsToRender.map((student) => (
                            <tr key={student.roll_no}>
                            <td>{student.roll_no}</td>
                            <td>{student.name}</td>
                            <td>{student.father_name}</td>
                            <td>{student.mobile}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    );
};

export default ViewClass;