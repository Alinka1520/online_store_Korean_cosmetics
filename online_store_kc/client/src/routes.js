//все маршруты к конкретным страницам приложения
import Admin from "./pages/Admin";
import {
    ABOUT_PRODUCT_ROUTE,
    ADMIN_ROUTE,
    PRODUCT_EDIT_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    ORDERING_ROUTE,
    PRODUCTS_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE,
    DELIVERY_ROUTE,
} from "./utils/consts";

import Basket from "./pages/Basket";
import Products from "./pages/Products";
import Authorization from "./pages/Authorization";
import AboutProduct from "./pages/AboutProduct";
import Orders from "./pages/Orders";
import OneOrder from "./pages/OneOrder";
import AboutProductEdit from "./pages/AboutProductEdit";
import Ordering from "./pages/Ordering";
import Main from "./pages/Main";
import Delivery from "./pages/Delivery";

//доступ к страницам для авторизованного пользователя
export const authorizationRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: OneOrder
    },
    {
        path: PRODUCT_EDIT_ROUTE + '/:id',
        Component: AboutProductEdit
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
]

//доступ к страницам для любого пользователя
export const publicRoutes = [
    {
        path: PRODUCTS_ROUTE,
        Component: Products
    },
    {
        path: LOGIN_ROUTE,
        Component: Authorization
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Authorization
    },
    {
        path: ABOUT_PRODUCT_ROUTE + '/:id',
        Component: AboutProduct
    },
    {
        path: ORDERING_ROUTE,
        Component: Ordering
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
]