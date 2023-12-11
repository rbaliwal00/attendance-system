import React, { useEffect, useState, useRef } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import ClassService from '../../services/class.service';
import StudentService from '../../services/student.service';
import Table from '@mui/joy/Table';
import * as d3 from 'd3';

const SubjectReport = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const studentsToRender = [];
    const [rollNo, setRollNo] = useState(''); 
    const [subjects, setSubjects] = useState(null);

    const [data] = useState([
        {property: 'present', value: 60},
        {property: 'absent', value: 40},
    ]);

    const svgRef = useRef();

    useEffect(() => {
        const w = 500;
        const h = 500;
        const radius = w/2;
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '300px');

        const formattedData = d3.pie().value(d => d.value)(data);

        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
        const color = d3.scaleOrdinal().range(d3.schemeSet2);


        svg.selectAll()
            .data(formattedData)
            .join('path')
                .attr('d', arcGenerator)
                .attr('fill', d => color(d.value))
                .style('opacity', 0.7);

        svg.selectAll()
            .data(formattedData)
            .join('text')
                .text(d => d.data.property)
                .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
                .style('text-anchor', 'middle');

    }, [data, subjects])

    useEffect(() => {
        const fetchClasses = async () => {
          try {
            const response = await ClassService.getAllClasses();
            setClasses(response.data);
            
            const res = await StudentService.getAllStudents();
            setStudents(res.data);

            const resp = await StudentService.getAllSubjectsForStudent(rollNo);
            const subs = [];
            resp.data.subjects.forEach((subject) => {
                let present = 0, total = 0;
                subject.attendance.forEach((att) => {
                    if(att.present.includes(rollNo)){
                        present++;
                    }
                    total++;
                })
                subject.presents = present;
                subject.total = total;
                subs.push(subject);
            })
            setSubjects(subs);
 
          } catch (error) {
            console.log(error);
          }
        };
        fetchClasses();
    }, [rollNo]);
    console.log(subjects);


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

    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '20px'}}>Student Attendance Report</h3>
            <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                Choose Class
            </FormLabel>
            <select 
                id="selectedClass" 
                value={selectedClass} 
                onChange={e=> {
                    setSelectedClass(e.target.value)
                }}
                style={{
                    width: '200px',
                    padding: '8px',      // Adjust padding as needed
                    fontSize: '16px',    // Adjust font size as needed
                    borderRadius: '5px',  // Add border radius for a rounded look
                    border: '1px solid #ccc', // Add border for a cleaner appearance
                  }}
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
                            <tr key={student.roll_no} 
                                onClick={()=> setRollNo(student.roll_no)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor:
                                      rollNo === student.roll_no ? '#c0c0c0' : 'transparent',
                                  }}
                                >
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
            {subjects && 
                <div style={{marginTop: '50px'}}>
                    <Table aria-label="table sizes">
                        <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Subject Name</th>
                            <th style={{ width: '40%' }}>Present</th>
                            <th style={{ width: '40%' }}>Total</th>
                            <th style={{ width: '40%' }}>Percentage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subjects?.map((subject) => (
                            <tr key={subject._id} 
                                // onClick={()=> setRollNo(student.roll_no)}
                                style={{cursor: 'pointer'}}>
                                <td>{subject.name}</td>
                                <td>{subject.presents}</td>
                                <td>{subject.total}</td>
                                <td>{((subject.presents / subject.total) * 100).toFixed(2)} %</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    );
};

export default SubjectReport;