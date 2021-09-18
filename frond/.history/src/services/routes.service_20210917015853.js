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
        return http.get(`/products/product/?id=${id}`);
    }
    
    /*Orders*/
    getAllOrders(){
        return http.get("/orders");
    }
}

export default new Routes;