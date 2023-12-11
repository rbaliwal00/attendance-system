import api from './api';

class SubjectService {
  async createSubject(teacher_email, name, class_number) {
    return await api.post('/subject', {
        teacher_email,
        name: name,
        class_number: class_number
    });
  }

  async addAttendance(subjectId, attendance) {
    return await api.put(`/attendance/add-attendance/${subjectId}`,{attendance});
  }

  async getRangeAttendance(subjectId, startDate, endDate) {
    return await api.post('/attendance/range-attendance',{
      subjectId,
      startDate,
      endDate
    });
  }

  async getAllSubjects() {
    return await api.get(`/subject`);
  }

  async getSubjectById(subjectId) {
    return await api.get(`/subject/${subjectId}`);
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new SubjectService();
