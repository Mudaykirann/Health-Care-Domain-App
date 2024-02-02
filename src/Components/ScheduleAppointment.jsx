import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserNav from "./UserNav";
import Footer from "./Footer";

function ScheduleAppointment() {
    const navigate = useNavigate();
    const [date, setdate] = useState();
    const [time, settime] = useState();
    const [mindate, setmindate] = useState();
    const [showsuccess, setshowsuccess] = useState(false);
    const [appointment, setappoinment] = useState(true);

    const handleSlotChange = (e) => {
        settime(e.target.value);
    }

    const timeslots = [
        '9 AM - 10 AM',
        '10 AM - 11 AM',
        '11 AM - 12 PM',
        '2 PM - 3 PM',
        '3 PM - 4 PM',
        '4 PM - 5 PM'
    ];

    useEffect(() => {
        const today = new Date();
        setmindate(formatdate(today));
    }, []);

    const formatdate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handlesubmit = async (e) => {
        const userid = localStorage.getItem('Userid');
        const userId = parseInt(userid, 10);
        const coachid = localStorage.getItem('coachappointmentid');
        const coachId = parseInt(coachid, 10);

        const randomNum = Math.floor(Math.random() * 100 + 1);
        const id = randomNum.toString();
        e.preventDefault();

        const data = { id, date, time, userId, coachId };

        try {
            const response = await fetch('http://localhost:8082/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setappoinment(!appointment)
                setshowsuccess(true);
                setdate('');
                settime('');
                alert("Appointment booked successfully!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const goback = () => {
        setshowsuccess(false);
        navigate("/userhome");
    }

    return (
        <>
            <UserNav />
            <div className="container w-full flex min-h-[83vh]">
                {
                    appointment && (
                        <>
                            <div className='flex flex-col justify-center items-center w-full'>
                                <div className="card mx-[50px] flex flex-col items-center gap-[20px] text-white bg-black rounded-lg px-[50px] py-[30px] shadow border border-gray-500">
                                    <h2 className="text-3xl my-[10px]">Proceed with your Appointment</h2>
                                    <form action="" className="w-full" onSubmit={handlesubmit}>
                                        <div className="flex flex-col gap-y-[10px]">
                                            <label htmlFor="date">Date of Appointment</label>
                                            <input type="date" value={date} min={mindate} onChange={(e) => setdate(e.target.value)} className="text-gray-400 rounded-[5px] py-[5px] px-[10px]" placeholder="dd-mm-yyyy" required />
                                        </div>
                                        <div className="my-[10px]">
                                            <label htmlFor="time" className="mb-2">Preferred Slot</label>
                                            <div className="time-slots flex flex-wrap items-center text-[13px] gap-[10px]">
                                                {timeslots.map((slot, index) => (
                                                    <div key={index} className="timeslot flex items-center gap-x-[3px]">
                                                        <input type="radio" checked={time === slot} onChange={handleSlotChange} name="time-slot" value={slot} required />
                                                        <label htmlFor={slot}>{slot}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <input type="submit" className="bg-green-800 w-full mt-4 py-2 rounded-[5px] hover:bg-green-600 cursor-pointer transition" value='Confirm your Appointment' />
                                    </form>
                                </div>
                                <div>
                                    <button className="flex items-center gap-x-2 bg-green-700 text-white px-6 mt-[20px] py-2 rounded-[5px]" onClick={() => navigate('/userhome')}>
                                        <IoMdArrowRoundBack /> Go Back
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                }
                {showsuccess && (
                    <div className="flex justify-center items-center w-full">
                        <div className="card mx-[50px] flex flex-col items-center justify-center text-white bg-black rounded-lg px-[50px] py-[30px] shadow border border-gray-500">
                            <h2 className="my-2 text-2xl"> Your appointment Scheduled Successfully</h2>
                            <button className="flex items-center gap-x-2 bg-green-700 px-6 mt-[20px] py-2 rounded-[5px]" onClick={goback}>
                                <IoMdArrowRoundBack /> Go Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default ScheduleAppointment;
