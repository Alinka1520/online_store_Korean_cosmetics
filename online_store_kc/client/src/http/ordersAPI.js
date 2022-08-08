import {$authorizationHost, $host} from "./index";

export const sendOrder = async ({auth, mobile, basket}) => {
    if(auth) {
        const {data} = await $authorizationHost({method:'POST', url: 'api/orders', data: {mobile, basket}})
        return data;
    } else {
        const {data} = await $host({method:'POST', url: 'api/orders', data: {mobile, basket}});
        return data;
    }
}

export const fetchOrders = async ({limit, page, complete}) => {
    const {data} = await $authorizationHost.get(`api/orders?limit=${limit}&page=${page}&complete=${complete}`);
    return data;
}

export const fetchChangeStatusOrder = async ({complete, id}) => {
    const {data} = await $authorizationHost.put('api/orders', {complete, id});
    return data;
}

export const fetchDeleteOrder = async ({id}) => {
    const {data} = await $authorizationHost({method:'DELETE', url: 'api/orders', data: {id}});
    return data;
}

export const getOneOrderProducts = async (id) => {
    const {data} = await $authorizationHost.get('api/orders/' + id);
    return data;
}