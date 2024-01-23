

import { GraphQLResult, generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';
import { useEffect, useState } from 'react';
import {createPost} from '../graphql/mutations';

import { CategoryData, Post } from '../Types/data';
import { listCategories } from '../graphql/queries';
import {v4} from 'uuid'
import TextEditor from '../components/TextEditor';
import { useNavigate } from 'react-router-dom';


const initialPostState = {
  title: '',
  body: '',
  category: '',
  image: null,
};


export default function DashBoard() {
    const client = generateClient();
    const [catdata, setCatdata] = useState<CategoryData[]>([]);
    const navigate = useNavigate();

    // When clicking on a post
    const handleNavigate = () => {
      navigate(`/dashboard/posts`);
    };
    
    useEffect(()=>{
        const fetchCats = async() =>{
         const res: GraphQLResult<any>= await client.graphql(
          {
            query:listCategories
          }
         )
         const catsData = res.data.listCategories.items;
         console.log(catsData)
     
         
         
         setCatdata(() => catsData);
     

       
        }
        
      
fetchCats()
      
      },[]
      
      )



    const [post, setPost] = useState<Post>({
        title: '',
        body: '',
        image: null,
        category:''
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
           
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files && fileInput.files[0];
            
            setPost({
              ...post,
              [name]: file || null,
            });
          } else {
            setPost({
              ...post,
              [name]: value,
            });
          }
console.log(post)
      };

  const createPostf=async(e :  React.FormEvent<HTMLFormElement>)=> {
     console.log("test")  
    e.preventDefault();
      console.log(post)
        const imgid=v4();
try {
    if(post.image !=null){
    const result = await uploadData({
      key: imgid+post.image.name,
      data: post.image,
      options: {
        accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
      }
    }).result;
    console.log('Succeeded: ', result);
    handleNavigate ();
  }
 } catch (error) {
    console.log('Error : ', error);
  }

const  postdata={
    title:post.title,
    body:post.body,
    categoryPostsId:post.category,
    image:imgid+(post.image?post.image.name:"null")
}  
console.log(postdata)
try {
    const result = await client.graphql({
      query: createPost,
      variables: { input: postdata },

    });
    setPost(initialPostState)

    console.log('GraphQL Mutation Result:', result);
  } catch (error) {
    console.error('Error creating post:', error);
  }




      }
      const handleProcedureContentChange = (content:string) => {
        setPost({
          ...post,
          ["body"]: content,
        });
        console.log(post)
      };
  return (
    <div className='lg:w-3/4 w-full'>
        <h1 className='text-2xl font-bold '>
     Create Post

        </h1>

        <form className=" mx-auto w-full p-5" onSubmit={createPostf}>
          <div className='flex flex-wrap lg:flex-nowrap w-full gap-5'>

         <div id="left" className='w-3/4'>
         <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2 w-full">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
        <TextEditor handleProcedureContentChange={handleProcedureContentChange} />
     
        </div>
         </div>
     
        <div id="right">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />

<div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2 w-full mt-2">Category</label>
          <select name="category" onChange={handleChange} className='w-full border-2 p-2' id="name">
<option value="null">select a category</option>
{catdata.map((cat)=>(
  <option key={cat.id} value={cat.id}>{cat.name}</option>
))}
          </select>
          
        </div>

        </div>
        <button
          type="submit"
      
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Post
        </button>
        </div>
        </div>
      </form>


    </div>
  )
}
