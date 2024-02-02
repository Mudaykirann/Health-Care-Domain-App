import Footer from "./Footer"
import Navbar from "./Navbar"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import '../Components/Css/Home.css'
import user from '../assets/download (1).png'

function UserSignup() {


    const navigate = useNavigate();

    const [name, setname] = useState()
    const [password, setPassword] = useState()
    const [dob, setdob] = useState()
    const [gender, setGender] = useState()
    const [number, setNumber] = useState()
    const [pincode, setPincode] = useState()
    const [email, setEmail] = useState()
    const [city, setCity] = useState()
    const [state, setstate] = useState()
    const [country, setCountry] = useState()
    const [status, setStatus] = useState(false)
    const [randomNumber, setRandomNumber] = useState(null);



    const handleSubmit = async (e) => {
        setStatus(!status)
        const randomNum = Math.floor(Math.random() * 10 + 1);
        const id = randomNum.toString();
        setRandomNumber(randomNum);
        e.preventDefault();
        const FormData = { id, name, password, dob, email, gender, number, pincode, state, city, country };
        try {
            const response = await fetch('http://localhost:8082/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FormData),
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                console.log("form submitted", FormData);
                setname('')
                setPassword('')
                setdob('')
                setGender('')
                setNumber('')
                setCity('')
                setCountry('')
                setEmail('')
                setPincode('')
                setstate('')
                setCity('')
                setCountry('')
            }
        } catch (error) {
            console.log('Error', error);
        }
    };



    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center" >
                <div className={!status ? "box flex flex-col  bg-black rounded-lg  justify-center items-center p-4 m-[40px]" : "hidden"}>
                    <div className="flex  justify-center items-center gap-4 my-4">
                        <img src={user} className="w-[7%]" alt="" />
                        <h3 className="text-3xl text-center text-white ">User Profile</h3>
                    </div>
                    <div className="form text-white">
                        <form action="" id="user-form" onSubmit={handleSubmit}>
                            <div className="one flex items-center gap-20 my-[25px]">
                                <div className="first">
                                    <label htmlFor="Name">Name</label><br />
                                    <input className="rounded-[3px] text-black p-[5px] text-sm" value={name} onChange={(e) => setname(e.target.value)} type="text" id="name" pattern="[A-Za-z]{3,50}" required />
                                </div>
                                <div className="first">
                                    <label htmlFor="Password">Password</label><br />
                                    <input type="password" className="rounded-[3px] text-black p-[5px] text-sm" value={password} onChange={(e) => setPassword(e.target.value)} id="password" pattern=".{3,10}" required />
                                </div>
                            </div>
                            <div className="two flex items-center gap-20 my-[25px]">
                                <div className="first">
                                    <label htmlFor="number">Mobile Number</label><br />
                                    <input type="tel" value={number} onChange={(e) => { setNumber(e.target.value) }} pattern="[0-9]{10}" className="rounded-[3px] text-black p-[5px] text-sm" id="number" required />
                                </div>
                                <div className="first">
                                    <label htmlFor="email">Email</label><br />
                                    <input type="email" className="rounded-[3px] text-black p-[5px] text-sm" value={email} onChange={(e) => setEmail(e.target.value)} id="email" required />
                                </div>
                            </div>
                            <div className="three flex items-center gap-20 my-[25px]">
                                <div className="first">
                                    <label htmlFor="Date of Birth">Date of Birth</label><br />
                                    <input type="date" className="rounded-[3px]  text-black py-[5px] px-[52px] text-sm" value={dob} onChange={(e) => setdob(e.target.value)} id="dob" required />
                                </div>
                                <div className="first">
                                    <label htmlFor="gender">Gender</label><br />
                                    <input type="radio" className="mx-2" name="gender" checked={gender == 'male'} onChange={(e) => { setGender(e.target.value) }} value='male' required />Male
                                    <input type="radio" className="mx-2" name="gender" checked={gender == 'female'} onChange={(e) => { setGender(e.target.value) }} value='female' required />FeMale
                                </div>
                            </div>
                            <div className="four flex items-center gap-20 my-[25px]">
                                <div className="first">
                                    <label htmlFor="">PinCode</label><br />
                                    <input type="tel" value={pincode} onChange={(e) => setPincode(e.target.value)} pattern="[0-9]{3,7}" className="rounded-[3px] text-black p-[5px] text-sm" required id="pincode" />
                                </div>
                                <div className="first">
                                    <label htmlFor="city">City</label><br />
                                    <input className="rounded-[3px] text-black p-[5px] text-sm" value={city} onChange={(e) => setCity(e.target.value)} type="text" id="city" pattern="[A-Za-z]{3,50}" required />
                                </div>
                            </div>
                            <div className="five flex items-center gap-20 my-[25px]">
                                <div className="first">
                                    <label htmlFor="state">State</label><br />
                                    <input className="rounded-[3px] text-black p-[5px] text-sm" value={state} onChange={(e) => setstate(e.target.value)} type="text" id="state" pattern="[A-Za-z]{3,50}" required />
                                </div>
                                <div className="first">
                                    <label htmlFor="country">Country</label><br />
                                    <input className="rounded-[3px] text-black p-[5px] text-sm" value={country} onChange={(e) => setCountry(e.target.value)} type="text" id="country" pattern="[A-Za-z]{3,50}" required />
                                </div>
                            </div>
                            <div className="register flex justify-center my-[20px]">
                                <button type="submit" id="user-btn" className="bg-green-600 rounded-[5px]  px-6 py-2 text-wh">Register</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={status ? "flex justify-center" : "hidden"} id="success">
                    <div className='content'>
                        <img src={user} className="rounded-[50%]" alt="" />
                        <h2 className='text-2xl font-bold'>You are a User now !</h2>
                        <p className='text-xl '>Your User Id is  : <b>{randomNumber}</b></p>
                        <button onClick={() => navigate('/userlogin')} className="bg-blue-500 px-[25px] py-[15px] hover:bg-blue-700 text-white rounded-lg mx-auto">Login Now</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserSignup
