import { useEffect, useState } from "react";
import CoachNavbar from "./CoachNavbar";
import Footer from "./Footer";
import coach from '../assets/download.png';

function Coachviewprofile() {
    const [coachData, setCoachData] = useState(null);

    const coachID = localStorage.getItem('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8082/coaches/${coachID}`);
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const data = await response.json();
                setCoachData(data);
            } catch (error) {
                console.log("Error fetching coach data:", error);
            }
        };
        fetchData();
    }, [coachID]);

    return (
        <>
            <CoachNavbar />
            <div className="w-full flex justify-center items-center min-h-[82vh]">
                <div className="box bg-black flex items-center gap-[50px] text-white p-4 rounded-[5px] ">
                    <div className="left">
                        <img src={coach} className='' alt="profile pic" />
                    </div>
                    <div className="right pr-4">
                        {coachData && (
                            <>
                                <h3 className="mb-4 text-4xl">Coach Id: <b>{coachData.id}</b></h3>
                                <p className="text-sm font-sans">Date of Birth: {coachData.dob}</p>
                                <p className="text-sm font-sans">Mobile No: {coachData.number}</p>
                                <p className="text-sm font-sans">Speciality: {coachData.speciality}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Coachviewprofile;
