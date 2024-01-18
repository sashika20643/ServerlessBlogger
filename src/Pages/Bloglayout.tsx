import { Outlet } from "react-router-dom";
import HomeSideBar from "../components/HomeSideBar";


export default function Bloglayout() {
  return (
    <div className='w-full h-screen overflow-hidden flex  '>
   <div className="lg:w-1/4">
   <HomeSideBar/>
   </div>
<div className="lg:w-3/4 w-full overflow-y-scroll">
<Outlet/>
</div>

    </div>
  )
}
