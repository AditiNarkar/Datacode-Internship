const express = require("express");
const {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent
} = require("../controller/userController.js");

const router = express.Router();

router.post('/create', createStudent)
router.get('/', getStudents)
router.put('/update/:id', updateStudent)
router.delete('/delete/:id', deleteStudent)

module.exports = router;