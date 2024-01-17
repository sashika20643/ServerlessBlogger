import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './Pages/RootLayout'
import Home from './Pages/Home'
import DashBoard from './Pages/DashBoard'

import { Authenticator } from '@aws-amplify/ui-react';
import Dashlayout from './Pages/Dashlayout'
import Allposts from './Pages/Allposts'
import Categories from './Pages/Categories'



function App() {

  const router= createBrowserRouter(
    [{
      path:"/",
      element: <RootLayout/>,
      children:[
        {path:'/', element:<Home/>},
        {path:'/dashboard',element:
        <Authenticator socialProviders={['amazon', 'apple', 'facebook', 'google']}>
        {({ signOut, user }) => (
      <main className='w-full'>
        <Dashlayout/>
        <h1>Hello {user?.username ?? 'Guest'}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
      
            
            </Authenticator>,
            children: [  {path:'/dashboard', element:
            <DashBoard/>

  
  },
{
  path:"/dashboard/posts",element:
  <Allposts/>
},
{
  path:"/dashboard/catogeries",element:
  <Categories/>
}
]
      },
 
      
      ]
    },
    
      
    ]
  )
  
  return (
     <RouterProvider router={router}/>
  )
}

export default App
