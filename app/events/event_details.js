"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EventDetails({ id }){
  const [event, setEvent] = useState(null);
  const [notes, setNotes] = useState('');

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('events');
      if(!raw) return;
      const events = JSON.parse(raw);
      const found = events.find(e => String(e.id) === String(id));
      if(found){
        setEvent(found);
        setNotes(found.notes || '');
      }
    }catch(e){/* ignore */}
  }, [id]);

  function saveNotes(){
    try{
      const raw = localStorage.getItem('events');
      if(!raw) return;
      const events = JSON.parse(raw).map(e => e.id === event.id ? { ...e, notes } : e);
      localStorage.setItem('events', JSON.stringify(events));
      setEvent(prev=> prev ? { ...prev, notes } : prev);
      alert('Details saved');
    }catch(e){ console.error(e); }
  }

  if(!event) return (
    <div className="container">
      <header className="app-header"><h1 className="app-title">Event Details</h1><Link href="/events"><button className="btn">Back</button></Link></header>
      <p className="muted">Event not found.</p>
    </div>
  );

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">{event.title}</h1>
        <Link href="/events"><button className="btn">Back</button></Link>
      </header>

      <div className="card">
        <div style={{ marginBottom: 12 }}>
          <div className="event-meta">{event.date} · {event.location}</div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Details</h3>
          <textarea className="input" value={notes} onChange={e=>setNotes(e.target.value)} style={{ minHeight: 120, width: '100%' }} />
        </div>

        <div>
          <button className="btn btn-primary" onClick={saveNotes} style={{ marginRight: 8 }}>Save Details</button>
        </div>
      </div>
    </div>
  );
}
