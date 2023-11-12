import { createBrowserRouter } from "react-router-dom";
import ClientContainer from "../client/layouts/ClientContainer";
import Home from "../client/pages/home/Home";
import Products from "../client/pages/products/Products";
import Login from "../client/pages/login/Login";
import AboutUs from "../client/pages/about-us/AboutUs";
import OrderChecking from "../client/pages/order-checking/OrderChecking";
import Store from "../client/pages/store/Store";
import Register from "../client/pages/register/Register";
import DetailsProduct from "../client/pages/details-product/DetailsProduct";
import Account from "../client/pages/account/Account";
import AdminContainer from "../admin/layouts/AdminContainer";
import CategoriesList from "../admin/pages/categories/CategoriesList";
import ProductsList from "../admin/pages/products/ProductsList";
import Dashboard from "../admin/pages/dashboard/Dashboard";
import SuppliersList from "../admin/pages/suppliers/SuppliersList";
import LoginAdmin from "../admin/pages/login/LoginAdmin";
import AccountsList from "../admin/pages/accounts/AccountsList";
import SlidersList from "../admin/pages/sliders/SlidersList";
import Payment from "../client/pages/payment/Payment";
import Cart from "../client/pages/cart/Cart";
import SalesChart from "../admin/pages/report-charts/sales-chart/SalesChart";
import OrderChart from "../admin/pages/report-charts/order-chart/OrderChart";
import ProductChart from "../admin/pages/report-charts/product-chart/ProductChart";
import WaitConfirm from "../admin/pages/order-process/wait-confirm/WaitConfirm";
import Confirmed from "../admin/pages/order-process/confirmed/Confirmed";
import Transported from "../admin/pages/order-process/transported/Transported";
import Successful from "../admin/pages/order-process/successful/Successful";
import Cancelled from "../admin/pages/order-process/cancelled/Cancelled";
import MaterialsList from "../admin/pages/materials/MaterialsList";
import ShapesList from "../admin/pages/shapes/ShapesList";
import NotFound from "../not-found/NotFound";

const Routers = createBrowserRouter([
    {
        path: '',
        element: <ClientContainer/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/products',
                element: <Products/>,
            },
            {
                path: '/products/:name',
                element: <Products/>,
            },
            // {
            //     path: '/products/children-glasses',
            //     element: <Products/>,
            // },
            // {
            //     path: '/products/the-lens',
            //     element: <Products/>,
            // },
            // {
            //     path: '/products/sunglass',
            //     element: <Products/>,
            // },
            {
                path: '/products/details-product/:id',
                element: <DetailsProduct/>,
            },
            {
                path: '/about-us',
                element: <AboutUs/>
            },
            {
                path: '/order-checking',
                element: <OrderChecking/>
            },
            {
                path: '/store',
                element: <Store/>
            },
            {
                path: '/account',
                element: <Account/>
            }, 
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/payment',
                element: <Payment/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/admin',
        element: <AdminContainer/>,
        children: [
            {
                path: '/admin',
                element: <Dashboard/>
            },
            {
                path: '/admin/management/category',
                element: <CategoriesList/>
            },
            {
                path: '/admin/management/product',
                element: <ProductsList/>
            },
            {
                path: '/admin/management/supplier',
                element: <SuppliersList/>
            },
            {
                path: '/admin/management/account',
                element: <AccountsList/>
            },
            {
                path: '/admin/management/slider',
                element: <SlidersList/>
            },
            {
                path: '/admin/management/shape',
                element: <ShapesList/>
            },
            {
                path: '/admin/management/material',
                element: <MaterialsList/>
            },
            {
                path: '/admin/statistical/sales',
                element: <SalesChart/>
            },
            {
                path: '/admin/statistical/order',
                element: <OrderChart/>
            },
            {
                path: '/admin/statistical/product',
                element: <ProductChart/>
            },
            {
                path: '/admin/order/wait-confirm',
                element: <WaitConfirm/>
            },
            {
                path: '/admin/order/confirmed',
                element: <Confirmed/>
            },
            {
                path: '/admin/order/transported',
                element: <Transported/>
            },
            {
                path: '/admin/order/successful',
                element: <Successful/>
            },
            {
                path: '/admin/order/cancelled',
                element: <Cancelled/>
            }
        ]
    }, 
    {
        path: '/login-admin',
        element: <LoginAdmin/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default Routers