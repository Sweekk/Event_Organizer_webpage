"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EventList from './event_list';

export default function EventsPage(){
  const [events, setEvents] = useState(() => {
    try{
      const raw = localStorage.getItem('events');
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  });

  useEffect(()=>{
    try{ localStorage.setItem('events', JSON.stringify(events)); }catch(e){}
  }, [events]);

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">All Events</h1>
        <Link href="/">
          <button className="btn">Back</button>
        </Link>
      </header>

      <EventList events={events} onDelete={(id) => setEvents(prev => prev.filter(p => p.id !== id))} />
    </div>
  );
}
