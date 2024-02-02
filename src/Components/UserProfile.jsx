import { useState } from "react";
import { useEffect } from "react";
import UserNav from "./UserNav";
import Footer from "./Footer";
import male from '../assets/male.png';
import female from '../assets/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";


function UserProfile() {


    const navigate = useNavigate();
    const [userdata, setUserdata] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userid = localStorage.getItem('Userid');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8082/users/${userid}`);
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const data = await response.json();
                setUserdata(data);
            } catch (error) {
                console.log("Error fetching user data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userid]);


    return (
        <>
            <UserNav />
            <div className="w-full flex justify-center items-center min-h-[82vh] ">
                <div className="box bg-black flex items-center gap-[50px] text-white p-8 rounded-[5px] relative ">
                    <div className="left">
                        <img src={userdata?.gender === 'male' ? male : female} className='' alt="profile pic" />
                    </div>
                    <div className="right pr-4 ">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <>
                                <h3 className="mb-4 text-4xl"><b>{userdata?.name}</b></h3>
                                <p className="text-sm font-sans">Date of Birth : {userdata?.dob}</p>
                                <p className="text-sm font-sans">Email Id : {userdata?.email}</p>
                                <p className="text-sm font-sans">Mobile No : {userdata?.number}</p>
                                <p className="text-sm font-sans">Address : {userdata?.city},{userdata?.state},{userdata?.country}</p>
                                <p className="text-sm font-sans">Pincode : {userdata?.pincode}</p>
                                <div className="m-16">
                                    <button className="flex items-center gap-2 bg-red-400 rounded-[5px] py-2 px-10 absolute bottom-4 right-[70px]" onClick={() => navigate('/userhome')}> <IoMdArrowRoundBack /> Back</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserProfile;
