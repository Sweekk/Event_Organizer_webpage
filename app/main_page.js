"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
// EventList removed from main page; events are shown on /events

const defaultEvents = [
  { id: 1, title: 'Freshers Fiesta', date: '2025-10-20', location: 'Auditorium' },
  { id: 2, title: 'Tech Quiz', date: '2025-11-05', location: 'Lab 3' },
];

export default function HomePage(){
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', location: '' });

  function addEvent(e){
    e.preventDefault();
    if(!form.title.trim()) return;
    const next = { id: Date.now(), ...form };
    setEvents(prev => {
      const nextState = [next, ...prev];
      try{ localStorage.setItem('events', JSON.stringify(nextState)); }catch(e){}
      return nextState;
    });
    setForm({ title: '', date: '', location: '' });
    setShowForm(false);
  }

  // load initial events from localStorage (or use defaults)
  useEffect(() => {
    try{
      const raw = localStorage.getItem('events');
      if(raw){
        setEvents(JSON.parse(raw));
      } else {
        setEvents(defaultEvents);
        localStorage.setItem('events', JSON.stringify(defaultEvents));
      }
    }catch(err){
      setEvents(defaultEvents);
    }
  }, []);

  // persist events whenever they change
  useEffect(() => {
    try{ localStorage.setItem('events', JSON.stringify(events)); }catch(e){}
  }, [events]);

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">College Fest Portal</h1>
        <div className="controls">
          <button className="btn" onClick={() => setShowForm(s => !s)}>
            {showForm ? 'Close' : 'Add Event'}
          </button>
          <Link href="/events">
            <button className="btn btn-primary">View Events</button>
          </Link>
          <Link href="/events/registration">
            <button className="btn">Register</button>
          </Link>
        </div>
      </header>

      <section className="hero">
        <h2 style={{ margin: '0 0 8px 0' }}>Welcome to your event organizer</h2>
        <p style={{ margin: 0 }}>Create and manage college events — schedules, locations and more.</p>
      </section>

      {showForm && (
        <form onSubmit={addEvent} className="card" style={{ marginBottom: 20 }}>
          <div className="form-grid">
            <input className="input" placeholder="Event title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
            <input className="input" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} />
            <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} style={{ gridColumn: '1 / -1' }} />
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" type="submit" style={{ marginRight: 8 }}>Save Event</button>
            <button className="btn" type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <main>
        <p className="muted">Events are listed on a separate page. Click &quot;View Events&quot; to see them.</p>
      </main>
    </div>
  );

}