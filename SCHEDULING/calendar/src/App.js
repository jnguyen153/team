import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js"; 

function MyCalendar({ savedEvents }) {
    const [tempEvents, setTempEvents] = useState(savedEvents);
    let lastClickTime = null;

    const handleDateClick = (info) => {
        const currentClickTime = Date.now();

        if (lastClickTime && currentClickTime - lastClickTime <= 700) {
            const newEvent = {
                id: String(tempEvents.length + 1),
                title: `New Event ${tempEvents.length + 1}`,
                start: info.dateStr,
            };
            setTempEvents([...tempEvents, newEvent]);
        }

        lastClickTime = currentClickTime;
    };

    const handleEventDrop = (info) => {
        setTempEvents((prev) =>
            prev.map((event) =>
                event.id === info.event.id
                    ? { ...event, start: info.event.startStr, end: info.event.endStr }
                    : event
            )
        );
    };

    const handleEventResize = (info) => {
        setTempEvents((prev) =>
            prev.map((event) =>
                event.id === info.event.id
                    ? { ...event, start: info.event.startStr, end: info.event.endStr }
                    : event
            )
        );
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={tempEvents}
            editable={true}
            selectable={true}
            droppable={true}
            eventResizableFromStart={true}
            dateClick={handleDateClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
        />
    );
}

function App() {
    const [savedEvents, setSavedEvents] = useState([
        { id: "1", title: "Event 1", start: "2025-03-25" },
        { id: "2", title: "Event 2", start: "2025-03-28" },
    ]);

    const [tempEvents, setTempEvents] = useState(savedEvents);

    const handleSave = () => {
        setSavedEvents(tempEvents);
    };

    return (
        <div>
            <h1>Draggable & Resizable FullCalendar</h1>
            <MyCalendar savedEvents={savedEvents} />
        </div>
    );
}

export default App;
