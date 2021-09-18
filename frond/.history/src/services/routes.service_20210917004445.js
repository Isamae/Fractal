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
        return http.post(`/products/product/${id}`, data);
    }

    deleteProduct(data) {
        return http.post("/products/product", data);
    }
    
    /*Orders*/
    getAllOrders(){
        return http.get("/orders");
    }
}

export default new Routes;