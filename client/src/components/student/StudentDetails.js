import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentService from '../../services/student.service';
import { history } from '../../helpers/history';

const StudentDetails = () => {
    const[student, setStudent] = useState(null);
    const params = useParams();

    useEffect(async () => {
        const res = await studentService.getStudentById(params.id);
        setStudent(res.data);
    }, []);

    const handleEdit = () => {
        history.push(`/edit-student/${params.id}`);
    }

    const handleDelete = async () => {
        await studentService.deleteStudentById(params.id);
        history.push(`/`);
    }
    

    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: '30px'}}>Student Profile</h3>
            <div style={{
                    width: '80%',
                    margin: 'auto',
                    marginTop: '40px',
                    padding: '30px',
                    boxShadow: 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px'
                }}>
                <div style={{borderBottom: '2px solid black'}}>
                    Roll No.  - {student?.roll_no}
                </div>
                <div style={{borderBottom: '2px solid black', 
                    marginTop: '20px'
                    }}>Name - {student?.name}</div>
                <div style={{borderBottom: '2px solid black',
                    marginTop: '20px'
                    }}
                    >Father Name - {student?.father_name}
                </div>
                <div style={{borderBottom: '2px solid black',
                    marginTop: '20px',
                    marginBottom: '50px'}}
                    >
                    Mobile - {student?.mobile}
                </div>
                <button
                    style={{
                        padding: '5px 46px',
                        borderRadius: '10px',
                        color: 'white',
                        marginRight: '20px',
                        background: 'orange',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease',
                    }}
                    onClick={handleEdit}
                    onMouseOver={(e) => (e.target.style.background = 'rgb(255, 213, 128)')} // Light red on hover
                    onMouseOut={(e) => (e.target.style.background = 'orange')} // Original red on hover out
                    >
                    Edit
                </button>
                <button
                    style={{
                        padding: '5px 40px',
                        borderRadius: '10px',
                        color: 'white',
                        background: 'red',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease',
                    }}
                    onClick={handleDelete}
                    onMouseOver={(e) => (e.target.style.background = '#ff6666')} // Light red on hover
                    onMouseOut={(e) => (e.target.style.background = 'red')} // Original red on hover out
                    >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default StudentDetails;