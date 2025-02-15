import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebars from '../Sidebars'
import Header from '../Header'
import axios from 'axios'

export default function CommonRoute() {
  return (
    <>
    <div className='flex'>
                <Sidebars/>
                <div class="w-[100%] ">
                    <Header />
                  <Outlet />
                </div>
            </div>
    </>
  )
}
