import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { CommonContext } from './components/context/Context';

export default function Login() {
  let {render,setrender,setcompanyProfilerender,companyProfilerender}= useContext(CommonContext)
  let navigation = useNavigate();
  let formhandle = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5556/api/admin/login',event.target)
    .then((response)=>{
      setrender(!render)
      setcompanyProfilerender(!companyProfilerender)
      navigation('/dashboard')
        localStorage.setItem('token',response.data.token)
    }).catch((error)=>{
        toast.error('someting went wrong !!!!')
    })
    
  }


  return (
    < >
      <div className=' absolute translate-x-[50%] right-[50%] bottom-[50%] translate-y-[50%]'>
        <h1 className='text-[30px] text-center font-bold py-4'>
          Frank And Oaks
        </h1>

        <form onSubmit={formhandle} class="max-w-sm mx-auto border p-7 rounded-lg">
          <p className='text-[25px] font-bold pb-3 '>
            Sign in your account
          </p>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name='email' id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input name='password' type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  w-[100%]  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>


    </>
  )
}
