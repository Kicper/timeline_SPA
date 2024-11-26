import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

// Timeline component displaying events in a vertical timeline format
const Timeline = ({ events, onDeleteEvent, onEditEvent }) => {
    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    return (
        <VerticalTimeline>
            {/* Render each event in the timeline */}
            {sortedEvents.map((event) => (
                <VerticalTimelineElement
                    key={event.id}
                    date={`${event.startDateFormatted} - ${event.endDateFormatted}`}
                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                >
                    <h3>{event.title}</h3>
                    <h4>{event.category}</h4>
                    <p>{event.description}</p>

                    {/* Display event image if available */}
                    {event.image && (
                        <img
                            src={event.image}
                            alt={event.title}
                            style={{ width: "100%", borderRadius: "10px", marginTop: "10px" }}
                        />
                    )}

                    {/* Buttons to delete or edit the event */}
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-danger mt-3"
                            onClick={() => onDeleteEvent(event.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-warning mt-3 ms-2"
                            onClick={() => onEditEvent(event.id)}
                        >
                            Edit
                        </button>
                    </div>
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    );
};

export default Timeline;