import './Css/Home.css'
import Navbar from './Navbar'
import Footer from './Footer'
import coach from '../assets/download.png'
import user from '../assets/download (1).png'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="page min-h-[82vh]">
                <h2 className='text-center p-6 text-3xl font-serif'>We are at the heart of appropriate care</h2>
                <div className="main mt-[50px] w-full flex flex-wrap justify-center gap-[80px] items-center">
                    <div className="box p-10 bg-black text-white rounded-lg">
                        <img src={coach} className='rounded-[50%] mx-[20px] mb-[25px]' alt="" />
                        <div className="content">
                            <button onClick={() => navigate('coachlogin')} className='p-4  m-2 bg-blue-500 hover:bg-blue-900 transition-all w-[95%] rounded-sm'>Login as a Coach</button>
                            <br />
                            <button onClick={() => navigate('coachsignup')} className='p-4  m-2 bg-blue-500 hover:bg-blue-900 transition-all w-[95%] rounded-sm'>Join as a Coach</button>
                        </div>
                    </div>
                    <div className="box p-10 bg-black text-white rounded-lg">
                        <img src={user} className='rounded-[50%] mx-[20px] mb-[25px]' alt="" />
                        <div className="content">
                            <button onClick={() => navigate('userlogin')} className='p-4  m-2 bg-blue-500 hover:bg-blue-900 transition-all w-[95%] rounded-sm'>Login as a User</button><br />
                            <button onClick={() => navigate('usersignup')} className='p-4  m-2 bg-blue-500 hover:bg-blue-900 transition-all w-[95%] rounded-sm'>Join as a User</button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Home
