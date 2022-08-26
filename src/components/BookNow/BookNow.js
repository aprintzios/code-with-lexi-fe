import React, { useState, useEffect } from "react"
import axios from "axios"
import "./BookNow.css"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import successImg from '../../images/success.png'
import { useNavigate } from "react-router-dom"

export default function BookNow(props) {
    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState(new Date());
    const [calVisible, setCalVisible] = useState(true)
    const [payVisible, setPayVisible] = useState(false)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const navigate = useNavigate()

    const bookNowHandler = async (e) => {
        const jwt = localStorage.getItem('token')
        await axios.put("/api/sessions/update", {
            token: jwt,
            session: e.target.value
        })
        setCalVisible(false)
        setPayVisible(true)
    }

    const exitOverlayHandler = () => {
        setOverlayVisible(true)
        navigate('/')
    }

    const AttachScript = (scriptName) => {
        const script = document.createElement("script")
        script.src = scriptName
        script.async = true
        script.defer = true
        document.body.appendChild(script)
    }

    const ClearScripts = () => {
        Array.from(document.getElementsByTagName('script')).forEach(elem => elem.remove())
    }

    useEffect(() => {
        async function fetchSessions() {
            let res = await axios.get("/api/sessions/available");
            setSessions(await res.data);
            ClearScripts()
            AttachScript("booking-calendar.js")
        }
        fetchSessions();
    }, [])

    let displayValue = payVisible ? "block" : "none"
    let overlayDisplay = overlayVisible ? "block" : "none"
    let calDisplay = calVisible ? "block" : "none"

    return (

        <div className="bookNow">

            <div id="calWrapper" style={{ display: calDisplay }}>

                <div id="calDiv">
                    <div id="calendar"><Calendar onChange={setDate} value={date} /></div>
                    <input id="calendar-value" type="hidden" value={date} />
                </div>

                <div id="timeDiv">
                    Choose a date..
                </div>

            </div>

            <div id='bookBtnDiv'>
                <button id="bookNowBtn" style={{ display: calDisplay }} className="button-13" onClick={bookNowHandler} role="button"> Continue </button>
            </div>

            <div>
                <input type='hidden' id="sessions" value={JSON.stringify(sessions)} />
            </div>

            <div id="payment" style={{ display: displayValue }}>
                <h1 id="paymentHeader">Enter Payment Information to Reserve Session</h1>
                <PayPalScriptProvider options={{ "client-id": "AcJC91zqqRJOyPauaQj5sznV4uWH3NjKP7CLAep7tYcGeWTM4W08o9YohRJiJNMNtrhRTeDtPs11_fuI" }}>
                    <img className="payment-img" src="65.png" alt="" />
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: "0.01",
                                        },
                                        currency: {
                                            value: "CAD"
                                        }
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(async (details) => {
                                setPayVisible(false)
                                setOverlayVisible(true)
                            });
                        }}
                    />
                </PayPalScriptProvider>
            </div>

            <div id="successOverlay" style={{ display: overlayDisplay }}>
                <img id="overlayImg" src={successImg} alt="You're booked!" />
                <button id="exitOverlay" className="button-13" onClick={exitOverlayHandler}>Great!</button>
            </div>

        </div>
    );
}