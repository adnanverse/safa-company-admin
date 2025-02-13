import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function DetailProductPopUp({ deatailpopup, setdeatailpopup,productdetails ,productImages,baseUrl}) {

    

    return (
        <>
            <div id="order-modal" class={` ${(deatailpopup == true) ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div class="fixed w-full h-screen" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <div class="relative p-4 px-20 w-full max-w-full max-h-full">
                        <div class="relative bg-white rounded-lg shadow">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 class="text-xl font-semibold text-gray-900">Product Image's &amp; Price</h3>
                                <button type="button" onClick={() => { setdeatailpopup(false) }} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="order-modal">
                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5 space-y-4">
                                <div class="grid grid-cols-[22%_45%_27%] gap-10">
                                    <div class="border-2 rounded-md shadow-md p-4">
                                        <img src={`${baseUrl+'/'+productdetails.animation_image}`} alt="" />
                                    </div>
                                    <div class="flex items-start flex-wrap gap-5 border-2 rounded-md shadow-md p-3">
                                        {
                                        productImages.map((v,i)=>{
                                            return(
                                                <img class="w-36" src={`${baseUrl+'/'+v.image}`} alt="" />
                                            )
                                        })
                                        }
                                        
                                        
                                    </div>
                                    <div class="border-2 rounded-md shadow-md p-3">
                                        <h3 class="text-center font-semibold text-[20px]">Product Details</h3>
                                        <ul class="space-y-4 mt-8">
                                            <li class="font-semibold text-[17px]">Price : <span class="font-normal text-[16px]">&nbsp; ₹ {productdetails.sale_price}</span></li>
                                            <li class="font-semibold text-[17px]">MRP : <span class="font-normal text-[16px]">&nbsp; ₹ {productdetails.actual_price}</span></li>
                                            <li class="font-semibold text-[17px]">Manage Stock : <span class="font-normal text-[16px]">&nbsp; In Stock</span></li>
                                            <li class="font-semibold text-[17px]">Brand Name: <span class="font-normal text-[16px]">&nbsp; Lev's</span></li>
                                            <li class="font-semibold text-[17px]">Size :
                                                {
                                                    (productdetails!='')
                                                    ?
                                                    productdetails.size_ids.map((v,i)=>{
                                                        return(
                                                            <span class="font-normal text-[16px]">&nbsp; {v.name} </span>
                                                        )
                                                    })
                                                    :
                                                    ''
                                                }
                                                 </li>
                                            <li class="font-semibold text-[17px]">Color : 
                                                
                                                {   (productdetails!='')
                                                         ?
                                                    productdetails.color_ids.map((v,i)=>{
                                                        return(
                                                            <span style={{color:`${v.code} `,textShadow:'1px 3px 2px rgba(0,0,0,0.1)'}} class="font-bold  text-[16px]">&nbsp; {
                                                                v.name
                                                            } </span>
                                                        )
                                                    })
                                                    :
                                                    ''
                                                }
                                                </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
