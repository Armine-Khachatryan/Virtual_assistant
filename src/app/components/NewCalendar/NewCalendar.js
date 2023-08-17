import React, {useEffect, useState} from "react";
import './NewCalendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import { Col, Row } from "reactstrap";


function NewCalendar(){

    const [isEditForm, setIsEditForm]=useState(false);
    const [eventName, setEventName]=useState("");
    const [events, setEvents]=useState([
        { title: "Event 1", id: "1" },
        { title: "Event 2", id: "2" },
        { title: "Event 3", id: "3" },
        { title: "Event 4", id: "4" },
        { title: "Event 5", id: "5" }
    ])
    const [eventData, setEventData]=useState({})
    const [calendarEvents, setCalendarEvents]=useState([
        {
            title: "event 1",
            name:"hagjsghajs",
            start: new Date("2023-05-05 20:00"),
            id: "99999998"
        },
        {
            title: "event 2",
            name:"hagjsghajs",
            start: new Date("2023-05-04 00:00"),
            id: "99999999"
        }
    ])


    useEffect(()=>{
        let draggableEl = document.getElementById("external-events");
        let calendarEl = document.getElementById('mycalendar');

        let draggable=new Draggable(draggableEl, {
            itemSelector: ".fc-event",
            eventData: function (eventEl) {
                let title = eventEl.getAttribute("title");
                let id = eventEl.getAttribute("data");
                return {
                    title: title,
                    id: id
                };
            }
        });
        return () => draggable.destroy();
    },[]);


    const eventClick = (eventClick) => {
        Alert.fire({
            title: eventClick.event.title,
            html:
                `<div class="table-responsive">
                    <table class="table">
                        <tbody>
                              <tr >
                              <td>Title</td>
                              <td><strong>` +
                eventClick.event.title +
                `</strong></td>
                                      </tr>
                                      <tr >
                                      <td>Start Time</td>
                                      <td><strong>
                                      ` +
                eventClick.event.start +
                `
                                      </strong></td>
                                      </tr>
                                      </tbody>
                                      </table>
                                      </div>`,
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Remove Event",
            cancelButtonText: "Close"
        }).then((result) => {
            if (result.value) {
                eventClick.event.remove(); // It will remove event from the calendar
                Alert.fire("Deleted!", "Your Event has been deleted.", "success");
            }
        });
    };

    const handleDateClick = arg => {
    if(isEditForm){
        eventData.dayEl.style.backgroundColor = 'white';
        setIsEditForm(prevState => !prevState)
    }
        arg.dayEl.style.backgroundColor = 'grey';
        // {date: Fri May 05 2023 00:00:00 GMT+0400 (Armenia Standard Time), dateStr: '2023-05-05', allDay: true,
        //     dayEl: td.fc-day.fc-day-fri.fc-day-future.fc-daygrid-day, jsEvent: MouseEvent, …}
        setIsEditForm(true)
        setEventData({...arg});
    }

    const handleChange = (name, value) => {
        setEventName(value);
    };

    const saveForm = () => {
        if(eventName){
            const calendarEventsCopy = [...calendarEvents];
            calendarEventsCopy.push({
                title: eventName,
                start: new Date(eventData?.date),
                id: Math.random() * (new Date().getTime() * performance.now())
                // allDay: arg.allDay
            })
            setCalendarEvents([...calendarEventsCopy])
            setEventName("");
            setIsEditForm(prevState => !prevState)
            eventData.dayEl.style.backgroundColor = 'white';
        }
    };



    return(
        <div className="animated fadeIn p-4 demo-app">
            {isEditForm && (
                <div className={`form`}>
                    <input
                        className={"inputStyling"}
                        value={eventName}
                        onChange={event =>{
                            handleChange("eventName", event.target.value)
                            }
                        }
                    />
                    <div style={{marginTop:"10px"}}>
                        <button className={"btnStyle"} type="button" onClick={() => saveForm()}>
                            Save
                        </button>
                        <button className={"btnStyle"}  style={{marginLeft: "7px"}} type="button" onClick={() => {
                            setIsEditForm(false);
                            setEventName("")
                            eventData.dayEl.style.backgroundColor = 'white';
                        }}>
                            Close
                        </button>
                        {/* <button type='button'>Disquared</button>
            <button type='button'>Edit</button> */}
                    </div>
                </div>
            )}
            <Row
                className={"rowClass"}
            >
                <Col lg={3} sm={3} md={3}>
                    <div
                        id="external-events"
                        style={{
                            padding: "10px",
                            width: "100%",
                            textAlign:"center",
                            cursor:"pointer",
                            backgroundColor:"white",
                            height: "auto",
                            maxHeight: "-webkit-fill-available"
                        }}
                    >
                        <p align="center">
                            <strong> Events</strong>
                        </p>
                        {events.map((event) => (
                            <div
                                className="fc-event"
                                title={event.title}
                                data={event.id}
                                key={event.id}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </Col>
                <Col lg={9} sm={9} md={9}>
                    <div className="demo-app-calendar" id="mycalendartest">
                        <FullCalendar
                            defaultView="dayGridMonth"
                            header={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                            }}
                            // rerenderDelay={10}
                            eventBackgroundColor={"red"}
                            eventTextColor={'orange'}
                            eventDurationEditable={false}
                            editable={true}
                            droppable={true}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            events={calendarEvents}
                            eventClick={eventClick}
                            dateClick={handleDateClick}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default NewCalendar;




