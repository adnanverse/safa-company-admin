import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pagination } from "flowbite-react";
import { toast } from 'react-toastify';


export default function ViewSize() {
    let [Size, setSize] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);
    let [sizedelete, setsizedelete] = useState(true)
    let [checkedvalue, setcheckedvalue] = useState([]);
    let [token, settoken] = useState(localStorage.getItem('token'))
    let navigation = useNavigate();


    let singlecheckbox = (event) => {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            checkedvalue.push(event.target.id)
            setsizedelete(!sizedelete)
            setcheckedvalue(checkedvalue)
        } else {
            let data = checkedvalue.filter((v) => {
                if (v != event.target.id) {
                    return v;
                }
            })
            setcheckedvalue(data)
        }

        console.log(checkedvalue)
    }
    let deleteall = () => {
        if (confirm('are you sure you want to delete')) {
            axios.post('http://localhost:5556/api/admin/size/delete', {
                id: checkedvalue
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            }).then((response) => {
                if (response.data.tokenstatus != false) {
                    toast.success('Size deleted successfully')
                    setsizedelete(!sizedelete)
                    setcheckedvalue([])
                } else {
                    navigation('/')
                }
            }).catch((error) => {
                toast.error('somrthing went wrong')
            })
        }

    }
    let changeStatus = () => {
        axios.post('http://localhost:5556/api/admin/size/change-status', {
            id: checkedvalue
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        }).then((response) => {
            if (response.data.tokenstatus != false) {
                toast.success('Sizes status change successfully')
                setsizedelete(!sizedelete)
                setcheckedvalue([])
            } else {
                navigation('/')
            }
        }).catch((error) => {
            toast.error('something went wrong')
        })

    }
    let selectall = (event) => {
        if (event.target.checked == true) {
            let data = []
            Size.forEach((v) => {
                data.push(v._id)
            })
            setcheckedvalue(data)

        } else {
            setcheckedvalue([])
        }
    }
    useEffect(() => {
        axios.post('http://localhost:5556/api/admin/size', {
            page: currentPage,
            limit: 10
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if (response.data.tokenstatus != false) {
                    setSize(response.data.data)
                } else {
                    navigation('/')
                }

            })
            .catch((error) => {
                toast.error('something went wrong')
            })
    }, [sizedelete,currentPage])
    return (
        <>
            <section class="w-full">
                <div id="order-modal" class=" hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="fixed w-full h-screen bg-[rgba(0,0,0,0.8)]" >
                        <div class="relative p-4 px-20 w-full max-w-full max-h-full">
                            <div class="relative bg-white rounded-lg shadow">
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                    <h3 class="text-xl font-semibold text-gray-900">Product Image's &amp; Price</h3>
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="order-modal">
                                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div class="p-4 md:p-5 space-y-4">
                                    <div class="grid grid-cols-[22%_45%_27%] gap-10">
                                        <div class="border-2 rounded-md shadow-md p-4">
                                            <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/902af913-69be-4024-b22c-cd573b7dd13b1613028902744-Roadster-Men-Tshirts-9521613028900435-1.jpg" alt="" />
                                        </div>
                                        <div class="flex items-start flex-wrap gap-5 border-2 rounded-md shadow-md p-3">
                                            <img
                                                class="w-36"
                                                src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/7f8383cc-07f5-4714-b451-fba7d49776921613028902727-Roadster-Men-Tshirts-9521613028900435-2.jpg"
                                                alt=""
                                            />
                                            <img
                                                class="w-36"
                                                src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/5d8249b2-cbfa-42a3-9b8a-9406fcb8af0c1613028902710-Roadster-Men-Tshirts-9521613028900435-3.jpg"
                                                alt=""
                                            />
                                            <img
                                                class="w-36"
                                                src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/bf9e30b3-5b8e-4cf1-811b-81ea64d45ed81613028902692-Roadster-Men-Tshirts-9521613028900435-4.jpg"
                                                alt=""
                                            />
                                            <img
                                                class="w-36"
                                                src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/77451543-64cb-4294-8f82-24ac1d78dcf01613028902666-Roadster-Men-Tshirts-9521613028900435-5.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div class="border-2 rounded-md shadow-md p-3">
                                            <h3 class="text-center font-semibold text-[20px]">Product Details</h3>
                                            <ul class="space-y-4 mt-8">
                                                <li class="font-semibold text-[17px]">Price : <span class="font-normal text-[16px]">&nbsp; ₹ 1500</span></li>
                                                <li class="font-semibold text-[17px]">MRP : <span class="font-normal text-[16px]">&nbsp; ₹ 3000</span></li>
                                                <li class="font-semibold text-[17px]">Manage Stock : <span class="font-normal text-[16px]">&nbsp; In Stock</span></li>
                                                <li class="font-semibold text-[17px]">Brand Name: <span class="font-normal text-[16px]">&nbsp; Lev's</span></li>
                                                <li class="font-semibold text-[17px]">Size : <span class="font-normal text-[16px]">&nbsp; Xl </span></li>
                                                <li class="font-semibold text-[17px]">Color : <span class="font-normal text-[16px]">&nbsp; Red </span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav class="flex border-b-2" aria-label="Breadcrumb">
                    <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                        <li>
                            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Parent Category</a></div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">View Size</span></div>
                        </li>
                    </ol>
                </nav>
                <div class="w-full min-h-[610px]">
                    <div class="max-w-[1220px] mx-auto py-5">
                        <div className=' bg-slate-100 flex justify-between py-3 px-4  rounded-t-md border border-slate-400'>
                            <div class="text-[26px] font-semibold ">View Size</div>
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
                                                    checked={(checkedvalue.length == Size.length) ? true : ''} />



                                                Select All</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>S. No.</th>
                                            <th scope="col" class="px-6 py-3"> Name</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>Order</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>Status</th>
                                            <th scope="col" class="px-6 py-3" width='100px'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            (Size.length > 0)
                                                ?
                                                Size.map((v, i) => {
                                                    return (
                                                        <tr class="bg-white border-b">
                                                            <th scope="row" class="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                                                                <input name="deleteCheck"

                                                                    checked={(checkedvalue.includes(v._id)) ? true : ''}
                                                                    onClick={() => singlecheckbox(event)}
                                                                    id={v._id} type="checkbox" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                                                                />
                                                            </th>
                                                            <td class="px-6 py-4">
                                                                {i + 1}
                                                            </td>
                                                            <td class="px-6 py-4">{v.name}</td>
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
                                                           
                                                                <Link to={`/size/update/${v._id}`} >
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
