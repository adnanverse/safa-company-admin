import React, { useContext, useState } from 'react'
import { CommonContext } from './context/Context'
import { toast } from 'react-toastify'
import axios from 'axios'
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function CompanyProfile() {
    let { companyProfilerender, setcompanyProfilerender, companyProfileDetails, companyProfilebaseurl } = useContext(CommonContext)
    let [token, settoken] = useState(localStorage.getItem('token'))
    let [SelectedLogo, setSelectedLogo] = useState('')
    let [SelectedSubLogo, setSelectedSubLogo] = useState('')
    let navigation = useNavigate()

    let handleimagechange = (event) => {
        if (event.target.id == 'logo') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedLogo(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }

        if (event.target.id == 'sub_logo') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedSubLogo(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }

    }


    let formhandle = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5556/api/admin/company-profile/update/${companyProfileDetails._id}`, event.target, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if(response.data.tokenstatus!=false){
                setcompanyProfilerender(!companyProfilerender)
                toast.success('Company Profile Updated Successfully !!')
                }else{
                    navigation('/')
                }
            })
            .catch((error) => {
                toast.error('something went wrong')
            })
    }

    return (
        <div>
            <div class="w-full">
                <div class="max-w-[1220px] mx-auto py-5">
                    <h3 class="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">Company Profile</h3>
                    <form onSubmit={formhandle} class="p-3 border border-t-0 rounded-b-md border-slate-400">
                        <div class="grid gap-7 grid-cols-2">
                            <div>
                                <div class="mb-5">
                                    <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Email</label>
                                    <input
                                        name="email"
                                        defaultValue={companyProfileDetails.email}
                                        type="email"
                                        id="base-input"
                                        class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <br />
                                <div class="mb-5">
                                    <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Contact Number</label>
                                    <input
                                        name="mobile_number"
                                        defaultValue={companyProfileDetails.mobile_number}
                                        type="tel"
                                        id="base-input"
                                        class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <div class="mb-5">

                                        <button
                                            type="submit"
                                            class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                        >
                                            Submit
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div class="grid gap-5 grid-cols-2">
                                <div class="mb-5 relative">
                                    <label for="base-input" class="block mb-4 text-md font-medium text-gray-900">Logo</label>
                                    <img
                                        class="w-[100%] border-black border-2 shadow-md rounded-md"
                                        src={`${(SelectedLogo != '') ? SelectedLogo :
                                            (companyProfileDetails.logo == null) ? '/images/nullimage.jpg' : companyProfilebaseurl + '/' + companyProfileDetails.logo}
                                                `}
                                        alt=""
                                    />
                                    <div className=' absolute  hover:bg-[rgba(0,0,0,0.2)] h-[88%] rounded-md  bottom-0 left-0'>
                                        <input type="file" id='logo' name='logo' onChange={handleimagechange} className='h-[100%]   opacity-0 w-[100%]' />
                                    </div>
                                </div>
                                <div class="mb-5 relative">
                                    <label for="base-input" class="block mb-4  text-md font-medium text-gray-900">Sub Logo</label>
                                    <img
                                        class="w-[100%] border-black border-2 shadow-md rounded-md"
                                        src={`${(SelectedSubLogo != '') ? SelectedSubLogo :
                                            (companyProfileDetails.sub_logo == null) ? '/images/nullimage.jpg' : companyProfilebaseurl + '/' + companyProfileDetails.sub_logo}
                                                `}
                                        alt=""
                                    />
                                    <div className=' absolute z-10  group hover:bg-[rgba(0,0,0,0.2)] w-[100%] h-[88%] rounded-md  bottom-0 left-0'>
                                        <div className=' top-[40%] hidden text-[50px] group-hover:block z-20 left-[42%] absolute'>
                                        <IoAddSharp />
                                        </div>
                                        <input type="file" id='sub_logo' name='sub_logo' onChange={handleimagechange} className='h-[100%]   opacity-0 w-[100%]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
