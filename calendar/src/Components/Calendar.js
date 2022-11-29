import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


import './Calendar.css'
import ViewModal from './ViewModal';

export default function Calendar() {

    const [show, setShow] = useState(false);
    const [eventData, setEventData] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const EventItem = ({ info, color }) => {
        const { event } = info;
        // console.log(event._instance);
        let startDateTimestamp = new Date(event?._instance?.range?.start)
        let endDateTimestamp = new Date(event?._instance?.range?.end)
        let startTime = String(startDateTimestamp.getHours()).padStart(2, 0) + ":" + String(startDateTimestamp.getMinutes()).padStart(2, 0)
        let endTime = String(endDateTimestamp.getHours()).padStart(2, 0) + ":" + String(endDateTimestamp.getMinutes()).padStart(2, 0)
        return (
            <a
                style={{ all: 'unset', backgroundColor: color, color: 'black', borderRadius: '4px' }}
                className='d-flex align-items-center w-100 h-100'>
                <div className="fc-daygrid-event-dot" />
                <div className='d-flex flex-column'>
                    <span style={info.isPast ? { textDecoration: 'line-through' } : {}} >{startTime + "-" + endTime}</span>
                    <span style={info.isPast ? { textDecoration: 'line-through' } : {}}>{event.title}</span>
                </div>
            </a>
        );
    };

    // useEffect(() => {
    //     console.log("reloaded");
    // }, [eventData])


    return (
        <div style={{ background: '#2D224C', padding: '50px 200px' }}>
            <FullCalendar
                height={'85vh'}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                dayCellContent={(day) => {
                    // console.log(day, "dayCellContent");
                    if (day.isToday) {
                        return (
                            <div className='px-2 py-1' style={{ backgroundColor: '#D4145A', borderRadius: '100%', color: 'white', fontWeight: '600' }}>
                                {day.dayNumberText}
                            </div>)
                    }
                    return (
                        <div>
                            {day.dayNumberText}
                        </div>
                    )
                }}
                eventContent={(event) => {
                    // console.log(event, "eventContent");
                    if (event.isPast) {
                        event.backgroundColor = "#B4B4B4"
                        return <EventItem info={event} color="#B4B4B4" />
                    } else {
                        event.backgroundColor = "#D9DAF3"
                        return <EventItem info={event} color="#D9DAF3" />
                    }
                }}
                events={[
                    { title: 'event 1', start: '2022-11-10T14:30:00', allDay: false, end: '2022-11-10T15:30:00' },
                    { title: 'event 2', date: '2022-11-27T15:30:00', end: '2022-11-10T16:30:00' },
                    { title: 'event 3', date: '2022-11-29T16:30:00', end: '2022-11-10T17:30:00' }
                ]}
                headerToolbar={
                    {
                        left: 'title',
                        center: 'prev,next today',
                        right: ''
                    }
                }
                eventClick={(event) => {
                    console.log(event);
                    handleShow()
                    setEventData(event)
                }}
                views={{
                    dayGridMonth: { // name of view
                        // titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
                        // other view-specific options here
                    }
                }
                }
            />
            <ViewModal show={show} handleClose={handleClose} eventData={eventData} />
        </div>
    )
}
