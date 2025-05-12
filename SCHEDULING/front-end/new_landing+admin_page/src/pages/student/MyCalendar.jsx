import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function MyCalendar({ tempEvents, setTempEvents }) {
    let lastClickTime = null;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [firstEventDate, setFirstEventDate] = useState(null);

    const handleDateClick = (info) => {
        const currentClickTime = Date.now();
      
        if (lastClickTime && currentClickTime - lastClickTime <= 700) {
            const newEvent = {
                id: String(tempEvents.length + 1),
                title: `Available`,
                start: info.dateStr,
                source: "manual",
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

    const handleEventClick = (info) => {
        const clickedEvent = tempEvents.find((event) => event.id === info.event.id);
        if (clickedEvent) {
            setSelectedEvent(clickedEvent);
        }
    };

    const handleDeleteEvent = () => {
        if (selectedEvent && selectedEvent.source !== "ics") {
            setTempEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== selectedEvent.id)
            );
            console.log(`Event deleted: ${selectedEvent.title}`);
            setSelectedEvent(null);
        }
    };

    useEffect(() => {
        if (selectedEvent) {
            const handleKeyPress = (event) => {
                if (event.key === "Delete" || event.key === "Backspace") {
                    handleDeleteEvent();
                }
            };

            window.addEventListener("keydown", handleKeyPress);

            return () => {
                window.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [selectedEvent]);

    const setFirstWeekRange = (events) => {
        if (events.length > 0) {
            const sortedEvents = events.sort((a, b) => new Date(a.start) - new Date(b.start));
            const firstEventDate = new Date(sortedEvents[0].start);
            const firstDayOfWeek = firstEventDate.getDate() - firstEventDate.getDay();
            const firstWeekStartDate = new Date(firstEventDate.setDate(firstDayOfWeek));

            setFirstEventDate(firstWeekStartDate);
        }
    };

    useEffect(() => {
        setFirstWeekRange(tempEvents);
    }, [tempEvents]);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
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
            eventClick={handleEventClick}
        // validRange={{
        //     start: firstEventDate ? firstEventDate.toISOString().split('T')[0] : undefined, 
        //     end: firstEventDate ? new Date(firstEventDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined, 
        // }}
        />
    );
}

export default MyCalendar;
