import  { useEffect, useState } from 'react'
import {listPosts} from '../graphql/queries';
import { GraphQLResult, generateClient } from 'aws-amplify/api';
import {  PostData } from '../Types/data';
import PostCard from '../components/Postcard';
import { deletePost } from '../graphql/mutations';
import { remove } from 'aws-amplify/storage';
import ThreeDotsWave from '../components/ThreeDotsWave';
import { Link } from 'react-router-dom';



export default function Allposts() {
    const client = generateClient();
    const[refresh,Setrefresh]=useState(true);
    const[posts,setPosts]=useState<PostData[]>([])

    useEffect(()=>{
        const fetchPosts = async() =>{
         const res: GraphQLResult<any>= await client.graphql(
          {
            query:listPosts
          }
         )
         const postsData = res.data.listPosts.items;
         console.log(postsData)
     
         
         
          setPosts(() => postsData);
     

       
        }
        
      
fetchPosts()
      
      },[refresh]
      


      )

      const handleDelete=async(Catid:string,filename:string)=>{
        await client.graphql({
          query:deletePost,
          variables:{
            input:{
              id:Catid
            }
          }
          
        })
        try {
          await remove({ key: filename });
        } catch (error) {
          console.log('Error ', error);
        }
        Setrefresh(!refresh);
      }

  
  return (
    <div className='md:w-3/4 '>Allposts

<div className=" p-5 w-full overflow-hidden">
  <div className='text-right  mb-5'>
  <Link to={"/dashboard"} className='border-2 border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition-colors  duration-300 ease-in-out'>  Create Post</Link>

  </div>
<div>
      <table className='w-full'>
        <tbody className='w-full'>
          {posts.length<1 ?<ThreeDotsWave/>: 
    posts.map((post)=>(

      
  <PostCard deletehandle={handleDelete} postdata={post}/>
      

    ))}
         </tbody>
      </table>
    </div>
</div>

    </div>
  )
}
