import React, { useEffect, useState, useMemo } from 'react';
import { history } from '../../helpers/history';
import SubjectService from '../../services/subject.service';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import TeacherService from '../../services/teacher.service';

const EditAttendance = () => {
    const[start,setStart] = useState();
    const[end,setEnd] = useState();
    const [subjectId, setSubjectId] = useState();
    const [classId, setClassId] = useState();
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);

    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('None Selected');

    const handleEvent = (e) => {
        const st = [start.$D,start.$M,start.$y];
        const en = [end.$D,end.$M,end.$y];
        history.push('/range-attendance-detail', {state: { st,en, subjectId, classId}});
    }

    useEffect(async () => {
        const res = await SubjectService.getAllSubjects();
        setSubjects(res.data);
    }, [])
  
 
    const currentUser = useSelector((state) => state.auth.user);
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

    const handleClick = (id, class_number) => {
      setSubjectId(id);
      setClassId(class_number);
      setSelectedSubjectId(id);
    }

    return (
        <div>
            <div >
                {subjects.map((subject) => (
                    <Box key={subject._id} sx={{
                    height: 150,
                    width: 200, // Adjust the width as needed
                    // backgroundColor: (theme) =>
                    //     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    margin: '10px', // Add margin for spacing
                    display: 'inline-block', // Display cards horizontally
                    border: "2px solid black",
                    ":hover": {background: 'lightgray', cursor: 'pointer'},
                    ...(subject._id === selectedSubjectId && {
                        background: 'lightgray', // Set your selected background color
                      }),
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

export default EditAttendance;