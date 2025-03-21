import axios, { all, toFormData } from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Select from 'react-select'
import { MdDelete } from "react-icons/md";
export default function AddProduct() {

    let params = useParams();
    let [render, setrender] = useState(true)
    let [categories, SetCategories] = useState([])
    let [subcategory, setsubcategory] = useState([])
    let [subsubcategory, setsubsubcategory] = useState([])
    let [size, setsize] = useState([])
    let [color, setcolor] = useState([])
    let [token, settoken] = useState(localStorage.getItem('token'))
    let [selectedsizes, setselectedsizes] = useState([])
    let [selectedcolors, setselectedcolors] = useState([])
    let [SelectedAnimationImage, setSelectedAnimationImage] = useState('')
    let [SelectedProductImage, setSelectedProductImage] = useState('')
    let [productdetails, setproductdetails] = useState({})
    let [productBaseUrl, setproductBaseUrl] = useState('')
    let [SelectedMultipleImages, setSelectedMultipleImages] = useState([])
    let [ProductImages, setProductImages] = useState([])
    let [material, setMaterial] = useState([])
    let navigation = useNavigate();

    let DeleteImage = (id) => {
        axios.post('https://safa-company-api.onrender.com/api/admin/products/delete-images', {
            id: id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if (response.data.tokenstatus != false) {
                    toast.success('image deleted successfully')
                    setrender(!render)

                } else {
                    navigation('/')
                }

            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
    }


    let GetSubCategory = (event) => {
        axios.post('https://safa-company-api.onrender.com/api/admin/sub-categories', {
            //   page:currentPage,
            limit: 200,
            root_id: (event != '') ? event.target.value : productdetails.category_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
            .then((response) => {
                if(response.data.tokenstatus!=false){
                    setsubcategory(response.data.data)
                }
                else{
                    navigation('/')
                }
                
            })
            .catch((error) => {
                toast.error('something went wrong')
            })
    }

    let GetSubSubCategory = (event) => {


        axios.post('https://safa-company-api.onrender.com/api/admin/sub-sub-categories', {
            //   page:currentPage,
            limit: 200,
            sub_category: (event != '') ? event.target.value : productdetails.sub_category_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        }).then((response) => {
                if(response.data.tokenstatus!=false){
                    setsubsubcategory(response.data.data)
                }else{
                    navigation('/')
                }
                
            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
    }


   
    useEffect(() => {
        if (params.id != undefined) {

            axios.post(`https://safa-company-api.onrender.com/api/admin/products/detail/${params.id}`, '',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }).then((response) => {
                    if(response.data.tokenstatus!=false){
                    setproductdetails(response.data.data)
                    setproductBaseUrl(response.data.base_url)
                  
                    setselectedsizes(
                        (response.data.data.size_ids.length > 0)
                            ?
                            response.data.data.size_ids.map((v, i) => {
                                return ({
                                    value: v._id,
                                    label: v.name
                                })
                            }

                            ) : [])
                    setselectedcolors(
                        (response.data.data.color_ids.length > 0)
                            ?
                            response.data.data.color_ids.map((v, i) => {
                                return ({
                                    value: v._id,
                                    label: v.name
                                }
                                )
                            }

                            ) : [])
                        }else{
                            navigation('/')
                        }

                })
                .catch((error) => {
                    toast.error('Something went wrong')
                })

            axios.post(`https://safa-company-api.onrender.com/api/admin/products/product-images`, {
                product_id: params.id
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }).then((response) => {
                    if(response.data.tokenstatus!=false){
                    setProductImages(response.data.data)
                    }else{
                        navigation('/')
                    }
                })
                .catch((error) => {
                    toast.error('Something went wrong')
                })

            GetSubCategory('');
            GetSubSubCategory('');
        } else {
            setproductdetails({})
            setselectedcolors([])
            setselectedsizes([])
            setProductImages([])

        }

    }, [params, render])






    const handleImageChange = (event) => {


        if (event.target.id == 'animation_image') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedAnimationImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }

        if (event.target.id == 'image') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedProductImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }

        if (event.target.id == 'images') {
            const files = Array.from(event.target.files); 
            const imagesArray = [];

            files.map((file, index) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    imagesArray.push(reader.result);

                 
                    if (imagesArray.length === files.length) {
                        setSelectedMultipleImages(imagesArray);
                       
                    }
                };
                reader.readAsDataURL(file);
            });
        }

    };


   
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
                toast.error('Something went wrong')
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
                toast.error('Something went wrong ')
            })
    }, [])

   
    let Colors = [];
    color.map((v, i) => {
        let obj = {
            value: v._id,
            label: v.name
        }
        Colors.push(obj)
    })
    let colorhandle = (event) => {
        setselectedcolors(event)
    }
  
    let Sizes = []
    size.map((v, i) => {
        let obj = {
            value: v._id,
            label: v.name
        }
        Sizes.push(obj)
    })

    let sizehandle = (event) => {
        setselectedsizes(event)
        
    }

   
    let formHandle = (event) => {
        event.preventDefault();



        if (params.id != null) {
            axios.put(`https://safa-company-api.onrender.com/api/admin/products/update/${params.id}`, event.target, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
                .then((response) => {
                    if(response.data.tokenstatus!=false){
                        setrender(!render)
                    }
                    else{
                        navigation('/')
                    }

                }).catch((error) => {
                    toast.error('something went wrong')
                })
        } else {

            axios.post(`https://safa-company-api.onrender.com/api/admin/products/add`,event.target,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                })
                .then((response) => {
                    if(response.data.tokenstatus!=false){
                    toast.success('Product Submitted !!')
                    event.target.reset();
                    setSelectedAnimationImage('')
                    setSelectedProductImage('')
                    setSelectedMultipleImages([])
                    setselectedsizes([])
                    }else{

                        navigation('/')
                    }
                })
                .catch((error) => {
                    toast.error('Something went wrong')

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
            }

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



    return (
        <>
            <section class="w-full">
                <nav class="flex border-b-2" aria-label="Breadcrumb">
                    <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                        <li>
                            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</a></div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">
                                {
                                    (params.id != null) ? 'Update Product' : ' Add Product'
                                }
                            </span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div class="w-full min-h-[610px]">
                    <div class="max-w-[1220px] mx-auto py-5">
                        <h3 class="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400"> {
                            (params.id != null) ? 'Update Product' : ' Add Product'
                        }</h3>
                        <form onSubmit={formHandle} class="border border-t-0 p-3 rounded-b-md border-slate-400">
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Select Parent Category</label>
                                <select id="default" name="category_id" onChange={GetSubCategory} class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option value={''}>--Select Parent Category--</option>
                                    {
                                        categories.map((v, i) => {
                                            return (
                                                <option selected={
                                                    (v._id == productdetails.category_id)
                                                        ?
                                                        'selected'
                                                        :
                                                        ''
                                                } value={v._id}>{v.name}</option>
                                            )
                                        })
                                    }


                                </select>
                            </div>

                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Select Sub Category</label>
                                <select id="default" onChange={GetSubSubCategory} name="sub_category_id" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option value={''}>--Select Sub Category--</option>
                                    {
                                        subcategory.map((v, i) => {
                                            return (
                                                <option selected={
                                                    (v._id == productdetails.sub_category_id)
                                                        ?
                                                        'selected'
                                                        :
                                                        ''
                                                } value={v._id}>{v.name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Select Sub Sub Category</label>
                                <select id="default" name="sub_sub_category_id" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option value={''}>--Select Sub Sub Category--</option>
                                    {
                                        subsubcategory.map((v, i) => {
                                            return (
                                                <option selected={
                                                    (v._id == productdetails.sub_sub_category_id)
                                                        ?
                                                        'selected'
                                                        :
                                                        ''
                                                } value={v._id}>{v.name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Select Material</label>
                                <select id="default" name="material_id" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option value={''}>--Select Material--</option>
                                    {
                                        material.map((v, i) => {
                                            return (
                                                <option selected={
                                                    (v._id == (productdetails.material_id?productdetails.material_id._id:productdetails.material_id))
                                                        ?
                                                        'selected'
                                                        :
                                                        ''
                                                } value={v._id}>{v.name}</option>
                                            )
                                        })
                                    }


                                </select>
                            </div>
                            <div class="mb-5">
                                <div class="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label class="block mb-5 text-md font-medium text-gray-900">Size</label>

                                        <Select options={Sizes}
                                            onChange={sizehandle}
                                            value={selectedsizes}
                                            name="size_ids" isMulti />
                                    </div>
                                    <div>
                                        <label class="block mb-5 text-md font-medium text-gray-900">Color</label>

                                        <Select options={Colors}
                                            onChange={colorhandle}
                                            value={selectedcolors}
                                            name="color_ids" isMulti />



                                    </div>
                                </div>
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="base-input"
                                    defaultValue={productdetails.name}
                                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Product Name"
                                />
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Product Description</label>
                                <textarea
                                    name="description"
                                    id="message"
                                    defaultValue={(productdetails != null) ? productdetails.description : ''}
                                    rows="3"
                                    class="resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Add Product Description....."
                                ></textarea>
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Short Description</label>
                                <textarea
                                    name="short_description"
                                    defaultValue={(productdetails != null) ? productdetails.short_description : ''}
                                    id="message"

                                    rows="3"
                                    class="resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Add Product Short Description.....">

                                </textarea>
                            </div>
                            <div class="mb-5 grid sm:grid-cols-2 gap-8 ">
                                <div>

                                    <div class="max-w-full">
                                        <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Product Image</label>
                                        <label for="file-input" class="sr-only">Choose file</label>
                                        <input
                                            onChange={handleImageChange}
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept='image/*'
                                            class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                        />
                                    </div>

                                </div>
                                <div className='p-4 border'>
                                    <div className=' w-[50%] mx-auto'>
                                        <img src={SelectedProductImage} className='w-[100%]' alt="" />
                                    </div>
                                </div>

                            </div>
                            <div class="mb-5 grid sm:grid-cols-2 gap-8">
                                <div>
                                    <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Image Animation</label>
                                    <div class="max-w-full">
                                        <label for="file-input" class="sr-only">Choose file</label>
                                        <input
                                            onChange={handleImageChange}
                                            type="file"
                                            name="animation_image"
                                            id="animation_image"
                                            class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                        />
                                    </div>
                                </div>
                                <div className='p-4 border'>
                                    <div className=' w-[50%] mx-auto'>
                                        <img src={SelectedAnimationImage} className='w-[100%]' alt="" />
                                    </div>
                                </div>

                            </div>
                           
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Product Gallery</label>
                                <div class="max-w-full">
                                    <label for="file-input" class="sr-only">Choose files</label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        name="images"
                                        id="images"
                                        class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                        multiple

                                    />
                                </div>
                            </div>
                            <div class="mb-5 p-5 border rounded-lg grid gap-3 grid-cols-4">
                                {
                                    (ProductImages.length > 0)
                                        ?

                                        ProductImages.map((v, i) => {
                                            return (
                                                <div className='border p-3 relative'>
                                                    <div onClick={() => DeleteImage(v._id)} className=' absolute top-4 text-[25px] bg-white text-[red] right-4 p-1 cursor-pointer rounded-full'>
                                                        <MdDelete />
                                                    </div>
                                                    <img src={productBaseUrl + '/' + v.image} className='w-[100%]' alt="" />
                                                </div>
                                            )
                                        })
                                        :
                                        ''
                                }
                                {

                                    (SelectedMultipleImages.length > 0)
                                        ?
                                        SelectedMultipleImages.map((v, i) => {
                                            return (
                                                <div className='border p-3 relative'>

                                                    <img src={v} className='w-[100%]' alt="" />
                                                </div>
                                            )
                                        })
                                        :
                                        ''
                                }

                            </div>
                            <div class="mb-5">
                                <div class="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label class="block mb-5 text-md font-medium text-gray-900">Price</label>
                                        <input
                                            type="text"
                                            name="sale_price"
                                            defaultValue={productdetails.sale_price}
                                            id="base-input"
                                            class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                            placeholder="Product Price"
                                        />
                                    </div>
                                    <div>
                                        <label class="block mb-5 text-md font-medium text-gray-900">MRP</label>
                                        <input
                                            type="text"
                                            name="actual_price"
                                            defaultValue={productdetails.actual_price}
                                            id="base-input"
                                            class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                            placeholder="Product MRP"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-5">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Order</label>
                                <input
                                    type="text"
                                    name="order"
                                    defaultValue={productdetails.order}
                                    id="base-input"
                                    class="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Order"
                                />
                            </div>


                            <button
                                type="submit"
                                class="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}
