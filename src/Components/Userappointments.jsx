import { useEffect, useState } from "react";
import Footer from "./Footer";
import UserNav from "./UserNav";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

function Userappointments() {
    const navigate = useNavigate();
    const [appointmentdata, setappointmentdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedappointmentid, setselectedappointmentid] = useState();
    const [showmodal, setshowmodal] = useState(false)

    const userId = localStorage.getItem('Userid');

    const fetchdata = async () => {
        try {
            const response = await fetch('http://localhost:8082/bookings');
            const result = await response.json();
            console.log(result);

            const validData = result.filter(user => user.userId.toString() === userId);
            console.log(validData);

            if (validData.length > 0) {
                setappointmentdata(validData);
            } else {
                console.log("Failed");
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchdata();
    }, [userId]);


    const handleappointment = (id) => {
        setshowmodal(true);
        setselectedappointmentid(id);
    }




    const confirmconcellation = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:8082/bookings/${selectedappointmentid}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchdata();
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setshowmodal(false)
        }
    }


    const closeModal = () => {
        setshowmodal(false);
    };




    const handleschedule = (id) => {
        localStorage.setItem("bookingid", id)
        console.log('appointment schdeuled page !!!');
        navigate("/rescheduleappointment")
    }
    return (
        <>
            <UserNav />
            <div className="container w-full min-h-[75vh]">
                <div className="boxes mt-[53px] flex flex-wrap items-center justify-center gap-[50px] min-w-[700px] ">
                    {loading && <p>Loading...</p>}
                    {!loading && appointmentdata.length === 0 && <p>No Appointments Scheduled</p>}
                    {appointmentdata.map((data, index) => (
                        <div key={index} className="box px-6 py-4 bg-black text-white flex flex-col items-center justify-center rounded-[5px]">
                            <div className="one flex flex-col items-center my-4">
                                <h2 className="text-2xl">Appointment Date :</h2>
                                <h2 className="text-2xl">{data.date}</h2>
                                <h3 className="text-xl font-light">Slot: {data.time}</h3>
                            </div>
                            <div className="two flex flex-col items-center my-4">
                                <p >Booking id : {data.id}</p>
                                <p >User Id : {data.userId}</p>
                                <p >Coach Id : {data.coachId}</p>
                            </div>
                            <div className="btns flex flex-col items-center my-2">
                                <button className=" py-2 px-6 w-64 bg-blue-500 my-2 rounded-[5px] hover:bg-blue-800 transition" onClick={() => handleschedule(data.id)}>Reschedule Appointment</button>
                                <button className=" py-2 px-6 w-64 bg-red-400 my-2 rounded-[5px] hover:bg-red-800 transition " onClick={() => handleappointment(data.id)}>Cancel Appointment</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="btn flex justify-center mt-[50px]">
                    <button className="flex items-center gap-4 bg-green-500 px-10 py-2 text-white hover:bg-green-800 transition rounded-[5px]" onClick={() => navigate('/userhome')}>
                        <IoMdArrowRoundBack /> Go Back
                    </button>
                </div>
            </div>
            <Footer />

            <ConfirmModal isOpen={showmodal} onConfirm={confirmconcellation} onClose={closeModal} />
        </>
    );
}

export default Userappointments;