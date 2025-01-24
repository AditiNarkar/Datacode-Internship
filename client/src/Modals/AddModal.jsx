import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

export default function AddModal() {
    const [showModal, setShowModal] = useState(false);
    const [student, setStudent] = useState({
        name: "",
        email: "",
        age: "",
        course: "",
    });

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Student Info Submitted:", student);
        // You can handle saving the student data here
        handleClose();
    };

    return (
        <>
            <button
                onClick={handleShow}
                className="bg-customGreen text-white px-3 py-1 rounded-md shadow hover:bg-green-600 transition"
            >
                Add Student
            </button>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={student.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={student.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={student.age}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                                    Course
                                </label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    value={student.course}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <button
                            className="bg-customGreen text-white px-3 py-1 h-10 rounded-md shadow hover:bg-green-600 transition"
                        >
                            Add
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
