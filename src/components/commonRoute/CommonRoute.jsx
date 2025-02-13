import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebars from '../Sidebars'
import Header from '../Header'
import axios from 'axios'

export default function CommonRoute() {
  // let [userdetails,setuserdetails]=useState('')
  //   let [token, settoken] = useState(localStorage.getItem('token'))
  // useEffect(()=>{
	// 	axios.post('http://localhost:5556/api/admin/profile/detail','',{
	// 		headers: {
	// 			 Authorization: `Bearer ${token}`
	// 		},

	//   })
	// 		.then((response) => {
	// 			 setuserdetails(response.data.data)
  //        console.log(response.data.data.last_name)
	// 		})
	// 		.catch((error) => {
	// 			 toast.error('something went wrong')
	// 		})
	// },[])
 
  return (
    <>
    <div className='flex'>
                <Sidebars/>
                <div class="w-[100%] ">
                    <Header />
                  <Outlet />
                </div>
            </div>
    </>
  )
}
