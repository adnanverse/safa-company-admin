import axios, { toFormData } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function AddCategory() {
    const params = useParams();
    let [CatDetails,setCatDetails]=useState('')
    let navigation = useNavigate();
    let   [token ,settoken]=useState(localStorage.getItem('token'))
    
    useEffect(()=>{
        if(params.id!=null){
            axios.post(`https://safa-company-api.onrender.com/api/admin/categories/detail/${params.id}`,'',{
                headers:{
                    Authorization:`Bearer ${token}` 
                },
                
            })
            .then((response)=>{
                    if(response.data.tokenstatus!=false){
                            setCatDetails(response.data.data)
                    }else{
                        navigation('/')
                    }
            }).catch((error)=>{
                alert('something went wrong')
            })
        }
        
    },[])
    let formhandler = (event)=>{
    
        event.preventDefault()
        if(params.id!=null){
            axios.put(`https://safa-company-api.onrender.com/api/admin/categories/update/${params.id}`, event.target,{
                headers:{
                    Authorization:`Bearer ${token}` 
                },
                
            } )
            .then((response)=>{
                if(response.data.tokenstatus!=false){
                    toast.success('Category updated successfully')
            }else{
                navigation('/')
            }
            })
            .catch((error)=>{
                    alert('something went wrong')
            })
        }else{
            axios.post('https://safa-company-api.onrender.com/api/admin/categories/add',  event.target ,{
                headers:{
                    Authorization:`Bearer ${token}` 
                },
                
            })
            .then((response)=>{
                        if(response.data.tokenstatus!=false){
                            toast.success('Category added Successfully')
                            event.target.reset();
                        }else{
                            navigation('/')
                        }
            })
            .catch((error)=>{
                    toast.error('something went wrong')
            })
        }
       
        

    }
    return (
        <>
            <section class="w-full">
                <nav class="flex border-b-2" aria-label="Breadcrumb">
                    <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                        <li>
                            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Parent Category</a></div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">
                            {
                                    (params.id != null)
                                    ?
                                    'Update Category'
                                    :
                                    'Add Category'
                                }
                                </span></div>
                        </li>
                    </ol>
                </nav>
                <div class="w-full min-h-[610px]">
                    <div class="max-w-[1220px] mx-auto py-5">
                        <h3 class="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                        {
                                    (params.id != null)
                                    ?
                                    'Update Category'
                                    :
                                    'Add Category'
                                } </h3>
                        <form onSubmit={formhandler} class="border border-t-0 p-3 rounded-b-md border-slate-400">
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900"> Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={CatDetails.name}
                                    id="base-input"
                                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Category Name"
                                />
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900"> order</label>
                                <input
                                    type="text"
                                    name="order"
                                    defaultValue={CatDetails.order}
                                    id="base-input"
                                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Category Order"
                                />
                            </div>
                            
                            
                            
                            
                            <button
                                type="submit"
                                class="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}
