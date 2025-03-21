import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function AddSubCategory() {
    let params = useParams();
    let [categories, SetCategories] = useState([])
    let [details, setdetails] = useState('')
    let [render, setrender] = useState(true)
    let [imageurl, setimageurl] = useState('')
    let [token, settoken] = useState(localStorage.getItem('token'))
    let navigation = useNavigate()

    let formhandler = (event) => {
        event.preventDefault();
        if (params.id != null) {
            axios.put(`https://safa-company-api.onrender.com/api/admin/sub-categories/update/${params.id}`, event.target, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then((response) => {
                    if(response.data.tokenstatus!=false){
                        toast.success('Record Updated successfully')
                        setrender(!render)

                    } else {
                        navigation('/')
                    }
                })
                .catch(() => {
                    toast.error('something went wrong')
                })
        } else {
            axios.post('https://safa-company-api.onrender.com/api/admin/sub-categories/add', event.target, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then((response) => {
                    if(response.data.tokenstatus!=false){
                        toast.success('Record added successfully')
                        event.target.reset();
                    } else {
                        navigation('/')

                    }
                })
                .catch(() => {
                    toast.error('something went wrong')
                })
        }
    }


    useEffect(() => {
        axios.post('https://safa-company-api.onrender.com/api/admin/categories', {
            page: 1,
            limit: 200,
            status: true
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if(response.data.tokenstatus!=false){
                SetCategories(response.data.data)
                }else{
                    navigation('/')
                }
            })
            .catch(() => {
                toast.error('something went wrong')
            })
    }, [render])



    useEffect(() => {
        if (params != null) {
            axios.post(`https://safa-company-api.onrender.com/api/admin/sub-categories/detail/${params.id}`, '', {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then((response) => {
                    if(response.data.tokenstatus!=false){
                    setdetails(response.data.data)
                    setimageurl(response.data.base_url)
                    }else{
                        navigation('/')
                    }
                }).catch(() => {
                    toast.error('something went wrong !!!')
                })
        }else{
            setdetails('')
        }
        
    }, [params,render])


    return (
        <>
            <section class="w-full">
                <nav class="flex border-b-2" aria-label="Breadcrumb">
                    <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                        <li>
                            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Sub Category</a></div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">
                                {
                                    (params.id != null) ? 'Update' : ' Add'
                                }
                            </span></div>
                        </li>
                    </ol>
                </nav>
                <div class="w-full min-h-[610px]">
                    <input type="hidden" value='' name='_id' />
                    <div class="max-w-[1220px] mx-auto py-5">
                        <h3 class="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                            {
                                (params.id != null) ? 'Update sub category' : ' Add Sub Category '
                            }</h3>
                        <form onSubmit={formhandler} autoComplete='off' class="border border-t-0 p-3 rounded-b-md border-slate-400">
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Select Category Name</label>
                                <select id="default" name="parent_id" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option value=''>Select Category</option>
                                    {
                                        categories.map((v) => {
                                            return (
                                                <option value={v._id} selected={
                                                    (v._id == details.root_id) ?
                                                        'selected'
                                                        :
                                                        ''
                                                }>{v.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900"> Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={details.name}
                                    id="base-input"
                                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Category Name"
                                />
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">featured categories</label>
                                <select id="default" name="featured_categories" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option value=''>Select featured categories</option>

                                    <option value='Yes' selected={
                                        (details.featured_categories == "Yes") ?
                                            'selected' : ''
                                    }>Yes</option>
                                    <option value='No' selected={
                                        (details.featured_categories == "No") ?
                                            'selected' : ''
                                    }>No</option>

                                </select>
                               
                            </div>

                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900"> Image</label>
                                <div class="max-w-full">
                                    <label for="file-input" class="sr-only">Choose file</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="file-input"
                                        class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                        multiple=""
                                    />
                                </div>
                            </div>
                            {
                                (params.id != null) ?
                                    <div className=' h-28  mb-5'>
                                        <img src={imageurl + details.image} className=' h-[100%]' alt="" /> </div>
                                    :
                                    ''
                            }

                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Order</label>
                                <input
                                    type="telk"
                                    name="order"
                                    defaultValue={details.order}
                                    id="base-input"
                                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Enter Order"
                                />
                            </div>

                            <button
                                type="submit"
                                class="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            >
                                Add Sub Category
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}
