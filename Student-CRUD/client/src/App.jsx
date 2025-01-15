import { useState } from "react";
import AddModal from "./Modals/AddModal";
import UpdateModal from "./Modals/UpdateModal";

function App() {
  const [students, setStudents] = useState([
    {
      rollno: 101,
      name: "John Doe",
      email: "johndoe@example.com",
      age: 20,
      course: "Engineering",
    },
    {
      rollno: 102,
      name: "Jane Smith",
      email: "janesmith@example.com",
      age: 22,
      course: "Medicine",
    },
    {
      rollno: 103,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      age: 19,
      course: "Science",
    },
  ]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store the selected student
  const handleUpdateShow = (student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };
  const handleUpdateClose = () => {
    setSelectedStudent(null)
    setShowUpdateModal(false);
  }

  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-customBlue to-customGreen flex justify-center items-start p-4"
      >
        <div className="container mx-auto p-4 bg-blue-950 bg-opacity-20 rounded-lg shadow-lg backdrop-blur-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">
            Students List
          </h1>

          <div className="flex items-center justify-between bg-white p-3 rounded-lg mb-2">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search by name"
                className="px-3 py-1 border border-gray-300 rounded-md"
              />
              <select className="px-3 py-1 border border-gray-300 rounded-md">
                <option value="">Filter</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
            <AddModal />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg overflow-hidden bg-white">
              <thead>
                <tr className="bg-customBlue">
                  <th className="py-2 px-4 border border-blue-400">Roll No</th>
                  <th className="py-2 px-4 border border-blue-400">Name</th>
                  <th className="py-2 px-4 border border-blue-400">Email</th>
                  <th className="py-2 px-4 border border-blue-400">Age</th>
                  <th className="py-2 px-4 border border-blue-400">Course</th>
                  <th className="py-2 px-4 border border-blue-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {student.rollno}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {student.name}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {student.email}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">
                      {student.age}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {student.course}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 text-center">

                      <button
                        onClick={() => handleUpdateShow(student)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>

                      </button>

                      <button
                        onClick={() => deleteStudent(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md shadow ml-2 hover:bg-red-600 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UpdateModal
        showModal={showUpdateModal}
        handleClose={handleUpdateClose}
        student={selectedStudent}
      />

    </>
  );
}

export default App;
