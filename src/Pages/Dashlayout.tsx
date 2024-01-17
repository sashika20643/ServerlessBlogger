
import { Outlet } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'


export default function Dashlayout() {
  return (
    <div className='w-full  min-h-screen overflow-scroll flex'>
      <div className='h-full w-1/4 md:block none '></div>
<DashSidebar/>
<Outlet/>
    </div>
  )
}
