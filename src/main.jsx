import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'

import Dashboard from './Dashboard.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Router,
} from "react-router-dom";
import CommonRoute from './components/commonRoute/CommonRoute.jsx'
import ProfileUser from './components/ProfileUser.jsx'
import AddCategory from './components/category/AddCategory.jsx'
import ViewCategory from './components/category/ViewCategory.jsx'
import AddSize from './components/Size/AddSize.jsx'
import ViewSize from './components/Size/ViewSize.jsx'
import AddColor from './components/Color/AddColor.jsx'
import ViewColor from './components/Color/ViewColor.jsx'
import AddSubCategory from './components/SubCategory/AddSubCategory.jsx'
import ViewSubCategory from './components/SubCategory/ViewSubCategory.jsx'
import AddProduct from './components/products/AddProduct.jsx'
import ViewProduct from './components/products/ViewProduct.jsx'
import { ToastContainer } from 'react-toastify'
import AddSocialLinks from './components/SocialLinks/AddSocialLinks.jsx'
import ViewSocialLinks from './components/SocialLinks/ViewSocialLinks.jsx'
import AddSubSubCategory from './components/SubSubCategory/AddSubSubCategory.jsx'
import ViewSubSubCategory from './components/SubSubCategory/ViewSubSubCategory.jsx'
import Context from './components/context/Context.jsx'
import CompanyProfile from './components/CompanyProfile.jsx'
import AddMaterial from './components/Material/AddMaterial.jsx'
import ViewMaterial from './components/Material/ViewMaterial.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />}></Route>
        <Route path='/' element={<CommonRoute />} >
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='profile' element={<ProfileUser />}></Route>
          <Route path='company-profile' element={<CompanyProfile/>}></Route>


        <Route path='parent-category'>
          <Route path='add' element={<AddCategory/>} />
          <Route path='view' element={<ViewCategory/>} />
          <Route path='update/:id' element={<AddCategory/>} />
        </Route>
        <Route path='size'>
          <Route path='add' element={<AddSize/>} />
          <Route path='view' element={<ViewSize/>} />
          <Route path='update/:id' element={<AddSize />} />
        </Route>
        <Route path='material'>
          <Route path='add' element={<AddMaterial/>} />
          <Route path='view' element={<ViewMaterial/>} />
          <Route path='update/:id' element={<AddMaterial />} />
        </Route>
        <Route path='color'>
          <Route path='add' element={<AddColor />} />
          <Route path='view' element={<ViewColor/>} />
          <Route path='update/:id' element={<AddColor />} />
        </Route>
        <Route path='sub-category'>
          <Route path='add' element={<AddSubCategory/>} />
          <Route path='view' element={<ViewSubCategory/>} />
          <Route path='update/:id' element={<AddSubCategory />} />
        </Route>
        <Route path='product'>
          <Route path='add' element={<AddProduct/>} />
          <Route path='view' element={<ViewProduct/>} />
          <Route path='update/:id' element={<AddProduct />} />
        </Route>
        <Route path='social-links'>
          <Route path='add' element={<AddSocialLinks/>} />
          <Route path='view' element={<ViewSocialLinks/>} />
          <Route path='update/:id' element={<AddSocialLinks />} />
        </Route>
        <Route path='sub-sub-category'>
          <Route path='add' element={<AddSubSubCategory/>} />
          <Route path='view' element={<ViewSubSubCategory/>} />
          <Route path='update/:id' element={<AddSubSubCategory />} />
        </Route>
     

      </Route>
    </>

  ))

createRoot(document.getElementById('root')).render(
  <>
  <Context>
  <ToastContainer/>
    <RouterProvider router={router} />
  </Context>
    </>
  
)
