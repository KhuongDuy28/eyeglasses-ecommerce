import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authAdminSlice from "./slice/admin/authAdminSlice";
import categorySlice from "./slice/admin/categorySlice";
import supplierSlice from "./slice/admin/supplierSlice";
import productSlice from "./slice/admin/productSlice";
import userSlice from "./slice/admin/userSlice";
import sliderSlice from "./slice/admin/sliderSlice";
import cartSlice from "./slice/client/cartSlice";
import addressSlice from "./slice/client/addressSlice";
import authClientSlice from "./slice/client/authClientSlice";
import registerSlice from "./slice/client/registerSlice";
import orderSlice from "./slice/client/orderSlice";
import orderProcessSlice from "./slice/admin/orderProcessSlice";
import reportSlice from "./slice/admin/reportSlice";
import favoritesProductSlice from "./slice/client/favoritesProductSlice";
import shapeSlice from "./slice/admin/shapeSlice";
import materialSlice from "./slice/admin/materialSlice";

const Store = configureStore({
    reducer: {
        // ADMIN
        authAdmin: authAdminSlice.reducer,
        category: categorySlice.reducer,
        supplier: supplierSlice.reducer,
        product: productSlice.reducer,
        user: userSlice.reducer,
        slider: sliderSlice.reducer,
        orderProcess: orderProcessSlice.reducer,
        report: reportSlice.reducer,
        shape: shapeSlice.reducer,
        material: materialSlice.reducer,

        // CLIENT
        authClient: authClientSlice.reducer,
        register: registerSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer,
        address: addressSlice.reducer,
        favoritesProduct: favoritesProductSlice.reducer,
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['your/action/type'],
        }
    })
})

export default Store

