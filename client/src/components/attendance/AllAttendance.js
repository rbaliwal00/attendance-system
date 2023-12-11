import { Box } from '@mui/material';
import React, {useState, useEffect, useMemo} from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import subjectService from '../../services/subject.service';
import Button from 'react-bootstrap/esm/Button';
import { history } from '../../helpers/history';
import classService from '../../services/class.service';
import TeacherService from '../../services/teacher.service';
import { useSelector } from 'react-redux';

const AllAttendance = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('None Selected');
    const currentUser = useSelector((state) => state.auth.user);
    const [subjectId, setSubjectId] = useState();
    const [classId, setClassId] = useState();

    const handleSubjectChange = (selectedSubject, subjectId, classId) => {
        setSubjectId(subjectId);
        setSelectedSubject(selectedSubject);
        setClassId(classId)
    };

    let sub = [];
    
    useEffect(async () => {
        const res = await subjectService.getAllSubjects();
        setSubjects(res.data);


    }, [])

    const handleEvent = (e) => {
        
    }

  console.log(subjects);
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

    const subjectTextStyle = {
        fontSize: '1.2rem', // Adjust the font size
        fontWeight: 'bold', // Make the text bold
        color: '#333', // Set text color
        textAlign: 'center',
        marginTop: '20px'
      };
    
      const classNumberStyle = {
        fontSize: '1rem', // Adjust the font size
        color: '#666', // Set text color
        textAlign: 'center',
        marginTop: '30px'
      };

    const handleCreateSubject = () => {
        history.push('/create-subject');
    }

    const handleClick = (subjectId, classId) => {
        history.push('/view-attendance-detail', {data: {subjectId, classId}});
    }

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

    return (
        <div>
            <Box sx={{textAlign: 'center', mb: '30px', fontWeight: '800'}}>
                Subject Wise Attendance
            </Box>
            <div >
                {subjects.map((subject) => (
                    <Box key={subject._id} 
                    
                    sx={{
                      height: 140,
                      width: 200, // Adjust the width as needed
                      backgroundColor: '#fff',
                      margin: '10px', // Add margin for spacing
                      display: 'inline-block', // Display cards horizontally
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'box-shadow 0.3s ease-in-out',  
                    ":hover": {background: 'lightgray', cursor: 'pointer'}

                    }}
                    onClick={() => handleClick(subject._id, subject.class_number)}
                    >
                        <div style={subjectTextStyle}>{subject.name}</div>
                        <div style={classNumberStyle}>{subject.name}</div>
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default AllAttendance;