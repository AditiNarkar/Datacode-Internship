require('../config/db.js')
const STUDENT = require('../model/Student.js')

const createStudent = async (req, res) => {
    try {
        const { rollno, name, email, age, course } = req.body;

        if (!rollno || !name || !email || !age || !course) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const newStudent = new STUDENT({
            rollno,
            name,
            email,
            age,
            course,
        });

        await newStudent.save();
        res.status(201).json({ msg: "Student created successfully", student: newStudent });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ msg: "Error creating student", error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await STUDENT.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ msg: "Student not found." });
        }

        res.status(200).json({ msg: "Student removed successfully", student: deletedStudent });
    } catch (error) {
        console.error("Error removing student:", error);
        res.status(500).json({ msg: "Error removing student", error: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedStudent = await STUDENT.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure schema validations are applied
        });

        if (!updatedStudent) {
            return res.status(404).json({ msg: "Student not found." });
        }

        res.status(200).json({ msg: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ msg: "Error updating student", error: error.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const student = await STUDENT.findById(id);
            if (!student) {
                return res.status(404).json({ msg: "Student not found." });
            }
            return res.status(200).json({ student });
        }

        const students = await STUDENT.find();
        res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ msg: "Error fetching students", error: error.message });
    }
};

module.exports = {
    createStudent,
    deleteStudent,
    updateStudent,
    getStudents,
};
