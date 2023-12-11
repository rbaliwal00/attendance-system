import React from 'react';
import ReportIcon from '@mui/icons-material/Report';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { history } from '../../helpers/history';

const Report = () => {
    const handleReport = () => {
        history.push('/subject-report');
    }
    const handleOverallReport = () => {
        history.push('/overall-report');
    }

    return (
        <div style={{textAlign: 'center', marginTop: '20px'}}>
            <h2 style={{marginBottom: '30px'}}>Student Attendance Report</h2>
            <div 
                onClick={handleReport}
                style={{
                    background: 'rgb(253, 207, 74)',
                    cursor: 'pointer',
                    maxWidth: '250px',
                    color: 'white', 
                    textAlign: 'center',
                    margin: 'auto',
                    padding: '40px 0 20px 0px',
                    marginBottom: '20px'}}>
                <ReportIcon sx={{fontSize: '100px'}}/>
                <br />
                <h4 style={{marginTop: '10px'}}>Subject Wise Report</h4>
            </div>
            <div 
                onClick={handleOverallReport}
                style={{background: 'rgb(26, 17, 172)',
                maxWidth: '250px',
                color: 'white', 
                cursor: 'pointer',
                textAlign: 'center',
                margin: 'auto',
                padding: '40px 0 20px 0px',
                marginBottom: '20px'}}>
                <AssessmentIcon sx={{fontSize: '100px'}}/>
                <br />
                <h4 style={{marginTop: '10px'}}>Overall Report</h4>
            </div>
        </div>
    );
};

export default Report;