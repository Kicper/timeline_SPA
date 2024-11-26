import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Timeline from "./components/Timeline";
import AddEventForm from "./components/AddEventForm";
import EditEventForm from "./components/EditEventForm";
import EventsTable from "./components/EventsTable";
import eventsData from "./data/events";

// Helper function to format dates as dd/mm/yyyy
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const App = () => {
  const [events, setEvents] = useState(eventsData);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [view, setView] = useState("timeline");
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  // Adds a new event to the list and generates a unique ID for it
  const addEvent = (newEvent) => {
    const eventWithId = { ...newEvent, id: uuidv4() };
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
    setShowForm(false);
  };

  // Saves the edited event and updates the events list
  const saveEdit = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setShowEditModal(false);
    setEditingEvent(null);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 2000);
  };

  // Sets the event to delete
  const confirmDelete = (id) => {
    setEventToDelete(id);
  };

  // Deletes the event from the list
  const handleDelete = () => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventToDelete));
    setEventToDelete(null);
  };

  // Sets the event to edit
  const editEvent = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setEditingEvent(eventToEdit);
    setShowEditModal(true);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Music Timeline</h1>

      {/* Toggle buttons to switch between timeline and table views */}
      {!showForm && (
        <div className="row mb-3">
          <div className="col-12 text-center">
            <button
              className={`btn ${view === "timeline" ? "btn-primary" : "btn-outline-primary"} me-2`}
              onClick={() => setView("timeline")}
            >
              Timeline View
            </button>
            <button
              className={`btn ${view === "table" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setView("table")}
            >
              Table View
            </button>
          </div>
        </div>
      )}

      {/* Render Timeline view */}
      {!showForm && view === "timeline" && (
        <div>
          <button
            className="btn btn-success mb-4"
            style={{ position: "absolute", top: "10px", left: "10px" }}
            onClick={() => setShowForm(true)}
          >
            Add New Event
          </button>
          <Timeline
            events={events.map((event) => ({
              ...event,
              startDateFormatted: formatDate(event.startDate),
              endDateFormatted: event.endDate ? formatDate(event.endDate) : "Present",
            }))}
            onDeleteEvent={confirmDelete}
            onEditEvent={editEvent}
          />
        </div>
      )}

      {/* Render Table view */}
      {!showForm && view === "table" && (
        <div>
          <button
            className="btn btn-success mb-4"
            style={{ position: "absolute", top: "10px", left: "10px" }}
            onClick={() => setShowForm(true)}
          >
            Add New Event
          </button>
          <EventsTable
            events={events.map((event) => ({
              ...event,
              startDateFormatted: formatDate(event.startDate),
              endDateFormatted: event.endDate ? formatDate(event.endDate) : "Present",
            }))}
            onDeleteEvent={confirmDelete}
            onEditEvent={editEvent}
          />
        </div>
      )}

      {/* Add Event Form Modal */}
      {showForm && (
        <AddEventForm
          onAddEvent={addEvent}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Confirm Delete Modal */}
      {eventToDelete && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setEventToDelete(null)}></button>
              </div>
              <div className="modal-body">Are you sure you want to delete this event?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEventToDelete(null)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && editingEvent && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Event</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <EditEventForm
                  event={editingEvent}
                  onSaveEdit={saveEdit}
                  onCancel={() => setShowEditModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      {showSaveConfirmation && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Success</h5></div>
              <div className="modal-body">Changes were successfully saved.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;