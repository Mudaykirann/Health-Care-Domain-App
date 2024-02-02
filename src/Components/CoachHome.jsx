import CoachNavbar from "./CoachNavbar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti'


function CoachHome() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const id = localStorage.getItem('id');

    useEffect(() => {
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={100}
            gravity={0.1}
            initialVelocityX={4}
            initialVelocityY={10}
            color="['#f44336''#e91e63''#9c27b0''#673ab7''#3f51b5''#2196f3''#03a9f4''#00bcd4''#009688''#4CAF50''#8BC34A''#CDDC39''#FFEB3B''#FFC107''#FF9800''#FF5722''#795548']"
            run={true}
        />
    }, [])

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await fetch(`http://localhost:8082/bookings`);
                if (!response.ok) throw new Error(await response.text());
                const res = await response.json();
                const validId = res.filter(book => book.coachId.toString() === id)
                if (validId) {
                    console.log(res)
                    setBookings(res);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(true)
                console.log("ERROR", error);
            }
        }

        fetchBookings();
    }, [id]);

    return (
        <>
            <CoachNavbar />
            <div className="container w-full flex justify-center items-center min-h-[82vh]">
                <div className="boxes mt-[53px] flex flex-wrap items-center justify-center gap-[50px] min-w-[700px]">
                    {loading && <p>Loading...</p>}
                    {!loading && bookings.length === 0 && <h2 className="bg-black text-white text-2xl p-4 rounded-[5px]">No Appointments Scheduled...</h2>}
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
            </div >
            <Footer />
        </>
    );
}

export default CoachHome;
