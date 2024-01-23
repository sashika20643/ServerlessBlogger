import React from 'react'
import { Post, PostData } from '../Types/data'
import { Link } from 'react-router-dom';
import { motion,useAnimationControls } from "framer-motion";


 const BlogPostCard =({post})=> {
 const controls= useAnimationControls();
 const handleClick=()=>{
  console.log("mouse entered");
  controls.start({opacity:0.6});
 }
 
  return (
    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.95,rotate:"2.5deg"}}  className='max-w-72 mb-5 relative group cursor-pointer'>
<Link to={"/post/"+post.id}>
        <img src={"https://serverlessblogger4765849ba144454a9073c0a54dbb0c144656-dev.s3.ap-southeast-2.amazonaws.com/public/"+post.image}  onMouseEnter={handleClick}  className=' max-w-72 rounded' alt="" />
        <motion.div className='top-0 left-0 bottom-0 right-0 absolute  justify-center items-end bg-black opacity-0 hidden group-hover:block' initial={{opacity:0}} animate={controls}>
      

        </motion.div>
        <h4 className=' absolute bottom-5 text-center  text-white w-full p-3  hidden group-hover:block '>{post.title}</h4>
       
        </Link>
    </motion.div>

  )
}
export default BlogPostCard;
