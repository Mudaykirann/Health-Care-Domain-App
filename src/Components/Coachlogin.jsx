import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import './Css/Home.css'
import { useState } from "react"
import coach from '../assets/download.png'


function Coachlogin() {

    const navigate = useNavigate();

    const [id, setid] = useState();
    const [password, setpassword] = useState();

    const [formvalid, setFormvalid] = useState(true);

    const handlesubmit = async (e) => {

        console.log(id)
        console.log(password)

        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8082/coaches');
            const result = await response.json();
            console.log(result)

            const validCoach = result.find(coach => coach.id.toString() === id && coach.password === password);
            if (validCoach) {
                localStorage.setItem('id', id)
                localStorage.setItem('password', password)
                alert("LOGIN SUCCESSFULL")
                setFormvalid(true)
                setid('')
                setpassword('')
                navigate('/coachhome')
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
            <div className="w-full flex justify-center items-center min-h-[82vh] w-full">
                <div className="box bg-black flex flex-col py-4 rounded-[5px] justify-center ">
                    <div className="flex justify-center my-4 items-center gap-4">
                        <img src={coach} className="w-[7%]" alt="" />
                        <h2 className="text-white text-2xl">Login as a Coach</h2>
                    </div>
                    <div className="mx-[30px]">
                        <form action="" className="w-full" >
                            <input type="text" className="my-2 p-2 rounded-[5px] w-full" placeholder="Coach Id" value={id} onChange={(e) => setid(e.target.value)} required /><br />
                            <input type="password" className="my-2 p-2 rounded-[5px] w-full" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required /><br />
                            <button type="submit" onClick={handlesubmit} className="bg-blue-500 my-4 p-2 rounded-[5px] w-full text-white text-xl">Login</button>
                            {!formvalid ? <p className='text-red-500 text-sm px-2'>Invalid crediantials</p> : ""}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Coachlogin
