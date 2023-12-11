import api from './api';

class UserService {
  async getAllSubjectsForTeacher(teacher_email) {
    return await api.post('/teacher/all-subjects', {teacher_email});
  }

  getUserBoard() {
    return api.get('/test/user');
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new UserService();
