import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion'

export default function DashSidebar() {

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
    <div>
       <button
        onClick={toogleMenue}
        className="md:hidden focus:outline-none absolute top-2 left-2"
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
      <AnimatePresence>
{(isMenuOpen ||  screenWidth > 768) &&
 <motion.div initial={{x:-10, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5}} exit={{x:-10, opacity:0}} className={`lg:right-3/4 md:right-1/2 right-0   block md:block bg-gray-100 left-0 lg:top-0 md:top-0 top-0 bottom-0 lg:block fixed text-left pl-5 pt-5`} >
 <div className='w-full relative'>
   <motion.span className='fixed right-5 text-2xl font-bold  cursor-pointer md:hidden' whileHover={{ rotate: 90 }}
 transition={{ duration: .4 }}  onClick={toogleMenue} >X</motion.span>
 </div>
<h2 className='text-2xl font-bold'>
DashBoard
 </h2> 
<ul className='mt-10 gap-2 flex flex-col'>
<li>
<Link to="/">Home</Link>
</li>
<li>
<Link to="/dashboard/posts">All Posts</Link>
</li>
<li>
<Link to="/dashboard">
 Create Posts</Link>
</li>
<li>
<Link to="/dashboard/catogeries">
Categories</Link>
</li>

</ul>
</motion.div> }
</AnimatePresence>
   
    </div>
  )
}
