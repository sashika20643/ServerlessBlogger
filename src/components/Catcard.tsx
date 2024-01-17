import { CategoryData } from "../Types/data";
interface CatCardProps {
    catdata : CategoryData;
    deletehandle: any;
  }

  const CatCard: React.FC<CatCardProps> = ({ catdata,deletehandle}) => {
    return (
   
            <tr className=' border-2 w-full mb-5 pt-2 '>
              <td className='flex justify-center items-center p-2'>
              <img className=' w-36 h-28' src={`https://serverlessblogger4765849ba144454a9073c0a54dbb0c144656-dev.s3.ap-southeast-2.amazonaws.com/public/cat/${catdata.image}`} alt="" />
  
   
              </td>
              <td className='pl-5 p-2'>{catdata .name}</td>
           
              <td><button className=' bg-red-500 p-2 px-4 rounded-lg text-white ' onClick={()=>deletehandle(catdata.id)}>Delete</button></td>
            </tr>
     
    );
  };
  export default CatCard;
