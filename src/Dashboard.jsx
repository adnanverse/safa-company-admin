import React from 'react'
export default function Dashboard() {
    return (
        <>
            <section class="w-full">
                <nav class="flex border-b-2" aria-label="Breadcrumb">
                    <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                        <li>
                            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Dashboard</a></div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center"><span class="ms-1 text-md font-medium text-gray-500 md:ms-2"></span></div>
                        </li>
                    </ol>
                </nav>
                <div class="w-full min-h-[610px]">
                    <div class="max-w-[1220px] mx-auto py-5">
                        <div class="grid grid-cols-3 gap-5">
                            <div class="h-48 p-5 rounded-md shadow-lg bg-[rgb(89,86,211)]" >
                                <div class="flex justify-between items-center">
                                    <h3 class="text-[25px] text-white font-bold">26K <span class="text-[18px]">(-12.4% ↓)</span></h3>
                                    <span>
                                        <svg
                                            fill="white"
                                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 128 512"
                                        >
                                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <h3 class="text-[22px] font-semibold text-white">Users</h3>
                            </div>
                            <div class="h-48 p-5 rounded-md shadow-lg bg-[rgb(41,152,254)]">
                                <div class="flex justify-between items-center">
                                    <h3 class="text-[25px] text-white font-bold">$6,200 <span class="text-[18px]">(40.9% ↑)</span></h3>
                                    <span>
                                        <svg
                                            fill="white"
                                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 128 512"
                                        >
                                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <h3 class="text-[22px] font-semibold text-white">Product</h3>
                            </div>
                            <div class="h-48 p-5 rounded-md shadow-lg bg-[rgb(252,176,30)]" >
                                <div class="flex justify-between items-center">
                                    <h3 class="text-[25px] text-white font-bold">2.49% <span class="text-[18px]">(84.7% ↑)</span></h3>
                                    <span>
                                        <svg
                                            fill="white"
                                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 128 512"
                                        >
                                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <h3 class="text-[22px] font-semibold text-white">Category</h3>
                            </div>
                            <div class="h-48 p-5 rounded-md shadow-lg bg-[ rgb(233,83,83)]" >
                                <div class="flex justify-between items-center">
                                    <h3 class="text-[25px] text-white font-bold">44K <span class="text-[18px]">(-23.6% ↓</span></h3>
                                    <span>
                                        <svg
                                            fill="white"
                                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 128 512"
                                        >
                                            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <h3 class="text-[22px] font-semibold text-white">Orders</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
