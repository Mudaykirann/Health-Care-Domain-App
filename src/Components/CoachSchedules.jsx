import React, { useEffect, useState } from "react";
import CoachNavbar from "./CoachNavbar"
import Footer from "./Footer"

function CoachSchedules() {

    const [bookings, setBookings] = useState([]);
    const Id = localStorage.getItem('id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await fetch(`http://localhost:8082/bookings`);
                if (!response.ok) throw new Error(await response.text());
                const res = await response.json();
                const validId = res.filter(book => book.coachId.toString() === Id)
                if (validId) {
                    console.log(res)
                    setBookings(res);
                    setLoading(false);
                }
            } catch (error) {
                console.log("ERROR", error);
                setLoading(true);
            }
        }

        fetchBookings();
    }, [Id]);

    return (
        <>
            <CoachNavbar />
            <div className="container w-full flex justify-center items-center min-h-[82vh]">
                <div className="box bg-black text-center flex flex-col p-4 rounded-[5px] text-white items-center justify-center">
                    {loading && <p>Loading...</p>}
                    {!loading && bookings.length === 0 && <p>No Appointments Scheduled</p>}
                    {bookings.map((data, index) => (
                        <React.Fragment key={index}>
                            <div className="box bg-black text-center flex flex-col p-4 rounded-[5px] text-white justify-center">
                                <h2 className="m-2 text-2xl">Appointment Date:</h2>
                                <h3 className="mb-2 font-light">{data.date}</h3>
                                <p className="mt-2">Slot: {data.time}</p>
                                <div className="mt-6">
                                    <p className="">Booking id: {data.id}</p>
                                    <p>User id: {data.userId}</p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CoachSchedules
