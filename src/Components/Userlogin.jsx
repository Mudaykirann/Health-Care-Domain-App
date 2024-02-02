import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"
import user from '../assets/download (1).png'


function Userlogin() {


    const navigate = useNavigate();

    const [id, setid] = useState();
    const [password, setpassword] = useState();

    const [formvalid, setFormvalid] = useState(true);

    const handlesubmit = async (e) => {


        console.log(id)
        console.log(password)

        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8082/users');
            const result = await response.json();
            console.log(result)

            const validUser = result.find(user => user.id.toString() === id && user.password === password);
            if (validUser) {
                localStorage.setItem('Userid', id)
                alert("LOGIN SUCCESSFULL")
                setFormvalid(true)
                setid('')
                setpassword('')
                navigate('/userhome')
            }
            else {
                setid('')
                setpassword('')
                setFormvalid(!formvalid)
            }
        } catch (error) {
            console.log('Error', error);
        }
    };



    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center items-center min-h-[82vh]  w-full">
                <div className="box bg-black flex flex-col py-4 rounded-[5px] justify-center items-center ">
                    <div className="flex justify-center my-4 items-center gap-4">
                        <img src={user} className="w-[7%]" alt="" />
                        <h2 className="text-white text-3xl">Login as a User</h2>
                    </div>
                    <div className="mx-[30px]">
                        <form action="" className="flex flex-col justify-center items-center w-[350px]">
                            <input type="text" value={id} onChange={(e) => { setid(e.target.value) }} className="flex items-center h-12 px-4 w-[350px] bg-gray-200  rounded focus:outline-none focus:ring-2 my-4 " placeholder="User Id" />
                            <input type="password" className="flex items-center h-12 px-4 w-[350px] bg-gray-200  rounded focus:outline-none focus:ring-2 my-4" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="User password" />
                            <input type="submit" onClick={handlesubmit} value='Login' className="flex items-center justify-center h-12 px-6 w-[350px] bg-blue-600 my-4 rounded  text-xl text-blue-100 hover:bg-blue-700 cursor-pointer" />
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Userlogin
