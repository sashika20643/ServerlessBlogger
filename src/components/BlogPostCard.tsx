import React from 'react'
import { Post, PostData } from '../Types/data'
import { Link } from 'react-router-dom';

 const BlogPostCard =({post})=> {

 
  return (
    <div className='max-w-72 mb-5 relative group cursor-pointer'>
<Link to={"/post/"+post.id}>
        <img src={"https://serverlessblogger4765849ba144454a9073c0a54dbb0c144656-dev.s3.ap-southeast-2.amazonaws.com/public/"+post.image} className=' max-w-72 rounded' alt="" />
        <div className='top-0 left-0 bottom-0 right-0 absolute  justify-center items-end bg-black opacity-35 hidden group-hover:block'>
      

        </div>
        <h4 className=' absolute bottom-5 text-center  text-white w-full p-3  hidden group-hover:block '>{post.title}</h4>
       
        </Link>
    </div>

  )
}
export default BlogPostCard;
