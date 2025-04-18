import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pagination } from "flowbite-react";
import { toast } from 'react-toastify';
export default function ViewColor() {
    let [color, setcolor] = useState([])
    let [token, settoken] = useState(localStorage.getItem('token'))
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);
    let [render, setrender] = useState(true);
    let navigation = useNavigate();
    let [checkedvalue, setcheckedvalue] = useState([])
    let {totalrecords,settotalrecords}=useState('')


    let selectall = (event) => {
        if (event.target.checked == true) {
            let data = []
            color.forEach((v) => {
                data.push(v._id)
            })
            setcheckedvalue(data)

        } else {
            setcheckedvalue([])
        }
    }


    let clear = (id) => {
        axios.delete(`https://safa-company-api.onrender.com/api/admin/color/delete/${id}`, '', {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if (response.data.tokenstatus != false) {
                    setrender(!render)
                } else {
                    navigation('/')
                }

            }).catch((error) => {
                toast.error('something went wrong')
            })

    }


    useEffect(() => {
        axios.post(`https://safa-company-api.onrender.com/api/admin/color`, {
            page: currentPage,
            limit: 6
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if (response.data.tokenstatus != false) {
                    setcolor(response.data.data)
                   
                } else {
                    navigation('/')
                }
            }).catch((error) => {
                toast.error('something went wrong ')
            })
    },[render,currentPage])



    let deleteall = () => {
        if (confirm('are you sure you want to delete')) {
            axios.post('https://safa-company-api.onrender.com/api/admin/color/delete', {
                id: checkedvalue
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then((response) => {
                    if (response.data.tokenstatus != false) {
                        setrender(!render)
                        setcheckedvalue([])
                    } else {
                        navigation('/')
                    }

                }).catch((error) => {
                    toast.error('somrthing went wrong')
                })
        }

    }

    let singlecheckbox = (event) => {
        if (event.target.checked == true) {
           
            checkedvalue.push(event.target.id)
            setrender(!render)
            setcheckedvalue(checkedvalue)
        } else {
            let data = checkedvalue.filter((v) => {
                if (v != event.target.id) {
                    return v;
                }
            })
            setcheckedvalue(data)
        }

        
    }


    let changeStatus = () => {
        axios.post('https://safa-company-api.onrender.com/api/admin/color/change-status', {
            id: checkedvalue
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if (response.data.tokenstatus != false) {
                    setrender(!render)
                    setcheckedvalue([])
                } else {
                    navigation('/')
                }

            }).catch((error) => {
                toast.error('somrthing went wrong')
            })

    }
    
    return (
        <>

            <section class="w-full">
               
                <nav class="flex border-b-2" aria-label="Breadcrumb">
                    <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                        <li>
                            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Color</a></div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">View Color</span></div>
                        </li>
                    </ol>
                </nav>
                <div class="w-full min-h-[610px]">
                    <div class="max-w-[1220px] mx-auto py-5">
                        <div className=' bg-slate-100 flex justify-between py-3 px-4  rounded-t-md border border-slate-400'>
                            <div class="text-[26px] font-semibold ">View Color</div>
                            <div className='flex gap-3'>
                                <button

                                    onClick={deleteall}
                                    class="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                >
                                    Delete All
                                </button>
                                <button
                                    onClick={changeStatus}
                                    class="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                >
                                    Change Status
                                </button>
                            </div>
                        </div>
                        <div class="border border-t-0 rounded-b-md border-slate-400">
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-left rtl:text-right text-gray-500">
                                    <thead class="text-sm text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3" width='150px'>
                                                <input
                                                    onClick={selectall}
                                                    name="deleteCheck" id="purple-checkbox" type="checkbox" class="w-4 mr-2 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" value=""
                                                    checked={(checkedvalue.length == color.length) ? true : ''} />
                                                Select All</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>S. No.</th>
                                            <th scope="col" class="px-6 py-3"> Name</th>
                                            <th scope="col" class="px-6 py-3"> Color code</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>Order</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>Status</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            (color.length > 0)
                                                ?
                                                color.map((v, i) => {
                                                    return (

                                                        <tr class="bg-white border-b">
                                                            <th scope="row" class="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                                                                <input name="deleteCheck" checked={(checkedvalue.includes(v._id)) ? true : ''}
                                                                    onClick={() => singlecheckbox(event)}
                                                                    id={v._id} type="checkbox" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" value="" />
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                {i + 1}
                                                            </td>
                                                            <td class="px-6 py-4">{v.name}</td>
                                                            <td class="px-6 py-4">{v.code}</td>
                                                            <td class="px-6 py-4">
                                                                {v.order}
                                                            </td>
                                                            <td class="px-6 py-4" >
                                                                {
                                                                    (v.status == true)
                                                                        ?
                                                                        'Active'
                                                                        :
                                                                        'Inactive'
                                                                }
                                                            </td>
                                                            <td class="px-6 py-4 flex gap-3 mt-6">
                                                              
                                                                <Link to={`/color/update/${v._id}`} >
                                                                    <svg fill="gold" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                        <path
                                                                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                                                                        ></path>
                                                                    </svg>
                                                                </Link>
                                                            </td>

                                                        </tr>
                                                    )
                                                })

                                                :
                                                <tr class="bg-white border-b">

                                                    <td class="px-6 py-4 text-center " colSpan={6}>no records found !!</td>


                                                </tr>
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto sm:justify-center">
                        <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} showIcons />
                    </div>
                </div>
            </section>
        </>
    )
}
