import { FiPhoneCall } from "react-icons/fi";
function Navbar() {
    return (
        <div>
            <nav className="bg-black flex justify-between items-center w-[100%]">
                <h3 className="text-white p-4 text-2xl font-bold">WeCare</h3>
                <p className="text-white flex items-center gap-2 text-sm p-4"> <FiPhoneCall /> CallUs : 080 2233447</p>
            </nav>
        </div>
    )
}

export default Navbar
