import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion'
import SocialMedia from './SocialMedia';
export default function HomeSideBar() {
    const [isMenuOpen, setIsMenuOpen]= useState(false);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        // Update screen width when the window is resized
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        // Attach the event listener
        window.addEventListener("resize", handleResize);
    
        // Remove the event listener when the component is unmounted
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    const toogleMenue=():void=>{
    setIsMenuOpen(!isMenuOpen);
    }
    
      return (
        <div className=' z-50'>
          <nav className={`p-2 py-5  left-0 right-0 top-0 z-20 bg-white fixed mb-10 lg:hidden`}>
    <div className="container mx-auto flex items-center justify-between lg:justify-between">
      <Link to="/" className="font-bold text-2xl">   <h2 className='text-2xl font-bold bloggerBrand'>
    PhotOMath
     </h2> </Link>
        
    
      <div className="hidden md:flex space-x-5 items-center">
       
   
      </div>
           <button
            onClick={toogleMenue}
            className="md:hidden focus:outline-none absolute top-6 right-2"
          >
            <svg
              className="h-6 w-6 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          </div>
       </nav>
          <AnimatePresence>
    {(isMenuOpen ||  screenWidth > 768) &&
     <motion.div initial={{x:-10, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5}} exit={{x:-10, opacity:0}} className={`lg:right-3/4 md:right-1/2 right-0   block md:block bg-gray-100 left-0 lg:top-0 md:top-0 top-0 bottom-0 md:fixed lg:static fixed h-screen w-full text-left pl-10 pt-5`} >
     <div className='w-full relative '>
       <motion.span className='fixed right-5 text-2xl font-bold  cursor-pointer md:hidden' whileHover={{ rotate: 90 }}
     transition={{ duration: .4 }}  onClick={toogleMenue} >X</motion.span>
     </div>
    <h2 className='text-2xl font-bold bloggerBrand'>
    PhotOMath
     </h2> 
    <ul className='mt-10 gap-4 flex flex-col f uppercase'>
    <li>
    <Link to="/">Home</Link>
    </li>
    <li>
    <Link to="/post/41f4e03f-4639-4b00-bcbc-d374da709e8a"> About</Link>
    </li>
    <li>
    <Link to="/dashboard">
     Categories</Link>
    </li>
    <li>
    <Link to="/dashboard/catogeries">
    Contact</Link>
    </li>
    <li>
    <Link to="/dashboard/posts">
    Login</Link>
    </li>
    </ul>
    <div className='mt-10'>
      <form action="">
        <input type="text" placeholder='SEARCH' className='border-2 py-1 text-center  border-black'/>
        <button className='bg-black text-white rounded font-semibold py-2  px-3 ml-1'>Search</button>
      </form>
    </div>
    <div className='mt-10 -translate-x-3'>
      <SocialMedia/>
    </div>

    <div className='mt-10 flex flex-wrap text-xs gap-2 pr-3'>
      <p>
      About
      </p>
      <p>
      Contact
      </p>
<p>

Privacy Policy
</p>
<p>
Terms & Conditions
</p>


<div className=' absolute bottom-5 '>
<h3 className='text-md  font-bold'>
COPYRIGHT ©2023, <span className='text-blue-500'>CodeMonster</span>
</h3>
</div>

    </div>
    </motion.div> }
    </AnimatePresence>
   
    
  
        </div>
      )
}
