"use client";
import React from 'react';

export default function EventList({ events, onDelete }){
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Upcoming Events</h3>
      {events.length === 0 ? (
        <p className="muted">No events yet. Click &quot;Add Event&quot; to create one.</p>
      ) : (
        <ul className="event-list">
          {events.map(ev => (
            <li key={ev.id} className="event-item">
              <div>
                <div className="event-title">{ev.title}</div>
                <div className="event-meta">{ev.date} · {ev.location}</div>
              </div>
              <div>
                <button className="btn" onClick={() => onDelete(ev.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
