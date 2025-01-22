require('../config/db.js')
const STUDENT = require('../model/Student.js')
const EXAM = require('../model/Exams.js')

// STUDENT OPERATIONS
const ifStudentExists = async (name, email) => {
    const student = await STUDENT.findOne({ name, email });
    (student) ? true : false;
};

const getStudent = async (req, res) => { // done
    try {
        const student = await STUDENT.findById(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getAllStudents = async (req, res) => { // done
    try {
        const { page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;

        const students = await STUDENT.find()
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await STUDENT.countDocuments();
        res.status(200).json({
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
            students,
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ msg: "Error fetching students", error: error.message });
    }
};

const createStudent = async (req, res) => {//done
    try {
        const { rollno, name, phone, city, email, age, course, year, examId } = req.body;

        if (!rollno || !name || !phone || !city || !email || !age || !course || !year) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        const existingStudent = ifStudentExists(name, email);
        if (existingStudent) {
            return res.status(400).json({ msg: "Student with this rollno or email already exists." });
        }

        const newStudent = new STUDENT({ rollno, name, phone, city, email, age, course, year });
        await newStudent.save();

        if (examId) {
            const updatedExam = await EXAM.findByIdAndUpdate(
                examId,
                { $addToSet: { completedBy: newStudent._id } },
                { new: true }
            );
            if (!updatedExam) {
                res.status(500).json({ msg: "No examID found, added student successfully." });
            }
        }
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

        await EXAM.updateMany(
            { completedBy: id }, // find
            { $pull: { completedBy: id } } // removeAll
        );

        res.status(200).json({ msg: "Student removed successfully", student: deletedStudent });
    } catch (error) {
        console.error("Error removing student:", error);
        res.status(500).json({ msg: "Error removing student", error: error.message });
    }
};

const updateStudent = async (req, res) => { //done
    try {
        const { id } = req.params;
        const updates = req.body;
        const { name, examId } = updates;

        // if (name, email){
        //     const existingStudent = ifStudentExists(name, email);
        //     if (existingStudent) {
        //         return res.status(400).json({ msg: "Student with this rollno or email already exists." });
        //     }
        // }

        const updatedStudent = await STUDENT.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure schema validations are applied
        });

        if (!updatedStudent) {
            return res.status(404).json({ msg: "Student not found." });
        }
        if (examId) {
            try {
                const updatedExam = await EXAM.findByIdAndUpdate(
                    examId,
                    { $addToSet: { completedBy: updatedStudent._id } },
                    { new: true }
                );
                if (!updatedExam) {
                    return res.status(404).json({ msg: "Exam not found." });
                }
            } catch (examError) {
                return res.status(500).json({ msg: "Error updating exam", error: examError.message });
            }
        }
        res.status(200).json({ msg: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ msg: "Error updating student", error: error.message });
    }
};

const filterAndSortStudents = async (req, res) => { // done yet to check
    try {
        const { fieldName, filterValue, sortValue = "asc" } = req.params;

        const filterCriteria = filterValue ? { [fieldName]: filterValue } : {};
        const sortCriteria = sortValue ? { [fieldName]: sortValue === "asc" ? 1 : -1 } : {};

        const students = await STUDENT.find(filterCriteria).sort(sortCriteria);

        if (students.length === 0) {
            return res.status(404).json({ msg: "No students found." });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Error fetching students", error: error.message });
    }
}

const searchStudents = async (req, res) => { // done
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ msg: "Search query is required." });
        }

        const students = await STUDENT.find({
            $or: [
                // case insensitive
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ],
        });
        res.status(200).json({ students });
    } catch (error) {
        console.error("Error searching students:", error);
        res.status(500).json({ msg: "Error searching students", error: error.message });
    }
};


// EXAM OPERATIONS
const getAllExams = async (req, res) => { //done
    try {
        const exams = await EXAM.find().populate('completedBy', 'name email');
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getExam = async (req, res) => { // done
    try {
        const exam = await EXAM.findById(req.params.id).populate('completedBy', 'name email');
        if (!exam) return res.status(404).json({ error: 'Exam not found' });
        res.status(200).json(exam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createExam = async (req, res) => { // done
    const { subject, date, completedBy } = req.body;
    if (!subject || !date) {
        return res.status(400).json({ msg: "Subject and date are required." });
    }
    const parsedDate = new Date(date);
    try {
        const existingExam = await EXAM.findOne({ subject, date: parsedDate });
        if (existingExam) {
            return res.status(400).json({ msg: "An exam with this subject and date already exists." });
        }
        const exam = new EXAM({ subject, date: parsedDate, completedBy });
        await exam.save();
        res.status(201).json(exam);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent,
    getAllStudents,
    filterAndSortStudents,
    searchStudents,
    getAllExams,
    getExam, createExam
};
