import axios, { toFormData } from 'axios';
import React, { useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { Pagination, Toast } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DetailProductPopUp from './DetailProductPopUp';
import { TbListDetails } from "react-icons/tb";
export default function ViewProduct() {
  let [products, setproducts] = useState([])
  let [checkedvalue, setcheckedvalue] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  let [categories, SetCategories] = useState([])
  let [subcategory, setsubcategory] = useState([])
  let [subsubcategory, setsubsubcategory] = useState([])
  let [size, setsize] = useState([])
  let [color, setcolor] = useState([])
  let [render, setrender] = useState(false)
  let [filter, setfilter] = useState(false)
  let [deatailpopup, setdeatailpopup] = useState(false)
  let [token, settoken] = useState(localStorage.getItem('token'))
  let [productdetails, setproductdetails] = useState('')
  let [productImages, setproductImages] = useState([])
  let [baseUrl, setbaseUrl] = useState('')
  let [material, setMaterial] = useState([])
  let navigation = useNavigate()


  let GetProductId = (id) => {
    axios.post(`https://safa-company-api.onrender.com/api/admin/products/detail/${id}`, '',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },

      }).then((response) => {
        if(response.data.tokenstatus!=false){
        setproductdetails(response.data.data)
        }else{
          navigation('/')
        }
      })
      .catch((error) => {
        toast.error('something went wrong')
      })

    
    axios.post(`https://safa-company-api.onrender.com/api/admin/products/product-images`, {
      product_id: id
    },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },

      }).then((response) => {
        setproductImages(response.data.data)
      })
      .catch((error) => {
        toast.error('something went wrong')
      })

    setdeatailpopup(true)
  }

  let GetCategoryid = (event) => {
    axios.post('https://safa-company-api.onrender.com/api/admin/sub-categories', {
      
      limit: 200,
      root_id: event.target.value
    },{

      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then((response) => {
        if(response.data.tokenstatus!=false){
        setsubcategory(response.data.data)
        }else{
          navigation('/')
        }
      })
      .catch((error) => {
        toast.error('something went wrong')
      })
  }
let GetSubCategoryid=(event)=>{
  axios.post('https://safa-company-api.onrender.com/api/admin/sub-sub-categories', {
    
    limit: 200,
    sub_category: event.target.value
}, {
    headers: {
        Authorization: `Bearer ${token}`
    },

})
    .then((response) => {
      if(response.data.tokenstatus!=false){
        setsubsubcategory(response.data.data)
      }else{
        navigation('/')
      }
    })
    .catch((error) => {
        toast.error('something went wrong')
    })
}

   useEffect(() => {
    axios.post('https://safa-company-api.onrender.com/api/admin/products',
      {
        page: currentPage,
        limit: 5
      }, {
      headers: {
        Authorization: `Bearer ${token}`
      },

    }
    )
      .then((response) => {
        if(response.data.tokenstatus!=false){
        setbaseUrl(response.data.base_url)
        setproducts(response.data.data)
        }else{
          navigation('/')
        }

      })
      .catch((error) => {
        toast.error('something went wrong')
      })
  }, [currentPage,render])

 let FilterApply = (event) => {
    event.preventDefault();
    axios.post('https://safa-company-api.onrender.com/api/admin/products', event.target, {
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then((response) => {
        if(response.data.tokenstatus!=false){
        setproducts(response.data.data)
      }else{
        navigation('/')
      }

      })
      .catch((error) => {
        toast.error('something went wrong')
      })
  }

  
  let SingleCheck = (event) => {
    if (event.target.checked == true) {
      checkedvalue.push(event.target.id)
      setcheckedvalue(checkedvalue)
      setrender(!render)
    } else {
      if (checkedvalue.includes(event.target.id)) {
        let data = checkedvalue.filter((v, i) => {
          if (v != event.target.id) {
            return v;
          }
        })
        setcheckedvalue(data)
      }
    }
  }

  let SelectAll = (event) => {
    if (event.target.checked == true) {
      let data = [];
      products.forEach((v) => {
        data.push(v._id)
      })
      setcheckedvalue(data)
    } else {
      setcheckedvalue([])
    }
  }

   let DeleteAll = () => {
    if (checkedvalue.length > 0) {
      if (confirm('are u sure to delete items')) {
        axios.post('https://safa-company-api.onrender.com/api/admin/products/delete', toFormData({
          id: checkedvalue,
        }), {
          headers: {
            Authorization: `Bearer ${token}`
          },

        })
          .then((response) => {
            if(response.data.tokenstatus!=false){
              setcheckedvalue([])
              setrender(!render)
              toast.success('Product deleted Successfully !!')
            } else {
              navigation('/')
            }
          }).catch((error) => {

            toast.error('Something went wrong !!')
          })
      }
    }
  }

  useEffect(() => {
    axios.post('https://safa-company-api.onrender.com/api/admin/material', {
        status: true,
        limit: 200
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        },

    }).then((response) => {
      if(response.data.tokenstatus!=false){
        setMaterial(response.data.data)
      }else{
        navigation('/')
      }

    }).catch((error) => {
        toast.error('Something went wrong !!')
    })
}, [])

 let ChangeStatus = () => {
    axios.post('https://safa-company-api.onrender.com/api/admin/products/change-status', toFormData({
      id: checkedvalue,
    }), {
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then((response) => {
        if(response.data.tokenstatus!=false){
          toast.success('Status Changed Successsfully !!')
          setcheckedvalue([])
          setrender(!render)
        } else {
          navigation('/')
        }
      }).catch((error) => {
        toast.error('Something went wrong !!')
      })
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

    }).then((response) => {
      if(response.data.tokenstatus!=false){
      SetCategories(response.data.data)

      }else{
        navigation('/')
      }
    }).catch((error) => {
      toast.error('something went wrong')
    })
  }, [])



  useEffect(() => {
    axios.post('https://safa-company-api.onrender.com/api/admin/size', {
      status: true
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then((response) => {
        if(response.data.tokenstatus!=false){
        setsize(response.data.data)
        }else{
          navigation('/')
        }

      })
      .catch((error) => {
        toast.error('something went wrong')
      })
  }, [])

  useEffect(() => {
    axios.post(`https://safa-company-api.onrender.com/api/admin/color`, {
      status: true,
      limit:200
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },

    })
      .then((response) => {
        if(response.data.tokenstatus!=false){
        setcolor(response.data.data)
        }else{
          navigation('/')
        }
      }).catch((error) => {
        toast.error('something went wrong ')
      })
  }, [])



  return (
    <>
      <DetailProductPopUp baseUrl={baseUrl} deatailpopup={deatailpopup} productdetails={productdetails} productImages={productImages} setdeatailpopup={setdeatailpopup} />
      <section class="w-full">
        <div className='flex items-center pr-7 border-b-2 justify-between'>
          <nav class="flex " aria-label="Breadcrumb">
            <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a>
              </li>
              <li>
                <div class="flex items-center">/
                  <a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Products </a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">/
                  <span class="ms-1 text-md font-medium text-gray-500 md:ms-2">View Products</span>
                </div>
              </li>
            </ol>
          </nav>
          <div onClick={() => setfilter(true)} className=''>
            <FaFilter className='text-[22px]' />
          </div>
        </div>



        <div className={`py-3 ${(filter == true) ? '' : 'hidden'} relative px-4 my-2 rounded-lg border w-full `}>

          <form onSubmit={FilterApply} action="">
            <p className=' font-bold py-2 text-[20px]'>
              FILTER
            </p>
            <div class="mb-4">
              <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Product Name</label>
              <input
                type="text"
                name="name"
                id="base-input"
                class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                placeholder="Product Name"
              />
            </div>
            <div class="mb-4">
            <label class="block mb-5 text-md font-medium text-gray-900">Material</label>
                  <select id="default" name="material_id"  class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                    <option value={''}>--Select Material--</option>
                    {
                      material.map((v, i) => {
                        return (
                          <option value={v._id}>{v.name}</option>
                        )
                      })
                    }
                  </select>
            </div>
            <div class="">
              <div class="grid sm:grid-cols-3 gap-8">
                <div>
                  <label class="block mb-5 text-md font-medium text-gray-900">Category</label>
                  <select id="default" name="category_id" onChange={GetCategoryid} class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                    <option value={''}>--Select Category--</option>
                    {
                      categories.map((v, i) => {
                        return (
                          <option value={v._id}>{v.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div>
                  <label class="block mb-5 text-md font-medium text-gray-900">Sub Category</label>
                  <select id="default" name="sub_category_id" onChange={GetSubCategoryid} class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                    <option value={''}>--Select Sub Category--</option>
                    {
                      subcategory.map((v, i) => {
                        return (
                          <option value={v._id}>{v.name}</option>
                        )
                      })
                    }

                  </select>
                </div>
                <div>
                  <label class="block mb-5 text-md font-medium text-gray-900"> Sub Sub Category</label>
                  <select id="default" name="sub_sub_category_id" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                    <option value={''}>--Select Sub Sub Category--</option>
                    {
                      subsubcategory.map((v, i) => {
                        return (
                          <option value={v._id}>{v.name}</option>
                        )
                      })
                    }

                  </select>
                </div>
              </div>
            </div>
            <div class="">
              <div class="grid sm:grid-cols-2 gap-8">
                <div>
                  <label class="block mb-5 text-md font-medium text-gray-900">Size</label>
                  <select id="default" name="size_id" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                    <option value={''}>--Select Size--</option>
                    {
                      size.map((v, i) => {
                        return (
                          <option value={v._id}>{v.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div>
                  <label class="block mb-5 text-md font-medium text-gray-900">Color</label>
                  <select id="default" name="color_id" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                    <option value={''}>--Select Color--</option>
                    {
                      color.map((v, i) => {
                        return (
                          <option value={v._id}>{v.name}</option>
                        )
                      })
                    }

                  </select>
                </div>
              </div>
            </div>
            <div class="">
              <div class="grid sm:grid-cols-2 gap-8">
                <div>
                  <label class="block mb-5 text-md font-medium text-gray-900">Price From</label>
                  <input
                    type="text"
                    name="price_from"
                    id="base-input"
                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Price From"
                  />
                </div>
                <div>
                  <label class="block mb-5 text-md font-medium text-gray-900">Price To</label>
                  <input
                    type="text"
                    name="price_to"
                    id="base-input"
                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Price To"
                  />
                </div>
              </div>
              <div onClick={() => setfilter(false)} className={`  right-4 top-5  text-[30px]  absolute`}>
                <MdOutlineClose />
              </div>
              <div className='flex items-center pt-5 gap-3'>

                <button
                  onClick={()=>setrender(!render)}
                  class="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Clear All
                </button>
                <button
                 
                  type='submit'
                  class="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="w-full min-h-[610px]">
          <div class="max-w-[1220px] mx-auto py-5">
            <div className=' bg-slate-100 flex justify-between py-3 px-4  rounded-t-md border border-slate-400'>
              <div class="text-[26px] font-semibold ">View Products</div>
              <div className='flex items-center gap-3'>

                <button

                  onClick={DeleteAll}
                  class="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Delete All
                </button>
                <button
                  onClick={ChangeStatus}
                  class="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
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
                      <th scope="col" class="px-6 w-[150px] py-3">
                        {
                          (products.length > 0)
                            ?
                            <input name="deleteCheck"
                              onClick={SelectAll}
                              id="purple-checkbox"
                              type="checkbox"
                              checked={
                                (products.length == checkedvalue.length) ? true : false}
                              class="mr-2 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" value="" />
                            :
                            <input name="deleteCheck" id="purple-checkbox"
                              type="checkbox"
                              class="mr-2 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" value="" />
                        }

                        Select All</th>
                      <th scope="col" class="px-6 w-[90px] py-3">S. No.</th>
                      <th scope="col" class="px-6 py-3"> Name</th>
                      <th scope="col" class="px-6 py-3"> Parent Category</th>
                      <th scope="col" class="px-6 py-3">Sub Category</th>
                      <th scope="col" class="px-6 py-3">Sub Sub Categor</th>
                      <th scope="col" class="px-6 py-3">Thumbnail</th>
                      <th scope="col" class="px-6 w-[100px] py-3">Price</th>
                      <th scope="col" class="px-6 w-[100px] py-3">Order</th>
                      <th scope="col" class="px-6 w-[100px] py-3">Status</th>
                      <th scope="col" class="px-6 w-[100px] py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>{

                    (products.length != 0)
                      ?
                      products.map((v, i) => {
                        return (
                          <>

                            <tr class="bg-white border-b">
                              <th scope="row" class="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                                <input name="deleteCheck" onClick={() => SingleCheck(event)} id={v._id} type="checkbox" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" value=""
                                  checked={(checkedvalue.includes(v._id)) ? true : ''} />
                              </th>
                              <td class="px-6 py-4">{i + 1}</td>
                              <td class="px-6 py-4">{v.name}</td>
                              <td class="px-6 py-4">
                                {
                                  v.category_id.name
                                }
                              </td>
                              <td class="px-6 py-4">
                                {
                                  v.sub_category_id.name
                                }
                              </td>
                              <td class="px-6 py-4">
                                {
                                  v.sub_sub_category_id.name
                                }
                              </td>
                              <td class="px-6 py-4">
                                <img class="w-16 h-16 rounded-md object-cover" src={baseUrl + '/' + v.image} alt="" />
                              </td>
                              <td class="px-6 py-4">
                                {
                                  v.actual_price | v.sale_price
                                }
                              </td>
                              <td class="px-6 py-4">{v.order}</td>
                              <td class="px-6 py-4">{(v.status == true) ? 'Active' : 'Inactive'}</td>
                              <td class="px-6 py-4 flex gap-3 mt-6">
                             
                                <TbListDetails onClick={() => GetProductId(v._id)} />
                                <Link to={`/product/update/${v._id}`}>
                                  <svg fill="gold" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"></path>
                                  </svg>
                                </Link>
                              </td>

                            </tr>
                          </>

                        )
                      })
                      :
                      <tr>
                        <td class="px-6 text-center py-4" colSpan={7}>No record found</td>
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
