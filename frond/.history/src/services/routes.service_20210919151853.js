import http from '../http';

class Routes{
    /*Product*/
    getAllProducts(){
        return http.get("/products/");
    }

    createProduct(data) {
        return http.post("/products/product", data);
    }

    updateProduct(id, data) {
        return http.put(`/products/product/${id}`, data);
    }

    deleteProduct(id) {
        return http.delete(`/products/product/${id}`);
    }

    getProduct(id) {
        return http.get(`/products/product/dato/${id}`);
    }
    
    /*Orders*/
    
    getAllOrders(){
        return http.get("/orders/");
    }

    createOrder(data) {
        return http.post("/orders/order", data);
    }

    getOrder(id) {
        return http.get(`/orders/order/dato/${id}`);
    }

    deleteOrder(id) {
        return http.delete(`/orders/order/${id}`);
    }

    updateOrder(id, data) {
        return http.put(`/orders/order/${id}`, data);
    }

    addItemOrder(id, data) {
        return http.post(`/orders/order/${id}/item`, data);
    }

    deleteItemOrder(id, data) {
        return http.post(`/orders/order/${id}/deleteItem`, data);
    }

    setItemOrder(id, data) {
        return http.post(`/orders/order/${id}/editItem`, data);
    }
    /*Consumer*/

    createConsumer(data) {
        return http.post("/consumers/consumer", data);
    }
}

export default new Routes();