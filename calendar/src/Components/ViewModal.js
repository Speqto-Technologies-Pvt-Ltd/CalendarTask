import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import Profile from '../assets/profilePic.png'
import './ViewModal.css'

export default function ViewModal({ show, handleClose, eventData }) {

    const [isPast, setIsPast] = useState(false)
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState("");
    const [className, setClassName] = useState("");

    let topic = "Food"
    let userName = "Liam"
    let profile = Profile;

    useEffect(() => {
        console.log(eventData);
        // class name
        setClassName(eventData?.event?._def?.title)

        let startDateStamp = new Date(eventData?.event?._instance?.range?.start)
        let endDateStamp = new Date(eventData?.event?._instance?.range?.end).getTime()
        let nowDate = new Date().getTime()

        let difference = endDateStamp - startDateStamp.getTime()

        // Event Date
        setDate(startDateStamp.toDateString().toString())
        // Start Time
        let startT = startDateStamp.getHours().toString().padStart(2, 0) + ":" + startDateStamp.getMinutes().toString().padStart(2, 0)
        setStartTime(startT)

        // Calculate Duration
        var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
        difference -= daysDifference * 1000 * 60 * 60 * 24

        var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60

        var minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60

        var secondsDifference = Math.floor(difference / 1000);

        let differnceCalculated = ""
        if (daysDifference > 0) differnceCalculated += `${daysDifference} D `
        if (hoursDifference > 0) differnceCalculated += `${hoursDifference} H `
        if (minutesDifference > 0) differnceCalculated += `${minutesDifference} M`

        setDuration(differnceCalculated)

        if (startDateStamp.getTime() < nowDate) {
            setIsPast(true)
        } else {
            setIsPast(false)
        }

    }, [eventData])

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className='my-3 px-4'>

                <div className='d-flex justify-content-between align-items-center'>

                    <div className='d-flex flex-column view-header'>
                        {/* <h4>Speaking class</h4> */}
                        <h4>{className}</h4>
                        <div className='d-flex'>
                            <label htmlFor="">Topic:</label>
                            {" "}
                            {/* <p>Food</p> */}
                            <p>{topic}</p>
                        </div>
                    </div>

                    <div className='d-flex align-items-center gap-3 view-header-profile'>
                        <img src={profile} alt="profile" />
                        {/* <p className='m-0 p-0'>Liam</p> */}
                        <p className='m-0 p-0'>{userName}</p>
                    </div>

                </div>

                <div className={`row m-0 mt-5 view-body ${isPast ? 'blue' : 'pink'}`}>

                    <div className='col-md-6'>
                        <div className='d-flex flex-column'>
                            <label htmlFor="">Data</label>
                            {/* <p>Tuesday 16th October 2022</p> */}
                            <p>{date}</p>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='d-flex flex-column'>
                            <label htmlFor="">Time</label>
                            {/* <p>09:00</p> */}
                            <p>{startTime}</p>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='d-flex flex-column'>
                            <label htmlFor="">Duration</label>
                            {/* <p>45 minutes</p> */}
                            <p>{duration}</p>
                        </div>
                    </div>

                </div>

                <div className={`d-flex mt-3 view-button ${isPast ? 'blueButton' : 'pinkButton'}`}>
                    <button className='w-100 py-2'>
                        {
                            isPast ? "WATCH RECORDING" : "JOIN"
                        }
                    </button>
                </div>

                <div className='mt-3 d-flex gap-3 view-footer'>
                    <div>
                        <p>Material:</p>
                    </div>

                    {
                        isPast ?
                            <div className='d-flex flex-column pt-1'>
                                <a >Lesson recap</a>
                            </div> :
                            <div className='d-flex flex-column'>
                                <a >Video Listening Introduzione</a>
                                <a >Video Listening Introduzione</a>
                            </div>
                    }

                </div>

            </Modal.Body>
        </Modal>
    )
}
