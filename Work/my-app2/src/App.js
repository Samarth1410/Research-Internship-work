import React from "react";
import "./styles.css";
import { Calendar } from 'fullcalendar'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import '@fullcalendar/list/main.css';

import events from "./events";

export default function App() {
  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,list"
        }}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        events={events}
      />
    </div>
  );
}
