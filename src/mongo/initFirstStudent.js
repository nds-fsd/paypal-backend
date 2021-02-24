const initFirstStudent = async (Student) => {
  const studentData = {
    email: 'carlosarenas@nuclio.com',
    name: 'Carlos',
    master: 'FullStack Develpment'
  };

  const firstStudent = await Student.findOne({email: 'carlosarenas@nuclio.com'});
  console.log(firstStudent);

  if (firstStudent) {
    console.log('Delete user');
    await Student.findByIdAndDelete(firstStudent._id);
  }

  if (!firstStudent) {
    const newStudent = new Student(studentData);
    newStudent.save();
    console.log('First student created');
  }



}

module.exports = {
  initFirstStudent,
}
