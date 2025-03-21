import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CommonContext } from './context/Context.jsx'
import { useNavigate } from 'react-router-dom'

export default function ProfileUser({}) {
	let {userdetails,baseurl,render,setrender}=useContext(CommonContext)
	let [token, settoken] = useState(localStorage.getItem('token'))
	let [SelectedProfileImage,setSelectedProfileImage]=useState('')
	let navigation = useNavigate()
	

	let handleimagechange=(event)=>{
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}
	


	let formhandle=(event)=>{
		event.preventDefault();
		if((event.target.confirm_password.value=='' && event.target.password.value=='') || (event.target.password.value==event.target.confirm_password.value)){
			axios.put('https://safa-company-api.onrender.com/api/admin/profile/update',event.target,{
				headers: {
					 Authorization: `Bearer ${token}`
				},
	
		  })
				.then((response) => {
					if(response.data.tokenstatus!=false){
					toast.success('Profile Updated Successfully')
					setrender(!render)
					event.target.reset();
					}else{
						navigation('/')
					}
				})
				.catch((error) => {
					 toast.error('something went wrong')
				})
			
		}else{
			toast.error('Password and Confirm Password Does not match')
		}


	}

	return (
		<>
			<div class="w-full">
				<div class="max-w-[1220px] mx-auto py-5">
					<h3 class="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">Profile</h3>
					<form  onSubmit={formhandle} class="p-3  border border-t-0 rounded-b-md border-slate-400">
						<div class="grid grid-cols-2">
							<div>
								<div class="grid gap-4 grid-cols-2">
									<div class="mb-5">
										<label for="base-input" class="block mb-5 text-md font-medium text-gray-900">First Name</label>
										<input
											name="first_name"
											type="text"
											defaultValue={userdetails.first_name}
											id="base-input"
											class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
											placeholder="Enter your name"
										/>
									</div>
									<div class="mb-5">
										<label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Last Name</label>
										<input
											name="last_name"
											type="text"
											defaultValue={userdetails.last_name}
											id="base-input"
											class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
											placeholder="Enter your name"
										/>
									</div>
								</div>


								<div>
									<div class="mb-5">
										<label for="base-input" class="block my-5 text-md font-medium text-gray-900">Email</label>

										<input
											name="email"
											defaultValue={userdetails.email}
											type="email"
											id="email"
											class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
											placeholder="Enter your email"
										/>


									</div>
									<div class="mb-5">
										<label for="base-input" class="block my-8 text-md font-medium text-gray-900">Change Password</label>
										<label for="base-input" class="block my-4 text-md font-medium text-gray-900">Password</label>
										<input
											name="confirm_password"
											type="password"
											id="base-input"
											class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
											placeholder="Enter your name"
										/>


									</div>
									<div class="mb-5">
										<label for="base-input" class="block my-4 text-md font-medium text-gray-900">Confirm Password</label>

										<input
											name="password"
											type="password"
											id="base-input"
											class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
											placeholder="Enter your name"
										/>


									</div>

								</div>
								<button
									type="submit"
									class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
								>
									Submit
								</button>
							</div>
							<div class="pt-16 flex items-center justify-start flex-col">
								<figure className='rounded-full relative  w-40 h-40 '>
									<img class="rounded-full w-40 h-40 border-2 object-cover shadow-lg" 
									src={`${(SelectedProfileImage!='')?SelectedProfileImage :
										(userdetails.image==null) ?'/images/user.jpg': baseurl+'/'+userdetails.image}
										`}
										alt="" />
									<div id='file' className=' absolute rounded-full hover:bg-[rgba(0,0,0,0.2)] w-[100%] h-[100%] top-0 left-0'>
										<input type="file" name='file' onChange={handleimagechange}  className='h-[100%]   opacity-0 w-[100%]' />
									</div>
									</figure>
								<h5 class="mt-3 text-[20px]">Profile Image</h5>
							</div>
						</div>
					</form>
				</div>
			</div>

		</>
	)
}
