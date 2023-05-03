// import React, { useState, useEffect, useRef } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
//
// const externalEvents = [
//     {
//         id: 'event1',
//         title: 'Event 1',
//         start: '2023-05-10T10:00:00',
//         end: '2023-05-10T12:00:00'
//     },
//     {
//         id: 'event2',
//         title: 'Event 2',
//         start: '2023-05-12T14:00:00',
//         end: '2023-05-12T16:00:00'
//     }
// ];
//
// const Calendar = () => {
//     const calendarRef = useRef(null);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//
//     useEffect(() => {
//         const calendarApi = calendarRef.current.getApi();
//         const removeGhostEvent = () => calendarApi.unselect();
//
//         calendarApi.on('eventDragStart', info => {
//             setSelectedEvent(info.event);
//             info.el.style.opacity = 0.5;
//             const ghostEvent = {...info.event, id: `${info.event.id}-ghost`};
//             calendarApi.addEvent(ghostEvent, true);
//             calendarApi.unselect();
//         });
//
//         calendarApi.on('eventDrop', info => {
//             const {start, end} = info.event;
//             const updatedEvent = {...selectedEvent, start, end};
//             const events = calendarApi.getEvents().filter(event => event.id !== selectedEvent.id && event.id !== `${selectedEvent.id}-ghost`);
//             calendarApi.removeAllEvents();
//             calendarApi.addEventSource(events.concat(updatedEvent));
//             setSelectedEvent(null);
//         });
//
//         calendarApi.on('eventDragStop', info => {
//             info.el.style.opacity = '';
//             removeGhostEvent();
//         });
//
//         return () => {
//             calendarApi.off('eventDragStart');
//             calendarApi.off('eventDrop');
//             calendarApi.off('eventDragStop');
//         };
//     }, [selectedEvent]);
//
//     const handleDragStart = event => {
//         event.dataTransfer.setData('text/plain', JSON.stringify(event));
//     };
//
//     return (
//         <FullCalendar
//             defaultView="dayGridMonth"
//             header={{
//                 left: "prev,next today",
//                 center: "title",
//                 right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
//             }}
//             rerenderDelay={10}
//             eventDurationEditable={false}
//
//             plugins={[dayGridPlugin]}
//
//
//             // ref={this.calendarComponentRef}
//
//
//
//
//             // weekends={this.state.calendarWeekends}
//             events={externalEvents}
//             // eventDrop={drop}
//             // dateClick={handleDateClick}
//             // // drop={this.drop}
//             // eventReceive={this.eventReceive}
//             // eventClick={this.eventClick}
//             // // selectable={true}
//         />
//     )
// }
// export default FullCalendar;
//
//
//
//
//
//
