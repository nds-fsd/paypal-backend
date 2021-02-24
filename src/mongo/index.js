require('./connection');
const Student = require('./schemas/Student');
const {initFirstStudent} = require('./initFirstStudent');


initFirstStudent(Student);

module.exports = {
  Student: Student,
}
