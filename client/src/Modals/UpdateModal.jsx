import React from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateModal = ({ showModal, handleClose, student }) => {
    if (student != null) {
        return (
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Roll No</label>
                            <input
                                type="text"
                                className="px-3 py-2 border border-gray-300 rounded-md"
                                value={student.rollno}
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Name</label>
                            <input
                                type="text"
                                className="px-3 py-2 border border-gray-300 rounded-md"
                                value={student.name}
                                onChange={(e) => {
                                    // handle change
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                className="px-3 py-2 border border-gray-300 rounded-md"
                                value={student.email}
                                onChange={(e) => {
                                    // handle change
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Age</label>
                            <input
                                type="number"
                                className="px-3 py-2 border border-gray-300 rounded-md"
                                value={student.age}
                                onChange={(e) => {
                                    // handle change
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Course</label>
                            <input
                                type="text"
                                className="px-3 py-2 border border-gray-300 rounded-md"
                                value={student.course}
                                onChange={(e) => {
                                    // handle change
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default UpdateModal;
