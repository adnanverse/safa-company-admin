import React, { useContext } from 'react'
import { FaDroplet } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";
import { HiArrowsExpand } from "react-icons/hi";
import { FaCartPlus } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { GiRolledCloth } from "react-icons/gi";
import { Sidebar } from "flowbite-react";
import { FaBagShopping } from "react-icons/fa6";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { CommonContext } from './context/Context';
export default function Sidebars() {
    let { companyProfileDetails, companyProfilebaseurl } = useContext(CommonContext)
    return (
        <>
            {/* <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button> */}

            <aside id="separator-sidebar" class="  overflow-hidden w-64 h-screen basis-[23%] transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <Sidebar class="h-full px-3  overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div class="flex pb-2 items-center  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <img src={
                            (companyProfileDetails != '') ?
                                ((companyProfileDetails.sub_logo != null) ? companyProfilebaseurl + '/' + companyProfileDetails.sub_logo : '/images/nullimage.jpg')
                                :
                                '/images/nullimage.jpg'
                        } class="w-6 me-3 " alt="Flowbite Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Safa Company</span>
                    </div>
                    <ul class="space-y-2 font-medium">
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <Link to={'/dashboard'} >
                                    <span class="ms-3">Dashboard</span></Link>

                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <Link to={'/profile'}><span class="flex-1 ms-3 whitespace-nowrap">Profile</span></Link>

                                <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <Link to={'/company-profile'}><span class="flex-1 ms-3 whitespace-nowrap">Company Profile </span></Link>

                                <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"></span>
                            </a>
                        </li>
                        <li>

                            <Sidebar.Collapse className='Social' icon={IoShareSocial} label="Social Links">

                                <Link to={'/social-links/add'} class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add social Links
                                    </div>
                                </Link>

                                <Link to={'/social-links/view'} class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        View social Links
                                    </div>
                                </Link>
                            </Sidebar.Collapse>
                        </li>

                    </ul>
                    <p>

                    </p>
                    <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            Ecommerce Component
                        </li>
                        <li>

                            <Sidebar.Collapse className='material' icon={GiRolledCloth} label="Material">

                                <Link to={'/material/add'} class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add Material
                                    </div></Link>

                                <Link to={'/material/view'} class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        View Material
                                    </div></Link>
                            </Sidebar.Collapse>
                        </li>
                        <li>

                            <Sidebar.Collapse className='colour' icon={FaDroplet} label="Colors">

                                <Link to={'/color/add'} class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add Color
                                    </div></Link>

                                <Link to={'/color/view'} class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        View Color
                                    </div></Link>
                            </Sidebar.Collapse>
                        </li>
                        <li>

                            <Sidebar.Collapse icon={HiArrowsExpand} label="Size">

                                <Link to="/size/add" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add Size
                                    </div></Link>

                                <Link to="/size/view" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>
                                        View Size
                                    </div></Link>
                            </Sidebar.Collapse>
                        </li>
                        <li>
                            <Sidebar.Collapse icon={RiMenu3Fill} label="Parent Category">

                                <Link to="/parent-category/add" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add Category
                                    </div></Link>

                                <Link to="/parent-category/view" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        View Category
                                    </div></Link>
                            </Sidebar.Collapse>
                        </li>

                        <li>
                            <Sidebar.Collapse icon={FaCartPlus} label="Sub Category">

                                <Link to="/sub-category/add" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add Sub Category
                                    </div></Link>

                                <Link to="/sub-category/view" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        View sub Category
                                    </div></Link>
                            </Sidebar.Collapse>
                        </li>
                        <li>
                            <Sidebar.Collapse icon={FaCartPlus} label="Sub Sub Category">

                                <Link to="/sub-sub-category/add" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add Sub Sub Category
                                    </div></Link>

                                <Link to="/sub-sub-category/view" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        View Sub Sub Category
                                    </div></Link>
                            </Sidebar.Collapse>
                        </li>
                        <li>
                            <Sidebar.Collapse icon={FaBagShopping} label="Product">

                                <Link to="/product/add" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        Add Product
                                    </div></Link>

                                <Link to="/product/view" class="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                                    <FaRegCircleDot class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    <div>

                                        View Product
                                    </div></Link>
                            </Sidebar.Collapse>
                        </li>

                    </ul>
                </Sidebar>
            </aside >
        </>
    )
}
