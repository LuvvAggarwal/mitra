import React, { useContext, useState, useEffect } from 'react';
import users from "../api/users";
import moment from "moment"
import { useParams } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import BookingController from "../components/scheduler/bookingController";
import Scheduler from '../components/scheduler/SchedulerWidget'
const Booking = () => {


    const { setCurrentUser, User } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [counsoler, setCounsoler] = useState({});
    const [resources, setResources] = useState([]);
    const [events, setEvents] = useState([]);
    // DATES
    const today = moment();
    const from_date = today.startOf('week').toISOString();
    const to_date = today.endOf('week').toISOString();
    const [dateRange, setDateRange] = useState({
        startDate: from_date,
        endDate: to_date
    });
    //
    const { id } = useParams()
    const access_token = localStorage.getItem("access_token");
    const AuthStr = 'Bearer '.concat(access_token);
    useEffect(() => {
        if (User) {
            User.then((user) => {
                setUser(user);
                (async () => {
                    await users.get("/profile/" + id, { headers: { 'Authorization': AuthStr } }).then(async res => {
                        const payload = res.data.data.payload
                        setCounsoler(payload)
                        const BC = new BookingController(user, AuthStr, payload);
                        await BC.getResources(payload.time_slot).then((res) => {
                            console.log(res);
                            setResources(res)
                        })
                        await BC.getEvents(dateRange.startDate, dateRange.endDate).then((res) => {
                            console.log(res);
                            setEvents(res)
                        })
                    })
                })()
            })
        }
    }, [])
    useEffect(() => {
        if (dateRange.startDate !== from_date && dateRange.endDate !== to_date) {
            (async () => {
                const BC = new BookingController(user, AuthStr, counsoler);
                await BC.getEvents(dateRange.startDate, dateRange.endDate).then((res) => {
                    console.log(res);
                    setEvents(res)
                })
            })()
        }
    }, [dateRange])
    return (
        <div>
            <Scheduler user={user} id={id} resources={resources} events={events} setDateRange={setDateRange}></Scheduler>
        </div>
    )
}

export default Booking
