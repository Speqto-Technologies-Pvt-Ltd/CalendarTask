import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Profile from '../assets/profilePic.png'
import './ViewModal.css'

export default function ViewModal({ show, handleClose, eventData }) {

    const [isPast, setIsPast] = useState(false)

    useEffect(() => {
        console.log(eventData, "event");
        console.log(eventData?.event?._instance?.range?.start, eventData?.event?._instance?.range?.end);

        let startDateStamp = new Date(eventData?.event?._instance?.range?.start).getTime()
        let endDateStamp = new Date(eventData?.event?._instance?.range?.end).getTime()

        let nowDate = new Date().getTime()
        console.log(nowDate, startDateStamp, endDateStamp);
        if (startDateStamp < nowDate) {
            setIsPast(true)
        } else {
            setIsPast(false)
        }

    }, [eventData])

    return (
        <Modal show={show} onHide={handleClose} centered>
            {/* <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className='my-3 px-4'>

                <div className='d-flex justify-content-between align-items-center'>

                    <div className='d-flex flex-column view-header'>
                        <h4>Speaking class</h4>
                        <div className='d-flex'>
                            <label htmlFor="">Topic:</label>
                            {" "}
                            <p>Food</p>
                        </div>
                    </div>

                    <div className='d-flex align-items-center gap-3 view-header-profile'>
                        <img src={Profile} alt="profile" />
                        <p className='m-0 p-0'>Liam</p>
                    </div>

                </div>

                <div className={`row m-0 mt-5 view-body ${isPast ? 'blue' : 'pink'}`}>

                    <div className='col-md-6'>
                        <div className='d-flex flex-column'>
                            <label htmlFor="">Data</label>
                            <p>Tuesday 16th October 2022</p>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='d-flex flex-column'>
                            <label htmlFor="">Time</label>
                            <p>09:00</p>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='d-flex flex-column'>
                            <label htmlFor="">Duration</label>
                            <p>45 minutes</p>
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
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}
