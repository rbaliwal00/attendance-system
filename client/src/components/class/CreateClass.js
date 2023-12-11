import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ClassService from '../../services/class.service';
import { history } from '../../helpers/history';


const CreateClass = () => {
    const [className, setClassName] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
              
            const res = await ClassService.createClass(className);
            console.log(res.data);

            history.push('/dashboard');
        } catch (error) {
          console.log(error);
        }
    };
      

    return (
        <div style={{ width: '90%', margin: 'auto' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicSubjectName">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
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

export default CreateClass;