import { useEffect, useState } from 'react';



import previmg from '../assets/images/prev.png'
import nextimg from '../assets/images/next.png'

export default function Slider({slider}) {

    const [slideIndex,setSlideIndex]=useState(0);
    console.log(slider[slideIndex])
    useEffect(()=>{
        const intervalId = setInterval(() => {
            if(slideIndex<(slider.length-1)){
                
                setSlideIndex(slideIndex+1)
            }
            else{
                setSlideIndex(0);
            }
        }, 5000);
        return () => clearInterval(intervalId);

    },[slideIndex, slider]

    )


    const handleSlideIndex=(action:string)=>{

if(action==="next"){
    if(slideIndex<(slider.length-1)){
        
        setSlideIndex(slideIndex+1)
    }
    else{
        setSlideIndex(0);
    }

}
if(action==="prev"){
    if(slideIndex>0){
        
        setSlideIndex(slideIndex-1)
    }
    else{
        setSlideIndex(slider.length-1);
    }
    
}

    }

  return (

    <div  className=' bg-cover w-full h-screen slider relative -z-10' style={{ backgroundImage:`url(${slider[slideIndex]})`,backgroundPosition:"center,center",backgroundSize:"cover"}} >

        <div className='absolute top-1/2 left-0 -translate-y-1/2 ' id='prev'>
<img src={previmg} className='focus:scale-150 scale-100 cursor-pointer' alt="" onClick={()=>handleSlideIndex("prev")}/>
        </div>
        <div className='absolute top-1/2 right-0 -translate-y-1/2 focus:scale-130 ' id='next'>
<img src={nextimg} className='focus:scale-150 cursor-pointer' alt="" onClick={()=>handleSlideIndex("next")} />
        </div>
        
        <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4'>
{slider.map(
(slide,index:number)=>{
    return(
<div key={index} className={`bg-white h-2 rounded-full ${index===slideIndex? "w-6":"w-2"}`}></div>

    )
}


)}
        </div>



    </div>

  )
}
