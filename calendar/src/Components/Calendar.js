import React, { useState } from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import './Calendar.css'
import ViewModal from './ViewModal';

// To Render Event In Calendar Cell
const EventItem = ({ info }) => {

    const { event } = info;

    let isPast = !info.isFuture && !info.isToday;

    let startDateTimestamp = new Date(event?._instance?.range?.start)
    let endDateTimestamp = new Date(event?._instance?.range?.end)

    let startTime = String(startDateTimestamp.getHours()).padStart(2, 0) +
        ":" + String(startDateTimestamp.getMinutes()).padStart(2, 0)

    let endTime = String(endDateTimestamp.getHours()).padStart(2, 0) +
        ":" + String(endDateTimestamp.getMinutes()).padStart(2, 0)

    return (
        <div
            style={{
                all: 'unset',
                backgroundColor: isPast ? '#B4B4B4' : '#D9DAF3',
                color: 'black',
                borderRadius: '4px'
            }}
            className='d-flex align-items-center w-100 h-100'
        >
            <div className="fc-daygrid-event-dot" />
            {/* Render By Checking if event is in past or present */}
            <div className='d-flex flex-column'>
                <span className='eventItem'
                    style={isPast ? { textDecoration: 'line-through' } : {}}
                >
                    {startTime + "-" + endTime}
                </span>

                <span
                    className='eventItem'
                    style={isPast ? { textDecoration: 'line-through' } : {}}
                >
                    {event.title}
                </span>
            </div>
        </div>
    );
};

export default function Calendar() {

    //For Modal Open & Close
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // TimeZone
    const [selectedTimezone, setSelectedTimezone] = useState("IST")

    // AllTimeZones
    const allTimezones = [
        { label: 'Indian Standard Time', value: 'IST' },
        { label: 'Roma GMT +02:00', value: 'ART' },
    ]

    // To Store Event Details
    const [eventData, setEventData] = useState({});

    // AllEvents
    const eventList = [
        { title: 'event 1', start: '2022-11-10T14:30:00', allDay: false, end: '2022-11-10T15:30:00' },
        { title: 'event 2', date: '2022-11-27T15:30:00', end: '2022-11-10T16:30:00' },
        { title: 'event 3', date: '2022-11-29T16:30:00', end: '2022-11-10T17:30:00' },
        { title: 'event 4', date: '2022-11-30T16:30:00', end: '2022-11-10T17:30:00' },
        { title: 'event 4', date: '2022-12-01T16:30:00', end: '2022-11-10T17:30:00' }
    ]

    // Custom Button To Select TimeZone
    const timezoneButton = {
        timezoneSelect: {
            text: <select onChange={(e) => {
                setSelectedTimezone(e.target.value)
            }}>
                {
                    allTimezones.map((timezone, index) => {
                        return <option key={index} value={timezone.value}>{timezone.label}</option>
                    })
                }
            </select>,
        }
    }

    // Custom Day design
    const dayDesign = (day) => {
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
    }

    // customHeader
    let headerForCalendar = {
        left: 'title',
        center: 'prev,next today',
        right: 'timezoneSelect'
    }

    // handleEventClick
    const handleEventClick = (event) => {
        handleShow()
        setEventData(event)
    }

    return (
        <div className='calendar-container'>

            <FullCalendar
                timeZone={selectedTimezone}
                height={'85vh'}
                customButtons={timezoneButton}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                dayCellContent={(day) => dayDesign(day)}
                eventContent={(event) => <EventItem info={event} />}
                events={eventList}
                headerToolbar={headerForCalendar}
                eventClick={(event) => handleEventClick(event)}

            />

            <ViewModal show={show} handleClose={handleClose} eventData={eventData} />
        </div>
    )
}
