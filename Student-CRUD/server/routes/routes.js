const express = require("express");
const {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    filterStudentsByCourse,
    sortStudents,
    searchStudents
} = require("../controller/userController.js");

const router = express.Router();

router.post('/create', createStudent)
router.put('/update/:id', updateStudent)
router.delete('/delete/:id', deleteStudent)

//readers
router.get('/', getStudents)
router.get('/filter', filterStudentsByCourse)
router.get('/sort', sortStudents)
router.get('/search', searchStudents)


module.exports = router;