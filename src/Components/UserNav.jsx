import { FiPhoneCall } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";



function UserNav() {


    const navigate = useNavigate();
    const handleData = () => {

    }
    return (
        <div>
            <nav className="bg-black flex justify-between items-center w-[100%]">
                <div>
                    <h3 onClick={() => navigate('/userhome')} className="text-white p-4 text-2xl cursor-pointer font-bold">WeCare</h3>
                </div>
                <div>
                    <ul className="flex">
                        <li><NavLink className="text-white flex items-center gap-2 text-sm p-4" to='/userprofile'><FaRegUser /> View Profile</NavLink></li>
                        <li> <NavLink className="text-white flex items-center gap-2 text-sm p-4" to="/userappointments"><AiOutlineMenuFold /> My Appointments</NavLink></li>
                        <li><NavLink className="text-white flex items-center gap-2 text-sm p-4" ><FiPhoneCall /> CallUs : 080 2233447</NavLink></li>
                        <li ><NavLink onClick={handleData} className="text-white flex items-center gap-2 text-sm p-4" to='/'><IoLogOutOutline /> Logout</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default UserNav
