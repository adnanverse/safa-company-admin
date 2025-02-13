import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
const CommonContext = createContext();
export default function Context({ children }) {
    let [baseurl, setbaseurl] = useState('')
    let [companyProfilebaseurl, setcompanyProfilebaseurl] = useState('')
    let [render, setrender] = useState(true)
    let [userdetails, setuserdetails] = useState('')
    let [token, settoken] = useState(localStorage.getItem('token'))
    let [companyProfileDetails, setcompanyProfileDetails] = useState('')
    let[companyProfilerender,setcompanyProfilerender]=useState(true)
    
    useEffect(()=>{
		axios.post('http://localhost:5556/api/admin/profile/detail','',{
			headers: {
				 Authorization: `Bearer ${token}`
			},

	  })
			.then((response) => {
				 setuserdetails(response.data.data)
				 setbaseurl(response.data.base_url)
				//  console.log(response.data)
			})
			.catch((error) => {
				 toast.error('something went wrong')
			})
	},[render])

    useEffect(()=>{
		axios.post('http://localhost:5556/api/admin/company-profile/details','',{
			headers: {
				 Authorization: `Bearer ${token}`
			},

	  })
			.then((response) => {
				 setcompanyProfileDetails(response.data.data[0])
				 setcompanyProfilebaseurl(response.data.base_url)
				//  console.log(response.data)
			})
			.catch((error) => {
				 toast.error('something went wrong')
			})
	},[companyProfilerender])


    let AllItems = {userdetails,baseurl,render,setrender,companyProfilerender,setcompanyProfilerender,companyProfileDetails,companyProfilebaseurl}
    return (
        <div>
            <CommonContext.Provider value={AllItems}>

                {children}
            </CommonContext.Provider>
        </div>
    )
}
export { CommonContext }