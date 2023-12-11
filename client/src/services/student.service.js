import api from './api';

class StudentService {
  async createStudent(roll_no, name, father_name, mobile) {
    return await api.post('/student', {
        roll_no,
        name,
        father_name,
        mobile,
    });
  }

  async getStudentById(id){
    return await api.get(`/student/${id}`);
  }

  async getClassById(id) {
    return api.get(`/class/${id}`);
  }

  async getAllStudents(id) {
    return api.get(`/students`);
  }

  async getAllSubjectsForStudent(rollNo) {
    return api.get(`/student/subjects/${rollNo}`);
  }

  async editStudentById(id, roll_no, name, father_name, mobile){
    return api.put(`/student/${id}`, {roll_no, name, father_name, mobile});
  }

  async deleteStudentById(id) {
    return api.delete(`/student/${id}`);
  }

}

export default new StudentService();
