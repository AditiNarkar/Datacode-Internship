const express = require("express");
const {
    getStudent,
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    getAllExams,
    getExam,
    createExam,
    getAccount,
    createStudentAccount,
    getAllAccounts,
    updateAccount,
    deleteAccount,
    updateExam,
    deleteExam
} = require("../controller/userController.js");

const router = express.Router();

router.get('/student/:id', getStudent)
router.get('/students', getAllStudents)
router.post('/student', createStudent)
router.patch('/student/:id', updateStudent)
router.delete('/student/:id', deleteStudent)

router.get('/exam/:id', getExam)
router.get('/exams', getAllExams)
router.post('/exam', createExam)
router.patch('/exam/:id', updateExam)
router.delete('/exam/:id', deleteExam)

router.get('/accounts', getAllAccounts)
router.get('/account/:id', getAccount) // accID
router.post('/account/:id', createStudentAccount) // studID 
router.patch('/account/:id', updateAccount)
router.delete('/account/:id', deleteAccount)


module.exports = router;