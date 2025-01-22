const express = require("express");
const {
    getStudent,
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    searchStudents,
    getAllExams,
    getExam,
    createExam,
    filterAndSortStudents
} = require("../controller/userController.js");

const router = express.Router();

router.get('/student/:id', getStudent)
router.get('/filterSort', filterAndSortStudents)
router.get('/students', getAllStudents)
router.post('/student', createStudent)
router.patch('/student/:id', updateStudent)
// router.delete('/student/:id', deleteStudent)

router.get('/exam/:id', getExam)
router.get('/exams', getAllExams)
router.post('/exam', createExam)
// router.patch('/exam/:id', updateExam)
// router.delete('/exam/:id', deleteExam)

router.get('/search', searchStudents)

module.exports = router;