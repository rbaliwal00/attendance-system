import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import subjectService from '../../services/subject.service';
import ClassService from '../../services/class.service';
import { history } from '../../helpers/history';

const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [classes, setClasses] = useState([]);
  const [class_number, setClassNumber] = useState();
  const [selectedClass, setSelectedClass] = useState('None Selected');
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await ClassService.getAllClasses();
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubjectNameChange = (e) => {
    setSubjectName(e.target.value);
  };

  const handleClassChange = (selectedClassName, classNumber) => {
    setClassNumber(classNumber);
    console.log(classNumber)
    setSelectedClass(selectedClassName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await subjectService.createSubject(currentUser.email, subjectName, class_number);
      localStorage.removeItem("cachedSubjects");
      history.push('/dashboard');
        console.log(res);
      // After successful creation, you can redirect or show a success message
    } catch (error) {
      console.log(error);
    }
  };



  return (
 <Container>
  <Form
    onSubmit={handleSubmit}
    style={{
      maxWidth: '400px',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      background: '#f8f9fa',
    }}
  >
    <h2 style={{ textAlign: 'center', marginBottom: '20px'}}>
      Create Subject
    </h2>
    <Form.Group className="mb-3" controlId="formBasicSubjectName">
      <Form.Label>Subject Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter Subject Name"
        value={subjectName}
        onChange={handleSubjectNameChange}
        style={{ borderRadius: '4px' }}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicClass">
      <Form.Label>Choose Class:</Form.Label>
      <Nav>
        <NavDropdown
          id="nav-dropdown-class"
          title={selectedClass}
          menuVariant="dark"
          style={{ border: '1px solid #6c757d', borderRadius: '4px', color: '#fff' }}
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
      style={{
        marginTop: '10px',
        width: '100%',
        background: '#007bff',
        border: '1px solid #007bff',
        borderRadius: '4px',
      }}
    >
      Submit
    </Button>
  </Form>
</Container>
  );
};

export default CreateSubject;
