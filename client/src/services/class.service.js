import api from './api';

class ClassService {
  async getAllClasses() {
    return await api.get('/classes');
  }

  getClassById(id,classId) {
    return api.get(`/class/${id}`);
  }

  async updateClass(id, _id, class_name, students) {
    try {
      await api.put(`/class/${id}`, {
        _id: id,
        class_name,
        students,
      });
    } catch (error) {
      // Handle any network or other errors
      throw new Error(`Error updating class: ${error.message}`);
    }
  }

  async createClass(class_name) {
    return await api.post('/class',{class_name});
  }
}

export default new ClassService();
