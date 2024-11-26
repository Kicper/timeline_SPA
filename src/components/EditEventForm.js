import React, { useState, useEffect } from "react";

const EditEventForm = ({ event, onSaveEdit, onCancel }) => {
    // State for managing edited event details, including title, description, dates, and image
    const [editedEvent, setEditedEvent] = useState({
        title: "",
        description: "",
        category: "",
        startDate: null,
        endDate: null,
        image: "",
        imagePreview: "",
        id: null,
    });

    // State for managing the visibility of the modals
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDateErrorModal, setShowDateErrorModal] = useState(false);

    // Effect hook to update the form when an event prop is passed
    useEffect(() => {
        if (event) {
            setEditedEvent({
                ...event,
                startDate: event.startDate ? new Date(event.startDate) : null,
                endDate: event.endDate ? new Date(event.endDate) : null,
                imagePreview: event.image,
            });
        }
    }, [event]);

    // Handle input field changes, including handling date fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent((prev) => {
            if (name === "startDate" || name === "endDate") {
                return { ...prev, [name]: value ? new Date(value) : null };
            }
            return { ...prev, [name]: value };
        });
    };

    // Handle file input for the event image, updating the image preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedEvent((prev) => ({
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

        if (editedEvent.endDate && editedEvent.startDate > editedEvent.endDate) {
            setShowDateErrorModal(true);
            return;
        }
        setShowSaveModal(true);
    };

    // Confirm save action, transform dates and call onSaveEdit prop
    const confirmSave = () => {
        const eventToSave = {
            ...editedEvent,
            startDate: editedEvent.startDate ? editedEvent.startDate.toISOString().split("T")[0] : null,
            endDate: editedEvent.endDate ? editedEvent.endDate.toISOString().split("T")[0] : null,
        };
        onSaveEdit(eventToSave);
        setShowSaveModal(false);
    };

    return (
        <>
            {/* Event edit form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="title"
                            value={editedEvent.title}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            name="category"
                            value={editedEvent.category}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            {/* Category dropdown */}
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
                        value={editedEvent.description}
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
                            value={editedEvent.startDate ? editedEvent.startDate.toISOString().split("T")[0] : ""}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="date"
                            name="endDate"
                            value={editedEvent.endDate ? editedEvent.endDate.toISOString().split("T")[0] : ""}
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
                    {editedEvent.imagePreview && (
                        <div className="mt-2">
                            {/* Display image preview if available */}
                            <img
                                src={editedEvent.imagePreview}
                                alt="preview"
                                style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
                            />
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                        Save changes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Back
                    </button>
                </div>
            </form>

            {/* Modal for confirming the save action */}
            {showSaveModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Save</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowSaveModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to save these changes?
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowSaveModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-success" onClick={confirmSave}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for date error if start date is after end date */}
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
        </>
    );
};

export default EditEventForm;