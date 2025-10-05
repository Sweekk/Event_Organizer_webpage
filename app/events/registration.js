"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

const defaultEvents = [
  { id: 1, title: 'Freshers Fiesta', date: '2025-10-20', location: 'Auditorium' },
  { id: 2, title: 'Tech Quiz', date: '2025-11-05', location: 'Lab 3' },
];

export default function RegistrationPage(){
  const [events, setEvents] = useState(() => {
    try{
      const raw = localStorage.getItem('events');
      return raw ? JSON.parse(raw) : defaultEvents;
    }catch(e){ return defaultEvents; }
  });

  const [registrations, setRegistrations] = useState(() => {
    try{ const raw = localStorage.getItem('registrations'); return raw ? JSON.parse(raw) : {}; }catch(e){ return {}; }
  });

  useEffect(()=>{
    try{ localStorage.setItem('registrations', JSON.stringify(registrations)); }catch(e){}
  }, [registrations]);

  function register(eventId, name, email){
    setRegistrations(prev => {
      const list = prev[eventId] ? [...prev[eventId]] : [];
      list.push({ name, email, when: new Date().toISOString() });
      const next = { ...prev, [eventId]: list };
      try{ localStorage.setItem('registrations', JSON.stringify(next)); }catch(e){}
      return next;
    });
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Register for Events</h1>
        <Link href="/"><button className="btn">Back</button></Link>
      </header>

      <div className="card">
        <p className="muted">Select an event below and register by entering your name and email.</p>
      </div>

      <ul className="event-list" style={{ marginTop: 12 }}>
        {events.map(ev => (
          <li key={ev.id} className="event-item">
            <div>
              <div className="event-title">{ev.title}</div>
              <div className="event-meta">{ev.date} · {ev.location}</div>
            </div>
            <div style={{ minWidth: 300 }}>
              <RegistrationForm onRegister={(name,email) => register(ev.id, name, email)} count={(registrations[ev.id]||[]).length} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RegistrationForm({ onRegister, count }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input className="input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} style={{ flex: 1 }} />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: 160 }} />
      <button className="btn btn-primary" onClick={() => { if(!name||!email) return alert('Enter name and email'); onRegister(name,email); setName(''); setEmail(''); }}>Register</button>
      <div className="muted" style={{ marginLeft: 8 }}>{count} regs</div>
    </div>
  );
}
