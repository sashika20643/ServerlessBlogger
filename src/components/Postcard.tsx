
import { PostData } from '../Types/data'
interface PostCardProps {
  postdata: PostData;
  deletehandle: any;
}

const PostCard: React.FC<PostCardProps> = ({ postdata,deletehandle }) => {
  return (
 
          <tr className=' border-b-2 w-full max-w-screen mb-5 pt-2 overflow-hidden  '>
            <td className="p-2">
            <img className=' w-36 h-28 min-w-36 min-h-28' src={`https://serverlessblogger4765849ba144454a9073c0a54dbb0c144656-dev.s3.ap-southeast-2.amazonaws.com/public/${postdata.image}`} alt="" />

 
            </td>
            <td className='pl-5 p-2'>{postdata.title}
            <br />
           <span className='text-green-500 font-bold'>
            {postdata.category.name}
            </span> 
            </td>
            <td className='pl-5 p-2'>{postdata.createdAt}</td>
            <td><button className='bg-blue-500 p-2 px-4 rounded-lg text-white '>Edit</button> </td>
            <td><button className=' bg-red-500 p-2 px-4 rounded-lg text-white ' onClick={()=>deletehandle(postdata.id,postdata.image)}>Delete</button></td>
          </tr>
   
  );
};

export default PostCard;
