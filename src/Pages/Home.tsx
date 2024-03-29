import { useEffect, useState } from "react";
import { CategoryPostData, Post } from "../Types/data";
import { listCategoriesWithposts, listPosts } from "../graphql/queries";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import Slider from "../components/Slider";
import BlogPostCard from "../components/BlogPostCard";
import { MotionConfig} from "framer-motion";


export default function Home() {
  const client = generateClient();


  const[catagories,setCatagories]=useState<CategoryPostData[]>([])


  const [slider,setSlider]=useState([]);

    useEffect(()=>{
        const fetchPosts = async() =>{
         const res: GraphQLResult<any>= await client.graphql(
          {
            query:listPosts
          }
         )
         const postsData = res.data.listPosts.items;
         console.log(postsData)
     
         
         
          
     
          setSlider(
            postsData.slice(1, 5).map((postdata:Post) =>
              `https://serverlessblogger4765849ba144454a9073c0a54dbb0c144656-dev.s3.ap-southeast-2.amazonaws.com/public/${postdata.image}`
            ));
       
        }

        const fetchCatPost=async() =>{
          const res: GraphQLResult<any>= await client.graphql(
            {
              query:listCategoriesWithposts
            }
           )
            
         console.log(res)
           const catdata:CategoryPostData[]=res.data.listCategories.items;
           
        setCatagories(catdata)
       
            
        }
        
        fetchPosts()
fetchCatPost()
      
      },[]
      


      )
  return (
    <div className="w-full">

      <Slider slider={slider} />

      <div className="flex flex-wrap gap-6 justify-center mt-10 ">

        

        
        {catagories.map((cat,index)=>(
          <div className="" key={index} >
            
        <MotionConfig transition={{
          duration:.3,
          ease:"easeInOut"
        }}>
{cat.posts.items.map((post)=>(
  <BlogPostCard post={post}/>
))}
</MotionConfig>
          </div>
        ))}
     
      </div>
    </div>
  )
}
