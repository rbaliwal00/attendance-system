import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import StudentService from '../../services/student.service';
import ClassService from '../../services/class.service';
import { history } from '../../helpers/history';


const CreateStudent = () => {
    const [classes, setClasses] = useState([]);
    const [class_number, setClassNumber] = useState();
    const [selectedClass, setSelectedClass] = useState('None Selected');

    const [rollNo, setRollNo] = useState("");
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
          try {
            const response = await ClassService.getAllClasses();
            setClasses(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchClasses();
    }, []);

    const handleClassChange = (selectedClassName, classNumber) => {
        setClassNumber(classNumber);
        console.log(classNumber)
        setSelectedClass(selectedClassName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
              
            await StudentService.createStudent(rollNo,name,fatherName,mobile);
            
            let currentClass;
            {classes.map(className => currentClass = className)}
            let updatedStudents = [...currentClass.students];
            updatedStudents.push(rollNo);

            console.log(class_number);

            await ClassService.updateClass(
                class_number,
                class_number,
                currentClass.class_name,
                updatedStudents
            );
      
            history.push('/dashboard');
          
        } catch (error) {
          console.log(error);
        }
    };
      

    return (
        <div style={{witdh: '90%', margin: 'auto'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicSubjectName">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Roll Number"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubjectName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubjectName">
                <Form.Label>Father's Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Father's Name"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubjectName">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicClass">
                <Form.Label>Choose Class: </Form.Label>
                <Nav>
                    <NavDropdown
                    id="nav-dropdown-class"
                    title={selectedClass}
                    menuVariant="dark"
                    style={{ border: '1px solid gray', color: 'white' }}
                    >
                    {classes.map((className, index) => (
                        <NavDropdown.Item
                        key={index}
                        onClick={() => handleClassChange(className.class_name, className._id)}
                        >
                        {className.class_name}
                        </NavDropdown.Item>
                    ))}
                    </NavDropdown>
                </Nav>
                </Form.Group>
                <Button
                variant="primary"
                type="submit"
                style={{ marginTop: '10px' }}
                >
                Submit
                </Button>
            </Form>
        </div>
    );
};

export default CreateStudent;