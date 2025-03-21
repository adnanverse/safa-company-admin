import React, { useContext } from 'react'
import { CommonContext } from './context/Context'

export default function Header() {
    let {userdetails,baseurl}=useContext(CommonContext)
    return (
        <>
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div class="flex items-center"><svg fill="currentColor" class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"></path></svg>
                        <span
                            class="self-center text-xl ms-5 text-slate-500 font-semibold whitespace-nowrap">Dashboard</span>
                    </div>
                    <div class="flex items-center lg:order-2">
                        <figure class="relative group w-12 h-12 cursor-pointer rounded-full">
                            <img class="w-12 h-12 rounded-full object-cover" src={`${(userdetails.image==null) ?'/images/user.jpg':baseurl+'/'+userdetails.image}`} alt="Jese image" />
                            
                        </figure><button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2"
                            aria-expanded="false"><span class="sr-only">Open main menu</span><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg><svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div>
                    <div
                        class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2"></div>
                </div>
            </nav>
        </>
    )
}
