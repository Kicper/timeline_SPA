import React, { useState } from "react";

const AddEventForm = ({ onAddEvent, onCancel }) => {
    // State to manage the form data
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        category: "",
        startDate: null,
        endDate: null,
        image: "",
        imagePreview: "",
    });

    // State to handle the display of error modals
    const [showDateErrorModal, setShowDateErrorModal] = useState(false);
    const [showMissingFieldsModal, setShowMissingFieldsModal] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => {
            if (name === "startDate" || name === "endDate") {
                return { ...prev, [name]: value ? new Date(value) : null };
            }
            return { ...prev, [name]: value };
        });
    };

    // Handle file input change (image upload)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewEvent((prev) => ({
                    ...prev,
                    image: reader.result,
                    imagePreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (newEvent.endDate && newEvent.startDate > newEvent.endDate) {
            setShowDateErrorModal(true);
            return;
        }

        if (!newEvent.title || !newEvent.startDate) {
            setShowMissingFieldsModal(true);
            return;
        }

        const eventToSave = {
            ...newEvent,
            startDate: newEvent.startDate ? newEvent.startDate.toISOString().split("T")[0] : null,
            endDate: newEvent.endDate ? newEvent.endDate.toISOString().split("T")[0] : null,
        };

        onAddEvent(eventToSave);
    };

    return (
        <>
            {/* Event form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            name="category"
                            value={newEvent.category}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            {/* Event category options */}
                            <option value="">Category</option>
                            <option value="Pop">Pop</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Folk">Folk</option>
                            <option value="Rock">Rock</option>
                            <option value="Hip-hop">Hip-hop</option>
                            <option value="Classical">Classical</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <textarea
                        name="description"
                        value={newEvent.description}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Description"
                        rows="3"
                    ></textarea>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="date"
                            name="startDate"
                            value={newEvent.startDate ? newEvent.startDate.toISOString().split("T")[0] : ""}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="date"
                            name="endDate"
                            value={newEvent.endDate ? newEvent.endDate.toISOString().split("T")[0] : ""}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="form-control"
                        accept="image/*"
                    />
                    {newEvent.imagePreview && (
                        <div className="mt-2">
                            {/* Image preview */}
                            <img
                                src={newEvent.imagePreview}
                                alt="preview"
                                style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
                            />
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                        Add Event
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Back
                    </button>
                </div>
            </form>

            {/* Modal for invalid date range */}
            {showDateErrorModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Invalid Dates</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDateErrorModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Start date cannot be later than end date. Please correct the dates.
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDateErrorModal(false)}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for missing required fields */}
            {showMissingFieldsModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Missing Required Fields</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowMissingFieldsModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Please fill out at least the title and start date to add an event.
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowMissingFieldsModal(false)}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEventForm;