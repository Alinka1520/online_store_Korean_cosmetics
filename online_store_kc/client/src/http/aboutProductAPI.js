import {$authorizationHost, $host} from "./index";
 //import jwt_decode from "jwt-decode";

export const createProductType = async (type) => {
    const {data} = await $authorizationHost.post('api/type', type)
    return data
}

export const fetchProductTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const deleteProductType = async (id) => {
    const {data} = await $authorizationHost({method:'DELETE', url:'api/type/' + id})
    return data;
}

export const createProductBrand = async (brand) => {
    const {data} = await $authorizationHost.post('api/brand', brand)
    return data
}

export const fetchProductBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const deleteProductBrand = async (id) => {
    const {data} = await $authorizationHost({method:'DELETE', url:'api/brand/' + id});
    return data;
}

export const createProduct = async (about_product) => {
   const {data} = await $authorizationHost.post('api/product', about_product)
   return data
}

export const fetchProduct = async (productTypeId, productBrandId, page, limit = 5) => {
   const {data} = await $host.get('api/product',{params: {
        productTypeId, productBrandId, page, limit
    }})
   return data
}

export const fetchOneProduct = async (id) => {
   const {data} = await $host.get('api/product/' + id)
   return data
}

export const fetchDeleteProduct = async (id) => {
    const {data} = await $authorizationHost({method:'DELETE', url:`api/product/${id}`})
    return data;
}

export const updateProducts = async (id, body) => {
    const {data} = await $authorizationHost({method:'PUT', url:`api/product/${id}`, data: body})
    return data;
}

export const getAllProductsInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authorizationHost({method:'GET', url:`api/product/search?page=${page}&name=${name}&filter=${filter}`})
    return data;
}

// export const getAllProductsInUserPage = async (name, page = 1, filter = "All") => {
//     const {data} = await $authorizationHost({method:'GET', url:`api/product/search?page=${page}&name=${name}&filter=${filter}`})
//     return data;
// }
// // (product)?
export const addProductToBasket = async (about_product) => {
    const {data} = await $authorizationHost.post('api/basket', about_product)
    return data;
}

export const getProductFromBasket = async () => {
    const {data} = await $authorizationHost.get('api/basket')
    return data;
}

export const deleteProductFromBasket = async (id) => {
    const {data} = await $authorizationHost.delete(`api/basket/${id}`);
    return data;
}

export const addRating = async (body) => {
    const {data} = await $authorizationHost.post('api/rating', body);
    return data;
}

export const checkRating = async (body) => {
    const {data} = await $authorizationHost.post('api/rating/check-rating', body);
    return data;
}