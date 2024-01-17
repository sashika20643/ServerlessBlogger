import  { useEffect, useState } from 'react'
import {listPosts} from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import {  PostData } from '../Types/data';
import PostCard from '../components/Postcard';
import { deletePost } from '../graphql/mutations';
import { remove } from 'aws-amplify/storage';



export default function Allposts() {
    const client = generateClient();
    const[refresh,Setrefresh]=useState(true);
    const[posts,setPosts]=useState<PostData[]>([])

    useEffect(()=>{
        const fetchPosts = async() =>{
         const res= await client.graphql(
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
        const result=await client.graphql({
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
<div>
      <table className='w-full'>
        <tbody className='w-full'>
    {posts.map((post)=>(

      
  <PostCard deletehandle={handleDelete} postdata={post}/>
      

    ))}
         </tbody>
      </table>
    </div>
</div>

    </div>
  )
}
