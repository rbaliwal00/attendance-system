import React, { useEffect, useState, useMemo } from 'react';
import TeacherService from '../../services/teacher.service';
import { Box} from '@mui/material'; 
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { history } from '../../helpers/history';

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const currentUser = useSelector((state) => state.auth.user);
    console.log(subjects)
    const subjectTextStyle = {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginTop: '20px',
    };
  
    const classNumberStyle = {
      fontSize: '1rem',
      color: '#666',
      textAlign: 'center',
      marginTop: '30px',
    };
  
    const boxStyle = {
      height: 140,
      width: 200,
      backgroundColor: '#fff',
      margin: '10px',
      display: 'inline-block',
      border: '1px solid #ddd', // Light gray border
      borderRadius: '8px', // Rounded corners
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow
      transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for box shadow
      ':hover': {
        background: 'lightgray',
        cursor: 'pointer',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Adjusted box shadow on hover
      },
    };  

  // Cache the subjects data
  const cachedSubjects = useMemo(() => {
    const cachedData = localStorage.getItem("cachedSubjects");
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return [];
  }, []);

  useEffect(() => {
    // Fetch subjects and update the cache when needed
    const fetchSubjects = async () => {
      try {
        const response = await TeacherService.getAllSubjectsForTeacher(currentUser.email);
        const newData = response.data;
      
        // Update the cache with the new data
        localStorage.setItem("cachedSubjects", JSON.stringify(newData));
        
        setSubjects(newData);
      } catch (error) {
        console.log(error);
      }
    };

    // Check if cached data is available and set it initially
    if (cachedSubjects.length === 0) {
      fetchSubjects();
    } else {
      setSubjects(cachedSubjects);
    }
  }, [currentUser.email, cachedSubjects]);


    const handleCreateSubject = () => {
        history.push('/create-subject');
    }

    const handleClick = (id, class_number) => {
      history.push('/attendance', {state: { id: id, class_number: class_number }});
    }
    const addButtonStyle = {
      backgroundColor: '#007bff', // Primary button color
      color: '#fff', // Text color
      borderRadius: '8px', // Rounded corners
      padding: '10px 20px', // Adjust padding as needed
      marginTop: '20px',
      marginLeft: '10px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow
      transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for box shadow
      ':hover': {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Adjusted box shadow on hover
      },
    };

    return (
      <div>
      <h1 className='text-center text-xl' style={{ marginBottom: '20px' }}>
        Subjects
      </h1>
      <div>
        {subjects.map((subject) => (
          <Box
            key={subject._id}
            sx={boxStyle}
            onClick={() => handleClick(subject._id, subject.class_number)}
          >
            <div style={subjectTextStyle}>{subject.name}</div>
            <div style={classNumberStyle}>{subject.class_name}</div>
          </Box>
        ))}
      </div>
      <Button variant='primary' style={addButtonStyle} onClick={handleCreateSubject}>
        Add Subject
      </Button>
    </div>
    );
};

export default Subjects;
