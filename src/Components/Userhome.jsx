import { useEffect, useState } from "react";
import Footer from "./Footer";
import UserNav from "./UserNav";
import male from '../assets/male.png';
import female from '../assets/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png';
import { useNavigate } from "react-router-dom";

function Userhome() {

    const navigate = useNavigate();
    const [coaches, setCoaches] = useState([]);

    const handleBookings = (id) => {
        localStorage.setItem('coachappointmentid', id);
        navigate('/scheduleappoinntment');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8082/coaches`);
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const data = await response.json();
                setCoaches(data);
            } catch (error) {
                console.log("Error fetching coach data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <UserNav />
            <div className="container w-full flex justify-center items-center min-h-[83vh]">
                <ul className="cards">
                    {coaches.map((coach) => (
                        <li key={coach.id} className="card mx-[50px] flex items-center gap-[20px] text-white bg-black rounded-lg px-[50px] py-[30px] shadow border border-gray-500">
                            <div className="image mr-[20px]">
                                <img src={coach.gender === 'male' ? male : female} className="rounded-[50%]" alt="Profile pic" />
                            </div>
                            <div className="content">
                                <p className="mb-[10px] text-4xl font-semibold">{coach.name}</p>
                                <p className="font-normal text-2xl font-medium my-[10px]">Coach Id : {coach.id}</p>
                                <p className="font-normal text-sm">Mobile No : {coach.number}</p>
                                <p className="font-normal text-sm">Speciality : {coach.speciality}</p>
                                <button className="bg-blue-500 py-2 mt-[15px] px-6 hover:bg-blue-600 transition rounded-sm" onClick={() => handleBookings(coach.id)}>Book an Appointment</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    );
}

export default Userhome;

