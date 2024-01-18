import { useEffect, useState } from "react";
import { Category, CategoryData } from "../Types/data";
import { uploadData } from "aws-amplify/storage";
import { createCategory, deleteCategory } from "../graphql/mutations";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import { listCategories } from "../graphql/queries";
import CatCard from "../components/Catcard";
import ThreeDotsWave from "../components/ThreeDotsWave";


export default function Categories() {
    const[catresfresh,setcatrefresh]=useState("")
    const client = generateClient();
    const [catdata, setCatdata] = useState<CategoryData[]>([]);
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
      
      },[catresfresh]
      
      )



    const [cat, setCat] = useState<Category>({
        name: '',
 
        image: null,
     
      });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
           
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files && fileInput.files[0];
            
            setCat({
              ...cat,
              [name]: file || null,
            });
          } else {
            setCat({
              ...cat,
              [name]: value,
            });
          }}



          const createCatf=async(e :  React.FormEvent<HTMLFormElement>)=> {
         
           e.preventDefault();
           
               
       try {
           if(cat.image !=null){
           const result = await uploadData({
             key: "cat/"+cat.image.name,
             data: cat.image,
             options: {
               accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
             }
           }).result;
           console.log('Succeeded: ', result);
         }
        } catch (error) {
           console.log('Error : ', error);
         }
       
       const  catdata={
           name:cat.name,
          
           image:(cat.image?cat.image.name:"null")
       }  

       try {
           const result: GraphQLResult<any> = await client.graphql({
             query: createCategory,
             variables: { input: catdata },
       
           });
       
           console.log('GraphQL Mutation Result:', result);
           setcatrefresh("xxx");
         } catch (error) {
           console.error('Error creating post:', error);
         }
        
             }


             const handleDelete=async(Catid:string)=>{
              await client.graphql({
                  query:deleteCategory,
                  variables:{
                    input:{
                      id:Catid
                    }
                  }
                  
                })
                setcatrefresh("yyy");
              }

  return (
    <div className='md:w-3/4 w-full'>
    <h1 className='text-2xl font-bold '>
All Catogories

    </h1>

    <form action="" onSubmit={createCatf}>
    <div className="mb-4 flex flex-wrap justify-center mt-10 gap-y-2" >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="pl-2 mr-2 h-12 border border-gray-300 lg:w-auto w-full  rounded focus:outline-none focus:border-blue-500"
          />


<input
            type="file"
            name="image"
            onChange={handleChange}
            className="mr-2 border border-gray-300 px-3 py-2 rounded focus:outline-none  focus:border-blue-500 "
          />


<button
          type="submit"
      
          className="bg-blue-500 text-white h-12 px-4 rounded hover:bg-blue-600"
        >
          Add 
        </button>
        </div>
    </form>

<div className="w-full">
    <h3>All Categories</h3>
    <table className='w-full'>
        <tbody className=' overflow-x'>
          {catdata.length<1?  <ThreeDotsWave /> :
        catdata.map((cat,index)=>(
            <CatCard deletehandle={handleDelete} catdata={cat} key={index}/>
        )

           
        )}
        
        </tbody>
      </table>
</div>
    </div>
  )
}
